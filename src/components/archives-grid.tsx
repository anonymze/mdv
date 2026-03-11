import { find, type PayloadResponse } from '@/api/payload'
import { MyImage } from '@/components/my-image'
import { Input } from '@/components/ui/input'
import { SelectWrapper } from '@/components/select-wrapper'
import { SmartPagination } from '@/components/smart-pagination'
import { stripTextAlign } from '@/utils/helper'
import { useEffect, useState, useRef } from 'react'

export type ArchiveDoc = {
	id: string
	type?: string
	title: string
	description?: any
	synopsis?: any
	date_start: string
	thumbnail?: { url?: string; alt?: string; blurhash?: string } | null
	images?: { image?: { url?: string; alt?: string; blurhash?: string } | null }[] | null
}


const EMPTY_DATA: PayloadResponse<ArchiveDoc> = {
	docs: [],
	totalDocs: 0,
	limit: 8,
	totalPages: 1,
	page: 1,
	pagingCounter: 1,
	hasPrevPage: false,
	hasNextPage: false,
	prevPage: null,
	nextPage: null
}

interface ArchivesGridProps {
	locale: string
	localePrefix: string
	limit: number
	payloadUrl: string
	initialData?: PayloadResponse<ArchiveDoc>
	translations: {
		PRECEDENT: string
		SUIVANT: string
		IMAGE_PLACEHOLDER: string
		EN_SAVOIR_PLUS: string
		MOTS_CLES: string
		ANNEE: string
		AUCUN_CONTENU: string
		TOUS: string
		collectionOptions: { key: string; value: string }[]
	}
}

