import { find, type PayloadResponse } from '@/api/payload'
import { MyImage } from '@/components/my-image'
import { SelectWrapper } from '@/components/select-wrapper'
import { SmartPagination } from '@/components/smart-pagination'
import { Input } from '@/components/ui/input'
import type { Ludotheque, Mediatheque } from '@/types/mediatheque'
import { useEffect, useState } from 'react'

interface LudothequeGridProps {
	initialData: PayloadResponse<Ludotheque>
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
		JOUEURS?: string
		ANS_ET_PLUS?: string
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
	const [data, setData] = useState<PayloadResponse<Ludotheque>>(initialData)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)

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
				where.duration = { contains: selectedDuration }
			}

			if (selectedPlayers && selectedPlayers !== 'all') {
				where.players = { contains: selectedPlayers }
			}

			if (selectedPublic && selectedPublic !== 'all') {
				where.public = { contains: selectedPublic }
			}

			try {
				const result = await find<Ludotheque>('mediatheque', {
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
		const target = document.getElementById('ludotheque-grid')
		target?.scrollIntoView({ behavior: 'smooth' })
		setTimeout(() => target?.scrollIntoView({ behavior: 'smooth' }), 600)
	}

	return (
		<>
			{showFilters && (
				<div className="bg-secondary mt-6 space-y-4 px-5 py-6 lg:mt-12 lg:space-y-6 lg:px-10 lg:py-8">
					<div className="relative w-full">
						<Input
							placeholder={translations.MOTS_CLES}
							className="bg-secondary-foreground min-h-12 w-full rounded-none border-0 pr-10 focus-visible:border-primary focus-visible:ring-primary"
							value={searchKeyword}
							onChange={(e) => setSearchKeyword(e.target.value)}
						/>
						{searchKeyword && (
							<button
								onClick={() => setSearchKeyword('')}
								className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
								type="button"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
							</button>
						)}
					</div>

					<div className="grid grid-cols-1 gap-4 *:min-h-12 lg:grid-cols-3 lg:gap-6">
						<SelectWrapper
							placeholder={translations.TEMPS_DE_JEU || 'Temps de jeu'}
							options={[{ key: translations.TOUS || 'Tous', value: 'all' }, ...(translations.durationOptions || [])]}
							className="w-full"
							value={selectedDuration}
							onValueChange={setSelectedDuration}
						/>
						<SelectWrapper
							placeholder={translations.NOMBRE_DE_JOUEURS || 'Nombre de joueurs'}
							options={[{ key: translations.TOUS || 'Tous', value: 'all' }, ...(translations.playersOptions || [])]}
							className="w-full"
							value={selectedPlayers}
							onValueChange={setSelectedPlayers}
						/>
						<SelectWrapper
							placeholder={translations.AGE || 'Âge'}
							options={[{ key: translations.TOUS || 'Tous', value: 'all' }, ...(translations.publicOptions || [])]}
							className="w-full"
							value={selectedPublic}
							onValueChange={setSelectedPublic}
						/>
					</div>
				</div>
			)}

			<div
				id="ludotheque-grid"
				className="scroll-m-20 py-8 lg:py-16 grid grid-cols-[repeat(auto-fit,360px)] justify-center lg:justify-between content-start gap-x-4 gap-y-8 *:only:col-span-full"
			>
				{loading ? (
					<div className="col-span-full flex min-h-[270px] w-full !max-w-none items-center justify-center">
						<div className="border-secondary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
					</div>
				) : data.docs.length === 0 ? (
					<div className="col-span-full flex min-h-[270px] w-full !max-w-none items-center justify-center">
						<p className="text-lg text-gray-400">{translations.AUCUN_CONTENU}</p>
					</div>
				) : (
					data.docs.map((item) => {
						const descText = getDescriptionText(item)
						return (
							<article
								key={item.id}
								className="group shadow-card relative col-span-1 overflow-hidden rounded-2xl border border-black bg-white w-[360px] h-[360px]"
							>
								<MyImage
									src={item.thumbnail?.url}
									payloadUrl={payloadUrl}
									alt={item.thumbnail?.alt ?? translations.IMAGE_PLACEHOLDER}
									width={275}
									height={400}
									className="h-full w-full rounded-2xl object-cover"
									loading="lazy"
									layout="fullWidth"
									background={item.thumbnail?.blurhash}
								/>
								<figure className="bg-background/90 absolute inset-x-0 bottom-0 h-[116px] overflow-hidden rounded-t-2xl p-4 transition-[height] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:h-full">
									<figcaption>
										<h3 className="line-clamp-1 mb-0.5 group-hover:line-clamp-2">
											<a
												href={`${localePrefix}/mediatheque/ludotheque/${item.id}`}
												className="after:absolute after:inset-0 after:z-10"
											>
												{item.title}
											</a>
										</h3>
										{item.genre && (
											<p className="distinguished !text-primary line-clamp-1 text-sm group-hover:line-clamp-2">{item.genre}</p>
										)}
										{(item.public || item.players || item.duration) && (
											<div className="bg-secondary text-secondary-foreground rounded-xl mt-1.5 flex items-center">
												<div className="flex-1 min-w-0 distinguished text-center text-xs py-2 px-2 truncate">{item.public}</div>
												<div className="bg-background distinguished flex-1 min-w-0 text-center text-xs py-1 px-2 mx-1 rounded-xl truncate">{item.players}</div>
												<div className="flex-1 min-w-0 distinguished text-center text-xs py-2 px-2 truncate">{translateDuration(item.duration)}</div>
											</div>
										)}
										<div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:grid-rows-[1fr]">
											<div className="overflow-hidden">
												{descText && <p className="!text-foreground line-clamp-8 pt-4 text-sm">{descText}</p>}
												<p className="!text-secondary-muted inline-flex items-center gap-2 pt-4 text-medium font-semibold transition-opacity opacity-0 duration-200 group-hover:opacity-100 group-hover:delay-200 pl-0.5">
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
											</div>
										</div>
									</figcaption>
								</figure>
							</article>
						)
					})
				)}
			</div>

			<SmartPagination
				page={page}
				totalPages={data.totalPages}
				anchor="ludotheque"
				onPageChange={handlePageChange}
				labelPrev={translations.PRECEDENT}
				labelNext={translations.SUIVANT}
				variant="light"
			/>
		</>
	)
}
