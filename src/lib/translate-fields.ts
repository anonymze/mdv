import type { createTranslator } from '@/i18n/translations'

type Translator = ReturnType<typeof createTranslator>
type TranslationKey = Parameters<Translator>[0]

const PUBLIC_FIELD_MAP: Record<string, TranslationKey> = {
	'children': 'PUBLIC_ENFANTS',
	'all_public': 'PUBLIC_TOUT_PUBLIC',
	'all_public_avertissment': 'PUBLIC_TOUT_PUBLIC_AVERTISSEMENT',
	'forbidden_12': 'PUBLIC_INTERDIT_12',
	'forbidden_16': 'PUBLIC_INTERDIT_16',
	'forbidden_18': 'PUBLIC_INTERDIT_18'
}

const LUDO_DURATION_MAP: Record<string, TranslationKey> = {
	'5': 'LUDO_DURATION_5',
	'10': 'LUDO_DURATION_10',
	'15': 'LUDO_DURATION_15',
	'30': 'LUDO_DURATION_30',
	'1h': 'LUDO_DURATION_1H',
	'1h+': 'LUDO_DURATION_1H_PLUS'
}

export function translatePublicField(value: string | undefined | null, t: Translator): string {
	if (!value) return ''

	const key = PUBLIC_FIELD_MAP[value]
	if (!key) return value

	return t(key)
}

export function translateLudoDuration(value: string | undefined | null, t: Translator): string {
	if (!value) return ''

	const key = LUDO_DURATION_MAP[value]
	if (!key) return value

	return t(key)
}

