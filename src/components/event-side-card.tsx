import * as React from 'react'
import { SideCard } from './side-card'

export function EventSideCard() {
	return (
		<SideCard width="w-96" tabText={['ÉVÉNEMENT']} ariaLabel="Panneau d'événement">
			<h2 className="text-xl font-bold mb-3 pb-2 border-b border-black">Événement à venir</h2>

			<p className="text-base mb-2">
				<time dateTime="2024-12-20">Vendredi 20 Décembre</time>
			</p>

			<h3 className="text-2xl font-bold mb-2">Concert de Noël</h3>

			<p className="text-sm">Spectacle musical en famille avec l'orchestre symphonique des Pyrénées.</p>
		</SideCard>
	)
}
