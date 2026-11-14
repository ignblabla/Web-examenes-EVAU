// Páginas indexables que no van en el sitemap porque no deben posicionar (las legales).
// Lo usan astro.config.mjs (filtro del sitemap) y scripts/verificar-seo.mjs. Es .mjs para que
// el script lo pueda importar con Node sin compilar TypeScript.
export const sinSitemap = ["/aviso-legal/", "/politica-de-cookies/", "/politica-de-privacidad/", "/contacto/"]
