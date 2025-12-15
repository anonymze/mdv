import * as React from 'react'
import { SideCard } from './side-card'

export function HoursSideCard() {
	return (
		<SideCard tabText={['HORAIRES', "D'OUVERTURE"]} ariaLabel="Panneau des horaires d'ouverture">
			<h2 className="text-xl font-bold mb-3 pb-2 border-b border-black">Horaires d'ouverture</h2>

			<p className="text-base mb-4">
				<time dateTime="2024-12-02">Mardi 02 Décembre</time>
			</p>

			<div itemScope itemType="https://schema.org/OpeningHoursSpecification">
				<meta itemProp="dayOfWeek" content="Tuesday" />
				<meta itemProp="opens" content="14:00" />
				<meta itemProp="closes" content="19:00" />
				<p className="text-4xl font-bold" aria-label="Ouvert de 14 heures à 19 heures">
					<time dateTime="14:00">14h</time> - <time dateTime="19:00">19h</time>
				</p>
			</div>
		</SideCard>
	)
}
