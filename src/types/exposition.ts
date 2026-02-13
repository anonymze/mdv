import type { Media } from './media'
import type { RichTextField } from './rich-text'

interface BaseExposition {
	id: string
	archive?: boolean | null
	immanquable?: boolean | null
	title: string
	description: RichTextField
	date_start: string
	date_end: string
	location?: string | null
	informations_more?: RichTextField | null
	genre?: string | null
	tags?: string | null
	authors?: string | null
  portfolio_authors?: string | null;
  credits_photos?: string | null;
	updatedAt: string
	createdAt: string
}

export interface ExpositionType extends BaseExposition {
	type: 'exposition'
	images?:
		| {
				image?: Media | null
				id?: string | null
		  }[]
		| null
}

export interface EvenementType extends BaseExposition {
	type: 'evenement'
	thumbnail?: Media | null
	images?:
		| {
				image?: Media | null
				id?: string | null
		  }[]
		| null
	other_images?:
		| {
				image?: Media | null
				id?: string | null
		  }[]
		| null
}

export type Exposition = ExpositionType | EvenementType
