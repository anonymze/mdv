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
	const [value, setValue] = React.useState('')
	const isClickingRef = React.useRef(false)
	const itemRefs = React.useRef<(HTMLLIElement | null)[]>([])
	const [layout, setLayout] = React.useState<{ width: number; offsets: number[] }>({ width: 0, offsets: [] })

	const handleValueChange = (newValue: string) => {
		if (isClickingRef.current || newValue === '') {
			setValue(newValue)
			isClickingRef.current = false
		}
	}

	React.useLayoutEffect(() => {
		const compute = () => {
			const header = document.querySelector('header')
			if (!header) return
			const headerRect = header.getBoundingClientRect()
			const offsets = itemRefs.current.map((item) =>
				item ? -(item.getBoundingClientRect().left - headerRect.left) : 0
			)
			setLayout({ width: headerRect.width, offsets })
		}
		compute()
		window.addEventListener('resize', compute)
		return () => window.removeEventListener('resize', compute)
	}, [menuNavs.length])

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
									width: layout.width || 'auto',
									left: layout.offsets[index] || 0
								}}
							>
								{menu.subMenus.map((subMenu, subIndex) => {
									return (
										<div
											key={subIndex}
											className="flex flex-col h-[406px] flex-1 min-w-0 max-w-[210px] animate-in fade-in slide-in-from-bottom-12 z-20 bg-primary rounded-xl overflow-hidden shadow-card border border-foreground"
											style={{
												animationDelay: `${subIndex * 50}ms`,
												animationDuration: '300ms',
												animationFillMode: 'backwards',
												willChange: 'transform'
											}}
										>
											<div className="px-4 pt-4">
												{subMenu.link ? (
													<a
														href={`${localePrefix}${subMenu.link}`}
														className="text-white text-base font-medium uppercase transition-colors duration-200 hover:text-secondary"
													>
														{subMenu.label}
													</a>
												) : (
													<span className="text-white text-base font-medium uppercase">{subMenu.label}</span>
												)}
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
												<div className="relative mx-auto mb-4 h-[135px] w-[160px]"><div className={cn('absolute inset-0 rounded-xl', subMenu.imageBg)} />
													<img
														src={subMenu.image}
														alt=""
														className="absolute inset-x-0 -bottom-px h-[160px] w-full object-cover object-top rounded-xl"
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
			<a href={href} className="block pb-1 text-white font-normal transition-colors duration-200 hover:text-secondary">
				{title}
			</a>
		</li>
	)
}
