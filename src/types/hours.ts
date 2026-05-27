export interface Hour {
	id: string
	horaires_base: {
		base_start: string
		base_end: string
		mercredi_matin_start?: string | null
		mercredi_matin_end?: string | null
		dimanche_start?: string | null
		dimanche_end?: string | null
	}
	horaires_ete: {
		ete_date_from: string
		ete_date_to: string
		ete_start: string
		ete_end: string
		ete_mercredi_matin_start?: string | null
		ete_mercredi_matin_end?: string | null
		ete_dimanche_start?: string | null
		ete_dimanche_end?: string | null
	}
	horaires_hiver: {
		noel_date_from: string
		noel_date_to: string
		fevrier_date_from: string
		fevrier_date_to: string
		hiver_start: string
		hiver_end: string
		hiver_mercredi_matin_start?: string | null
		hiver_mercredi_matin_end?: string | null
		hiver_dimanche_start?: string | null
		hiver_dimanche_end?: string | null
	}
	closed_dates?:
		| {
				date: string
				id?: string | null
		  }[]
		| null
	updatedAt?: string | null
	createdAt?: string | null
}
