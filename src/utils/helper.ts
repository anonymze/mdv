import type { RichTextField } from '@/types/rich-text'

/**
 * Default MDV address
 */
export const MDV_DEFAULT_ADDRESS = 'Maison de la vallée, 24 Place Saint-Clément, 65120 Luz-Saint-Sauveur'

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
					if (node.type === 'text') return node.text
					if (node.type === 'linebreak') return '<br>'
					return ''
				})
				.join('')

			// Add <br> before paragraph if indented
			return paragraph.indent > 0 ? `<br>${text}` : text
		})
		.join(' ')
}
