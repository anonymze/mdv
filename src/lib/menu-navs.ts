import HeaderArtVivant from '@/assets/imgs/header/header-art-vivant.webp'
import HeaderJeunePublic from '@/assets/imgs/header/header-jeune-public.webp'
import HeaderParcNational from '@/assets/imgs/header/header-parc-national.webp'
import HeaderArtiste from '@/assets/imgs/header/header-artiste.webp'
import HeaderCinema from '@/assets/imgs/header/header-cinema.webp'
import HeaderExposition from '@/assets/imgs/header/header-exposition.webp'
import HeaderMediatheque from '@/assets/imgs/header/header-mediatheque.webp'
import HeaderInformationsGenerales from '@/assets/imgs/header/header-informations-generales.webp'
import HeaderInformationsPratiques from '@/assets/imgs/header/header-informations-pratiques.webp'
import HeaderArchives from '@/assets/imgs/header/header-archives.webp'
import HeaderAccueil from '@/assets/imgs/espace-culture-nature.webp'
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
				image: HeaderArtVivant.src,
				subMenus: [
					{ label: t('SPECTACLES'), link: 'art-vivant#spectacles' },
					{ label: t('RESIDENCE'), link: 'art-vivant#residence' }
				]
			},
			{
				label: t('CINEMA'),
				link: 'cinema',
				image: HeaderCinema.src,
				subMenus: [
					{ label: t('SEANCES'), link: 'cinema#cinema' },
					{ label: t('RDV_CINE'), link: 'cinema#rdv-cinema' }
				]
			},
			{
				label: t('MEDIATHEQUE'),
				link: 'mediatheque',
				image: HeaderMediatheque.src,
				subMenus: [
					{ label: t('BIBLIOTHEQUE'), link: 'mediatheque#mediatheque' },
					{ label: t('LUDOTHEQUE'), link: 'mediatheque#ludotheque' },
					{ label: t('CYBER_BASE'), link: 'mediatheque#cyberbase' },
					{ label: t('AUTRES_MEDIAS'), link: 'mediatheque#autres-medias' }
				]
			},
			{
				label: t('EXPOSITION'),
				link: 'exposition',
				image: HeaderExposition.src,
				subMenus: [
					{
						label: t('EXPOSITION_DU_MOMENT'),
						link: 'exposition#exposition',
					},
					{ label: t('EVENEMENTS'), link: 'exposition#evenements' }
				]
			},
			{
				label: t('JEUNESSE'),
				link: 'jeune-public',
				image: HeaderJeunePublic.src,
				subMenus: [
					{ label: t('SPECTACLES'), link: 'jeune-public#spectacles' },
					{ label: t('SEANCES'), link: 'jeune-public#cinema' },
					{ label: t('LUDOTHEQUE'), link: 'jeune-public#ludotheque' }
				]
			},
			{
				label: t('ARTISTE'),
				link: 'artiste',
				image: HeaderArtiste.src,
				subMenus: [
					{ label: t('RESIDENCE'), link: 'artiste#residence' },
					{
						label: t('INFORMATIONS_TECHNIQUES'),
						link: 'artiste#informations'
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
				image: HeaderParcNational.src,
				subMenus: [
					{ label: t('PRESENTATION'), link: 'parc-national#description' },
					{ label: t('EVENEMENTS'), link: 'parc-national#evenements' },
					{ label: t('BOUTIQUE'), link: 'parc-national#articles' }
				]
			},
			{
				label: t('CINEMA'),
				link: 'cinema',
				image: HeaderCinema.src,
				subMenus: [
					{ label: t('SEANCES'), link: 'cinema#cinema' },
					{ label: t('RDV_CINE'), link: 'cinema#rdv-cinema' }
				]
			},
			{
				label: t('INFORMATIONS_PRATIQUES'),
				link: 'informations',
				image: HeaderInformationsPratiques.src,
				subMenus: [
					{ label: t('HORAIRES'), link: 'informations#horaires' },
					{ label: t('TARIFICATIONS'), link: 'informations#tarifs' },
					{ label: t('OU_NOUS_TROUVER'), link: 'informations#horaires' }
				]
			},
			{
				label: t('INFORMATIONS_GENERALES'),
				link: 'informations',
				image: HeaderInformationsGenerales.src,
				subMenus: [
					{ label: t('L_EQUIPE'), link: 'informations#equipe' },
					{ label: t('NOS_ENGAGEMENTS'), link: 'informations#engagements' },
					{ label: t('NOS_PARTENAIRES'), link: 'informations#partenaires' }
				]
			},
			{
				label: t('ARCHIVES'),
				link: 'archives',
				image: HeaderArchives.src,
				subMenus: [
					{ label: t('ARCHIVES'), link: 'archives' },
				]
			},
			{
				label: t('ARTISTE'),
				link: 'artiste',
				image: HeaderArtiste.src,
				subMenus: [
					{ label: t('RESIDENCE'), link: 'artiste#residence' },
					{
						label: t('INFORMATIONS_TECHNIQUES'),
						link: 'artiste#informations'
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
				label: t('ACCUEIL'),
				link: '/',
				image: HeaderAccueil.src,
				subMenus: [{ label: t('MAISON_DU_PARC'), link: '/' }]
			},
			{
				label: t('JEUNESSE'),
				link: 'jeune-public',
				image: HeaderJeunePublic.src,
				subMenus: [
					{ label: t('SPECTACLES'), link: 'jeune-public#spectacles' },
					{ label: t('SEANCES'), link: 'jeune-public#cinema' },
					{ label: t('LUDOTHEQUE'), link: 'jeune-public#ludotheque' }
				]
			},
			{
				label: t('PARC_NATIONAL'),
				link: 'parc-national',
				image: HeaderParcNational.src,
				subMenus: [{ label: t('PRESENTATION'), link: 'parc-national#description' }]
			},
			{
				label: t('INFORMATIONS_PRATIQUES'),
				link: 'informations',
				image: HeaderInformationsPratiques.src,
				subMenus: [
					{ label: t('HORAIRES'), link: 'informations#horaires' },
					{ label: t('TARIFICATIONS'), link: 'informations#tarifs' },
					{ label: t('OU_NOUS_TROUVER'), link: 'informations#horaires' }
				]
			},
			{
				label: t('INFORMATIONS_GENERALES'),
				link: 'informations',
				image: HeaderInformationsGenerales.src,
				subMenus: [
					{ label: t('L_EQUIPE'), link: 'informations#equipe' },
					{ label: t('NOS_ENGAGEMENTS'), link: 'informations#engagements' },
					{ label: t('NOS_PARTENAIRES'), link: 'informations#partenaires' }
				]
			},
			{
				label: t('ARTISTE'),
				link: 'artiste',
				image: HeaderArtiste.src,
				subMenus: [
					{ label: t('RESIDENCE'), link: 'artiste#residence' },
					{
						label: t('INFORMATIONS_TECHNIQUES'),
						link: 'artiste#informations'
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
