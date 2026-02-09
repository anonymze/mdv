import { find, type PayloadResponse } from '@/api/payload'
import { MyImage } from '@/components/my-image'
import { Input } from '@/components/ui/input'
import { SelectWrapper } from '@/components/select-wrapper'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import type { ArtVivant } from '@/types/art-vivant'
import { useEffect, useState } from 'react'

interface SpectaclesGridProps {
	initialData: PayloadResponse<ArtVivant>
	locale: string
	limit: number
	payloadUrl: string
	showFilters?: boolean
	translations: {
		PRECEDENT: string
		SUIVANT: string
		IMAGE_PLACEHOLDER: string
		EN_SAVOIR_PLUS: string
		MOTS_CLES?: string
		HORAIRES?: string
		TYPE_PUBLIC?: string
		PRIX?: string
		LIEU?: string
	}
}

const CARD_HEIGHT = 417

export function SpectaclesGrid({
	initialData,
	locale,
	limit,
	payloadUrl,
	showFilters = false,
	translations
}: SpectaclesGridProps) {
	const [data, setData] = useState<PayloadResponse<ArtVivant>>(initialData)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (page === 1) {
			console.log('[Spectacles] Using initial data for page 1')
			setData(initialData)
			return
		}

		const fetchData = async () => {
			setLoading(true)
			console.log('[Spectacles] Fetching page:', page, 'limit:', limit, 'locale:', locale)
			try {
				const result = await find<ArtVivant>('art_vivant', {
					limit,
					page,
					locale,
					where: {
						type: { equals: 'evenement' }
					}
				})
				console.log('[Spectacles] Received data:', {
					totalDocs: result.totalDocs,
					page: result.page,
					totalPages: result.totalPages,
					docs: result.docs.length,
					firstItemTitle: result.docs[0]?.title
				})
				setData(result)
			} catch (error) {
				console.error('[Spectacles] FETCH ERROR:', error)
				console.error('[Spectacles] Error details:', {
					message: error instanceof Error ? error.message : 'Unknown error',
					stack: error instanceof Error ? error.stack : undefined
				})
			} finally {
				console.log('[Spectacles] Fetch complete, loading:', false)
				setLoading(false)
			}
		}

		fetchData()
	}, [page, locale, limit, initialData])


	const getDescText = (item: ArtVivant) => {
		return item.description.root.children
			.flatMap((para: any) => para.children)
			.filter((child: any) => child.type === 'text')
			.map((child: any) => child.text)
			.join(' ')
	}

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString(locale, { dateStyle: 'full' })
	}

	const formatTime = (dateStr: string) => {
		return new Date(dateStr).toLocaleTimeString(locale, {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		})
	}

	const handlePageChange = (newPage: number) => {
		console.log('[Spectacles] handlePageChange called:', newPage, 'totalPages:', data.totalPages)
		if (newPage < 1 || newPage > data.totalPages) return
		setPage(newPage)
	}

	const renderPageNumbers = () => {
		const pages = []
		for (let i = 1; i <= data.totalPages; i++) {
			pages.push(
				<PaginationItem key={i}>
					<PaginationLink
						href="#spectacles"
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
			{showFilters && (
				<div className="bg-primary mt-12 grid grid-cols-8 grid-rows-2 gap-6 px-10 py-8 *:min-h-12">
					<Input placeholder={translations.MOTS_CLES} className="rows-span-1 col-span-6 bg-primary-foreground border-0 rounded-none" />
					<SelectWrapper
						placeholder={translations.HORAIRES}
						options={[{ key: 'fefef', value: 'fef' }]}
						className="col-span-2 w-full"
					/>
					<SelectWrapper
						placeholder={translations.TYPE_PUBLIC}
						options={[{ key: 'fefef', value: 'fef' }]}
						className="col-span-2 w-full"
					/>
					<SelectWrapper
						placeholder={translations.PRIX}
						options={[{ key: 'fefef', value: 'fef' }]}
						className="col-span-2 w-full"
					/>
					<SelectWrapper
						placeholder={translations.LIEU}
						options={[{ key: 'fefef', value: 'fef' }]}
						className="col-span-2 w-full"
					/>
				</div>
			)}

			<div
				className="my-16 grid grid-cols-4 place-items-center gap-x-4 gap-y-8 *:max-w-80"
				style={{ minHeight: `${CARD_HEIGHT}px` }}
			>
				{loading ? (
					<div className="col-span-4 flex h-full w-full items-center justify-center" style={{ height: CARD_HEIGHT }}>
						<div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
					</div>
				) : (
					data.docs.map((item) => {
						const descText = getDescText(item)
						return (
							<article
								key={item.id}
								className="group relative col-span-1 w-full overflow-hidden bg-white shadow-sm"
								style={{ height: CARD_HEIGHT }}
							>
								<div className="overflow-hidden">
									<MyImage
										src={item.thumbnail?.url}
									payloadUrl={payloadUrl}
										alt={item.thumbnail?.alt ?? translations.IMAGE_PLACEHOLDER}
										width={275}
										height={305}
										className="h-[305px] w-full object-cover"
										loading="lazy"
									layout="fullWidth"
									background={item.thumbnail?.blurhash}
									/>
								</div>
								<figure className="p-4 transition-opacity duration-250 group-hover:opacity-0">
									<figcaption>
										<h3 className="pb-3 text-black">
											<a href={`/art-vivant/spectacle/${item.id}`} className="after:absolute after:inset-0 after:z-10">
												{item.title}
											</a>
										</h3>
										<p className="distinguished text-primary pb-1 text-xs">{item.genre}</p>
										<time className="distinguished text-sm capitalize" dateTime={item.date_start}>
											{formatDate(item.date_start)} - {formatTime(item.date_start)}
										</time>
									</figcaption>
								</figure>
								<div className="bg-primary/80 pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-250 group-hover:opacity-100" />
								<figure className="pointer-events-none absolute inset-0 p-5 opacity-0 transition-opacity duration-250 group-hover:opacity-100">
									<figcaption className="text-white">
										<p className="line-clamp-8 text-sm">{descText}</p>
										<p className="inline-flex items-center gap-2 pt-10 text-sm font-semibold underline underline-offset-2">
											{translations.EN_SAVOIR_PLUS}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M5 12h14" />
												<path d="m12 5 7 7-7 7" />
											</svg>
										</p>
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
							href="#spectacles"
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
							href="#spectacles"
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
