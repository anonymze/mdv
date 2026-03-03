import { find, type PayloadResponse } from '@/api/payload'
import { MyImage } from '@/components/my-image'
import { Input } from '@/components/ui/input'
import { SelectWrapper } from '@/components/select-wrapper'
import { SmartPagination } from '@/components/smart-pagination'
import type { Mediatheque } from '@/types/mediatheque'
import { useEffect, useState, useRef } from 'react'

interface LudothequeGridProps {
	initialData: PayloadResponse<Mediatheque>
	locale: string
	localePrefix: string
	limit: number
	payloadUrl: string
	showFilters?: boolean
	translations: {
		PRECEDENT: string
		SUIVANT: string
		IMAGE_PLACEHOLDER: string
		EN_SAVOIR_PLUS: string
		MOTS_CLES?: string
		TEMPS_DE_JEU?: string
		NOMBRE_DE_JOUEURS?: string
		AGE?: string
		AUCUN_CONTENU?: string
		TOUS?: string
		durationOptions?: { key: string; value: string }[]
		playersOptions?: { key: string; value: string }[]
		publicOptions?: { key: string; value: string }[]
		durationLabels?: Record<string, string>
	}
}

export function LudothequeGrid({
	initialData,
	locale,
	localePrefix,
	limit,
	payloadUrl,
	showFilters = false,
	translations
}: LudothequeGridProps) {
	const [data, setData] = useState<PayloadResponse<Mediatheque>>(initialData)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const gridRef = useRef<HTMLDivElement>(null)

	// Filter states
	const [searchKeyword, setSearchKeyword] = useState('')
	const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState('')
	const [selectedDuration, setSelectedDuration] = useState('')
	const [selectedPlayers, setSelectedPlayers] = useState('')
	const [selectedPublic, setSelectedPublic] = useState('')

	// Debounce search keyword (300ms)
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchKeyword(searchKeyword)
		}, 300)
		return () => clearTimeout(timer)
	}, [searchKeyword])

	useEffect(() => {
		const hasFilters = debouncedSearchKeyword || selectedDuration || selectedPlayers || selectedPublic

		if (page === 1 && !hasFilters) {
			setData(initialData)
			return
		}

		const fetchData = async () => {
			setLoading(true)

			const where: any = {
				type: { equals: 'ludotheque' }
			}

			if (debouncedSearchKeyword) {
				where.title = { contains: debouncedSearchKeyword }
			}

			if (selectedDuration && selectedDuration !== 'all') {
				where.duration = { equals: selectedDuration }
			}

			if (selectedPlayers && selectedPlayers !== 'all') {
				where.players = { contains: selectedPlayers }
			}

			if (selectedPublic && selectedPublic !== 'all') {
				where.public = { contains: selectedPublic }
			}

			try {
				const result = await find<Mediatheque>('mediatheque', {
					limit,
					page,
					locale,
					upcomingOnly: false,
					where
				})
				setData(result)
			} catch (error) {
				console.error('[Ludotheque] FETCH ERROR:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [page, locale, limit, initialData, debouncedSearchKeyword, selectedDuration, selectedPlayers, selectedPublic])

	useEffect(() => {
		setPage(1)
	}, [debouncedSearchKeyword, selectedDuration, selectedPlayers, selectedPublic])

	const getDescriptionText = (item: Mediatheque) => {
		return item.description.root.children
			.flatMap((para) => para.children)
			.filter((child) => child.type === 'text')
			.map((child) => child.text)
			.join(' ')
	}

	const translateDuration = (value: string | null | undefined) => {
		if (!value) return ''
		return translations.durationLabels?.[value] || value
	}

	const handlePageChange = (newPage: number) => {
		if (newPage < 1 || newPage > data.totalPages) return
		setPage(newPage)
		const el = gridRef.current
		if (el) {
			const y = el.getBoundingClientRect().top + window.scrollY - 32
			window.scrollTo({ top: y, behavior: 'auto' })
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

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 *:min-h-12">
						<SelectWrapper
							placeholder={translations.TEMPS_DE_JEU || 'Temps de jeu'}
							options={[
								{ key: translations.TOUS || 'Tous', value: 'all' },
								...(translations.durationOptions || [])
							]}
							className="w-full"
							value={selectedDuration}
							onValueChange={setSelectedDuration}
						/>
						<SelectWrapper
							placeholder={translations.NOMBRE_DE_JOUEURS || 'Nombre de joueurs'}
							options={[
								{ key: translations.TOUS || 'Tous', value: 'all' },
								...(translations.playersOptions || [])
							]}
							className="w-full"
							value={selectedPlayers}
							onValueChange={setSelectedPlayers}
						/>
						<SelectWrapper
							placeholder={translations.AGE || 'Âge'}
							options={[
								{ key: translations.TOUS || 'Tous', value: 'all' },
								...(translations.publicOptions || [])
							]}
							className="w-full"
							value={selectedPublic}
							onValueChange={setSelectedPublic}
						/>
					</div>
				</div>
			)}

			<div ref={gridRef} className="my-8 lg:my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-x-4 gap-y-8 *:max-w-92">
				{loading ? (
					<div className="col-span-full flex w-full items-center justify-center min-h-[270px]">
						<div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
					</div>
				) : data.docs.length === 0 ? (
					<div className="col-span-full flex w-full items-center justify-center min-h-[270px]">
						<p className="text-lg text-gray-400">{translations.AUCUN_CONTENU}</p>
					</div>
				) : (
					data.docs.map((item) => {
						const descText = getDescriptionText(item)
						return (
							<article
								key={item.id}
								className="group relative col-span-1 w-full overflow-hidden bg-white shadow-xs"
							>
								<div className="overflow-hidden">
									<MyImage
										src={item.thumbnail?.url}
										payloadUrl={payloadUrl}
										alt={item.thumbnail?.alt ?? translations.IMAGE_PLACEHOLDER}
										width={365}
										height={270}
										className="w-full h-[270px] object-cover"
										background={item.thumbnail?.blurhash}
									/>
								</div>
								<figure className="p-4 transition-opacity duration-250 group-hover:opacity-0">
									<figcaption>
										<h3 className="pb-3 text-black">
											<a href={`${localePrefix}/mediatheque/ludotheque/${item.id}`} className="after:absolute after:inset-0 after:z-10">
												{item.title}
											</a>
										</h3>
										<p className="text-xs font-serif text-primary pb-2">{item.genre}</p>
										<div className="flex items-center justify-between text-xs">
											<p>{translateDuration(item.duration)}</p>
											<p>{item.players}</p>
											<p>{item.public}</p>
										</div>
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

			<SmartPagination page={page} totalPages={data.totalPages} anchor="ludotheque" onPageChange={handlePageChange} labelPrev={translations.PRECEDENT} labelNext={translations.SUIVANT} />
		</>
	)
}
