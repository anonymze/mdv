// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
    output: 'static',
    // astro 7 defaults to 'jsx', which drops the whitespace between inline elements
    compressHTML: true,
    redirects: {
        '/': '/fr/'
    },
    adapter: vercel({
        imageService: true,
        imagesConfig: {
            // must contain every width used by an image `src` (fallback), not only the srcset breakpoints
            sizes: [
                80, 100, 120, 130, 150, 160, 180, 200, 240, 250, 260, 275, 300, 350, 360, 400, 420, 454, 500, 640, 700, 750, 800,
                828, 850, 960, 1080, 1100, 1200, 1280, 1300, 1400, 1500, 1668, 1920, 2048, 2560, 3200, 3840, 4480, 5120, 6016
            ],
            domains: ['mdv-admin.vercel.app']
        }
    }),
    integrations: [
        react(),
        sitemap({
            i18n: {
                defaultLocale: 'fr',
                locales: {
                    fr: 'fr-FR',
                    en: 'en-US',
                    es: 'es-ES'
                }
            }
        })
    ],
    site: 'https://www.maisondelavallee.org',
    i18n: {
        locales: ['es', 'en', 'fr'],
        defaultLocale: 'fr',
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: false
        }
    },
    image: {
        remotePatterns: [{ protocol: 'https', hostname: 'mdv-admin.vercel.app' }]
    },
    fonts: [
        {
            provider: fontProviders.google(),
            name: 'DM Serif Text',
            cssVariable: '--font-dm-serif-text'
        },
        {
            provider: fontProviders.google(),
            name: 'Noto Sans',
            cssVariable: '--font-noto-sans',
            weights: ['400', '500', '600', '700']
        },
        {
            provider: fontProviders.google(),
            name: 'Libre Baskerville',
            cssVariable: '--font-libre-baskerville'
        }
    ],
    vite: {
        plugins: [tailwindcss()]
    }
})