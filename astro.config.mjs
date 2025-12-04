// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

import tailwindcss from '@tailwindcss/vite'
import { imageService } from '@unpic/astro/service'

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	site: "https://mdv-chi.vercel.app",
	i18n: {
		locales: ['es', 'en', 'fr'],
		defaultLocale: 'fr',
		fallback: {
			es: 'fr',
			en: 'fr'
		},
		routing: {
			prefixDefaultLocale: false,
			fallbackType: 'rewrite'
		}
	},
	image: {
    service: imageService({
      layout: "constrained",
      placeholder: "blurhash"
    }),
  },
	vite: {
		plugins: [tailwindcss()]
	}
})
