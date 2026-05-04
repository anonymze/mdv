import type { ArtVivant } from './art-vivant'
import type { AutresActualites } from './autres-actualites'
import type { Cinema } from './cinema'
import type { Exposition } from './exposition'
import type { ParcNational } from './parc-national'

export type ImmanquableDoc =
	| (ArtVivant & { _collection: 'art_vivant' })
	| (Cinema & { _collection: 'cinema' })
	| (Exposition & { _collection: 'exposition' })
	| (ParcNational & { _collection: 'parc_national' })
	| (AutresActualites & { _collection: 'autres_actualites' })

export type ImmanquableValue = 'immanquable' | 'coup_de_coeur' | 'cine_passion'

export type ImmanquableResponse = {
	immanquable: ImmanquableDoc | null
	coup_de_coeur: ImmanquableDoc | null
	cine_passion: ImmanquableDoc | null
}