export function ArchivesGrid({ locale, localePrefix, limit, payloadUrl, initialData, translations }: ArchivesGridProps) {
	const [collection, setCollection] = useState('art_vivant')
	const [year, setYear] = useState('')
	const [keyword, setKeyword] = useState('')
	const [debouncedKeyword, setDebouncedKeyword] = useState('')
	const [data, setData] = useState<PayloadResponse<ArchiveDoc>>(initialData ?? EMPTY_DATA)
	const [loading, setLoading] = useState(!initialData)
	const [page, setPage] = useState(1)
	const gridRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedKeyword(keyword), 300)
		return () => clearTimeout(timer)
	}, [keyword])

	useEffect(() => {
		setPage(1)
	}, [collection, year, debouncedKeyword])

	useEffect(() => {
		if (page === 1 && !year && !debouncedKeyword && collection === 'art_vivant' && initialData) {
			setData(initialData)
			setLoading(false)
			return
		}
const fetchData = async () => {
			setLoading(true)
			const twoWeeksAgo = new Date()
			twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
			const where: any = {
				archive: { equals: true },
				date_start: { less_than: twoWeeksAgo.toISOString() }
			}

			if (debouncedKeyword) {
				where.title = { contains: debouncedKeyword }
			}

			if (year) {
				where.date_start = {
					greater_than_equal: `${year}-01-01T00:00:00.000Z`,
					less_than_equal: `${year}-12-31T23:59:59.999Z`
				}
			}

			try {
				const result = await find<ArchiveDoc>(collection, { limit, page, locale, upcomingOnly: false, where })
				setData(result)
			} catch (e) {
				console.error('[Archives] fetch error:', e)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [collection, year, debouncedKeyword, page, locale, limit])

	const getLink = (item: ArchiveDoc) => `${localePrefix}/archives/evenement/${item.id}`

	const getImage = (item: ArchiveDoc) => item.thumbnail ?? item.images?.[0]?.image ?? null

	const getDescText = (item: ArchiveDoc) => {
		const richText = item.description ?? item.synopsis
		return (
			richText?.root?.children
				?.flatMap((p: any) => p.children ?? [])
				?.filter((c: any) => c.type === 'text')
				?.map((c: any) => c.text)
				?.join(' ') ?? ''
		)
	}

	const formatDate = (dateStr: string) =>
		new Date(dateStr).toLocaleDateString(locale, { dateStyle: 'full' })

	const handlePageChange = (newPage: number) => {
		if (newPage < 1 || newPage > data.totalPages) return
		setPage(newPage)
		const el = gridRef.current
		if (el) {
			const y = el.getBoundingClientRect().top + window.scrollY - 32
			window.scrollTo({ top: y, behavior: 'auto' })
		}
	}

	const generateYearOptions = () => {
		const years = []
		for (let y = 2025; y >= 2017; y--) {
			years.push({ key: y.toString(), value: y.toString() })
		}
		return years
	}

	return (
		<>
			<div className="bg-primary mt-6 lg:mt-12 px-5 lg:px-10 py-6 lg:py-8 space-y-4 lg:space-y-6">
				<div className="relative w-full">
					<Input
						placeholder={translations.MOTS_CLES}
						className="w-full bg-primary-foreground border-0 rounded-none min-h-12 pr-10"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
					{keyword && (
						<button
							onClick={() => setKeyword('')}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							type="button"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</svg>
						</button>
					)}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 *:min-h-12">
					<SelectWrapper
						placeholder={translations.TOUS}
						options={translations.collectionOptions}
						className="w-full"
						value={collection}
						onValueChange={setCollection}
					/>
					<SelectWrapper
						placeholder={translations.ANNEE}
						options={[
							{ key: translations.TOUS, value: 'all' },
							...generateYearOptions()
						]}
						className="w-full"
						value={year}
						onValueChange={(v) => setYear(v === 'all' ? '' : v)}
					/>
				</div>
			</div>

			<div ref={gridRef} className="my-8 lg:my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-start gap-x-4 gap-y-8 *:max-w-80 min-h-104">
				{loading ? (
					<div className="col-span-full flex w-full items-center justify-center min-h-[300px]">
						<div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
					</div>
				) : data.docs.length === 0 ? (
					<div className="col-span-full flex w-full items-center justify-center min-h-[300px]">
						<p className="text-lg text-gray-400">{translations.AUCUN_CONTENU}</p>
					</div>
				) : (
					data.docs.map((item) => {
						const descText = getDescText(item)
						return (
							<article
								key={item.id}
								className="group relative col-span-1 w-full overflow-hidden bg-white shadow-sm"
							>
								<div className="overflow-hidden">
									<MyImage
										src={getImage(item)?.url}
										payloadUrl={payloadUrl}
										alt={getImage(item)?.alt ?? translations.IMAGE_PLACEHOLDER}
										width={275}
										height={305}
										className="h-[305px] w-full object-cover"
										loading="lazy"
										layout="fullWidth"
										background={getImage(item)?.blurhash}
									/>
								</div>
								<figure className="p-4 transition-opacity duration-250 group-hover:opacity-0">
									<figcaption>
										<h3 className="pb-3 text-black">
											<a href={getLink(item)} className="after:absolute after:inset-0 after:z-10">
												{item.title}
											</a>
										</h3>
										<time className="distinguished text-sm capitalize" dateTime={item.date_start}>
											{formatDate(item.date_start)}
										</time>
									</figcaption>
								</figure>
								<div className="bg-primary/80 pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-250 group-hover:opacity-100" />
								<figure className="pointer-events-none absolute inset-0 p-5 opacity-0 transition-opacity duration-250 group-hover:opacity-100">
									<figcaption className="text-white">
										<div className="line-clamp-8 text-sm" dangerouslySetInnerHTML={{ __html: stripTextAlign(descText) }} />
										<p className="inline-flex items-center gap-2 pt-10 text-sm font-semibold underline underline-offset-2">
											{translations.EN_SAVOIR_PLUS}
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

			<SmartPagination page={page} totalPages={data.totalPages} anchor="archives" onPageChange={handlePageChange} labelPrev={translations.PRECEDENT} labelNext={translations.SUIVANT} />
		</>
	)
}
