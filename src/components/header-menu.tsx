import * as React from 'react'

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import type { MenuNav } from '@/types/menu'

export function NavigationMenuDemo({ menuNavs }: { menuNavs: MenuNav[] }) {
	const [headerWidth, setHeaderWidth] = React.useState(0)
	const [value, setValue] = React.useState('')
	const itemRefs = React.useRef<(HTMLLIElement | null)[]>([])
	const isClickingRef = React.useRef(false)
	const [hoveredImages, setHoveredImages] = React.useState<Record<string, string | null>>({})
	const [previousHoveredImages, setPreviousHoveredImages] = React.useState<Record<string, string | null>>({})

	const handleValueChange = (newValue: string) => {
		if (isClickingRef.current || newValue === '') {
			setValue(newValue)
			isClickingRef.current = false
		}
	}

	React.useEffect(() => {
		const updateWidth = () => {
			const header = document.querySelector('header')
			if (header) {
				setHeaderWidth(header.getBoundingClientRect().width)
			}
		}

		updateWidth()
		window.addEventListener('resize', updateWidth)
		return () => window.removeEventListener('resize', updateWidth)
	}, [])

	const getLeftOffset = (index: number) => {
		if (typeof window === 'undefined') return 0

		const header = document.querySelector('header')
		const item = itemRefs.current[index]
		if (header && item) {
			const headerRect = header.getBoundingClientRect()
			const itemRect = item.getBoundingClientRect()
			return -(itemRect.left - headerRect.left)
		}
		return 0
	}

	return (
		<NavigationMenu viewport={false} value={value} onValueChange={handleValueChange}>
			<NavigationMenuList className="flex-wrap">
				{menuNavs.map((menu, index) => {
					// No submenus or only 1 submenu without children = simple link
					if (!menu.subMenus || (menu.subMenus.length === 1 && !menu.subMenus[0].subMenus)) {
						const href = menu.link || menu.subMenus?.[0]?.link
						return (
							<NavigationMenuItem key={index}>
								<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
									<a href={href}>{menu.label}</a>
								</NavigationMenuLink>
							</NavigationMenuItem>
						)
					}

					return (
						<NavigationMenuItem
							key={index}
							value={`menu-${index}`}
							ref={(el) => {
								itemRefs.current[index] = el
							}}
						>
							<NavigationMenuTrigger
								onPointerDown={() => {
									isClickingRef.current = true
								}}
							>
								{menu.label}
							</NavigationMenuTrigger>
							<NavigationMenuContent
								className="grid grid-cols-6 gap-x-4"
								style={{
									width: headerWidth || 'auto',
									left: getLeftOffset(index)
								}}
							>
								{menu.subMenus.map((subMenu, subIndex) => {
									const columnKey = `${index}-${subIndex}`
									const hoveredImg = hoveredImages[columnKey]
									const previousImg = previousHoveredImages[columnKey]
									return (
										<div
											key={subIndex}
											className="group/image flex flex-col animate-in fade-in slide-in-from-bottom-12"
											style={{
												animationDelay: `${subIndex * 50}ms`,
												animationDuration: '300ms',
												animationFillMode: 'backwards'
											}}
										>
											<ul className="flex-1 bg-green-200 p-4 pb-8">
												{subMenu.subMenus?.map((item, itemIndex) => (
													<ListItem
														key={itemIndex}
														href={item.link}
														title={item.label}
														onMouseEnter={() => {
															const currentImg = hoveredImages[columnKey]
															if (currentImg && currentImg !== item.imageReplacement) {
																// Move current to previous
																setPreviousHoveredImages((prev) => ({ ...prev, [columnKey]: currentImg }))
																// Cleanup previous after animation
																setTimeout(() => {
																	setPreviousHoveredImages((prev) => ({ ...prev, [columnKey]: null }))
																}, 300)
															}
															// Set new current
															setHoveredImages((prev) => ({ ...prev, [columnKey]: item.imageReplacement }))
														}}
														onMouseLeave={() => {
															// Move current to previous so it can animate down
															const currentImg = hoveredImages[columnKey]
															if (currentImg) {
																setPreviousHoveredImages((prev) => ({ ...prev, [columnKey]: currentImg }))
																setTimeout(() => {
																	setPreviousHoveredImages((prev) => ({ ...prev, [columnKey]: null }))
																}, 300)
															}
															setHoveredImages((prev) => ({ ...prev, [columnKey]: null }))
														}}
													/>
												))}
											</ul>
											<div className="relative h-36 overflow-hidden">
												{/* Default image - always visible, static */}
												<img
													src={subMenu.image}
													width="300"
													height="150"
													alt={subMenu.label}
													className="absolute inset-0 h-full w-full object-cover"
													style={{ zIndex: 10 }}
												/>
												{/* Previous image - sliding down with fade out */}
												{previousImg && (
													<img
														key={`prev-${previousImg}`}
														src={previousImg}
														width="300"
														height="150"
														alt="Previous"
														className="absolute inset-0 h-full w-full object-cover animate-out slide-out-to-bottom fade-out duration-300"
														style={{ zIndex: 20 }}
													/>
												)}
												{/* Current hovered image - sliding up with fade in */}
												{hoveredImg && (
													<img
														key={`curr-${hoveredImg}`}
														src={hoveredImg}
														width="300"
														height="150"
														alt="Current"
														className="absolute inset-0 h-full w-full object-cover animate-in slide-in-from-bottom fade-in duration-300"
														style={{ zIndex: 30 }}
													/>
												)}
											</div>
										</div>
									)
								})}
							</NavigationMenuContent>
						</NavigationMenuItem>
					)
				})}

			</NavigationMenuList>
		</NavigationMenu>
	)
}

function ListItem({
	title,
	href,
	onMouseEnter,
	onMouseLeave,
	...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
	return (
		<li {...props} className="group/link block py-4" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<a href={href} className="relative block pb-1.5">
				{title}
				<span className="absolute bottom-0 left-0 h-px w-full bg-black transition-all duration-0 group-hover/link:w-0" />
				<span className="absolute bottom-0 left-0 h-px w-0 bg-black transition-all duration-400 ease-in-out group-hover/link:w-full" />
			</a>
		</li>
	)
}
