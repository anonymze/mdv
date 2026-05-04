type Variant = 'default' | 'light'

interface SmartPaginationProps {
	page: number
	totalPages: number
	anchor: string
	onPageChange: (page: number) => void
	labelPrev: string
	labelNext: string
	variant?: Variant
}

const MAX_DOTS = 6

const VARIANTS: Record<Variant, { active: string; inactive: string }> = {
	default: { active: 'bg-foreground', inactive: 'bg-primary/40 hover:bg-primary/70' },
	light: { active: 'bg-background', inactive: 'bg-background/40 hover:bg-background/70' }
}

export function SmartPagination({ page, totalPages, anchor, onPageChange, variant = 'default' }: SmartPaginationProps) {
	if (totalPages < 2) return null

	const dotsCount = Math.min(totalPages, MAX_DOTS)
	const { active, inactive } = VARIANTS[variant]

	return (
		<nav className="flex items-center justify-center gap-3" aria-label="Pagination">
			{Array.from({ length: dotsCount }, (_, i) => {
				const targetPage = i + 1
				const isActive = targetPage === page
				return (
					<a
						key={targetPage}
						href={`#${anchor}`}
						onClick={(e) => {
							e.preventDefault()
							onPageChange(targetPage)
						}}
						aria-label={`Page ${targetPage}`}
						aria-current={isActive ? 'page' : undefined}
						className={`size-2.5 rounded-full transition-colors ${isActive ? active : inactive}`}
					/>
				)
			})}
		</nav>
	)
}
