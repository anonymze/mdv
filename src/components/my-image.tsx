import { Image } from '@unpic/react'
import PlaceholderImg from '@/assets/imgs/placeholder.webp'

const ALL_BREAKPOINTS = [100, 150, 200, 250, 400, 640, 750, 828, 850, 960, 1080, 1280, 1300, 1500, 1668, 1920, 2048, 2560, 3200, 3840, 4480, 5120, 6016]

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
				breakpoints={ALL_BREAKPOINTS}
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
			breakpoints={ALL_BREAKPOINTS}
		/>
	)
}
