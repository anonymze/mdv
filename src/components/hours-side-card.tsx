import * as React from 'react'
import { X } from 'lucide-react'

export function HoursSideCard() {
	const [isOpen, setIsOpen] = React.useState(false)
	const [justClosed, setJustClosed] = React.useState(false)

	return (
		<>
			{/* Backdrop when open */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/20 z-40 transition-opacity"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Side card */}
			<div
				className={`fixed right-0 top-1/4 z-50 transition-transform duration-300 ${
					isOpen
						? 'translate-x-0'
						: `translate-x-[calc(100%-56px)] ${!justClosed ? 'hover:translate-x-[calc(100%-70px)]' : ''} cursor-pointer`
				}`}
				onClick={() => !isOpen && setIsOpen(true)}
				onMouseLeave={() => setJustClosed(false)}
			>
				{/* Content panel */}
				<div className="relative h-48 w-72 px-5 py-6 overflow-y-auto flex flex-col bg-[#C4C4F5]">
					{/* Vertical text overlay - hidden when open */}
					<div
						className={`absolute left-0 top-0 bg-[#C4C4F5] h-48 w-14 flex gap-2 items-center justify-center transition-opacity duration-300 ${
							isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
						}`}
					>
						<div className="flex flex-col gap-px text-black font-medium text-xs">
							{'HORAIRES'.split('').map((letter, i) => (
								<span key={i}>{letter}</span>
							))}
						</div>
						<div className="flex flex-col gap-px text-black font-medium text-xs text-left">
							{["D'", 'O', 'U', 'V', 'E', 'R', 'T', 'U', 'R', 'E'].map((letter, i) => (
								<span key={i}>{letter}</span>
							))}
						</div>
					</div>
					{/* Content visible when open */}
					<div
						className={`flex-1 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
						onClick={(e) => {
							if (isOpen) {
								e.stopPropagation()
								setIsOpen(false)
								setJustClosed(true)
							}
						}}
					>
						<div className="h-full cursor-pointer">
							<h2 className="text-xl font-bold mb-3 pb-2 border-b border-black">
								Horaires d'ouverture
							</h2>

							<p className="text-base mb-4">Mardi 02 Décembre</p>

							<p className="text-4xl font-bold">14h - 19h</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
