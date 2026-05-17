import type { Media } from './media'
import type { RichTextField } from './rich-text'

export interface ArtVivant {
	id: string
	type: 'evenement' | 'residence' | 'scolaire'
	archive?: boolean | null
	immanquable?: 'immanquable' | 'coup_de_coeur' | null
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
	distribution?: string | null
	tags?: string | null
	location?: string | null
	portfolio_authors?: string | null
	credits_photos?: string | null
	updatedAt: string
	createdAt: string
}
