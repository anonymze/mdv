// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import react from '@astrojs/react'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
	integrations: [react()],
	site: 'https://mdv-chi.vercel.app',
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
	// image: {
	//    service: imageService({
	//      layout: "constrained",
	//      placeholder: "blurhash"
	//    }),
	//  },
	experimental: {
		fonts: [
			{
				provider: fontProviders.google(),
				name: 'Roboto',
				cssVariable: '--font-roboto'
			}
		]
	},
	vite: {
		plugins: [tailwindcss()]
	}
})
