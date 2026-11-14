import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeFormulasHtml from './src/plugins/rehype-formulas-html.mjs'
import { asignaturas } from './src/data/asignaturas.ts'
import { fechaSitemap } from './src/data/fechas.ts'
// Páginas legales: indexables, pero fuera del sitemap porque no deben posicionar.
import { sinSitemap } from './src/data/sin-sitemap.mjs'

// Las asignaturas sin resolver llevan noindex y no entran en el sitemap.
const ocultas = [
  ...asignaturas.filter((a) => !a.indexable).map((a) => `/${a.slug}/`),
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
      filter: (page) => {
        const ruta = new URL(page).pathname
        return !sinSitemap.includes(ruta) && !ocultas.some((o) => ruta.startsWith(o))
      },
      // Solo loc y lastmod. lastmod es la fecha que se ve en la página (git o anotada a mano);
      // si no hay fecha real, no se pone.
      serialize: (item) => {
        const lastmod = fechaSitemap(new URL(item.url).pathname)
        return lastmod ? { url: item.url, lastmod } : { url: item.url }
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
