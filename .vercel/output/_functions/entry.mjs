import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DHbIP64G.mjs';
import { manifest } from './manifest_DwpjniO4.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/archives.astro.mjs');
const _page2 = () => import('./pages/art-vivant/residence/_id_.astro.mjs');
const _page3 = () => import('./pages/art-vivant/spectacle/_id_.astro.mjs');
const _page4 = () => import('./pages/art-vivant.astro.mjs');
const _page5 = () => import('./pages/artiste.astro.mjs');
const _page6 = () => import('./pages/autres-actualites/evenement/_id_.astro.mjs');
const _page7 = () => import('./pages/autres-actualites.astro.mjs');
const _page8 = () => import('./pages/cinema/seance/_id_.astro.mjs');
const _page9 = () => import('./pages/cinema.astro.mjs');
const _page10 = () => import('./pages/exposition.astro.mjs');
const _page11 = () => import('./pages/informations.astro.mjs');
const _page12 = () => import('./pages/jeune-public/ludotheque/_id_.astro.mjs');
const _page13 = () => import('./pages/jeune-public/seance/_id_.astro.mjs');
const _page14 = () => import('./pages/jeune-public/spectacles/_id_.astro.mjs');
const _page15 = () => import('./pages/jeune-public.astro.mjs');
const _page16 = () => import('./pages/mediatheque/ludotheque/_id_.astro.mjs');
const _page17 = () => import('./pages/mediatheque.astro.mjs');
const _page18 = () => import('./pages/parc-national/article/_id_.astro.mjs');
const _page19 = () => import('./pages/parc-national/evenement/_id_.astro.mjs');
const _page20 = () => import('./pages/parc-national.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.16.11_@types+node@25.0.9_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30._57e55bd34144ba1fb8510cb91e26bf05/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/archives.astro", _page1],
    ["src/pages/art-vivant/residence/[id].astro", _page2],
    ["src/pages/art-vivant/spectacle/[id].astro", _page3],
    ["src/pages/art-vivant/index.astro", _page4],
    ["src/pages/artiste.astro", _page5],
    ["src/pages/autres-actualites/evenement/[id].astro", _page6],
    ["src/pages/autres-actualites/index.astro", _page7],
    ["src/pages/cinema/seance/[id].astro", _page8],
    ["src/pages/cinema/index.astro", _page9],
    ["src/pages/exposition/index.astro", _page10],
    ["src/pages/informations.astro", _page11],
    ["src/pages/jeune-public/ludotheque/[id].astro", _page12],
    ["src/pages/jeune-public/seance/[id].astro", _page13],
    ["src/pages/jeune-public/spectacles/[id].astro", _page14],
    ["src/pages/jeune-public/index.astro", _page15],
    ["src/pages/mediatheque/ludotheque/[id].astro", _page16],
    ["src/pages/mediatheque/index.astro", _page17],
    ["src/pages/parc-national/article/[id].astro", _page18],
    ["src/pages/parc-national/evenement/[id].astro", _page19],
    ["src/pages/parc-national/index.astro", _page20],
    ["src/pages/index.astro", _page21]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "c64a1eb0-9993-41ae-8df1-995fa3e54feb",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
