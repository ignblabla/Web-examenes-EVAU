# Selectividad resuelta

Web de exámenes oficiales de Selectividad de Andalucía (PAU, antes PEvAU; también llamada EBAU) resueltos paso a paso en texto. Dominio: https://selectividadresuelta.es

- **Asignaturas:** Matemáticas II, Matemáticas Aplicadas a las CCSS (slug `matematicas-aplicadas`, nombre corto "Matemáticas CCSS"), Física, Inglés y Francés.
- **Años:** 2021-2026. Cada curso tiene junio (ordinaria), julio (extraordinaria) y reservas 1 a 4 (en Física de 2026 solo está la reserva 1).
- **Público:** estudiantes de 2.º de Bachillerato de Andalucía.
- **Autor:** Ignacio Blanquero Blanco, con página en `/sobre-el-autor/`.

## Reglas

- **Nunca inventar datos oficiales:** orientaciones, fechas, criterios de corrección, puntuaciones ni enunciados. Si falta la fuente, deja un `TODO` en el código o el contenido y avisa.
- **Idioma:** español de España, tono cercano y claro, sin relleno.
- **Tras cada cambio:** ejecuta `npm run build` y comprueba que no hay errores. `npm run seo` compila y además pasa `scripts/verificar-seo.mjs` sobre `dist/`.
- Astro 5 sobre Node 22. Astro 7 no funciona con esta versión de Node.

## Cómo se generan las páginas

Las páginas se generan de forma estática con Astro, MDX y KaTeX. Los datos están en `src/data/` y el contenido en dos colecciones (`src/content.config.ts`):

- `examenes`: `src/content/examenes/<asignatura>/<año>/<convocatoria>.mdx`. Contiene el enunciado completo y las soluciones dentro de `<Resuelto>`.
- `ejercicios`: `src/content/ejercicios/<asignatura>/<tema>/<año>/<convocatoria>.mdx`. Contiene la parte de cada examen que corresponde a un tema. Si los apartados de un tema no van seguidos en el examen, el tramo siguiente va en `<convocatoria>-2.mdx` con `parte: 2`.

| Página | Ruta | Archivo | Se genera a partir de |
|---|---|---|---|
| Home | `/` | `src/pages/index.astro` | `asignaturas` y la colección `examenes` |
| Asignatura | `/<asignatura>/` | `src/pages/[asignatura]/index.astro` | `asignaturas` en `src/data/asignaturas.ts` |
| Año | `/<asignatura>/<año>/` | `src/pages/[asignatura]/[anio]/index.astro` | Cada par asignatura y año con al menos un examen |
| Examen | `/<asignatura>/<año>/<junio\|julio\|reserva-n>/` | `src/pages/[asignatura]/[anio]/[examen].astro` | Cada entrada de `examenes` |
| Tema y año | `/<asignatura>/temas/<tema>/<año>/` | `src/pages/[asignatura]/temas/[tema]/[anio].astro` | Cada combinación de asignatura, tema y año en `ejercicios` |

- No hay página índice de un tema (`/<asignatura>/temas/<tema>/`) ni de `/temas/`. Los temas se enlazan desde la tarjeta de temas de la página de la asignatura, desde la página del año y desde cada examen.
- Todas las asignaturas tienen temas, también Física y Francés. Física tiene 5: campo gravitatorio, campo eléctrico y magnético, ondas, óptica geométrica y física cuántica y nuclear. Francés tiene 2: compréhension y compétence linguistique. Los temas se definen en `src/data/asignaturas.ts`, con `termino` (el nombre que usa el examen) e `intro` (el texto de la página).
- Las convocatorias y los cursos están en `src/data/examenes.ts`. `prueba(anio)` devuelve "PEvAU" hasta 2024 y "PAU" desde 2025. Las rutas se construyen con `rutaAnio`, `rutaExamen` y `rutaTema`.
- Las cabeceras oficiales de cada examen están en `src/data/cabeceras.ts`. Las figuras SVG están en `src/components/figuras/`.

## SEO: dónde se define cada cosa

`src/layouts/Base.astro` recibe `title`, `description`, `jsonLd`, `image`, `type`, `modified` y `noindex`. Con ellos pinta el `<title>`, la meta description, el canonical, Open Graph, Twitter y el `<script type="application/ld+json">`. Cada página calcula esos valores en su frontmatter. Si una propuesta supera 60 caracteres en el title o 160 en la description, se usa la siguiente opción más corta.

| Página | `<title>` y description | H1 | JSON-LD |
|---|---|---|---|
| Home | Texto fijo en las props de `<Base>` | Texto fijo | `Organization` y `WebSite` |
| Asignatura | Calculados en el frontmatter (`opciones` y `descripciones`) | `asignatura.titulo` y el rango de años | `Organization`, `CollectionPage` y `BreadcrumbList` |
| Año | Calculados en el frontmatter | "{Asignatura}, {año}. Todos los exámenes resueltos." | Lo mismo, con un `ItemList` de las convocatorias |
| Examen | Calculados en el frontmatter. La description se puede fijar con `descripcion` en el MDX y si no se usa `asignatura.resuelto` | "{Asignatura}, {convocatoria} de {año}. Examen de Selectividad resuelto." | `Organization`, `Person`, `Article` y `LearningResource`, y `BreadcrumbList` |
| Tema y año | Calculados en el frontmatter | "{término}. {Asignatura}, exámenes de {año}." | Lo mismo que el examen |

- Los nodos compartidos (`editor`, `persona`, `migas`) y los datos del sitio están en `src/data/sitio.ts`.
- Las páginas legales usan `src/layouts/Legal.astro`. `/sobre-el-autor/` y `/contacto/` definen su SEO en su propio archivo.
- `datePublished` y `dateModified` salen del historial de git de los MDX (`fechas()` en `src/data/fechas.ts`).
- Las imágenes para compartir son `public/og/<asignatura>.png` y se generan con `scripts/generar-imagenes.mjs`.

## Sitemap y rastreo

- Lo genera `@astrojs/sitemap` en `astro.config.mjs` y publica `/sitemap-index.xml`.
- El filtro excluye las asignaturas con `indexable: false`, que además llevan `noindex`. Ahora mismo todas son indexables.
- `serialize` añade `<lastmod>` solo a los exámenes y a las páginas de tema, con `fechaSitemap()` de `src/data/fechas.ts`, a partir del git log de `src/content`.
- `public/robots.txt` permite los buscadores, bloquea los bots de entrenamiento de IA y apunta al sitemap.
- `trailingSlash: 'always'`: todas las URL internas terminan en `/`.
