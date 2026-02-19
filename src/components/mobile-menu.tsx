import { cn } from '@/lib/utils'
import { ArrowRight, X } from 'lucide-react'
import * as React from 'react'
import { LanguageSelect } from './language-select'
import { MyImage } from './my-image'

interface Link {
	label: string
	href: string
}

interface HoursInfo {
	isClosed: boolean
	todayLabel: string
	openLabel?: string
}

interface EventInfo {
	title: string
	href: string
	imageUrl?: string | null
	imageAlt: string
	date: string
	genre?: string | null
}

interface Props {
	logoSrc: string
	logoAlt: string
	burgerSrc: string
	locale: string
	currentPath: string
	links: Link[]
	// labels
	contactLabel: string
	hoursLabel: string
	closedLabel: string
	eventLabel: string
	learnMoreLabel: string
	// data
	hours: HoursInfo
	payloadUrl: string
	event?: EventInfo
	className?: string
}

export function MobileMenu({
	logoSrc,
	logoAlt,
	burgerSrc,
	locale,
	currentPath,
	links,
	contactLabel,
	hoursLabel,
	closedLabel,
	eventLabel,
	learnMoreLabel,
	hours,
	payloadUrl,
	event,
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
					'bg-primary text-primary-foreground fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto transition-all duration-300 min-[410px]:w-[95%]',
					open ? 'pointer-events-auto translate-x-0 opacity-100' : 'pointer-events-none translate-x-full opacity-0'
				)}
				aria-hidden={!open}
			>
				{/* Top bar — same height as header (h-16) so X sits where burger was */}
				<div className="flex h-16 shrink-0 items-center justify-between px-5">
					<a href="/" onClick={() => setOpen(false)}>
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
				<nav className="flex flex-col items-end gap-1.5 px-8 py-1">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							onClick={() => setOpen(false)}
							className="px-2 py-3 text-xl font-light transition-opacity hover:opacity-60"
						>
							{link.label}
						</a>
					))}
				</nav>

				{/* Hours + Contact */}
				<div className="mt-auto mb-auto flex items-end justify-between gap-4 px-5 pb-6">
					<div>
						<p className="whitespace-nowrap pb-2 text-xs font-serif uppercase">{hoursLabel}</p>
						<hr className="mb-3 border-white/40" />
						<p className="pb-1 text-sm capitalize">{hours.todayLabel}</p>
						<p className="text-xl font-bold">{hours.isClosed ? closedLabel : hours.openLabel}</p>
					</div>
					<a
						href="/informations"
						onClick={() => setOpen(false)}
						className="bg-secondary text-secondary-foreground flex shrink-0 items-center gap-2 px-2 py-3 text-xs font-medium mb-1.5"
					>
						{contactLabel}
						<ArrowRight className="h-4 w-4" />
					</a>
				</div>

				{/* Immanquable event */}
				{event && (
					<div className="mt-auto px-5 pb-2">
						<p className="pb-2 text-xs font-serif uppercase">{eventLabel}</p>
						<hr className="mb-3 border-white/40" />
						<MyImage
							payloadUrl={payloadUrl}
							src={event.imageUrl}
							alt={event.imageAlt}
							layout="constrained"
							className="mb-3 h-32 w-full object-cover"
						/>
						<div className="flex w-full items-center gap-3">
							<div className="min-w-0 shrink truncate text-xs text-gray-200 capitalize">{event.date}</div>
							{event.genre && (
								<div className="mr-auto min-w-0 shrink truncate text-xs text-gray-200">{event.genre}</div>
							)}
							<a href={event.href} className="ml-auto shrink-0 py-2 pl-2 text-xs underline underline-offset-3">
								{learnMoreLabel}
							</a>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
