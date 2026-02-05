import type { Hour } from '@/types/hours'

export function getHoursForToday(hours: Hour) {
	const today = new Date()

	const isClosed =
		hours.closed_dates?.some(({ date }) => {
			const closedDate = new Date(date)
			return closedDate.getMonth() === today.getMonth() && closedDate.getDate() === today.getDate()
		}) ?? false

	let openStart: string | null = null
	let openEnd: string | null = null

	if (!isClosed) {
		const isEte =
			today >= new Date(hours.horaires_ete.ete_date_from) &&
			today <= new Date(hours.horaires_ete.ete_date_to)

		const isHiver =
			(today >= new Date(hours.horaires_hiver.noel_date_from) &&
				today <= new Date(hours.horaires_hiver.noel_date_to)) ||
			(today >= new Date(hours.horaires_hiver.fevrier_date_from) &&
				today <= new Date(hours.horaires_hiver.fevrier_date_to))

		if (isEte) {
			openStart = hours.horaires_ete.ete_start
			openEnd = hours.horaires_ete.ete_end
		} else if (isHiver) {
			openStart = hours.horaires_hiver.hiver_start
			openEnd = hours.horaires_hiver.hiver_end
		} else if (today.getDay() === 0) {
			openStart = hours.horaires_base.dimanche_start
			openEnd = hours.horaires_base.dimanche_end
		} else {
			openStart = hours.horaires_base.base_start
			openEnd = hours.horaires_base.base_end
		}
	}

	return { today, isClosed, openStart, openEnd }
}
