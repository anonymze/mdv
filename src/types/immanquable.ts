import type { ArtVivant } from './art-vivant'
import type { Cinema } from './cinema'
import type { Exposition } from './exposition'
import type { ParcNational } from './parc-national'

export type ImmanquableDoc =
	| (ArtVivant & { _collection: 'art_vivant' })
	| (Cinema & { _collection: 'cinema' })
	| (Exposition & { _collection: 'exposition' })
	| (ParcNational & { _collection: 'parc_national' })

export type ImmanquableResponse = {
	doc: ImmanquableDoc | null
}
