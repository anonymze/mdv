import PersonImg from '@/assets/imgs/exemple-person.png'
import type { createTranslator } from '@/i18n/translations'
import type { MenuNav } from '@/types/menu'

type Translator = ReturnType<typeof createTranslator>

export const getMenuNavs = (t: Translator): MenuNav[] => [
	{
		label: t('ESPACES_ARTISTIQUES'),
		subMenus: [
			{
				label: t('ART_VIVANT'),
				link: 'art-vivant',
				image: PersonImg.src,
				subMenus: [
					{ label: t('SPECTACLES'), link: 'art-vivant/spectacles', imageReplacement: PersonImg.src },
					{ label: t('SEANCES'), link: 'art-vivant/seances', imageReplacement: PersonImg.src },
					{ label: t('EVENEMENTS'), link: 'art-vivant/evenements', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('CINEMA'),
				link: 'cinema',
				image: PersonImg.src,
				subMenus: [{ label: t('RDV_CINE'), link: 'cinema/rdv-cine', imageReplacement: PersonImg.src }]
			},
			{
				label: t('MEDIATHEQUE'),
				link: 'mediatheque',
				image: PersonImg.src,
				subMenus: [
					{ label: t('BIBLIOTHEQUE'), link: 'mediatheque/bibliotheque', imageReplacement: PersonImg.src },
					{ label: t('LUDOBHEQUE'), link: 'mediatheque/ludotheque', imageReplacement: PersonImg.src },
					{ label: t('CYBER_BASE'), link: 'mediatheque/cyber-base', imageReplacement: PersonImg.src },
					{ label: t('AUTRES_MEDIAS'), link: 'mediatheque/autres-medias', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('EXPOSITION'),
				link: 'exposition',
				image: PersonImg.src,
				subMenus: [
					{
						label: t('EXPOSITION_DU_MOMENT'),
						link: 'exposition/du-moment',
						imageReplacement: PersonImg.src
					},
					{ label: t('EVENEMENTS'), link: 'exposition/evenements', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('JEUNESSE'),
				link: 'jeunesse',
				image: PersonImg.src,
				subMenus: [
					{ label: t('SPECTACLES'), link: 'jeunesse/spectacles', imageReplacement: PersonImg.src },
					{ label: t('SEANCES'), link: 'jeunesse/seances', imageReplacement: PersonImg.src },
					{ label: t('EVENEMENTS'), link: 'jeunesse/evenements', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('ARTISTE'),
				link: 'artiste',
				image: PersonImg.src,
				subMenus: [
					{ label: t('RESIDENCE'), link: 'artiste/residence', imageReplacement: PersonImg.src },
					{
						label: t('INFORMATIONS_TECHNIQUES'),
						link: 'artiste/informations-techniques',
						imageReplacement: PersonImg.src
					}
				]
			}
		]
	},
	{
		label: t('PARC_NATIONAL'),
		subMenus: [
			{
				label: t('PARC_NATIONAL'),
				link: 'art-vivant',
				image: PersonImg.src,
				subMenus: [
					{ label: t('PRESENTATION'), link: 'art-vivant/spectacles', imageReplacement: PersonImg.src },
					{ label: t('EVENEMENTS'), link: 'art-vivant/seances', imageReplacement: PersonImg.src },
					{ label: t('BOUTIQUE'), link: 'art-vivant/evenements', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('ACTUALITES'),
				link: 'cinema',
				image: PersonImg.src,
				subMenus: [{ label: t('AGENDA'), link: 'cinema/rdv-cine', imageReplacement: PersonImg.src }]
			},
			{
				label: t('INFORMATIONS_PRATIQUES'),
				link: 'mediatheque',
				image: PersonImg.src,
				subMenus: [
					{ label: t('HORAIRES'), link: 'mediatheque/bibliotheque', imageReplacement: PersonImg.src },
					{ label: t('TARIFICATIONS'), link: 'mediatheque/ludotheque', imageReplacement: PersonImg.src },
					{ label: t('OU_NOUS_TROUVER'), link: 'mediatheque/cyber-base', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('INFORMATIONS_GENERALES'),
				link: 'exposition',
				image: PersonImg.src,
				subMenus: [
					{ label: t('A_PROPOS'), link: 'exposition/du-moment', imageReplacement: PersonImg.src },
					{ label: t('L_EQUIPE'), link: 'exposition/evenements', imageReplacement: PersonImg.src },
					{ label: t('NOS_ENGAGEMENTS'), link: 'exposition/evenements', imageReplacement: PersonImg.src },
					{ label: t('NOS_PARTENAIRES'), link: 'exposition/evenements', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('ARCHIVES'),
				link: 'jeunesse',
				image: PersonImg.src,
				subMenus: [
					{ label: t('ANNEE_2025'), link: 'jeunesse/spectacles', imageReplacement: PersonImg.src },
					{ label: t('ANNEE_2024'), link: 'jeunesse/seances', imageReplacement: PersonImg.src },
					{ label: t('ANNEE_2025'), link: 'jeunesse/evenements', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('ARTISTE'),
				link: 'artiste',
				image: PersonImg.src,
				subMenus: [
					{ label: t('RESIDENCE'), link: 'artiste/residence', imageReplacement: PersonImg.src },
					{
						label: t('INFORMATIONS_TECHNIQUES'),
						link: 'artiste/informations-techniques',
						imageReplacement: PersonImg.src
					}
				]
			}
		]
	},
	{
		label: t('ACTUALITES'),
		link: 'actualites'
	},
	{
		label: t('INFORMATIONS'),
		link: 'informations',
		subMenus: [
			{
				label: t('PARC_NATIONAL'),
				link: 'art-vivant',
				image: PersonImg.src,
				subMenus: [
					{ label: t('PRESENTATION'), link: 'art-vivant/spectacles', imageReplacement: PersonImg.src },
					{ label: t('EVENEMENTS'), link: 'art-vivant/seances', imageReplacement: PersonImg.src },
					{ label: t('BOUTIQUE'), link: 'art-vivant/evenements', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('ACTUALITES'),
				link: 'cinema',
				image: PersonImg.src,
				subMenus: [{ label: t('AGENDA'), link: 'cinema/rdv-cine', imageReplacement: PersonImg.src }]
			},
			{
				label: t('INFORMATIONS_PRATIQUES'),
				link: 'mediatheque',
				image: PersonImg.src,
				subMenus: [
					{ label: t('HORAIRES'), link: 'mediatheque/bibliotheque', imageReplacement: PersonImg.src },
					{ label: t('TARIFICATIONS'), link: 'mediatheque/ludotheque', imageReplacement: PersonImg.src },
					{ label: t('OU_NOUS_TROUVER'), link: 'mediatheque/cyber-base', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('INFORMATIONS_GENERALES'),
				link: 'exposition',
				image: PersonImg.src,
				subMenus: [
					{ label: t('A_PROPOS'), link: 'exposition/du-moment', imageReplacement: PersonImg.src },
					{ label: t('L_EQUIPE'), link: 'exposition/evenements', imageReplacement: PersonImg.src },
					{ label: t('NOS_ENGAGEMENTS'), link: 'exposition/evenements', imageReplacement: PersonImg.src },
					{ label: t('NOS_PARTENAIRES'), link: 'exposition/evenements', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('ARCHIVES'),
				link: 'jeunesse',
				image: PersonImg.src,
				subMenus: [
					{ label: t('ANNEE_2025'), link: 'jeunesse/spectacles', imageReplacement: PersonImg.src },
					{ label: t('ANNEE_2024'), link: 'jeunesse/seances', imageReplacement: PersonImg.src },
					{ label: t('ANNEE_2025'), link: 'jeunesse/evenements', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('ARTISTE'),
				link: 'artiste',
				image: PersonImg.src,
				subMenus: [
					{ label: t('RESIDENCE'), link: 'artiste/residence', imageReplacement: PersonImg.src },
					{
						label: t('INFORMATIONS_TECHNIQUES'),
						link: 'artiste/informations-techniques',
						imageReplacement: PersonImg.src
					}
				]
			}
		]
	},
	{
		label: t('ARCHIVES'),
		link: 'archives'
	}
]
