import { Image } from '@unpic/react'
import PlaceholderImg from '@/assets/imgs/placeholder.webp'

interface MyImageProps {
	src?: string | null
	alt: string
	payloadUrl: string
	width?: number
	height?: number
	loading?: 'lazy' | 'eager'
	layout?: 'fullWidth' | 'constrained' | 'fixed'
	background?: string | null
	className?: string
	priority?: boolean
}

export function MyImage({
	src,
	alt,
	payloadUrl,
	background,
	width,
	height,
	loading = 'lazy',
	layout = 'fullWidth',
	className,
	priority
}: MyImageProps) {
	// Handle src: prepend PAYLOAD_URL if string, fallback to placeholder if null
	const imageSrc = src ? `${payloadUrl}${src}` : PlaceholderImg.src

	// For fullWidth layout, don't pass width/height to avoid type conflicts
	if (layout === 'fullWidth') {
		return (
			<Image
				src={imageSrc}
				alt={alt}
				layout="fullWidth"
				loading={loading}
				background={background ?? undefined}
				className={className}
				priority={priority}
			/>
		)
	}

	// For constrained/fixed layouts, width and height are required
	return (
		<Image
			src={imageSrc}
			alt={alt}
			width={width!}
			height={height!}
			loading={loading}
			layout={layout}
			background={background ?? undefined}
			className={className}
			priority={priority}
		/>
	)
}
