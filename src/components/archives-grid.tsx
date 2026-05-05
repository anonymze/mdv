import { find, type PayloadResponse } from '@/api/payload'
import { MyImage } from '@/components/my-image'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SmartPagination } from '@/components/smart-pagination'
import { stripTextAlign } from '@/utils/helper'
import { useEffect, useState } from 'react'

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
		new Date(dateStr).toLocaleDateString(locale, { dateStyle: 'full', timeZone: 'Europe/Paris' })

	const handlePageChange = (newPage: number) => {
		if (newPage < 1 || newPage > data.totalPages) return
		setPage(newPage)
		const target = document.getElementById('archives-grid')
		target?.scrollIntoView({ behavior: 'smooth' })
		setTimeout(() => target?.scrollIntoView({ behavior: 'smooth' }), 600)
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
			<div className="bg-primary rounded-3xl mt-6 lg:mt-12 px-5 lg:px-8 py-5 lg:py-6 space-y-3 lg:space-y-4">
				<div className="relative w-full">
					<Input
						placeholder={translations.MOTS_CLES}
						className="w-full bg-foreground text-white border-0 rounded-md min-h-12 px-4 pr-10 placeholder:text-white/60"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
					{keyword && (
						<button
							onClick={() => setKeyword('')}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
							type="button"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</svg>
						</button>
					)}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 *:min-h-12">
					<Select value={collection} onValueChange={setCollection}>
						<SelectTrigger className="w-full border-0 bg-foreground text-white rounded-md hover:text-secondary focus-visible:ring-0 focus-visible:border-0 min-h-12">
							<SelectValue placeholder={translations.TOUS} />
						</SelectTrigger>
						<SelectContent>
							{translations.collectionOptions.map((option) => (
								<SelectItem key={option.value} value={option.value} className="py-3">
									{option.key}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select value={year} onValueChange={(v: string) => setYear(v === 'all' ? '' : v)}>
						<SelectTrigger className="w-full border-0 bg-foreground text-white rounded-md hover:text-secondary focus-visible:ring-0 focus-visible:border-0 min-h-12">
							<SelectValue placeholder={translations.ANNEE} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all" className="py-3">{translations.TOUS}</SelectItem>
							{generateYearOptions().map((option) => (
								<SelectItem key={option.value} value={option.value} className="py-3">
									{option.key}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div id="archives-grid" className="scroll-m-20 py-8 lg:py-16 grid grid-cols-[repeat(auto-fit,320px)] justify-center lg:justify-between content-start gap-x-4 gap-y-8 *:only:col-span-full min-h-104">
				{loading ? (
					<div className="col-span-full flex w-full !max-w-none items-center justify-center min-h-[300px]">
						<div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
					</div>
				) : data.docs.length === 0 ? (
					<div className="col-span-full flex w-full !max-w-none items-center justify-center min-h-[300px]">
						<p className="text-lg text-gray-400">{translations.AUCUN_CONTENU}</p>
					</div>
				) : (
					data.docs.map((item) => {
						const descText = getDescText(item)
						return (
							<article
								key={item.id}
								className="group shadow-card relative col-span-1 w-[320px] overflow-hidden rounded-2xl border border-black bg-white h-[400px]"
							>
								<MyImage
									src={getImage(item)?.url}
									payloadUrl={payloadUrl}
									alt={getImage(item)?.alt ?? translations.IMAGE_PLACEHOLDER}
									width={275}
									height={400}
									className="h-full w-full rounded-2xl object-cover"
									loading="lazy"
									layout="fullWidth"
									background={getImage(item)?.blurhash}
								/>
								<figure className="bg-background/90 absolute inset-x-0 bottom-0 h-[116px] overflow-hidden rounded-t-2xl p-4 transition-[height] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:h-full">
									<figcaption>
										<h3 className="line-clamp-1 mb-3 group-hover:line-clamp-2">
											<a href={getLink(item)} className="after:absolute after:inset-0 after:z-10">
												{item.title}
											</a>
										</h3>
										<time className="distinguished text-primary text-sm capitalize tabular-nums" dateTime={item.date_start}>
											{formatDate(item.date_start)}
										</time>
										<div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:grid-rows-[1fr]">
											<div className="overflow-hidden">
												{descText && <div className="!text-foreground line-clamp-8 pt-4 text-sm" dangerouslySetInnerHTML={{ __html: stripTextAlign(descText) }} />}
												<p className="!text-secondary-muted inline-flex items-center gap-2 pt-4 text-medium font-semibold transition-opacity opacity-0 duration-200 group-hover:opacity-100 group-hover:delay-200 pl-0.5">
													{translations.EN_SAVOIR_PLUS}
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
														<path d="M5 12h14" />
														<path d="m12 5 7 7-7 7" />
													</svg>
												</p>
											</div>
										</div>
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
