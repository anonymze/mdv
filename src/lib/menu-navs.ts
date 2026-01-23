import type { MenuNav } from '@/types/menu'
import type { createTranslator } from '@/i18n/translations'
import img1 from '@/assets/imgs/1.jpg'
import img2 from '@/assets/imgs/2.jpg'
import img3 from '@/assets/imgs/3.jpg'
import img4 from '@/assets/imgs/4.jpg'

type Translator = ReturnType<typeof createTranslator>

const images = [img1.src, img2.src, img3.src, img4.src]
const randomImg = () => images[Math.floor(Math.random() * images.length)]

export const getMenuNavs = (t: Translator): MenuNav[] => [
	{
		label: t('ESPACES_ARTISTIQUES'),
		subMenus: [
			{
				label: t('ART_VIVANT'),
				link: 'art-vivant',
				image: randomImg(),
				subMenus: [
					{ label: t('SPECTACLES'), link: 'art-vivant/spectacles', imageReplacement: randomImg() },
					{ label: t('SEANCES'), link: 'art-vivant/seances', imageReplacement: randomImg() },
					{ label: t('EVENEMENTS'), link: 'art-vivant/evenements', imageReplacement: randomImg() }
				]
			},
			{
				label: t('CINEMA'),
				link: 'cinema',
				image: randomImg(),
				subMenus: [{ label: t('RDV_CINE'), link: 'cinema/rdv-cine', imageReplacement: randomImg() }]
			},
			{
				label: t('MEDIATHEQUE'),
				link: 'mediatheque',
				image: randomImg(),
				subMenus: [
					{ label: t('BIBLIOTHEQUE'), link: 'mediatheque/bibliotheque', imageReplacement: randomImg() },
					{ label: t('LUDOBHEQUE'), link: 'mediatheque/ludotheque', imageReplacement: randomImg() },
					{ label: t('CYBER_BASE'), link: 'mediatheque/cyber-base', imageReplacement: randomImg() },
					{ label: t('AUTRES_MEDIAS'), link: 'mediatheque/autres-medias', imageReplacement: randomImg() }
				]
			},
			{
				label: t('EXPOSITION'),
				link: 'exposition',
				image: randomImg(),
				subMenus: [
					{
						label: t('EXPOSITION_DU_MOMENT'),
						link: 'exposition/du-moment',
						imageReplacement: randomImg()
					},
					{ label: t('EVENEMENTS'), link: 'exposition/evenements', imageReplacement: randomImg() }
				]
			},
			{
				label: t('JEUNESSE'),
				link: 'jeunesse',
				image: randomImg(),
				subMenus: [
					{ label: t('SPECTACLES'), link: 'jeunesse/spectacles', imageReplacement: randomImg() },
					{ label: t('SEANCES'), link: 'jeunesse/seances', imageReplacement: randomImg() },
					{ label: t('EVENEMENTS'), link: 'jeunesse/evenements', imageReplacement: randomImg() }
				]
			},
			{
				label: t('ARTISTE'),
				link: 'artiste',
				image: randomImg(),
				subMenus: [
					{ label: t('RESIDENCE'), link: 'artiste/residence', imageReplacement: randomImg() },
					{
						label: t('INFORMATIONS_TECHNIQUES'),
						link: 'artiste/informations-techniques',
						imageReplacement: randomImg()
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
				image: randomImg(),
				subMenus: [
					{ label: t('PRESENTATION'), link: 'art-vivant/spectacles', imageReplacement: randomImg() },
					{ label: t('EVENEMENTS'), link: 'art-vivant/seances', imageReplacement: randomImg() },
					{ label: t('BOUTIQUE'), link: 'art-vivant/evenements', imageReplacement: randomImg() }
				]
			},
			{
				label: t('ACTUALITES'),
				link: 'cinema',
				image: randomImg(),
				subMenus: [{ label: t('AGENDA'), link: 'cinema/rdv-cine', imageReplacement: randomImg() }]
			},
			{
				label: t('INFORMATIONS_PRATIQUES'),
				link: 'mediatheque',
				image: randomImg(),
				subMenus: [
					{ label: t('HORAIRES'), link: 'mediatheque/bibliotheque', imageReplacement: randomImg() },
					{ label: t('TARIFICATIONS'), link: 'mediatheque/ludotheque', imageReplacement: randomImg() },
					{ label: t('OU_NOUS_TROUVER'), link: 'mediatheque/cyber-base', imageReplacement: randomImg() }
				]
			},
			{
				label: t('INFORMATIONS_GENERALES'),
				link: 'exposition',
				image: randomImg(),
				subMenus: [
					{ label: t('A_PROPOS'), link: 'exposition/du-moment', imageReplacement: randomImg() },
					{ label: t('L_EQUIPE'), link: 'exposition/evenements', imageReplacement: randomImg() },
					{ label: t('NOS_ENGAGEMENTS'), link: 'exposition/evenements', imageReplacement: randomImg() },
					{ label: t('NOS_PARTENAIRES'), link: 'exposition/evenements', imageReplacement: randomImg() }
				]
			},
			{
				label: t('ARCHIVES'),
				link: 'jeunesse',
				image: randomImg(),
				subMenus: [
					{ label: t('ANNEE_2025'), link: 'jeunesse/spectacles', imageReplacement: randomImg() },
					{ label: t('ANNEE_2024'), link: 'jeunesse/seances', imageReplacement: randomImg() },
					{ label: t('ANNEE_2025'), link: 'jeunesse/evenements', imageReplacement: randomImg() }
				]
			},
			{
				label: t('ARTISTE'),
				link: 'artiste',
				image: randomImg(),
				subMenus: [
					{ label: t('RESIDENCE'), link: 'artiste/residence', imageReplacement: randomImg() },
					{
						label: t('INFORMATIONS_TECHNIQUES'),
						link: 'artiste/informations-techniques',
						imageReplacement: randomImg()
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
				image: randomImg(),
				subMenus: [
					{ label: t('PRESENTATION'), link: 'art-vivant/spectacles', imageReplacement: randomImg() },
					{ label: t('EVENEMENTS'), link: 'art-vivant/seances', imageReplacement: randomImg() },
					{ label: t('BOUTIQUE'), link: 'art-vivant/evenements', imageReplacement: randomImg() }
				]
			},
			{
				label: t('ACTUALITES'),
				link: 'cinema',
				image: randomImg(),
				subMenus: [{ label: t('AGENDA'), link: 'cinema/rdv-cine', imageReplacement: randomImg() }]
			},
			{
				label: t('INFORMATIONS_PRATIQUES'),
				link: 'mediatheque',
				image: randomImg(),
				subMenus: [
					{ label: t('HORAIRES'), link: 'mediatheque/bibliotheque', imageReplacement: randomImg() },
					{ label: t('TARIFICATIONS'), link: 'mediatheque/ludotheque', imageReplacement: randomImg() },
					{ label: t('OU_NOUS_TROUVER'), link: 'mediatheque/cyber-base', imageReplacement: randomImg() }
				]
			},
			{
				label: t('INFORMATIONS_GENERALES'),
				link: 'exposition',
				image: randomImg(),
				subMenus: [
					{ label: t('A_PROPOS'), link: 'exposition/du-moment', imageReplacement: randomImg() },
					{ label: t('L_EQUIPE'), link: 'exposition/evenements', imageReplacement: randomImg() },
					{ label: t('NOS_ENGAGEMENTS'), link: 'exposition/evenements', imageReplacement: randomImg() },
					{ label: t('NOS_PARTENAIRES'), link: 'exposition/evenements', imageReplacement: randomImg() }
				]
			},
			{
				label: t('ARCHIVES'),
				link: 'jeunesse',
				image: randomImg(),
				subMenus: [
					{ label: t('ANNEE_2025'), link: 'jeunesse/spectacles', imageReplacement: randomImg() },
					{ label: t('ANNEE_2024'), link: 'jeunesse/seances', imageReplacement: randomImg() },
					{ label: t('ANNEE_2025'), link: 'jeunesse/evenements', imageReplacement: randomImg() }
				]
			},
			{
				label: t('ARTISTE'),
				link: 'artiste',
				image: randomImg(),
				subMenus: [
					{ label: t('RESIDENCE'), link: 'artiste/residence', imageReplacement: randomImg() },
					{
						label: t('INFORMATIONS_TECHNIQUES'),
						link: 'artiste/informations-techniques',
						imageReplacement: randomImg()
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
