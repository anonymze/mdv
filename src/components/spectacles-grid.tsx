import { find, type PayloadResponse } from '@/api/payload'
import { MyImage } from '@/components/my-image'
import { Input } from '@/components/ui/input'
import { SelectWrapper } from '@/components/select-wrapper'
import { SmartPagination } from '@/components/smart-pagination'
import type { ArtVivant } from '@/types/art-vivant'
import { useEffect, useState, useRef } from 'react'
import type { ParcNational } from '@/types/parc-national'

type CollectionType = ArtVivant | ParcNational;
interface SpectaclesGridProps {
	initialData: PayloadResponse<CollectionType>
	locale: string
	localePrefix: string
	limit: number
	payloadUrl: string
	collection: string
	showFilters?: boolean
	filterType?: 'basic' | 'archives'
	mobileScrollOnly?: boolean
	translations: {
		PRECEDENT: string
		SUIVANT: string
		IMAGE_PLACEHOLDER: string
		EN_SAVOIR_PLUS: string
		MOTS_CLES?: string
		GENRE?: string
		DATE?: string
		ANNEE?: string
		AUCUN_CONTENU?: string
		TOUS?: string
		genreOptions?: { key: string; value: string }[]
		dateOptions?: { key: string; value: string }[]
	}
}


export function SpectaclesGrid({
	initialData,
	locale,
	localePrefix,
	limit,
	payloadUrl,
	collection,
	showFilters = false,
	filterType = 'basic',
	mobileScrollOnly = false,
	translations
}: SpectaclesGridProps) {
	const [data, setData] = useState<PayloadResponse<CollectionType>>(initialData)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const gridRef = useRef<HTMLDivElement>(null)

	// Filter states
	const [searchKeyword, setSearchKeyword] = useState('')
	const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState('')
	const [selectedGenre, setSelectedGenre] = useState('')
	const [selectedDate, setSelectedDate] = useState('')
	const [selectedYear, setSelectedYear] = useState('')

	// Debounce search keyword (300ms)
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchKeyword(searchKeyword)
		}, 300)

		return () => clearTimeout(timer)
	}, [searchKeyword])

	useEffect(() => {
		const hasFilters = debouncedSearchKeyword || selectedGenre || selectedDate || selectedYear

		// Use initial data only on page 1 with no filters
		if (page === 1 && !hasFilters) {
			setData(initialData)
			return
		}

		const fetchData = async () => {
			setLoading(true)

			// Build where clause
			const where: any = {
				type: { equals: 'evenement' }
			}

			// Keyword search (title only, case-insensitive contains)
			if (debouncedSearchKeyword) {
				where.title = { contains: debouncedSearchKeyword }
			}

			// Genre filter (case-insensitive contains)
			if (selectedGenre && selectedGenre !== 'all') {
				where.genre = { contains: selectedGenre }
			}


			// Date filter - all filters show events FROM date onwards (no end limit)
			if (selectedDate && selectedDate !== 'all') {
				const now = new Date()
				let startDate: Date

				switch (selectedDate) {
					case 'semaine_prochaine':
						// All events starting from next week onwards
						const nextWeek = new Date(now)
						const daysUntilNextMonday = (8 - now.getDay()) % 7 || 7
						nextWeek.setDate(now.getDate() + daysUntilNextMonday)
						startDate = nextWeek
						break
					case 'mois_prochain':
						// All events starting from next month onwards
						startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
						break
					case '6_mois':
						// All events starting from +6 months onwards
						startDate = new Date(now)
						startDate.setMonth(now.getMonth() + 6)
						break
					case '1_an':
						// All events starting from +1 year onwards
						startDate = new Date(now)
						startDate.setFullYear(now.getFullYear() + 1)
						break
					default:
						startDate = now
				}

				// Override upcomingOnly with custom start date
				where.date_start_min = startDate.toISOString()
			}

			// Year filter (for archives)
			if (selectedYear) {
				const yearStart = new Date(`${selectedYear}-01-01T00:00:00Z`)
				const yearEnd = new Date(`${selectedYear}-12-31T23:59:59Z`)
				where.date_start = {
					greater_than_equal: yearStart.toISOString(),
					less_than_equal: yearEnd.toISOString()
				}
			}

			try {
				const result = await find<ArtVivant>(collection, {
					limit,
					page,
					locale,
					where
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
				setLoading(false)
			}
		}

		fetchData()
	}, [page, locale, limit, initialData, debouncedSearchKeyword, selectedGenre, selectedDate, selectedYear])

	// Reset to page 1 when filters change
	useEffect(() => {
		setPage(1)
	}, [debouncedSearchKeyword, selectedGenre, selectedDate, selectedYear])


	const getLink = (id: string) => {
		const base = collection === 'parc_national' ? '/parc-national/evenement' : '/art-vivant/spectacle'
		return `${localePrefix}${base}/${id}`
	}

	const getDescText = (item: CollectionType) => {
		return item.description.root.children
			.flatMap((para) => para.children)
			.filter((child) => child.type === 'text')
			.map((child) => child.text)
			.join(' ')
	}

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString(locale, { dateStyle: 'full', timeZone: 'Europe/Paris' })
	}

	const formatTime = (dateStr: string) => {
		return new Date(dateStr).toLocaleTimeString(locale, {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			timeZone: 'Europe/Paris'
		})
	}

	const handlePageChange = (newPage: number) => {
		if (newPage < 1 || newPage > data.totalPages) return
		setPage(newPage)
		if (!mobileScrollOnly || window.innerWidth < 1024) {
			const el = gridRef.current
			if (el) {
				const y = el.getBoundingClientRect().top + window.scrollY - 32
				window.scrollTo({ top: y, behavior: 'auto' })
			}
		}
	}

	const generateYearOptions = () => {
		const currentYear = new Date().getFullYear()
		const years = []
		for (let year = currentYear; year >= 2019; year--) {
			years.push({ key: year.toString(), value: year.toString() })
		}
		return years
	}

	return (
		<>
			{showFilters && (
				<div className="bg-primary mt-6 lg:mt-12 px-5 lg:px-10 py-6 lg:py-8 space-y-4 lg:space-y-6">
					{/* Row 1: Keywords full width */}
					<div className="relative w-full">
						<Input
							placeholder={translations.MOTS_CLES}
							className="w-full bg-primary-foreground border-0 rounded-none min-h-12 pr-10"
							value={searchKeyword}
							onChange={(e) => setSearchKeyword(e.target.value)}
						/>
						{searchKeyword && (
							<button
								onClick={() => setSearchKeyword('')}
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

					{/* Row 2: 3 filters in same row on desktop, stacked on mobile */}
					<div className={`grid grid-cols-1 ${filterType === 'archives' ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-4 lg:gap-6 *:min-h-12`}>
						<SelectWrapper
							placeholder={translations.GENRE || 'Genre'}
							options={[
								{ key: translations.TOUS || 'Tous', value: 'all' },
								...(translations.genreOptions || [])
							]}
							className="w-full"
							value={selectedGenre}
							onValueChange={setSelectedGenre}
						/>
						<SelectWrapper
							placeholder={translations.DATE || 'Date'}
							options={[
								{ key: translations.TOUS || 'Tous', value: 'all' },
								...(translations.dateOptions || [])
							]}
							className="w-full"
							value={selectedDate}
							onValueChange={setSelectedDate}
						/>
						{filterType === 'archives' && (
							<SelectWrapper
								placeholder={translations.ANNEE || 'Année'}
								options={generateYearOptions()}
								className="w-full"
								value={selectedYear}
								onValueChange={setSelectedYear}
							/>
						)}
					</div>
				</div>
			)}

			<div ref={gridRef} className="my-8 lg:my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-x-4 gap-y-8 *:max-w-80 min-h-104">
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
								className="group relative col-span-1 w-full overflow-hidden bg-white shadow-sm"
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
										<h3 className="pb-3 text-black truncate">
											<a href={getLink(item.id)} className="after:absolute after:inset-0 after:z-10">
												{item.title}
											</a>
										</h3>
										<p className="distinguished text-primary pb-1 text-xs truncate">{item.genre}</p>
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

			<SmartPagination page={page} totalPages={data.totalPages} anchor="spectacles" onPageChange={handlePageChange} labelPrev={translations.PRECEDENT} labelNext={translations.SUIVANT} />
		</>
	)
}
