import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

export interface Slot {
	src: string
	alt?: string
	barClassName?: string
}

export interface Row {
	slots: Slot[]
	defaultIndex?: number
	height?: string
	width?: string
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

	const [hovered, setHovered] = useState<(number | null)[]>(rows.map(() => null))
	const [selected, setSelected] = useState<number[]>(rows.map((r) => r.defaultIndex ?? 0))
	const leaveTimers = useRef<Array<ReturnType<typeof setTimeout> | null>>(rows.map(() => null))

	const setRowHovered = (rowIdx: number, value: number | null) => {
		setHovered((prev) => (prev[rowIdx] === value ? prev : prev.map((v, i) => (i === rowIdx ? value : v))))
	}

	const handleEnter = (rowIdx: number, slotIdx: number) => {
		const timer = leaveTimers.current[rowIdx]
		if (timer) {
			clearTimeout(timer)
			leaveTimers.current[rowIdx] = null
		}
		setRowHovered(rowIdx, slotIdx)
	}

	const handleLeave = (rowIdx: number) => {
		const timer = leaveTimers.current[rowIdx]
		if (timer) clearTimeout(timer)
		leaveTimers.current[rowIdx] = setTimeout(() => {
			setRowHovered(rowIdx, null)
			leaveTimers.current[rowIdx] = null
		}, 200)
	}

	const setRowSelected = (rowIdx: number, value: number) => {
		setSelected((prev) => prev.map((v, i) => (i === rowIdx ? value : v)))
	}

	return (
		<div className={cn('flex gap-3 lg:gap-4', isVertical ? 'flex-row' : 'flex-col', className)}>
			{rows.map((row, rowIdx) => {
				const activeIdx = hovered[rowIdx] ?? selected[rowIdx]
				const height = row.height ?? (isVertical ? 'h-96' : 'h-48')
				const width = row.width ?? 'w-full'

				if (row.slots.length === 1) {
					const slot = row.slots[0]
					return (
						<div key={rowIdx} className={cn('overflow-hidden rounded-2xl', height, width)}>
							<img
								src={slot.src}
								alt={slot.alt ?? ''}
								className="h-full w-full object-cover outline outline-1 -outline-offset-1 outline-black/10"
							/>
						</div>
					)
				}

				return (
					<div
						key={rowIdx}
						className={cn('flex', isVertical ? 'flex-col' : 'flex-row', height, width, gap)}
						onMouseLeave={() => handleLeave(rowIdx)}
					>
						{row.slots.map((slot, slotIdx) => {
							const isActive = slotIdx === activeIdx
							return (
								<button
									type="button"
									key={slotIdx}
									onMouseEnter={isActive ? undefined : () => handleEnter(rowIdx, slotIdx)}
									onPointerDown={isActive ? undefined : () => setRowSelected(rowIdx, slotIdx)}
									aria-label={slot.alt || `Image ${slotIdx + 1}`}
									aria-pressed={isActive}
									tabIndex={isActive ? -1 : 0}
									className={cn(
										'relative p-0 border-0',
										isVertical ? 'w-full' : 'h-full',
										'transition-[flex-grow,flex-basis,border-radius] duration-300 ease-out',
										'before:content-[""] before:absolute before:-inset-[5px]',
										slot.barClassName ?? DEFAULT_BAR_CLASS,
										isActive
											? 'grow shrink basis-0 cursor-default rounded-2xl'
											: 'grow-0 shrink-0 basis-[50px] cursor-pointer rounded-[25px]'
									)}
								>
									<img
										src={slot.src}
										alt={slot.alt ?? ''}
										aria-hidden={!isActive}
										className={cn(
											'absolute inset-0 h-full w-full object-cover',
											'transition-[opacity,border-radius] duration-300 ease-out',
											'outline outline-1 -outline-offset-1 outline-black/10',
											isActive ? 'opacity-100 rounded-2xl' : 'opacity-0 rounded-[25px] pointer-events-none'
										)}
									/>
								</button>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}
