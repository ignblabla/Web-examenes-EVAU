// Comprueba el SEO on-page del HTML generado (dist/): title, descripción, encabezados,
// canonical, Open Graph, JSON-LD, migas de pan, enlaces internos, imágenes, sitemap y,
// en los exámenes, soluciones, idioma y enlaces relacionados.
// Uso: npm run seo  (compila y verifica)  ·  node scripts/verificar-seo.mjs [carpeta]
import fs from "node:fs"
import path from "node:path"

const dist = process.argv[2] ?? "dist"
if (!fs.existsSync(path.join(dist, "sitemap-0.xml"))) {
  console.error(`No hay un sitio compilado en ${dist}/. Ejecuta antes: npm run build`)
  process.exit(1)
}

// Tipos de schema.org que usa la web; uno distinto suele ser un error de escritura.
const TIPOS_SCHEMA = new Set([
  "Organization",
  "Person",
  "WebSite",
  "EducationalAudience",
  "Article",
  "LearningResource",
  "CollectionPage",
  "ProfilePage",
  "ContactPage",
  "ItemList",
  "ListItem",
  "BreadcrumbList",
  "Thing",
  "FAQPage",
  "Question",
  "Answer",
])

const listar = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? listar(path.join(dir, e.name))
      : e.name.endsWith(".html")
        ? [path.join(dir, e.name)]
        : [],
  )
const relativa = (f) => "/" + path.relative(dist, f).replace(/\\/g, "/")
const archivos = listar(dist)
const existentes = new Set(archivos.map(relativa))
const paginas = archivos.map((f) => ({
  ruta: relativa(f).replace(/index\.html$/, ""),
  html: fs.readFileSync(f, "utf8"),
}))

const decodificar = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
const extraer = (html, re) => decodificar(html.match(re)?.[1] ?? "")

const sitemap = fs.readFileSync(path.join(dist, "sitemap-0.xml"), "utf8")
const enSitemap = new Set(
  [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1]),
)

function enlaceExiste(href) {
  const ruta = href.split("#")[0]
  if (!ruta) return true
  const archivo = path.join(dist, ruta)
  if (fs.existsSync(archivo) && fs.statSync(archivo).isFile()) return true
  return existentes.has(ruta.replace(/\/?$/, "/") + "index.html")
}

const problemas = []
const titulos = new Map()
const descripciones = new Map()
const entrantes = new Map()
let soluciones = 0

