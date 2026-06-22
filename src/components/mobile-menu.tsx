import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import * as React from 'react'
import { HoursCard } from './hours-card'
import { LanguageSelect } from './language-select'
import { Button } from './ui/button'

interface Link {
	label: string
	href: string
}

interface HoursInfo {
	isClosed: boolean
	todayLabel: string
	todayShortLabel: string
	todayIso: string
	openRanges: {
		start: string
		end: string
	}[]
	schedule: {
		label: string
		ranges: {
			start: string
			end: string
		}[]
		isClosed: boolean
	}[]
}

interface HoursCardLabels {
	tabLabel: string
	dateFromLabel: string
	seasonLabel: string
}

interface Props {
	logoSrc: string
	logoAlt: string
	burgerSrc: string
	locale: string
	currentPath: string
	links: Link[]
	homeHref: string
	contactHref: string
	artisteHref: string
	// labels
	contactLabel: string
	artisteLabel: string
	hoursLabel: string
	closedLabel: string
	learnMoreLabel: string
	// data
	hours: HoursInfo
	hoursCardLabels: HoursCardLabels
	hoursLearnMoreHref: string
	payloadUrl: string
	className?: string
}

export function MobileMenu({
	logoSrc,
	logoAlt,
	burgerSrc,
	locale,
	currentPath,
	links,
	homeHref,
	contactHref,
	artisteHref,
	contactLabel,
	artisteLabel,
	hoursLabel,
	closedLabel,
	learnMoreLabel,
	hours,
	hoursCardLabels,
	hoursLearnMoreHref,
	payloadUrl,
	className
}: Props) {
	const [open, setOpen] = React.useState(false)

	React.useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [open])

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className={cn('flex h-full items-center justify-center', className)}
				aria-label="Menu"
			>
				<img src={burgerSrc} alt="Menu" className="h-5 w-9" />
			</button>

			<div
				className={cn(
					'bg-foreground fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto text-white transition-all duration-300 min-[410px]:w-[95%]',
					open ? 'pointer-events-auto translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0'
				)}
				inert={!open}
			>
				{/* Top bar — same height as header (h-16) so X sits where burger was */}
				<div className="flex h-16 shrink-0 items-center justify-between px-5">
					<a href={homeHref} onClick={() => setOpen(false)}>
						<img src={logoSrc} alt={logoAlt} className="w-14" />
					</a>
					<div className="flex h-full items-center gap-5">
						<div className="[&_button]:!text-primary [&_svg]:!text-primary [&_button]:!bg-white">
							<LanguageSelect currentLocale={locale} currentPath={currentPath} />
						</div>
						<button onClick={() => setOpen(false)} aria-label="Fermer" className="flex h-full items-center pr-2 pl-3">
							<X className="h-6 w-6" />
						</button>
					</div>
				</div>

				{/* Nav links */}
				<nav className="mt-2 grid grid-cols-2 justify-items-end gap-x-4 gap-y-2.5 px-8">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							onClick={() => setOpen(false)}
							className="px-2 py-2.5 text-base font-light transition-opacity hover:opacity-60"
						>
							{link.label}
						</a>
					))}
				</nav>
				<div className="mb-2 flex w-full items-center justify-end gap-4 px-8 pt-3">
					<Button link={artisteHref} variant="default" className="!bg-primary hover:!bg-primary/90">
						{artisteLabel}
					</Button>
					<Button link={contactHref} variant="default">
						{contactLabel}
					</Button>
				</div>

				{/* Hours card */}
				<div className="px-5 pt-6 pb-2">
					<HoursCard
						className="ml-auto max-w-72"
						tabLabel={hoursCardLabels.tabLabel}
						dateFromLabel={hoursCardLabels.dateFromLabel}
						todayLabel={hours.todayShortLabel}
						todayIso={hours.todayIso}
						isClosed={hours.isClosed}
						closedLabel={closedLabel}
						openRanges={hours.openRanges}
						seasonLabel={hoursCardLabels.seasonLabel}
						schedule={hours.schedule}
						learnMoreLabel={learnMoreLabel}
						learnMoreHref={hoursLearnMoreHref}
					/>
				</div>
			</div>
		</>
	)
}
