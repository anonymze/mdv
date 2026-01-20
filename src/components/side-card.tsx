import { cn } from '@/lib/utils'
import * as React from 'react'

interface SideCardProps {
	width?: string
	tabText: string[]
	children: React.ReactNode
	ariaLabel: string
}

export function SideCard({ width = 'w-72', tabText, children, ariaLabel }: SideCardProps) {
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
				<div
					className="fixed inset-0 z-40 transition-opacity"
					onClick={() => setIsOpen(false)}
					aria-hidden="true"
				/>
			)}

			{/* Side card - main container */}
			<aside
				className={`fixed right-0 top-1/4 z-50 transition-transform duration-300 ${
					isOpen
						? 'translate-x-0'
						: `translate-x-[calc(100%-56px)] ${!justClosed ? 'hover:translate-x-[calc(100%-70px)]' : ''} cursor-pointer`
				}`}
				onMouseLeave={() => setJustClosed(false)}
				onClick={handleOpen}
				aria-label={ariaLabel}
				role="complementary"
			>
				{/* Content panel */}
				<div className={`relative h-52 ${width} overflow-y-auto p-5 flex flex-col bg-primary`}>
					{/* Vertical text tab - visible when closed */}
					<div
						className={`absolute left-0 top-0 bg-primary h-52 w-14 flex gap-2 items-center justify-center transition-opacity duration-300 ${
							isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
						}`}
						aria-hidden={isOpen}
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
                <span key={idx} className={cn("flex flex-col gap-px text-primary-foreground font-medium text-xs text-center uppercase", idx === 1 && "text-start")} aria-hidden="true">
									{letters.map((letter, i) => (
										<span key={i}>{letter}</span>
									))}
								</span>
							)
						})}
					</div>
					{/* Content visible when open */}
					<article
						className={`flex-1 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
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
