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
		<NavigationMenu viewport={false} value={value} onValueChange={handleValueChange} className='z-20'>
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
									return (
										<div
											key={subIndex}
											className="flex flex-col animate-in fade-in slide-in-from-bottom-12 z-20"
											style={{
												animationDelay: `${subIndex * 50}ms`,
												animationDuration: '300ms',
												animationFillMode: 'backwards'
											}}
										>
											<ul className="flex-1 bg-primary p-4 pb-8">
												{subMenu.subMenus?.map((item, itemIndex) => (
													<ListItem
														key={itemIndex}
														href={item.link}
                            title={item.label}
                            className='z-20'
													/>
												))}
											</ul>
											<div className="relative h-36">
												<img
													src={subMenu.image}
													width="300"
													height="150"
													alt={`${subMenu.label} menu illustration`}
													loading="lazy"
													className="h-full w-full object-cover"
												/>
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
	...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string; title: string }) {
	return (
		<li {...props} className="group/link block py-4">
			<a href={href} className="relative block pb-1.5 text-primary-foreground">
				{title}
				<span className="absolute bottom-0 left-0 h-px w-full bg-primary-foreground transition-[width] duration-0 group-hover/link:w-0" />
				<span className="absolute bottom-0 left-0 h-px w-0 bg-primary-foreground transition-[width] duration-400 ease-in-out group-hover/link:w-full" />
			</a>
		</li>
	)
}
