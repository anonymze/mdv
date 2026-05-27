import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

export interface Slot {
	src: string
	alt?: string
	barClassName?: string
	href?: string
	badge?: string
}

export interface Row {
	slots: Slot[]
	defaultIndex?: number
	height?: string
	width?: string
	cardStyle?: boolean
	compactPills?: boolean
}

interface Props {
	rows: Row[]
	direction?: 'horizontal' | 'vertical'
	className?: string
	gap?: string
}

const DEFAULT_BAR_CLASS = 'bg-secondary'

export function HoverImageSwap({ rows, direction = 'horizontal', className, gap = 'gap-3 lg:gap-4' }: Props) {
	const isVertical = direction === 'vertical'

	const [selected, setSelected] = useState<number[]>(rows.map((r) => r.defaultIndex ?? 0))
	const justSelectedRef = useRef(false)

	const setRowSelected = (rowIdx: number, value: number) => {
		setSelected((prev) => (prev[rowIdx] === value ? prev : prev.map((v, i) => (i === rowIdx ? value : v))))
	}

	return (
		<div className={cn('flex gap-3 lg:gap-4', isVertical ? 'flex-row' : 'flex-col', className)}>
			{rows.map((row, rowIdx) => {
				const activeIdx = selected[rowIdx]
				const height = row.height ?? (isVertical ? 'h-96' : 'h-48')
				const width = row.width ?? 'w-full'

				if (row.slots.length === 1) {
					const slot = row.slots[0]
					return (
						<div key={rowIdx} className={cn('overflow-hidden rounded-3xl', height, width, row.cardStyle && 'border border-black shadow-card')}>
							<img
								src={slot.src}
								alt={slot.alt ?? ''}
								className="h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10"
							/>
						</div>
					)
				}

				return (
					<div key={rowIdx} className={cn('flex', isVertical ? 'flex-col' : 'flex-row', height, width, gap)}>
						{row.slots.map((slot, slotIdx) => {
							const isActive = slotIdx === activeIdx
							return (
								<button
									type="button"
									key={slotIdx}
									onMouseEnter={isActive ? undefined : () => setRowSelected(rowIdx, slotIdx)}
									onPointerDown={isActive ? undefined : () => {
										setRowSelected(rowIdx, slotIdx)
										justSelectedRef.current = true
									}}
									onClick={() => {
										if (justSelectedRef.current) {
											justSelectedRef.current = false
											return
										}
										if (isActive && slot.href) {
											window.location.href = slot.href
										}
									}}
									style={{ touchAction: 'manipulation' }}
									aria-label={slot.alt || `Image ${slotIdx + 1}`}
									aria-pressed={isActive}
									tabIndex={isActive ? -1 : 0}
									className={cn(
										'relative p-0 border-0 overflow-hidden',
										isVertical ? 'w-full' : 'h-full',
										'will-change-[flex-grow,flex-basis,border-radius,background-color]',
										'transition-[flex-grow,flex-basis,border-radius,background-color] [transition-duration:300ms,300ms,300ms,400ms] ease-out',
										'before:content-[""] before:absolute before:-inset-[5px]',
										isActive
											? cn('bg-transparent grow shrink basis-0 rounded-3xl', slot.href ? 'cursor-pointer' : 'cursor-default', row.cardStyle && 'border border-black shadow-card')
											: cn(slot.barClassName ?? DEFAULT_BAR_CLASS, row.compactPills ? 'grow-0 shrink-0 basis-[33px] lg:basis-[43px] cursor-pointer rounded-[18px] lg:rounded-[24px]' : 'grow-0 shrink-0 basis-10 lg:basis-[50px] cursor-pointer rounded-[24px] lg:rounded-[30px]')
									)}
								>
									<img
										src={slot.src}
										alt={slot.alt ?? ''}
										aria-hidden={!isActive}
										className={cn(
											'absolute inset-0 h-full w-full object-cover',
											'transition-[opacity,border-radius] duration-300 ease-in',
											'outline outline-1 -outline-offset-1 outline-black/10',
											isActive ? 'opacity-100 rounded-3xl delay-200' : 'opacity-0 rounded-[24px] lg:rounded-[30px] pointer-events-none'
										)}
									/>
									{isActive && slot.badge && (
										<span className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-white text-secondary-muted text-sm font-medium px-3 py-1.5 rounded-full shadow whitespace-nowrap">
											{slot.badge}
										</span>
									)}
								</button>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}
