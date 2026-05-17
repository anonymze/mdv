import HeaderArtVivant from '@/assets/imgs/header/art.webp'
import HeaderArtiste from '@/assets/imgs/header/artiste.webp'
import HeaderCinema from '@/assets/imgs/header/cinema.webp'
import HeaderExposition from '@/assets/imgs/header/exposition.webp'
import HeaderInformationsGenerales from '@/assets/imgs/header/info2.webp'
import HeaderInformationsPratiques from '@/assets/imgs/header/info1.webp'
import HeaderJeunePublic from '@/assets/imgs/header/jeunesse.webp'
import HeaderMediatheque from '@/assets/imgs/header/books.webp'
import type { createTranslator } from '@/i18n/translations'
import type { MenuNav } from '@/types/menu'

type Translator = ReturnType<typeof createTranslator>

export const getMenuNavs = (t: Translator): MenuNav[] => [
	{
		label: t('ESPACES_ARTISTIQUES'),
		subMenus: [
			{
				label: t('ART_VIVANT'),
				link: '/art-vivant',
				image: HeaderArtVivant.src,
				imageBg: 'bg-secondary-muted',
				subMenus: [
					{ label: t('SPECTACLES'), link: '/art-vivant#spectacles' },
					{ label: t('SORTIES_DE_RESIDENCE'), link: '/art-vivant#residence' }
				]
			},
			{
				label: t('CINEMA'),
				link: '/cinema',
				image: HeaderCinema.src,
				imageBg: 'bg-secondary',
				subMenus: [
					{ label: t('SEANCES'), link: '/cinema#cinema' },
					{ label: t('RDV_CINE'), link: '/cinema#rdv-cinema' },
					{ label: t('CINEMA_SCOLAIRE_TITRE'), link: '/cinema#cinema-scolaire' }
				]
			},
			{
				label: t('MEDIATHEQUE'),
				link: '/mediatheque',
				image: HeaderMediatheque.src,
				imageBg: 'bg-white',
				subMenus: [
					{ label: t('BIBLIOTHEQUE'), link: '/mediatheque#mediatheque' },
					{ label: t('LUDOTHEQUE'), link: '/mediatheque#ludotheque' },
					{ label: t('CYBER_BASE'), link: '/mediatheque#cyberbase' },
					{ label: t('AUTRES_MEDIAS'), link: '/mediatheque#autres-medias' }
				]
			},
			{
				label: t('EXPOSITION'),
				link: '/exposition',
				image: HeaderExposition.src,
				imageBg: 'bg-secondary-muted',
				subMenus: [
					{
						label: t('EXPOSITION_DU_MOMENT'),
						link: '/exposition#exposition'
					},
					{ label: t('EVENEMENTS'), link: '/exposition#evenements' }
				]
			},
			{
				label: t('JEUNESSE'),
				link: '/jeune-public',
				image: HeaderJeunePublic.src,
				imageBg: 'bg-secondary',
				subMenus: [
					{ label: t('SPECTACLES'), link: '/jeune-public#spectacles' },
					{ label: t('SEANCES'), link: '/jeune-public#cinema' },
					{ label: t('LUDOTHEQUE'), link: '/jeune-public#ludotheque' }
				]
			},
			{
				label: t('ARTISTE'),
				link: '/artiste',
				image: HeaderArtiste.src,
				imageBg: 'bg-white',
				subMenus: [
					{ label: t('RESIDENCE'), link: '/artiste#residence' },
					{
						label: t('SPECIFICATIONS_TECHNIQUES'),
						link: '/artiste#informations'
					}
				]
			}
		]
	},
	{
		label: t('AUTRES_ACTUALITES'),
		link: '/autres-actualites'
	},
	{
		label: t('INFORMATIONS'),
		link: '/informations',
		subMenus: [
			{
				label: t('INFORMATIONS_PRATIQUES'),
				link: '/informations',
				image: HeaderInformationsPratiques.src,
				imageBg: 'bg-secondary-muted',
				subMenus: [
					{ label: t('HORAIRES'), link: '/informations#horaires' },
					{ label: t('TARIFICATIONS'), link: '/informations#tarifs' },
					{ label: t('OU_NOUS_TROUVER'), link: '/informations#horaires' }
				]
			},
			{
				label: t('INFORMATIONS_GENERALES'),
				link: '/informations',
				image: HeaderInformationsGenerales.src,
				imageBg: 'bg-secondary',
				subMenus: [
					{ label: t('L_EQUIPE'), link: '/informations#equipe' },
					{ label: t('NOS_ENGAGEMENTS'), link: '/informations#engagements' },
					{ label: t('NOS_PARTENAIRES'), link: '/informations#partenaires' }
				]
			}
		]
	},
	{
		label: t('PARC_NATIONAL'),
		link: '/parc-national'
	},
	{
		label: t('ARCHIVES'),
		link: '/archives'
	}
]
