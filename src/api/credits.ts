import { findGlobal } from './payload'
import type { Credits, CreditsPage } from '@/types/credits'

export async function getCredits(): Promise<Credits> {
	return findGlobal<Credits>('credits')
}

export async function getCreditsForPage(page: CreditsPage): Promise<string | null> {
	const credits = await getCredits()
	return credits[page] ?? null
}
