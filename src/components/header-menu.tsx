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
	const itemRefs = React.useRef<(HTMLLIElement | null)[]>([])

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
		<NavigationMenu viewport={false}>
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
							ref={(el) => {
								itemRefs.current[index] = el
							}}
						>
							<NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
							<NavigationMenuContent
								className="grid grid-cols-6 gap-x-4"
								style={{
									width: headerWidth || 'auto',
									left: getLeftOffset(index)
								}}
							>
								{menu.subMenus.map((subMenu, subIndex) => (
									<ul key={subIndex} className="bg-green-200">
										{subMenu.subMenus?.map((item, itemIndex) => (
											<ListItem key={itemIndex} href={item.link} title={item.label} />
										))}
									</ul>
								))}
							</NavigationMenuContent>
						</NavigationMenuItem>
					)
				})}
			</NavigationMenuList>
		</NavigationMenu>
	)
}

function ListItem({ title, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<a href={href} className="flex items-centert">
					{title}
				</a>
			</NavigationMenuLink>
		</li>
	)
}
