import type { Media } from './media'
import type { RichTextField } from './rich-text'

interface BaseMediatheque {
	id: string
	thumbnail?: Media | null
	title: string
	description: RichTextField
	price: string
	informations_more?: RichTextField | null
	other_images?:
		| {
				image?: Media | null
				id?: string | null
		  }[]
		| null
	availability_date?: string | null
	genre?: string | null
	authors?: string | null
	location?: string | null
	updatedAt: string
	createdAt: string
}

export interface Ludotheque extends BaseMediatheque {
	type: 'ludotheque'
	jeunePublic?: boolean | null
	players: string
	public: string
	duration: '5' | '10' | '15' | '30' | '1h' | '1h+'
	materiel?: string | null
}

export interface MediathequeSpectacle extends BaseMediatheque {
	type: 'mediatheque'
	archive?: boolean | null
	immanquable?: boolean | null
	jeunePublic?: boolean | null
	date_start?: string | null
	duration?: string | null
	public?: string | null
	video?: string | null
	distribution?: string | null
	portfolio_authors?: string | null
	credits_photos?: string | null
}

export type Mediatheque = Ludotheque | MediathequeSpectacle