for (const { ruta, html } of paginas) {
  const aviso = (texto) => problemas.push(`${ruta}: ${texto}`)
  const title = extraer(html, /<title>([^<]*)<\/title>/)
  const descripcion = extraer(html, /<meta name="description" content="([^"]*)"/)
  const noindex = extraer(html, /<meta name="robots" content="([^"]*)"/).includes("noindex")
  const canonical = extraer(html, /<link rel="canonical" href="([^"]*)"/)

  // Metadatos
  if (noindex) {
    if (enSitemap.has(ruta)) aviso("noindex pero está en el sitemap")
  } else {
    if (title.length < 30 || title.length > 60) aviso(`title de ${title.length} caracteres: ${title}`)
    if (descripcion.length < 120 || descripcion.length > 160)
      aviso(`descripción de ${descripcion.length} caracteres: ${descripcion}`)
    titulos.set(title, [...(titulos.get(title) ?? []), ruta])
    descripciones.set(descripcion, [...(descripciones.get(descripcion) ?? []), ruta])
    if (!canonical) aviso("sin canonical")
    if (!enSitemap.has(ruta)) aviso("indexable pero fuera del sitemap")
  }
  if (canonical && !canonical.endsWith(ruta)) aviso(`canonical que no apunta a sí misma: ${canonical}`)
  if (!/<meta property="og:image" content="https:\/\/[^"]+"/.test(html)) aviso("sin og:image")
  if (!/<meta name="twitter:card"/.test(html)) aviso("sin twitter:card")

  // Encabezados: un solo H1 y sin saltos de nivel.
  const niveles = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]))
  const h1 = niveles.filter((n) => n === 1).length
  if (h1 !== 1) aviso(`${h1} H1`)
  niveles.forEach((n, i) => {
    if (i > 0 && n > niveles[i - 1] + 1) aviso(`salto de H${niveles[i - 1]} a H${n}`)
  })

  // Datos estructurados
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let datos
    try {
      datos = JSON.parse(json)
    } catch (error) {
      aviso(`JSON-LD inválido: ${error.message}`)
      continue
    }
    if (datos["@context"] !== "https://schema.org") aviso("JSON-LD sin @context de schema.org")
    const recorrer = (nodo) => {
      if (Array.isArray(nodo)) return nodo.forEach(recorrer)
      if (!nodo || typeof nodo !== "object") return
      for (const tipo of [nodo["@type"]].flat().filter(Boolean))
        if (!TIPOS_SCHEMA.has(tipo)) aviso(`tipo de schema.org desconocido: ${tipo}`)
      Object.values(nodo).forEach(recorrer)
    }
    recorrer(datos)
  }

  // Migas de pan en las páginas interiores, visibles y en JSON-LD.
  if (ruta !== "/" && ruta !== "/404.html") {
    if (!html.includes('"BreadcrumbList"')) aviso("sin BreadcrumbList")
    if (!html.includes('class="breadcrumb"')) aviso("sin migas de pan visibles")
  }

  // Enlaces internos
  for (const [, href] of html.matchAll(/<a [^>]*href="(\/[^"]*)"/g)) {
    if (!enlaceExiste(href)) aviso(`enlace roto: ${href}`)
    const destino = href.split("#")[0]
    if (destino && destino !== ruta) entrantes.set(destino, (entrantes.get(destino) ?? 0) + 1)
  }

  // Imágenes
  for (const [img] of html.matchAll(/<img [^>]*>/g)) {
    if (!/ alt=/.test(img)) aviso(`imagen sin alt: ${img.slice(0, 80)}`)
    if (!/ width=/.test(img) || !/ height=/.test(img)) aviso(`imagen sin width/height: ${img.slice(0, 80)}`)
  }

  // Exámenes de idiomas: soluciones, idioma del enunciado, bloques y enlaces relacionados.
  if (/^\/(ingles|frances)\/\d{4}\/[a-z0-9-]+\/$/.test(ruta)) {
    // La clase puede llevar modificadores, como "solution solution--plegable".
    const n = (html.match(/class="solution(?: [^"]*)?"/g) ?? []).length
    soluciones += n
    if (n === 0) aviso("examen sin soluciones")
    if (!/class="official-statement[^"]*" lang="(en|fr)"/.test(html)) aviso("enunciado sin lang")
    if (!/class="solution(?: [^"]*)?" lang="es"/.test(html)) aviso("soluciones sin lang=\"es\"")
    if (!html.includes('<h2 class="official-block')) aviso("bloques del examen sin H2")
    if (!html.includes('id="sigue-practicando"')) aviso("sin enlaces relacionados")
  }
}

for (const [title, rutas] of titulos)
  if (rutas.length > 1) problemas.push(`title repetido "${title}": ${rutas.join(", ")}`)
for (const [, rutas] of descripciones)
  if (rutas.length > 1) problemas.push(`descripción repetida: ${rutas.join(", ")}`)
for (const ruta of enSitemap)
  if (ruta !== "/" && !entrantes.get(ruta)) problemas.push(`${ruta}: página huérfana (nadie la enlaza)`)

console.log(
  `${paginas.length} páginas · ${enSitemap.size} en el sitemap · ${soluciones} soluciones en los exámenes`,
)
if (problemas.length) {
  console.log(`\n${problemas.length} problemas:\n${problemas.join("\n")}`)
  process.exit(1)
}
console.log("Sin problemas de SEO on-page.")
