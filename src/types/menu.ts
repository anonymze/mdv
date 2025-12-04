import type { ImageMetadata } from 'astro'

export type SubMenuItem = {
	label: string
	link: string
}

export type SubMenu = {
	label: string
	link: string
	image: ImageMetadata
	imageReplacement: ImageMetadata
	subMenus?: SubMenuItem[]
}

export type MenuNav = {
	label: string
	link?: string
	subMenus?: SubMenu[]
}
