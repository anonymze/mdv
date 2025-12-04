import { sprintf } from '@/utils/helper'
import langs from './langs'

// this is our source of truth for the i18n languages
export enum I18n {
	DEFAULT = 'fr',
	EN = 'en',
	ES = 'es',
	FR = 'fr'
}

const i18n: Record<I18n, (str: keyof typeof langs.fr, ...args: string[]) => string> = {
	en: (str, ...args) => sprintf(langs.en[str], ...args),
	es: (str, ...args) => sprintf(langs.es[str], ...args),
	fr: (str, ...args) => sprintf(langs.fr[str], ...args)
}

const createTranslator = (locale: I18n) =>
	(key: keyof typeof langs.fr, ...args: string[]) => i18n[locale](key, ...args);

export { i18n, createTranslator }
