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
import { cn } from '@/lib/utils'

export function NavigationMenuDemo({ menuNavs, localePrefix, className }: { menuNavs: MenuNav[]; localePrefix: string; className?: string }) {
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
		<NavigationMenu viewport={false} value={value} onValueChange={handleValueChange} className={cn('z-20', className)}>
			<NavigationMenuList className="flex-wrap gap-1 xl:gap-4">
				{menuNavs.map((menu, index) => {
					// No submenus or only 1 submenu without children = simple link
					if (!menu.subMenus || (menu.subMenus.length === 1 && !menu.subMenus[0].subMenus)) {
						const rawHref = menu.link || menu.subMenus?.[0]?.link
						const href = rawHref ? `${localePrefix}${rawHref}` : undefined
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
								className="flex gap-x-4"
								style={{
									width: headerWidth || 'auto',
									left: getLeftOffset(index)
								}}
							>
								{menu.subMenus.map((subMenu, subIndex) => {
									return (
										<div
											key={subIndex}
											className="flex flex-col h-104 w-[200px] shrink-0 animate-in fade-in slide-in-from-bottom-12 z-20 bg-primary rounded-xl overflow-hidden shadow-card border border-foreground"
											style={{
												animationDelay: `${subIndex * 50}ms`,
												animationDuration: '300ms',
												animationFillMode: 'backwards'
											}}
										>
											<div className="px-4 pt-4">
												<span className="text-white text-sm font-bold uppercase">{subMenu.label}</span>
											</div>
											<ul className="flex-1 p-4 overflow-y-auto">
												{subMenu.subMenus?.map((item, itemIndex) => (
													<ListItem
														key={itemIndex}
														href={`${localePrefix}${item.link}`}
                            title={item.label}
                            className='z-20'
													/>
												))}
											</ul>
											{subMenu.image && (
												<div className={cn('relative mx-auto mb-4 h-[135px] w-[160px]', subMenu.imageBg)}>
													<img
														src={subMenu.image}
														alt=""
														className="absolute inset-x-0 bottom-0 h-[159px] w-full object-contain object-bottom"
													/>
												</div>
											)}
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
		<li {...props} className="group/link block py-1 pl-4">
			<a href={href} className="block pb-1 text-white transition-colors duration-200 hover:text-secondary">
				{title}
			</a>
		</li>
	)
}
