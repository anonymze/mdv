import { find, type PayloadResponse } from '@/api/payload'
import { MyImage } from '@/components/my-image'
import { Input } from '@/components/ui/input'
import { SelectWrapper } from '@/components/select-wrapper'
import { SmartPagination } from '@/components/smart-pagination'
import type { Cinema } from '@/types/cinema'
import { useEffect, useState, useRef } from 'react'

interface CinemaGridProps {
	initialData: PayloadResponse<Cinema>
	locale: string
	localePrefix: string
	limit: number
	payloadUrl: string
	showFilters?: boolean
	mobileScrollOnly?: boolean
	translations: {
		PRECEDENT: string
		SUIVANT: string
		IMAGE_PLACEHOLDER: string
		EN_SAVOIR_PLUS: string
		MOTS_CLES?: string
		GENRE?: string
		TAGS?: string
		TAGS_FILTER?: string
		DATE?: string
		AUCUN_CONTENU?: string
		TOUS?: string
		LANGUE?: string
		publicLabels?: Record<string, string>
		genreOptions?: { key: string; value: string }[]
		dateOptions?: { key: string; value: string }[]
		langueOptions?: { key: string; value: string }[]
	}
}

export function CinemaGrid({
	initialData,
	locale,
	localePrefix,
	limit,
	payloadUrl,
	showFilters = false,
	mobileScrollOnly = false,
	translations
}: CinemaGridProps) {
	const [data, setData] = useState<PayloadResponse<Cinema>>(initialData)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const gridRef = useRef<HTMLDivElement>(null)

	// Filter states
	const [searchKeyword, setSearchKeyword] = useState('')
	const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState('')
	const [selectedGenre, setSelectedGenre] = useState('')
	const [selectedTags, setSelectedTags] = useState('')
	const [selectedDate, setSelectedDate] = useState('')
	const [selectedLanguage, setSelectedLanguage] = useState('')

	// Debounce search keyword (300ms)
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchKeyword(searchKeyword)
		}, 300)
		return () => clearTimeout(timer)
	}, [searchKeyword])

	useEffect(() => {
		const hasFilters = debouncedSearchKeyword || selectedGenre || selectedTags || selectedDate || selectedLanguage

		if (page === 1 && !hasFilters) {
			setData(initialData)
			return
		}

		const fetchData = async () => {
			setLoading(true)

			const where: any = {
				type: { equals: 'seance' }
			}

			if (debouncedSearchKeyword) {
				where.title = { contains: debouncedSearchKeyword }
			}

			if (selectedGenre && selectedGenre !== 'all') {
				where.genre = { contains: selectedGenre }
			}

			if (selectedTags && selectedTags !== 'all') {
				where.public = { equals: selectedTags }
			}

			if (selectedLanguage && selectedLanguage !== 'all') {
				where.languages = { contains: selectedLanguage }
			}

			if (selectedDate && selectedDate !== 'all') {
				const now = new Date()
				let startDate: Date

				switch (selectedDate) {
					case 'semaine_prochaine':
						const nextWeek = new Date(now)
						const daysUntilNextMonday = (8 - now.getDay()) % 7 || 7
						nextWeek.setDate(now.getDate() + daysUntilNextMonday)
						startDate = nextWeek
						break
					case 'mois_prochain':
						startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1)
						break
					case '6_mois':
						startDate = new Date(now)
						startDate.setMonth(now.getMonth() + 6)
						break
					case '1_an':
						startDate = new Date(now)
						startDate.setFullYear(now.getFullYear() + 1)
						break
					default:
						startDate = now
				}
				where.date_start_min = startDate.toISOString()
			}

			try {
				const result = await find<Cinema>('cinema', {
					limit,
					page,
					locale,
					where
				})
				setData(result)
			} catch (error) {
				console.error('[Cinema] FETCH ERROR:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [page, locale, limit, initialData, debouncedSearchKeyword, selectedGenre, selectedTags, selectedDate, selectedLanguage])

	useEffect(() => {
		setPage(1)
	}, [debouncedSearchKeyword, selectedGenre, selectedTags, selectedDate, selectedLanguage])

	const getSynopsisText = (item: Cinema) => {
		return item.synopsis.root.children
			.flatMap((para) => para.children)
			.filter((child) => child.type === 'text')
			.map((child) => child.text)
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

	const translatePublic = (value: string | null | undefined) => {
		if (!value) return ''
		return translations.publicLabels?.[value] || value
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



	return (
		<>
			{showFilters && (
				<div className="bg-primary mt-6 lg:mt-12 px-5 lg:px-10 py-6 lg:py-8 space-y-4 lg:space-y-6">
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

					<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 *:min-h-12">
						<SelectWrapper
							placeholder={translations.TAGS_FILTER || 'Public'}
							options={[
								{ key: translations.TOUS || 'Tous', value: 'all' },
								{ key: translations.publicLabels?.children || 'Enfants', value: 'children' },
								{ key: translations.publicLabels?.all_public || 'Tout public', value: 'all_public' },
								{ key: translations.publicLabels?.all_public_avertissment || 'Tout public avec avertissement', value: 'all_public_avertissment' },
								{ key: translations.publicLabels?.forbidden_12 || '-12 ans', value: 'forbidden_12' },
								{ key: translations.publicLabels?.forbidden_16 || '-16 ans', value: 'forbidden_16' },
								{ key: translations.publicLabels?.forbidden_18 || '-18 ans', value: 'forbidden_18' }
							]}
							className="w-full"
							value={selectedTags}
							onValueChange={setSelectedTags}
						/>
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
							placeholder={translations.LANGUE || 'Langue'}
							options={[
								{ key: translations.TOUS || 'Tous', value: 'all' },
								...(translations.langueOptions || [])
							]}
							className="w-full"
							value={selectedLanguage}
							onValueChange={setSelectedLanguage}
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
					</div>
				</div>
			)}

			<div ref={gridRef} className="my-8 lg:my-16 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-5">
				{loading ? (
					<div className="col-span-full flex w-full items-center justify-center min-h-[257px]">
						<div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
					</div>
				) : data.docs.length === 0 ? (
					<div className="col-span-full flex w-full items-center justify-center min-h-[257px]">
						<p className="text-lg text-gray-400">{translations.AUCUN_CONTENU}</p>
					</div>
				) : (
					data.docs.map((item) => {
						const synopsisText = getSynopsisText(item)
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
										width={900}
										height={145}
										className="w-full h-[145px] object-cover"
										background={item.thumbnail?.blurhash}
									/>
								</div>
								<figure className="p-4 transition-opacity duration-250 group-hover:opacity-0">
									<figcaption>
										<h3 className="pb-3 text-black">
											<a href={`${localePrefix}/cinema/seance/${item.id}`} className="after:absolute after:inset-0 after:z-10">
												{item.title}
											</a>
										</h3>
										<p className="distinguished text-primary pb-1 text-xs">
											{translatePublic(item.public)} - {item.genre} - {item.languages}
										</p>
										<time className="distinguished text-sm capitalize" dateTime={item.date_start}>
											{formatDate(item.date_start)} - {formatTime(item.date_start)}
										</time>
									</figcaption>
								</figure>
								<div className="bg-primary/80 pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-250 group-hover:opacity-100" />
								<figure className="pointer-events-none absolute inset-0 p-5 opacity-0 transition-opacity duration-250 group-hover:opacity-100">
									<figcaption className="text-white">
										<p className="line-clamp-6 text-sm">{synopsisText}</p>
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

			<SmartPagination page={page} totalPages={data.totalPages} anchor="cinema" onPageChange={handlePageChange} labelPrev={translations.PRECEDENT} labelNext={translations.SUIVANT} />
		</>
	)
}
