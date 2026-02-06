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
					{ label: t('SPECTACLES'), link: 'art-vivant#spectacles', imageReplacement: PersonImg.src },
					{ label: t('RESIDENCE'), link: 'art-vivant#residence', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('CINEMA'),
				link: 'cinema',
				image: PersonImg.src,
				subMenus: [
					{ label: t('SEANCES'), link: 'cinema#cinema', imageReplacement: PersonImg.src },
					{ label: t('RDV_CINE'), link: 'cinema#rdv-cinema', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('MEDIATHEQUE'),
				link: 'mediatheque',
				image: PersonImg.src,
				subMenus: [
					{ label: t('BIBLIOTHEQUE'), link: 'mediatheque#mediatheque', imageReplacement: PersonImg.src },
					{ label: t('LUDOTHEQUE'), link: 'mediatheque#ludotheque', imageReplacement: PersonImg.src },
					{ label: t('CYBER_BASE'), link: 'mediatheque#cyberbase', imageReplacement: PersonImg.src },
					{ label: t('AUTRES_MEDIAS'), link: 'mediatheque#autres-medias', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('EXPOSITION'),
				link: 'exposition',
				image: PersonImg.src,
				subMenus: [
					{
						label: t('EXPOSITION_DU_MOMENT'),
						link: 'exposition#exposition',
						imageReplacement: PersonImg.src
					},
					{ label: t('EVENEMENTS'), link: 'exposition#evenements', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('JEUNESSE'),
				link: 'jeune-public',
				image: PersonImg.src,
				subMenus: [
					{ label: t('SPECTACLES'), link: 'jeune-public#spectacles', imageReplacement: PersonImg.src },
					{ label: t('SEANCES'), link: 'jeune-public#cinema', imageReplacement: PersonImg.src },
					{ label: t('LUDOTHEQUE'), link: 'jeune-public#ludotheque', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('ARTISTE'),
				link: 'artiste',
				image: PersonImg.src,
				subMenus: [
					{ label: t('RESIDENCE'), link: 'artiste#residence', imageReplacement: PersonImg.src },
					{
						label: t('INFORMATIONS_TECHNIQUES'),
						link: 'artiste#informations',
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
				link: 'parc-national',
				image: PersonImg.src,
				subMenus: [
					{ label: t('PRESENTATION'), link: 'parc-national#description', imageReplacement: PersonImg.src },
					{ label: t('EVENEMENTS'), link: 'parc-national#evenements', imageReplacement: PersonImg.src },
					{ label: t('BOUTIQUE'), link: 'parc-national#articles', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('CINEMA'),
				link: 'cinema',
				image: PersonImg.src,
				subMenus: [
					{ label: t('SEANCES'), link: 'cinema#cinema', imageReplacement: PersonImg.src },
					{ label: t('RDV_CINE'), link: 'cinema#rdv-cinema', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('INFORMATIONS_PRATIQUES'),
				link: 'informations',
				image: PersonImg.src,
				subMenus: [
					{ label: t('HORAIRES'), link: 'informations#horaires', imageReplacement: PersonImg.src },
					{ label: t('TARIFICATIONS'), link: 'informations#tarifs', imageReplacement: PersonImg.src },
					{ label: t('OU_NOUS_TROUVER'), link: 'informations#horaires', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('INFORMATIONS_GENERALES'),
				link: 'informations',
				image: PersonImg.src,
				subMenus: [
					{ label: t('L_EQUIPE'), link: 'informations#equipe', imageReplacement: PersonImg.src },
					{ label: t('NOS_ENGAGEMENTS'), link: 'informations#engagements', imageReplacement: PersonImg.src },
					{ label: t('NOS_PARTENAIRES'), link: 'informations#partenaires', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('ARCHIVES'),
				link: 'archives',
				image: PersonImg.src,
				subMenus: [
					{ label: t('ANNEE_2025'), link: 'archives', imageReplacement: PersonImg.src },
					{ label: t('ANNEE_2024'), link: 'archives', imageReplacement: PersonImg.src },
					{ label: t('ANNEE_2025'), link: 'archives', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('ARTISTE'),
				link: 'artiste',
				image: PersonImg.src,
				subMenus: [
					{ label: t('RESIDENCE'), link: 'artiste#residence', imageReplacement: PersonImg.src },
					{
						label: t('INFORMATIONS_TECHNIQUES'),
						link: 'artiste#informations',
						imageReplacement: PersonImg.src
					}
				]
			}
		]
	},
	{
		label: t('INFORMATIONS'),
		link: 'informations',
		subMenus: [
			{
				label: t('ACCUEIL_TITLE'),
				link: '/',
				image: PersonImg.src,
				subMenus: [{ label: t('MAISON_DU_PARC'), link: '/', imageReplacement: PersonImg.src }]
			},
			{
				label: t('JEUNESSE'),
				link: 'jeune-public',
				image: PersonImg.src,
				subMenus: [
					{ label: t('SPECTACLES'), link: 'jeune-public', imageReplacement: PersonImg.src },
					{ label: t('SEANCES'), link: 'jeune-public', imageReplacement: PersonImg.src },
					{ label: t('LUDOTHEQUE'), link: 'jeune-public', imageReplacement: PersonImg.src }
				]
			},
			{
				label: t('PARC_NATIONAL'),
				link: 'art-vivant',
				image: PersonImg.src,
				subMenus: [{ label: t('PRESENTATION'), link: 'parc-national#description', imageReplacement: PersonImg.src }]
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
		label: 'Autres actualites',
		link: '/autres-actualites'
	},
	{
		label: t('ARCHIVES'),
		link: 'archives'
	}
]
