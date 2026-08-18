export type DocumentAdministratifCategory = 'deliberation' | 'compte_rendu' | 'proces_verbal'

export interface DocumentAdministratif {
  id: string
  category: DocumentAdministratifCategory
  title: string
  date: string
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  updatedAt: string
  createdAt: string
}
