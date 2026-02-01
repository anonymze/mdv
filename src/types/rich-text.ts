export type RichTextNode =
	| {
			type: 'text'
			text: string
			mode?: string
			style?: string
			detail?: number
			format?: number
			version: number
	  }
	| {
			type: 'linebreak'
			version: number
	  }

export type ParagraphNode = {
	type: 'paragraph'
	format: string
	indent: number
	version: number
	children: RichTextNode[]
	direction?: ('ltr' | 'rtl') | null
	textStyle?: string
	textFormat?: number
}

export type RichTextField = {
	root: {
		type: string
		children: ParagraphNode[]
		direction: ('ltr' | 'rtl') | null
		format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
		indent: number
		version: number
		textStyle?: string
		textFormat?: number
	}
	[k: string]: unknown
}
