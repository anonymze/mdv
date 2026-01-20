import { createTranslator, I18n } from '@/i18n/translations'
import { SideCard } from './side-card'

interface HoursSideCardProps {
	locale: I18n
}

export function HoursSideCard({ locale }: HoursSideCardProps) {
	const t = createTranslator(locale)

	return (
		<SideCard tabText={[t('HORAIRES'), t('D_OUVERTURE')]} ariaLabel={t('PANNEAU_HORAIRES_OUVERTURE')}>
			<p className="text-xl font-bold mb-3 pb-2 border-b border-primary-foreground text-primary-foreground">{t('HORAIRES_OUVERTURE')}</p>

			<p className="text-base mb-4 text-primary-foreground">
				<time dateTime="2024-12-02">Mardi 02 Décembre</time>
			</p>

			<div itemScope itemType="https://schema.org/OpeningHoursSpecification">
				<meta itemProp="dayOfWeek" content="Tuesday" />
				<meta itemProp="opens" content="14:00" />
				<meta itemProp="closes" content="19:00" />
				<p className="text-4xl font-bold text-primary-foreground" aria-label={t('OUVERT_HEURES_ARIA')}>
					<time dateTime="14:00">14h</time> - <time dateTime="19:00">19h</time>
				</p>
			</div>
		</SideCard>
	)
}
