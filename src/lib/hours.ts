import type { Hour } from '@/types/hours'

export interface HoursRange {
	start: string
	end: string
}

export type HoursPeriod = 'base' | 'ete' | 'hiver'
export type HoursDay = 'mondaySaturday' | 'wednesday' | 'sunday'

export interface HoursScheduleLine {
	day: HoursDay
	ranges: HoursRange[]
	isClosed: boolean
}

const parisDateFormatter = new Intl.DateTimeFormat('en-CA', {
	timeZone: 'Europe/Paris',
	year: 'numeric',
	month: '2-digit',
	day: '2-digit'
})

const getParisDateKey = (date: string | Date) => {
	const parts = parisDateFormatter.formatToParts(new Date(date))
	const year = parts.find((part) => part.type === 'year')?.value
	const month = parts.find((part) => part.type === 'month')?.value
	const day = parts.find((part) => part.type === 'day')?.value
	return `${year}-${month}-${day}`
}

const getDayFromDateKey = (dateKey: string) => new Date(`${dateKey}T12:00:00Z`).getUTCDay()

const isCompleteRange = (start?: string | null, end?: string | null) => {
	if (!start || !end) return null
	return { start, end }
}

const buildRanges = (ranges: Array<HoursRange | null>) => ranges.filter((range): range is HoursRange => Boolean(range))

const isInRange = (dateKey: string, start: string, end: string) =>
	dateKey >= getParisDateKey(start) && dateKey <= getParisDateKey(end)

const isExceptionallyClosed = (hours: Hour, todayKey: string) =>
	hours.closed_dates?.some(({ date }) => getParisDateKey(date) === todayKey) ?? false

export function getHoursPeriod(hours: Hour, today = new Date()): HoursPeriod {
	const todayKey = getParisDateKey(today)

	if (isInRange(todayKey, hours.horaires_ete.ete_date_from, hours.horaires_ete.ete_date_to)) {
		return 'ete'
	}

	const isHiver =
		isInRange(todayKey, hours.horaires_hiver.noel_date_from, hours.horaires_hiver.noel_date_to) ||
		isInRange(todayKey, hours.horaires_hiver.fevrier_date_from, hours.horaires_hiver.fevrier_date_to)

	return isHiver ? 'hiver' : 'base'
}

export function getHoursSchedule(hours: Hour, period: HoursPeriod): HoursScheduleLine[] {
	if (period === 'ete') {
		const mondaySaturday = isCompleteRange(hours.horaires_ete.ete_start, hours.horaires_ete.ete_end)
		const wednesdayMorning = isCompleteRange(
			hours.horaires_ete.ete_mercredi_matin_start,
			hours.horaires_ete.ete_mercredi_matin_end
		)
		const sunday = isCompleteRange(hours.horaires_ete.ete_dimanche_start, hours.horaires_ete.ete_dimanche_end)

		return [
			{ day: 'mondaySaturday', ranges: mondaySaturday ? [mondaySaturday] : [], isClosed: !mondaySaturday },
			{
				day: 'wednesday',
				ranges: buildRanges([wednesdayMorning, mondaySaturday]),
				isClosed: !wednesdayMorning && !mondaySaturday
			},
			{ day: 'sunday', ranges: sunday ? [sunday] : [], isClosed: !sunday }
		]
	}

	if (period === 'hiver') {
		const mondaySaturday = isCompleteRange(hours.horaires_hiver.hiver_start, hours.horaires_hiver.hiver_end)
		const wednesdayMorning = isCompleteRange(
			hours.horaires_hiver.hiver_mercredi_matin_start,
			hours.horaires_hiver.hiver_mercredi_matin_end
		)
		const sunday = isCompleteRange(hours.horaires_hiver.hiver_dimanche_start, hours.horaires_hiver.hiver_dimanche_end)

		return [
			{ day: 'mondaySaturday', ranges: mondaySaturday ? [mondaySaturday] : [], isClosed: !mondaySaturday },
			{
				day: 'wednesday',
				ranges: buildRanges([wednesdayMorning, mondaySaturday]),
				isClosed: !wednesdayMorning && !mondaySaturday
			},
			{ day: 'sunday', ranges: sunday ? [sunday] : [], isClosed: !sunday }
		]
	}

	const mondaySaturday = isCompleteRange(hours.horaires_base.base_start, hours.horaires_base.base_end)
	const wednesdayMorning = isCompleteRange(
		hours.horaires_base.mercredi_matin_start,
		hours.horaires_base.mercredi_matin_end
	)
	const sunday = isCompleteRange(hours.horaires_base.dimanche_start, hours.horaires_base.dimanche_end)

	return [
		{ day: 'mondaySaturday', ranges: mondaySaturday ? [mondaySaturday] : [], isClosed: !mondaySaturday },
		{
			day: 'wednesday',
			ranges: buildRanges([wednesdayMorning, mondaySaturday]),
			isClosed: !wednesdayMorning && !mondaySaturday
		},
		{ day: 'sunday', ranges: sunday ? [sunday] : [], isClosed: !sunday }
	]
}

export function getHoursForToday(hours: Hour) {
	const today = new Date()
	const todayKey = getParisDateKey(today)
	const period = getHoursPeriod(hours, today)
	const isClosedDate = isExceptionallyClosed(hours, todayKey)
	const schedule = getHoursSchedule(hours, period)
	const day = getDayFromDateKey(todayKey)
	const scheduleLine =
		day === 0
			? schedule.find((line) => line.day === 'sunday')
			: day === 3
				? schedule.find((line) => line.day === 'wednesday')
				: schedule.find((line) => line.day === 'mondaySaturday')
	const openRanges = isClosedDate ? [] : (scheduleLine?.ranges ?? [])
	const isClosed = isClosedDate || openRanges.length === 0

	return {
		today,
		todayKey,
		period,
		isClosed,
		openRanges,
		openStart: openRanges[0]?.start ?? null,
		openEnd: openRanges[0]?.end ?? null
	}
}
