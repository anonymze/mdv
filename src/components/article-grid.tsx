import { find, type PayloadResponse } from '@/api/payload'
import { MyImage } from '@/components/my-image'
import { SmartPagination } from '@/components/smart-pagination'
import type { ParcNational } from '@/types/parc-national'
import { useEffect, useState } from 'react'

interface ArticleGridProps {
	initialData: PayloadResponse<ParcNational>
	locale: string
	limit: number
	payloadUrl: string
	mobileScrollOnly?: boolean
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
	mobileScrollOnly = false,
	translations
}: ArticleGridProps) {
	const [data, setData] = useState<PayloadResponse<ParcNational>>(initialData)
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)

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
		if (!mobileScrollOnly || window.innerWidth < 1024) {
			const target = document.getElementById('articles-grid')
			target?.scrollIntoView({ behavior: 'smooth' })
			setTimeout(() => target?.scrollIntoView({ behavior: 'smooth' }), 600)
		}
	}

	return (
		<>
			<div id="articles-grid" className={`scroll-m-20 py-8 lg:py-16 grid grid-cols-[repeat(auto-fit,360px)] justify-center ${data.docs.length === 2 ? 'lg:justify-start' : 'lg:justify-between'} content-start gap-x-4 gap-y-8 *:only:col-span-full min-h-104`}>
				{loading ? (
					<div className="col-span-full flex w-full !max-w-none items-center justify-center min-h-[300px]">
						<div className="border-secondary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
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
								className="group shadow-card relative col-span-1 overflow-hidden rounded-2xl border border-primary bg-white w-[360px] h-[360px]"
							>
								<MyImage
									src={item.thumbnail?.url}
									payloadUrl={payloadUrl}
									alt={item.thumbnail?.alt ?? translations.IMAGE_PLACEHOLDER}
									width={360}
									height={360}
									className="h-full w-full rounded-2xl object-cover"
									loading="lazy"
									layout="fullWidth"
									background={item.thumbnail?.blurhash}
								/>
								<figure className="bg-background/90 absolute inset-x-0 bottom-0 h-[110px] overflow-hidden rounded-t-2xl p-4 transition-[height] duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:h-full">
									<figcaption className="grid grid-cols-[1fr_auto] gap-x-3 items-center">
										<h3 className="line-clamp-1 group-hover:line-clamp-3">{item.title}</h3>
										{item.price && (
											<div className="row-span-2 bg-secondary/90 flex shrink-0 items-center justify-center rounded-2xl px-7 py-5 text-3xl font-serif text-white">
												{item.price}
											</div>
										)}
										{descText && <p className="!text-foreground line-clamp-2 group-hover:line-clamp-9 group-hover:pt-2 text-sm">{descText}</p>}
									</figcaption>
								</figure>
							</article>
						)
					})
				)}
			</div>

			<SmartPagination page={page} totalPages={data.totalPages} anchor="articles" onPageChange={handlePageChange} labelPrev={translations.PRECEDENT} labelNext={translations.SUIVANT} variant="light" />
		</>
	)
}
