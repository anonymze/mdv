// Payload CMS API response types
export interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface PayloadDoc<T> {
  doc: T
}

// Query params for Payload API
export interface PayloadQueryParams {
  depth?: number
  limit?: number
  page?: number
  sort?: string
  where?: Record<string, any>
  locale?: string
}

const PAYLOAD_URL = import.meta.env.PUBLIC_PAYLOAD_URL + "/api";

function buildQuery(params?: PayloadQueryParams): string {
  if (!params) return ''

  const searchParams = new URLSearchParams()

  if (params.depth !== undefined) searchParams.set('depth', params.depth.toString())
  if (params.limit !== undefined) searchParams.set('limit', params.limit.toString())
  if (params.page !== undefined) searchParams.set('page', params.page.toString())
  if (params.sort) searchParams.set('sort', params.sort)
  if (params.locale) searchParams.set('locale', params.locale)

  // Build where clause in Payload REST API format: where[field][operator]=value
  if (params.where) {
    Object.entries(params.where).forEach(([field, value]) => {
      if (typeof value === 'object' && value !== null) {
        // Nested operator: where[field][operator]=value
        Object.entries(value).forEach(([operator, val]) => {
          searchParams.set(`where[${field}][${operator}]`, String(val))
        })
      } else {
        // Simple equality: where[field][equals]=value
        searchParams.set(`where[${field}][equals]`, String(value))
      }
    })
  }

  const query = searchParams.toString()
  return query ? `?${query}` : ''
}

export async function find<T>(collection: string, params?: PayloadQueryParams): Promise<PayloadResponse<T>> {
  // Default sort by latest first if not specified
  const queryParams = {
    ...params,
    sort: params?.sort || '-createdAt'
  }

  const query = buildQuery(queryParams)
  const res = await fetch(`${PAYLOAD_URL}/${collection}${query}`)

  if (!res.ok) {
    throw new Error(`Payload fetch failed: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

export async function findByID<T>(collection: string, id: string, params?: PayloadQueryParams): Promise<T> {
  const query = buildQuery(params)
  const res = await fetch(`${PAYLOAD_URL}/${collection}/${id}${query}`)

  if (!res.ok) {
    throw new Error(`Payload fetch failed: ${res.status} ${res.statusText}`)
  }

  return res.json()
}
