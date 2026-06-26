import type { RichTextField } from '@/types/rich-text'

/**
 * Default MDV address
 */
export const MDV_DEFAULT_ADDRESS = '24 Place Saint-Clément, 65120 Luz-Saint-Sauveur'
export const MDV_PARKING_DEFAULT_ADDRESS = 'Place du 8 Mai, 65120 Luz-Saint-Sauveur'
export const PARKING_DEFAULT_ADDRESS = 'Place du 8 Mai, 65120 Luz-Saint-Sauveur'
export const TELEPHONE_DEFAULT = '05 62 92 38 38'

/**
 * @description a text replacer which return a string with %s replaced by your values in order
 */
export const sprintf = (str: string, ...args: string[]) => {
	const placeholderCount = (str.match(/%s/g) || []).length;

	if (placeholderCount !== args.length) {
		console.warn(
			`sprintf: Expected ${placeholderCount} arguments but got ${args.length}. ` +
			`String: "${str.substring(0, 50)}${str.length > 50 ? '...' : ''}"`
		);
	}

	return args.reduce((acc, curr) => acc.replace(/%s/, curr), str)
}


// tags come from admin as free text, separators vary (";" or ",")
export const splitTags = (tags: string) =>
	tags
		.split(/[;,]/)
		.map((tag) => tag.trim())
		.filter(Boolean)

export const stripTextAlign = (html: string) =>
	html.replace(/text-align\s*:\s*[^;}"]+;?/g, '')

const portfolioUrlPattern = /https?:\/\/[^\s<>"']+/g
export const getPortfolioSegments = (value?: string | null) => {
	if (!value) return []

	const segments: { text: string; href?: string }[] = []
	let lastIndex = 0

	for (const match of value.matchAll(portfolioUrlPattern)) {
		const href = match[0]
		const index = match.index

		if (index === undefined) continue
		if (index > lastIndex) segments.push({ text: value.slice(lastIndex, index) })

		segments.push({
			text: href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
			href
		})
		lastIndex = index + href.length
	}

	if (lastIndex < value.length) segments.push({ text: value.slice(lastIndex) })

	return segments.length > 0 ? segments : [{ text: value }]
}

export function renderRichText(richText: RichTextField, blockSeparator = ' '): string {
	const blocks = richText.root.children.map((paragraph) => {
		const text = paragraph.children
			.map((node) => {
				if (node.type === 'text') {
					let content = node.text
					// format is a bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline
					if (node.format) {
						if (node.format & 1) content = `<strong>${content}</strong>`
						if (node.format & 2) content = `<em>${content}</em>`
						if (node.format & 8) content = `<u>${content}</u>`
						if (node.format & 4) content = `<s>${content}</s>`
					}
					return content
				}
				if (node.type === 'linebreak') return '<br>'
				return ''
			})
			.join('')

		// Add <br> before paragraph if indented
		return paragraph.indent > 0 ? `<br>${text}` : text
	})

	// default ' ' keeps existing behavior; pass a block separator to preserve paragraph breaks
	if (blockSeparator === ' ') return blocks.join(' ')
	return blocks.filter((text) => text.length > 0).join(blockSeparator)
}
