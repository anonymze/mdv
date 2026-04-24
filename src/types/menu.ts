export type SubMenuItem = {
	label: string
	link: string
}

export type SubMenu = {
	label: string
	link: string
	image: string
	imageBg?: string
	subMenus?: SubMenuItem[]
}

export type MenuNav = {
	label: string
	link?: string
	subMenus?: SubMenu[]
}
