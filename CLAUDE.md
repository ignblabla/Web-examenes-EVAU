# Selectividad resuelta

Web de exámenes oficiales de Selectividad de Andalucía (PAU, antes PEvAU; también llamada EBAU) resueltos paso a paso en texto. Dominio: https://selectividadresuelta.es

- **Asignaturas:** Matemáticas II, Matemáticas Aplicadas a las CCSS (slug `matematicas-aplicadas`, nombre en la web "Matemáticas CCSS"), Física, Inglés y Francés.
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
| Tema (general) | `/<asignatura>/temas/<tema>/` | `src/pages/[asignatura]/temas/[tema]/index.astro` | Cada combinación de asignatura y tema en `ejercicios` |
| Tema y año | `/<asignatura>/temas/<tema>/<año>/` | `src/pages/[asignatura]/temas/[tema]/[anio].astro` | Cada combinación de asignatura, tema y año en `ejercicios` |

- La página general de un tema reúne los enunciados de todos los años (del más reciente al más antiguo) con un índice arriba, pero sin las soluciones: cada enunciado enlaza con "Ver la solución" a la página del tema en ese año (`#<convocatoria>` abre ese examen). Así no pasa de unos 650 KB. Al imprimir solo salen los enunciados.
- El índice usa `src/data/ejercicios.ts`: los rótulos de cada archivo de tema ("Ejercicio 7", "Ejercicio 1 (opción B)", "Bloque C, apartado b2"…), sacados de los rótulos del examen completo. No van en el frontmatter para no tocar los MDX, cuyas fechas de git son las de revisión. Al añadir un examen, añade ahí sus ejercicios.
- No hay página de `/temas/`. La página general se enlaza desde la tarjeta de temas de la asignatura (antes que los años), desde cada página por año (arriba y en las migas) y desde cada examen ("Más ejercicios de…", tras el último tramo de cada tema).
- En los temas, `queCae` (Matemáticas) o `intro` (Física e idiomas) es el texto de qué suele caer; el recuento por convocatoria se calcula en la página. `espanol` acompaña al término del examen ("Reading (comprensión lectora)") y `corto` es el nombre abreviado para los title.
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
| Examen | Calculados en el frontmatter. La description (máx. 155) se puede fijar con `descripcion` en el MDX y si no se completa con `asignatura.soluciones` | "{Asignatura}, {convocatoria} de {año}. Examen de Selectividad resuelto." | `Organization`, `Person`, `Article` y `LearningResource`, y `BreadcrumbList` |
| Tema (general) | `tituloTemaGeneral()` en `src/data/asignaturas.ts`: "[Tema]: ejercicios resueltos Selectividad Andalucía" y opciones más cortas; si otra asignatura tiene un tema con el mismo nombre se añade `sufijoTema` (Funciones CCSS) | "{Tema}: ejercicios resueltos de Selectividad de {Asignatura}" | `Organization`, `Person`, `Article` y `LearningResource`, y `BreadcrumbList` |
| Tema y año | Calculados en el frontmatter, siempre con "Andalucía": primero se quita el relleno y después se abrevia | "{término}. {Asignatura}, exámenes de {año}." | Lo mismo que el examen |

- Los nodos compartidos (`editor`, `persona`, `migas`) y los datos del sitio están en `src/data/sitio.ts`.
- Las páginas legales usan `src/layouts/Legal.astro`. `/sobre-el-autor/` y `/contacto/` definen su SEO en su propio archivo.
- `datePublished` y `dateModified` salen del historial de git de los MDX con `fechasDe(ruta)` en `src/data/fechas.ts`. El `<lastmod>` del sitemap usa la misma función, así que no se pueden desincronizar.
- Las imágenes para compartir son `public/og/<asignatura>.png` y se generan con `scripts/generar-imagenes.mjs`.

## Sitemap y rastreo

- Lo genera `@astrojs/sitemap` en `astro.config.mjs` y publica `/sitemap-index.xml`.
- El filtro excluye las asignaturas con `indexable: false`, que además llevan `noindex`. Ahora mismo todas son indexables.
- `serialize` añade `<lastmod>` solo a los exámenes y a las páginas de tema (generales y por año; la general toma la fecha más reciente de sus ejercicios), con `fechaSitemap()` de `src/data/fechas.ts`, que devuelve la misma fecha de modificación que `fechasDe()`.
- `public/robots.txt` permite los buscadores, bloquea los bots de entrenamiento de IA y apunta al sitemap.
- `trailingSlash: 'always'`: todas las URL internas terminan en `/`.
