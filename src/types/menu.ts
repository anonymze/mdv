export type SubMenuItem = {
	label: string
	link: string
	imageReplacement: string
}

export type SubMenu = {
	label: string
	link: string
	image: string
	subMenus?: SubMenuItem[]
}

export type MenuNav = {
	label: string
	link?: string
	subMenus?: SubMenu[]
}
