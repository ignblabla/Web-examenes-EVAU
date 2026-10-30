import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeFormulasHtml from './src/plugins/rehype-formulas-html.mjs'
import { asignaturas } from './src/data/asignaturas.ts'
import { paginasLegales } from './src/data/legal.ts'
import { fechaSitemap } from './src/data/fechas.ts'

// Las asignaturas sin resolver y las páginas legales llevan noindex y no entran en el sitemap.
const ocultas = [
  ...asignaturas.filter((a) => !a.indexable).map((a) => `/${a.slug}/`),
  ...paginasLegales.map((p) => p.ruta),
]

// https://astro.build/config
export default defineConfig({
  // Dominio definitivo de la web: se usa en las URL canónicas y en el sitemap.
  site: 'https://selectividadresuelta.es',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [
    // Los rehypePlugins de mdx() sustituyen a los de markdown, así que KaTeX se repite aquí; después,
    // cada fórmula se guarda como una cadena de HTML (ver el plugin).
    mdx({ rehypePlugins: [rehypeKatex, rehypeFormulasHtml] }),
    sitemap({
      filter: (page) => !ocultas.some((ruta) => new URL(page).pathname.startsWith(ruta)),
      serialize: (item) => {
        const lastmod = fechaSitemap(new URL(item.url).pathname)
        return lastmod ? { ...item, lastmod } : item
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
