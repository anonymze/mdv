export type CreditsPage =
	| 'home'
	| 'archives'
	| 'art_vivant'
	| 'autres_actualites'
	| 'cinema'
	| 'exposition'
	| 'jeune_public'
	| 'mediatheque'
	| 'parc_national'
	| 'artiste'
	| 'contact'
	| 'informations'

export type Credits = {
	[K in CreditsPage]?: string | null
} & {
	id: string
	updatedAt?: string | null
	createdAt?: string | null
}
