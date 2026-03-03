import type { Media } from './media'
import type { RichTextField } from './rich-text'

export interface Mediatheque {
	id: string
	type: 'ludotheque' | 'mediatheque'
	jeunePublic?: boolean | null
	thumbnail?: Media | null
	title: string
	description: RichTextField
	price: string
	players: string
	public: string
	duration: '5' | '10' | '15' | '30' | '1h' | '1h+'
	informations_more?: RichTextField | null
	other_images?:
		| {
				image?: Media | null
				id?: string | null
		  }[]
		| null
	availability_date?: string | null
	genre?: string | null
	materiel?: string | null
	authors?: string | null
	location?: string | null
	updatedAt: string
	createdAt: string
}
