import { find, type PayloadResponse } from '@/api/payload'
import { MyImage } from '@/components/my-image'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import type { ParcNational } from '@/types/parc-national'
import { useEffect, useState, useRef } from 'react'

interface ArticleGridProps {
	initialData: PayloadResponse<ParcNational>
	locale: string
	limit: number
	payloadUrl: string
	translations: {
		PRECEDENT: string
		SUIVANT: string
		IMAGE_PLACEHOLDER: string
		AUCUN_CONTENU?: string
	}
}

export function ArticleGrid({
	initialData,
	locale,
	limit,
	payloadUrl,
	translations
}: ArticleGridProps) {
	const [data, setData] = useState<PayloadResponse<ParcNational>>(initialData)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const gridRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (page === 1) {
			setData(initialData)
			return
		}

		const fetchData = async () => {
			setLoading(true)

			try {
				const result = await find<ParcNational>('parc_national', {
					limit,
					page,
					locale,
					upcomingOnly: false,
					where: {
						type: { equals: 'article' }
					}
				})
				setData(result)
			} catch (error) {
				console.error('[Articles] FETCH ERROR:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [page, locale, limit, initialData])

	const getDescText = (item: ParcNational) => {
		return item.description.root.children
			.flatMap((para) => para.children)
			.filter((child) => child.type === 'text')
			.map((child) => child.text)
			.join(' ')
	}

	const handlePageChange = (newPage: number) => {
		if (newPage < 1 || newPage > data.totalPages) return
		setPage(newPage)
		if (window.innerWidth < 1024) {
			gridRef.current?.scrollIntoView({ behavior: 'auto' })
		}
	}

	const renderPageNumbers = () => {
		const pages = []
		for (let i = 1; i <= data.totalPages; i++) {
			pages.push(
				<PaginationItem key={i}>
					<PaginationLink
						href="#articles"
						isActive={i === page}
						onClick={(e) => {
							e.preventDefault()
							handlePageChange(i)
						}}
					>
						{i}
					</PaginationLink>
				</PaginationItem>
			)
		}
		return pages
	}

	return (
		<>
			<div ref={gridRef} className="my-8 lg:my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-x-4 gap-y-8 *:max-w-92 min-h-92">
				{loading ? (
					<div className="col-span-full flex w-full items-center justify-center">
						<div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
					</div>
				) : data.docs.length === 0 ? (
					<div className="col-span-full flex w-full items-center justify-center">
						<p className="text-lg text-gray-400">{translations.AUCUN_CONTENU}</p>
					</div>
				) : (
					data.docs.map((item) => {
						const descText = getDescText(item)
						return (
							<article
								key={item.id}
								className="col-span-1 w-full bg-white"
							>
								<div className="overflow-hidden">
									<MyImage
										src={item.thumbnail?.url}
										payloadUrl={payloadUrl}
										alt={item.thumbnail?.alt ?? translations.IMAGE_PLACEHOLDER}
										width={365}
										height={265}
										className="w-full h-[265px] object-cover"
										background={item.thumbnail?.blurhash}
									/>
								</div>
								<figure className="p-4">
									<figcaption>
										<h3 className="pb-1 text-black">{item.title}</h3>
										<div className="flex items-center gap-4 pt-3">
											<p className="line-clamp-3 text-xs">{descText}</p>
											<p className="text-secondary text-lg">9€</p>
										</div>
									</figcaption>
								</figure>
							</article>
						)
					})
				)}
			</div>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href="#articles"
							onClick={(e) => {
								e.preventDefault()
								handlePageChange(page - 1)
							}}
							className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
						/>
					</PaginationItem>
					{renderPageNumbers()}
					<PaginationItem>
						<PaginationNext
							href="#articles"
							onClick={(e) => {
								e.preventDefault()
								handlePageChange(page + 1)
							}}
							className={page === data.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</>
	)
}
