import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from '@/components/ui/pagination'

interface SmartPaginationProps {
	page: number
	totalPages: number
	anchor: string
	onPageChange: (page: number) => void
	labelPrev: string
	labelNext: string
}

function getPageItems(page: number, totalPages: number): number[] {
	return [...new Set([1, page, totalPages])].sort((a, b) => a - b)
}

export function SmartPagination({ page, totalPages, anchor, onPageChange, labelPrev, labelNext }: SmartPaginationProps) {
	if (totalPages <= 1) return null

	const items = getPageItems(page, totalPages)

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationLink
						href={`#${anchor}`}
						size="default"
						onClick={(e) => { e.preventDefault(); onPageChange(page - 1) }}
						className={`gap-1 px-2.5 sm:pl-2.5 hover:bg-primary/20 ${page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
					>
						<ChevronLeftIcon className="size-4" />
						<span className="hidden sm:block">{labelPrev}</span>
					</PaginationLink>
				</PaginationItem>

				{items.map((item) => (
					<PaginationItem key={item}>
						<PaginationLink
							href={`#${anchor}`}
							isActive={item === page}
							onClick={(e) => { e.preventDefault(); onPageChange(item) }}
						>
							{item}
						</PaginationLink>
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationLink
						href={`#${anchor}`}
						size="default"
						onClick={(e) => { e.preventDefault(); onPageChange(page + 1) }}
						className={`gap-1 px-2.5 sm:pr-2.5 hover:bg-primary/20 ${page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
					>
						<span className="hidden sm:block">{labelNext}</span>
						<ChevronRightIcon className="size-4" />
					</PaginationLink>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
