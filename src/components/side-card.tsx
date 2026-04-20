import { cn } from '@/lib/utils'
import * as React from 'react'

interface SideCardProps {
	width?: string
	height?: string
	position?: string
	tabText: string[]
	children: React.ReactNode
	ariaLabel: string
}

export function SideCard({
	width = 'w-72',
	height = 'h-50',
	position = 'top-1/4',
	tabText,
	children,
	ariaLabel
}: SideCardProps) {
	const [isOpen, setIsOpen] = React.useState(false)
	const [justClosed, setJustClosed] = React.useState(false)

	// Keyboard support
	React.useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				setIsOpen(false)
				setJustClosed(true)
			}
		}
		window.addEventListener('keydown', handleEscape)
		return () => window.removeEventListener('keydown', handleEscape)
	}, [isOpen])

	const handleOpen = () => {
		if (!isOpen) {
			setIsOpen(true)
		}
	}

	const handleClose = () => {
		setIsOpen(false)
		setJustClosed(true)
	}

	return (
		<>
			{/* Backdrop when open */}
			{isOpen && (
				<div className="fixed inset-0 z-40 transition-opacity hidden lg:block max-h-dvh" onClick={() => setIsOpen(false)} aria-hidden="true" />
			)}

			{/* Side card - main container */}
			<aside
				className={`hidden lg:block fixed ${position} right-0 z-50 transition-transform duration-300 ${
					isOpen
						? 'translate-x-0'
						: `translate-x-[calc(100%-40px)] ${!justClosed ? 'hover:translate-x-[calc(100%-54px)]' : ''} cursor-pointer`
				}`}
				onMouseLeave={() => setJustClosed(false)}
				onClick={handleOpen}
				aria-label={ariaLabel}
				role="complementary"
			>
				{/* Content panel */}
				<div className={`relative ${height} ${width} bg-secondary flex flex-col overflow-y-auto rounded-l-3xl`}>
					{/* Vertical text tab - always visible */}
					<div
						className={`bg-secondary-muted absolute top-0 left-0 flex ${height} w-10 items-center justify-center gap-2 rounded-l-3xl cursor-pointer`}
						aria-hidden={isOpen}
						onClick={(e) => {
							if (isOpen) {
								e.stopPropagation()
								handleClose()
							}
						}}
					>
						{tabText.map((text, idx) => {
							// Keep apostrophes with preceding letter
							const letters = text.split('').reduce<string[]>((acc, char) => {
								if (char === "'" && acc.length > 0) {
									acc[acc.length - 1] += char
								} else {
									acc.push(char)
								}
								return acc
							}, [])
							return (
								<span
									key={idx}
									className={cn(
										'text-white flex flex-col gap-px text-center text-xs font-medium uppercase',
										idx === 1 && 'text-start'
									)}
									aria-hidden="true"
								>
									{letters.map((letter, i) => (
										<span key={i}>{letter}</span>
									))}
								</span>
							)
						})}
					</div>
					{/* Content visible when open */}
					<article
						className={`flex-1 pl-10 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
						onClick={(e) => {
							if (isOpen) {
								e.stopPropagation()
								handleClose()
							}
						}}
						aria-hidden={!isOpen}
						aria-live="polite"
					>
						<div className="h-full cursor-pointer" role="button" tabIndex={isOpen ? 0 : -1}>
							{children}
							<span className="sr-only">Appuyez sur Échap ou cliquez pour fermer</span>
						</div>
					</article>
				</div>
			</aside>
		</>
	)
}
