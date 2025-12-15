import * as React from 'react'

export function HoursSideCard() {
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
					className="fixed inset-0 bg-black/20 z-40 transition-opacity"
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
				aria-label="Panneau des horaires d'ouverture"
				role="complementary"
			>
				{/* Content panel */}
				<div className="relative h-48 w-72 px-5 py-6 overflow-y-auto flex flex-col bg-[#C4C4F5]">
					{/* Vertical text tab - visible when closed */}
					<div
						className={`absolute left-0 top-0 bg-[#C4C4F5] h-48 w-14 flex gap-2 items-center justify-center transition-opacity duration-300 ${
							isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
						}`}
						aria-hidden={isOpen}
					>
						<span className="flex flex-col gap-px text-black font-medium text-xs" aria-hidden="true">
							{'HORAIRES'.split('').map((letter, i) => (
								<span key={i}>{letter}</span>
							))}
						</span>
						<span className="flex flex-col gap-px text-black font-medium text-xs text-left" aria-hidden="true">
							{["D'", 'O', 'U', 'V', 'E', 'R', 'T', 'U', 'R', 'E'].map((letter, i) => (
								<span key={i}>{letter}</span>
							))}
						</span>
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
							<h2 className="text-xl font-bold mb-3 pb-2 border-b border-black">
								Horaires d'ouverture
							</h2>

							<p className="text-base mb-4">
								<time dateTime="2024-12-02">Mardi 02 Décembre</time>
							</p>

							<div itemScope itemType="https://schema.org/OpeningHoursSpecification">
								<meta itemProp="dayOfWeek" content="Tuesday" />
								<meta itemProp="opens" content="14:00" />
								<meta itemProp="closes" content="19:00" />
								<p className="text-4xl font-bold" aria-label="Ouvert de 14 heures à 19 heures">
									<time dateTime="14:00">14h</time> - <time dateTime="19:00">19h</time>
								</p>
							</div>

							<span className="sr-only">Appuyez sur Échap ou cliquez pour fermer</span>
						</div>
					</article>
				</div>
			</aside>
		</>
	)
}
