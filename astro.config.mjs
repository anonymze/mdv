// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import react from '@astrojs/react'
import vercel from '@astrojs/vercel'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercel(),
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
	image: {
		remotePatterns: [{ protocol: 'https', hostname: 'mdv-admin.vercel.app' }]
	},
	experimental: {
		fonts: [
			{
				provider: fontProviders.google(),
				name: 'Libre Baskerville',
				cssVariable: '--font-libre-baskerville'
			},
			{
				provider: fontProviders.google(),
				name: 'Noto Sans',
				cssVariable: '--font-noto-sans'
			}
		]
	},
	vite: {
		plugins: [tailwindcss()]
	}
})
