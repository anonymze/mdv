import type { Media } from './media'

type RichTextNode =
	| {
			type: 'text'
			text: string
			mode?: string
			style?: string
			detail?: number
			format?: number
			version: number
	  }
	| {
			type: 'linebreak'
			version: number
	  }

type ParagraphNode = {
	type: 'paragraph'
	format: string
	indent: number
	version: number
	children: RichTextNode[]
	direction?: ('ltr' | 'rtl') | null
	textStyle?: string
	textFormat?: number
}

export interface ParcNational {
	id: string
	type: 'evenement' | 'article'
	archive?: boolean | null
	thumbnail?: Media | null
	title: string
	description: {
		root: {
			type: string
			children: ParagraphNode[]
			direction: ('ltr' | 'rtl') | null
			format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
			indent: number
			version: number
			textStyle?: string
			textFormat?: number
		}
		[k: string]: unknown
	}
	date_start: string
	informations_more?: {
		root: {
			type: string
			children: {
				type: any
				version: number
				[k: string]: unknown
			}[]
			direction: ('ltr' | 'rtl') | null
			format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
			indent: number
			version: number
		}
		[k: string]: unknown
	} | null
	price: string
	duration: string
	other_images?:
		| {
				image?: Media | null
				id?: string | null
		  }[]
		| null
	genre?: string | null
	authors?: string | null
	tags?: string | null
	location?: string | null
	updatedAt: string
	createdAt: string
}
