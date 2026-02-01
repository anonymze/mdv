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

const LUDO_PLAYERS_MAP: Record<string, string> = {
	'1': 'LUDO_PLAYERS_1',
	'1-2': 'LUDO_PLAYERS_1_2',
	'1-4': 'LUDO_PLAYERS_1_4',
	'1-8': 'LUDO_PLAYERS_1_8',
	'4+': 'LUDO_PLAYERS_4_PLUS'
}

const LUDO_DURATION_MAP: Record<string, string> = {
	'15': 'LUDO_DURATION_15',
	'30': 'LUDO_DURATION_30',
	'1h': 'LUDO_DURATION_1H',
	'1h+': 'LUDO_DURATION_1H_PLUS'
}

const LUDO_PUBLIC_MAP: Record<string, string> = {
	'-3': 'LUDO_PUBLIC_MINUS_3',
	'3+': 'LUDO_PUBLIC_3_PLUS',
	'12+': 'LUDO_PUBLIC_12_PLUS',
	'16+': 'LUDO_PUBLIC_16_PLUS',
	'18+': 'LUDO_PUBLIC_18_PLUS'
}

export function translatePublicField(value: string | undefined | null, t: Translator): string {
	if (!value) return ''

	const key = PUBLIC_FIELD_MAP[value]
	if (!key) return value

	// @ts-ignore
	return t(key as keyof ReturnType<Translator>)
}

export function translateLudoPlayers(value: string | undefined | null, t: Translator): string {
	if (!value) return ''

	const key = LUDO_PLAYERS_MAP[value]
	if (!key) return value

	// @ts-ignore
	return t(key as keyof ReturnType<Translator>)
}

export function translateLudoDuration(value: string | undefined | null, t: Translator): string {
	if (!value) return ''

	const key = LUDO_DURATION_MAP[value]
	if (!key) return value

	// @ts-ignore
	return t(key as keyof ReturnType<Translator>)
}

export function translateLudoPublic(value: string | undefined | null, t: Translator): string {
	if (!value) return ''

	const key = LUDO_PUBLIC_MAP[value]
	if (!key) return value

	// @ts-ignore
	return t(key as keyof ReturnType<Translator>)
}
