import type { RichTextField } from '@/types/rich-text'

/**
 * Default MDV address
 */
export const MDV_DEFAULT_ADDRESS = 'Maison de la vallée, 24 Place Saint-Clément, 65120 Luz-Saint-Sauveur'
export const PARKING_DEFAULT_ADDRESS = 'Place du 8 Mai, 65120 Luz-Saint-Sauveur '

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


export function renderRichText(richText: RichTextField): string {
	return richText.root.children
		.map((paragraph) => {
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
		.join(' ')
}
