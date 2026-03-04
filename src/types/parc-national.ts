import type { Media } from './media'
import type { RichTextField } from './rich-text'

interface BaseParcNational {
	id: string
	archive?: boolean | null
	immanquable?: boolean | null
	thumbnail?: Media | null
	title: string
	description: RichTextField
	date_start: string
	informations_more?: RichTextField | null
	price: string
	genre?: string | null
	authors?: string | null
	tags?: string | null
	location?: string | null
	portfolio_authors?: string | null
	credits_photos?: string | null
	updatedAt: string
	createdAt: string
}

export interface ParcNationalArticle extends BaseParcNational {
	type: 'article'
	epuise?: boolean | null
}

export interface ParcNationalEvenement extends BaseParcNational {
	type: 'evenement'
	jeunePublic?: boolean | null
	duration?: string
	other_images?:
		| {
				image?: Media | null
				id?: string | null
		  }[]
		| null
}

export type ParcNational = ParcNationalArticle | ParcNationalEvenement
