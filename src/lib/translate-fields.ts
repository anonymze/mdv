import type { createTranslator } from '@/i18n/translations'

type Translator = ReturnType<typeof createTranslator>

const PUBLIC_FIELD_MAP: Record<string, string> = {
	'children': 'PUBLIC_ENFANTS',
	'all_public': 'PUBLIC_TOUT_PUBLIC',
	'all_public_avertissment': 'PUBLIC_TOUT_PUBLIC_AVERTISSEMENT',
	'forbidden_12': 'PUBLIC_INTERDIT_12',
	'forbidden_16': 'PUBLIC_INTERDIT_16',
	'forbidden_18': 'PUBLIC_INTERDIT_18'
}

export function translatePublicField(value: string | undefined | null, t: Translator): string {
	if (!value) return ''

	const key = PUBLIC_FIELD_MAP[value]
	if (!key) return value

	return t(key as keyof ReturnType<Translator>)
}
