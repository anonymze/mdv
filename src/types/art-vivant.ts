import type { Media } from './media'
import type { RichTextField } from './rich-text'

export interface ArtVivant {
	id: string
	type: 'evenement' | 'residence'
	archive?: boolean | null
	immanquable?: boolean | null
	jeunePublic?: boolean | null
	thumbnail?: Media | null
	title: string
	description: RichTextField
	date_start: string
	informations_more?: RichTextField | null
	price: string
	duration?: string
	public?: string
	video?: string
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
	portfolio_authors?: string | null
	credits_photos?: string | null
	updatedAt: string
	createdAt: string
}
