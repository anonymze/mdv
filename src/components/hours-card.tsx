import { cn } from '@/lib/utils'

interface HoursRange {
	start: string
	end: string
}

interface ScheduleLine {
	label: string
	ranges: HoursRange[]
	isClosed: boolean
}

interface Props {
	tabLabel: string
	dateFromLabel: string
	todayLabel: string
	todayIso: string
	isClosed: boolean
	closedLabel: string
	openRanges: HoursRange[]
	seasonLabel: string
	schedule: ScheduleLine[]
	learnMoreLabel: string
	learnMoreHref: string
	width?: string
	height?: string
	className?: string
}

const formatHourFr = (iso: string) => {
	const d = new Date(iso)
	const parts = d
		.toLocaleTimeString('fr-FR', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			timeZone: 'Europe/Paris'
		})
		.split(':')
	const h = parseInt(parts[0], 10)
	const m = parts[1]
	return m === '00' ? `${h}h` : `${h}h${m}`
}

const formatRanges = (ranges: HoursRange[]) =>
	ranges.map((range) => `${formatHourFr(range.start)} - ${formatHourFr(range.end)}`).join(' / ')

export function HoursCard({
	tabLabel,
	dateFromLabel,
	todayLabel,
	todayIso,
	isClosed,
	closedLabel,
	openRanges,
	seasonLabel,
	schedule,
	learnMoreLabel,
	learnMoreHref,
	width = 'w-full',
	height = 'h-60',
	className
}: Props) {
	return (
		<div
			className={cn(`relative ${height} ${width} bg-secondary flex flex-col overflow-hidden rounded-3xl`, className)}
		>
			<div className={`bg-secondary-muted absolute top-0 left-0 flex ${height} w-10 items-center justify-center`}>
				<span className="flex flex-col gap-px text-center text-xs font-medium text-white uppercase">
					{tabLabel.split('').map((letter, i) => (
						<span key={i}>{letter}</span>
					))}
				</span>
			</div>
			<article className="flex-1 pl-10">
				<div className="flex h-full flex-col items-start px-4 pt-5 pb-4 text-left">
					<p className="text-sm font-semibold text-white">
						{dateFromLabel} <time dateTime={todayIso}>{todayLabel}</time>
						&nbsp;:
					</p>

					{isClosed ? (
						<p className="w-full pt-2 text-center font-serif text-3xl text-white">{closedLabel}</p>
					) : openRanges.length > 0 ? (
						<p className={cn('w-full pt-2 text-center font-serif text-white', openRanges.length > 1 ? 'text-2xl' : 'text-3xl')}>
							{formatRanges(openRanges)}
						</p>
					) : null}

					<p className="pt-4 pb-2 text-sm font-semibold text-white">{seasonLabel}&nbsp;:</p>

					<div className="space-y-0.5 text-sm">
						{schedule.map((line) => (
							<p className="text-white" key={line.label}>
								{line.label} : {line.isClosed ? closedLabel : formatRanges(line.ranges)}
							</p>
						))}
					</div>

					<a href={learnMoreHref} className="mt-auto text-xs text-white underline underline-offset-4">
						{learnMoreLabel}
					</a>
				</div>
			</article>

		</div>
	)
}
