import { cn } from '@/lib/utils'

interface Props {
	tabLabel: string
	dateFromLabel: string
	todayLabel: string
	todayIso: string
	isClosed: boolean
	closedLabel: string
	openStart?: string | null
	openEnd?: string | null
	seasonLabel: string
	mondaySaturdayLabel: string
	sundayLabel: string
	baseStart: string
	baseEnd: string
	dimancheStart: string
	dimancheEnd: string
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

export function HoursCard({
	tabLabel,
	dateFromLabel,
	todayLabel,
	todayIso,
	isClosed,
	closedLabel,
	openStart,
	openEnd,
	seasonLabel,
	mondaySaturdayLabel,
	sundayLabel,
	baseStart,
	baseEnd,
	dimancheStart,
	dimancheEnd,
	learnMoreLabel,
	learnMoreHref,
	width = 'w-full',
	height = 'h-60',
	className
}: Props) {
	return (
		<div className={cn(`relative ${height} ${width} bg-secondary flex flex-col rounded-3xl overflow-hidden`, className)}>
			<div className={`bg-secondary-muted absolute top-0 left-0 flex ${height} w-10 items-center justify-center`}>
				<span className="text-white flex flex-col gap-px text-center text-xs font-medium uppercase">
					{tabLabel.split('').map((letter, i) => (
						<span key={i}>{letter}</span>
					))}
				</span>
			</div>
			<article className="flex-1 pl-10">
				<div className="flex h-full flex-col items-start px-4 py-5 text-left">
					<p className="text-sm capitalize text-white">
						{dateFromLabel}{' '}
						<time dateTime={todayIso}>{todayLabel}</time>
						&nbsp;:
					</p>

					{isClosed ? (
						<p className="font-serif text-3xl pt-2 w-full text-center text-white">{closedLabel}</p>
					) : openStart && openEnd ? (
						<p className="font-serif text-3xl pt-2 w-full text-center text-white">
							<time dateTime={openStart}>{formatHourFr(openStart)}</time> - <time dateTime={openEnd}>{formatHourFr(openEnd)}</time>
						</p>
					) : null}

					<p className="pt-6 pb-2 text-sm font-semibold text-white">{seasonLabel}&nbsp;:</p>

					<div className="text-sm space-y-0.5">
						<p className="text-white">
							{mondaySaturdayLabel} : {formatHourFr(baseStart)} - {formatHourFr(baseEnd)}
						</p>
						<p className="text-white">
							{sundayLabel} : {formatHourFr(dimancheStart)} - {formatHourFr(dimancheEnd)}
						</p>
					</div>

					<a href={learnMoreHref} className="mt-auto text-xs underline underline-offset-4 text-white">
						{learnMoreLabel}
					</a>
				</div>
			</article>
		</div>
	)
}
