// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import vercel from '@astrojs/vercel/static'

import tailwindcss from '@tailwindcss/vite'
import { imageService } from '@unpic/astro/service'

// https://astro.build/config
export default defineConfig({
	output: 'static',
	adapter: vercel(),
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
