import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { asignaturas } from './src/data/asignaturas.ts'
import { paginasLegales } from './src/data/legal.ts'

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
    mdx(),
    sitemap({ filter: (page) => !ocultas.some((ruta) => new URL(page).pathname.startsWith(ruta)) }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
