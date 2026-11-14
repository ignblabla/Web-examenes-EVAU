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
- Las páginas de año (`/<asignatura>/<año>/`) llevan un resumen del curso (`src/components/ResumenAnio.astro`): cómo era el examen, en qué ejercicio cayó cada tema (Matemáticas y Física) o los títulos de los textos de comprensión (idiomas, sacados del MDX). El formato de cada asignatura y año está en `src/data/formatos.ts`, sacado de las instrucciones oficiales; también lo usa `/examenes-<año>/`. Al añadir un curso nuevo, añade ahí su formato.
- Cada examen empieza, antes del enunciado, con "Qué entra en este examen" (`src/components/IndiceExamen.astro`): los ejercicios resueltos y su tema, y en idiomas el título del texto. No se imprime. La primera solución del examen sale abierta (script en línea en `[examen].astro`); el resto, plegadas.
- Redacciones modelo de Inglés y Francés: `<Redaccion titulo="Redacción modelo · C1" idioma="en">` al final del MDX del examen completo (no son un tema), con el texto en `<p>` y el comentario en español en `<p slot="comentario">`. El número de palabras lo cuenta el componente (`src/components/Redaccion.astro`) al compilar; debe cumplir el límite de ese curso (`src/data/formatos.ts`). En francés, espacio irrompible antes de `: ; ? !`. Hechas 2025 y 2026; faltan 2021-2024.
- No hay página de `/temas/`. La página general se enlaza desde la tarjeta de temas de la asignatura (antes que los años), desde cada página por año (arriba y en las migas) y desde cada examen ("Más ejercicios de…", tras el último tramo de cada tema).
- En los temas, `queCae` (Matemáticas) o `intro` (Física e idiomas) es el texto de qué suele caer; el recuento por convocatoria se calcula en la página. `espanol` acompaña al término del examen ("Reading (comprensión lectora)") y `corto` es el nombre abreviado para los title.
- Todas las asignaturas tienen temas, también Física y Francés. Física tiene 5: campo gravitatorio, campo eléctrico y magnético, ondas, óptica geométrica y física cuántica y nuclear. Francés tiene 2: compréhension y compétence linguistique. Los temas se definen en `src/data/asignaturas.ts`, con `termino` (el nombre que usa el examen) e `intro` (el texto de la página).
- Las convocatorias y los cursos están en `src/data/examenes.ts`. `prueba(anio)` devuelve "PEvAU" hasta 2024 y "PAU" desde 2025. Las rutas se construyen con `rutaAnio`, `rutaExamen` y `rutaTema`.
- **Convocatoria extraordinaria desde 2027:** en 2027 cae en parte en junio (29 y 30 de junio y 1 de julio). Al añadir los exámenes de 2027 y siguientes, la URL sigue siendo `/[asignatura]/[año]/julio/`, pero el texto visible dice "convocatoria extraordinaria" (no "julio"). Los exámenes de 2021-2026, incluidos sus title, siguen con "julio". Todavía no está aplicado.
- El calendario de la PAU (fechas y horario) está en `src/data/calendario.ts` y lo usa `/fechas-pau-andalucia/` (URL sin año). Cada curso se actualiza solo ese archivo; `pendienteBoja` se pone a `false` cuando se publique en el BOJA.
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
- El filtro excluye las asignaturas con `indexable: false`, que además llevan `noindex` (ahora mismo todas son indexables), y las páginas legales de `src/data/sin-sitemap.mjs` (aviso legal, cookies, privacidad y contacto), que siguen siendo indexables. `serialize` deja solo `loc` y `lastmod`.
- Las fechas de git necesitan el historial completo: el checkout de `.github/workflows/deploy.yml` lleva `fetch-depth: 0`, y si el repositorio es un clon superficial el build falla a propósito (`fechas.ts`).
- `serialize` añade `<lastmod>` con `fechaSitemap()` de `src/data/fechas.ts`, la misma fecha que se ve en la página. Desde git (`fechasDe()`): exámenes, temas (generales y por año) y páginas de año (`/<asignatura>/<año>/` y `/examenes-<año>/`, con "Actualizado el…"), que toman la fecha más reciente de sus archivos. Fechas fijas anotadas a mano: orientaciones (`revisado`), calendario (`actualizado`) y la página de PAU/PEvAU (`fechasNombres` en `src/data/examenes.ts`).
- `public/robots.txt` permite los buscadores y, de forma explícita, los buscadores con IA (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot…), bloquea los bots de entrenamiento de IA (GPTBot, ClaudeBot, Google-Extended…) y apunta al sitemap.
- `/llms.txt` lo genera `src/pages/llms.txt.ts` en cada build a partir de los datos (asignaturas, años, temas, orientaciones).
- `persona()` en `src/data/sitio.ts` lleva los títulos del autor (`hasCredential`, solo los que ha dado él) y su LinkedIn (`sameAs`, `autor.linkedin`).
- La fuente de los enunciados (`fuenteExamenes` en `src/data/sitio.ts`, la página de exámenes anteriores del Distrito Único Andaluz) se enlaza en la firma de cada examen, en su JSON-LD (`isBasedOn`) y en "Sobre el autor".
- `trailingSlash: 'always'`: todas las URL internas terminan en `/`.
