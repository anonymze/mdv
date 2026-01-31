import type { Media } from './media'

export interface AutresActualites {
	id: string
	type: 'evenement'
	archive?: boolean | null
	thumbnail?: Media | null
	title: string
	description: {
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
				/**
				 * Le fichier doit être une image.
				 */
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
