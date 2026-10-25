# Auditoría SEO on-page — Selectividad resuelta

Fecha: 25-10-2026 · Estado: **aplicada el 25-10-2026**, salvo lo indicado en "Pendiente".

## Estado

**Aplicado** (verificado en el HTML generado: 132 páginas, 111 en el sitemap, sin errores de title, descripción, H1, saltos de encabezado, JSON-LD, enlaces rotos ni páginas huérfanas):
puntos 1, 3-10, 12-18, 20-24. Física y Matemáticas aplicadas llevan `noindex` y están fuera del sitemap (D2). Se mantienen las URL (D4). Imágenes para compartir por asignatura en `public/og/`, generadas con `node scripts/generar-imagenes.mjs` (D6).

**Portada (segunda pasada):**

- H1 con palabra clave ("Exámenes resueltos de Selectividad") y entrada con Inglés, Francés, Andalucía, PAU y PEvAU.
- Sección "Últimos exámenes resueltos" con enlaces directos a junio y julio del último curso.
- Sección "La Selectividad de Andalucía, en cuatro respuestas": texto visible, sin marcado `FAQPage`.
- Tarjetas de Inglés y Francés y texto del método adaptados a idiomas.
- `audience` en el `WebSite`.

**Pendiente:**

- Punto 2 (D5): writing modelo del Bloque C. Es contenido nuevo.
- Punto 11 (D3): página "Sobre el autor" y firma. Faltan los datos reales del autor; mientras tanto, el autor en schema.org es la propia web (`Organization`).
- Punto 19 (parcial): las páginas de tema ya tienen una introducción propia por bloque, pero el texto de cada ejercicio sigue repetido en el examen completo.

## 1. Mapa del sitio

Stack: **Astro 5** (sitio estático), contenido en MDX, Tailwind 4, `@astrojs/sitemap`. Dominio configurado: `https://selectividadresuelta.es`, con `trailingSlash: 'always'`.

El build genera 114 páginas a partir de 5 plantillas. Ninguna página tiene title, descripción o schema escritos a mano: todo sale de las plantillas, así que **cada corrección se hace una vez**.

| Plantilla | URL | Páginas | Title, descripción y schema |
|---|---|---|---|
| `src/pages/index.astro` | `/` | 1 | Escritos en la plantilla (`WebSite`) |
| `src/pages/[asignatura]/index.astro` | `/ingles/`, `/frances/`, `/fisica/`, `/matematicas-aplicadas/` | 4 | Generados (`CollectionPage` + `BreadcrumbList`) |
| `src/pages/[asignatura]/[anio]/[examen].astro` | `/ingles/2025/junio/`, `/frances/2023/reserva-2/`… | 84 (36 de inglés, 36 de francés, 12 de física) | Generados (`LearningResource` + `BreadcrumbList`). Existe un campo opcional `descripcion` en el frontmatter, pero ningún examen lo usa |
| `src/pages/[asignatura]/temas/[tema]/[anio].astro` | `/ingles/temas/uso-de-la-lengua/2025/`… | 24 (12 de inglés, 12 de francés) | Generados (`LearningResource` + `BreadcrumbList`) |
| `src/pages/404.astro` | `/404.html` | 1 | Escritos en la plantilla |

Las etiquetas comunes (`<html lang>`, canonical, Open Graph) están en `src/layouts/Base.astro`. Header y footer: `src/components/SiteHeader.astro` y `SiteFooter.astro`.

**Lo que ya está bien:** `<html lang="es">`, canonical autorreferencial con barra final, URLs cortas en minúsculas, `robots.txt` correcto y sin `noindex`, sitemap generado (113 URL, el 404 excluido), breadcrumbs visibles y en JSON-LD en las páginas interiores, todo el texto de los exámenes en HTML (ningún examen está solo en imagen o PDF) y JSON-LD sintácticamente válido.

## 2. Hallazgo principal

**Las páginas de examen no están resueltas.** `/ingles/2025/junio/` solo muestra el enunciado: no hay ninguna `<Solucion>` en `src/content/examenes/`. Las soluciones viven en las páginas de tema (`/ingles/temas/uso-de-la-lengua/2025/`), que juntan los seis exámenes del curso en desplegables. Consecuencias:

1. La página que mejor encaja con la búsqueda principal ("examen inglés selectividad Andalucía 2025 resuelto") no tiene lo que el alumno busca, aunque el title diga "resuelto" y la descripción prometa "solución paso a paso". Eso produce rebote y Google acaba sin posicionarla.
2. Las páginas que sí tienen las soluciones no son de un examen, sino de un tema y un año, y además las soluciones de un mismo examen están repartidas entre dos URL.
3. El enunciado se repite íntegro en tres URL: el examen y las dos páginas de tema.

**Ningún examen tiene resuelto el Bloque C** (Writing / Expression écrite). Es el bloque con más búsquedas long tail ("writing selectividad inglés Andalucía ejemplo") y el que más pesa en Francés (4 puntos de 10).

## 3. Tabla de problemas (ordenada por impacto)

| # | URL | Problema | Impacto | Cambio propuesto |
|---|---|---|---|---|
| 1 | `/{asig}/{año}/{conv}/` (72 de inglés y francés) | El examen no incluye las soluciones, aunque el title y la descripción digan que sí | **Alto** | En la plantilla de examen, renderizar las dos entradas de `ejercicios` de ese examen (comprensión lectora y uso de la lengua, que ya contienen enunciado y soluciones) en lugar del enunciado sin resolver, y añadir del examen solo el Bloque C. El aspecto es el mismo que el de las páginas de tema. No hace falta tocar los MDX |
| 2 | Las 72 de examen | Falta el Bloque C resuelto (writing modelo) | **Alto** | Contenido nuevo: un writing / *production écrite* modelo por examen, con la nota estimada según los criterios oficiales y los errores típicos. Empezaría por Francés, que tiene menos competencia. No es un cambio de plantilla: lo redacto yo o el autor (ver decisión D5) |
| 3 | Las 84 de examen | El H1 no dice ni la asignatura ni la prueba: "Junio 2025. Convocatoria ordinaria." | **Alto** | `Examen de Inglés de Selectividad 2025 resuelto` + `<em>Junio · Convocatoria ordinaria</em>` (mismo diseño a dos líneas). Alineado con el title pero no idéntico |
| 4 | Las 84 de examen | Solo hay un H1 y ningún H2: los bloques A, B y C son `<p>`/`<div>` con clases | **Alto** | Convertir las etiquetas de bloque en `<h2>` con la misma clase (sin cambio visual) y añadir un H3 por pregunta donde ya existe el rótulo. Ejemplo para inglés: `Bloque A · Reading comprehension: solución pregunta a pregunta`, `Bloque B · Use of English`, `Bloque C · Writing`. Para francés: `Compréhension écrite`, `Compétence linguistique`, `Production écrite` |
| 5 | Las 84 de examen | El title no sigue el patrón, mezcla el orden ("Examen de Inglés junio 2025 resuelto · PEvAU Andalucía") y usa "PEvAU" también en 2025 y 2026, cuando desde 2025 la prueba se llama oficialmente **PAU** | **Alto** | Patrón `Examen {Asignatura} {PAU\|PEvAU} Andalucía {año} {convocatoria} resuelto`, con PAU desde 2025 y PEvAU hasta 2024. Ejemplo: `Examen Inglés PAU Andalucía 2025 junio resuelto` (47 caracteres). La marca no cabe en 60 caracteres: Google la saca del `WebSite` (punto 12). "Selectividad" va en el H1 y en la descripción, así se cubren las tres variantes sin repetirlas |
| 6 | Las 84 de examen | Descripción genérica y con errores: "examen de reserva de reserva 2"; promete una solución que no existe y no tiene llamada a la acción | **Alto** | Plantilla de 140-160 caracteres que cambia según la asignatura y el tipo de examen y solo anuncia lo que hay en la página. Ejemplo: `Examen de Inglés de selectividad de Andalucía de junio de 2025 resuelto: respuestas del Reading y del Use of English explicadas una a una. Corrígete tú.` |
| 7 | `/ingles/2025/`, `/frances/2024/`… (no existen) | No hay páginas por año. El breadcrumb "2025" lleva a `/ingles/#examenes`. Las búsquedas tipo "selectividad inglés 2025 Andalucía" no tienen página de destino | **Alto** | Nueva plantilla `src/pages/[asignatura]/[anio]/index.astro`: hub del año que enlaza los 6 exámenes y los temas de ese año, con H1 `Exámenes de Inglés de Selectividad 2025 en Andalucía`. Son 12 páginas nuevas en el sitemap y el breadcrumb pasa a tener 4 niveles reales |
| 8 | Las 84 de examen | No hay enlazado entre exámenes: solo un botón para volver | **Alto** | Bloque "Sigue practicando" generado en la plantilla: examen anterior y siguiente, la misma convocatoria en la otra lengua ("Examen de Francés de junio de 2025 resuelto"), el año y los temas. Siempre con anchor descriptivo |
| 9 | Las 84 de examen | El enunciado está en inglés o francés, pero todo va marcado como `lang="es"`. Google y los lectores de pantalla interpretan mal el texto | **Medio** | `lang="en"` / `lang="fr"` en el contenedor del enunciado y `lang="es"` en las soluciones (que están en español). Va en la plantilla y en `Solucion.astro` |
| 10 | Las 84 de examen y las 24 de tema | `LearningResource` incompleto: sin `author`, `publisher`, `datePublished`, `dateModified` ni `isPartOf`; `about` es un texto suelto e `inLanguage` es solo "es" | **Medio** | Añadir esos campos. `about` como `Thing` (asignatura + "Prueba de Acceso a la Universidad de Andalucía"), `inLanguage: ["es","en"]` o `["es","fr"]`, `educationalLevel` y `teaches` (los temas). Las fechas, desde el último commit de cada MDX (`git log`), o desde un campo del frontmatter |
| 11 | Todas | No hay página "Sobre el autor" ni firma en los exámenes. Para contenido educativo, E-E-A-T pesa mucho | **Medio** | Página `/sobre-el-autor/` con `Person` en JSON-LD, una firma corta en cada examen ("Resuelto por… · Revisado el…") y el enlace en el footer. **Necesito los datos reales del autor** (decisión D3) |
| 12 | `/` | El JSON-LD tiene solo `WebSite`, sin `publisher` (`Organization` o `Person`) y sin `alternateName` | **Medio** | `WebSite` con `name`, `alternateName` ("Selectividad Resuelta Andalucía") y `publisher`, y un nodo `Person`/`Organization` enlazado con `@id`. Así Google muestra "Selectividad resuelta" como nombre del sitio |
| 13 | `/` | Title de 70 caracteres que empieza por la marca; H1 sin palabras clave ("Entender el examen. Resolverlo bien.") | **Medio** | Title `Exámenes de Selectividad Andalucía resueltos: Inglés y Francés` (60). El H1 conserva el lema y el diseño, y la palabra clave se mete en el eyebrow/lead visible, que ya existe ("PEvAU · Andalucía" → "Selectividad (PAU) · Andalucía"). No propongo cambiar el lema, porque es diseño |
| 14 | `/` | La sección "Convocatorias" muestra 2025, 2024 y 2023 sin enlaces y marca 2025 como "Última", cuando ya hay 2026 | **Medio** | Convertir cada fila en enlace al hub del año (punto 7) y poner 2026 como el último año. Es el mismo diseño, pero con datos de `cursos` |
| 15 | `/`, `/fisica/`, `/matematicas-aplicadas/` | La web dice ser de Inglés y Francés, pero la portada anuncia cuatro materias. `/matematicas-aplicadas/` no tiene ningún examen (78 enlaces "próximamente") y `/fisica/` tiene 12 enunciados sin resolver y 54 huecos. Es contenido escaso indexado | **Medio** | Ver decisión D2. Lo que recomiendo: sacar Física y Matemáticas del sitemap y de la portada (con `noindex` o sin generar sus páginas) hasta que estén resueltas |
| 16 | Hubs `/ingles/`, `/frances/` | Title y descripción correctos pero mejorables: "PEvAU 2021–2026" y nada de "selectividad" ni "resueltos" al principio | **Medio** | `Exámenes de Inglés de Selectividad Andalucía resueltos (2021-2026)` y una descripción con las convocatorias y el contenido. Hace falta un párrafo introductorio propio (estructura del examen, puntuación de cada bloque, cómo se corrige): ahora el hub de Inglés y el de Francés son casi idénticos |
| 17 | Hubs | El breadcrumb visible tiene un nivel "Asignaturas" (`/#asignaturas`) que no está en el JSON-LD | **Bajo** | Quitar ese nivel o añadirlo a los dos sitios. Visible y marcado deben coincidir |
| 18 | Las 24 de tema | Title "Uso de la lengua · Inglés 2025 resuelto · PEvAU Andalucía": empieza por un término que el alumno no busca así | **Medio** | `Use of English Selectividad Andalucía 2025 resuelto` / `Compétence linguistique Francés PAU 2025 resuelto`. Usa los términos del examen, que son los que se buscan. Descripción con el tipo de ejercicios (rewriting, verdadero o falso…) |
| 19 | Las 24 de tema | Duplicado parcial con los exámenes, que será total cuando se aplique el punto 1 | **Medio** | Mantenerlas indexables, porque responden a otra búsqueda (practicar un tema), pero con una introducción propia: qué estructuras caen cada año y los errores frecuentes. Cada bloque enlaza a su examen completo (ya lo hace) |
| 20 | Todas | Falta `og:image`, Twitter Card y `og:type="article"` en los exámenes. Por WhatsApp se comparte sin imagen | **Medio** | En `Base.astro`: `og:image` (1200×630, una por asignatura generada en el build o una genérica), `twitter:card=summary_large_image`, `og:type` según la página y `article:modified_time` |
| 21 | `/` | Imagen del hero: PNG de 115 KB, sin `width`/`height` (provoca CLS) y con nombre correcto | **Bajo** | Pasarla por `astro:assets` (`<Image>`) para servir WebP/AVIF con dimensiones. Al estar por encima del pliegue va con `loading="eager"` y `fetchpriority="high"`. El `alt` ya es descriptivo |
| 22 | Todas | El footer dice "© 2025" y no enlaza a nada (asignaturas, autor, aviso legal) | **Bajo** | Año dinámico y enlaces a los hubs, al autor y a la página legal. Ayuda al enlazado interno y a la confianza |
| 23 | Todas | Header: los tres enlaces son anclas de la portada; no hay acceso directo a Inglés ni a Francés | **Bajo** | Cambiar "Asignaturas" por "Inglés" y "Francés" (mismo diseño, dos enlaces). Las páginas más importantes quedan a un clic desde cualquier sitio |
| 24 | `/404.html` | Correcto (fuera del sitemap y con enlace a las asignaturas) | — | Añadir `noindex` por seguridad, ya que algunos hostings lo sirven con código 200 |

## 4. URLs

Las URL actuales (`/ingles/2025/junio/`) ya son cortas, en minúsculas, jerárquicas y llevan la asignatura y el año. El patrón que propones (`/ingles/pau-andalucia-2025-junio-titular/`) añade palabras clave, pero:

- La palabra clave en la URL hoy pesa muy poco como señal de posicionamiento.
- Se pierde la jerarquía `/ingles/2025/`, que es la que permite tener hubs por año (punto 7) y migas de pan reales.
- "PAU" sería incorrecto para 2021-2024 (entonces era PEvAU).

**Recomendación: mantener las URL actuales.** Como la web aún no está publicada, ahora cualquier cambio sale gratis y no necesitaría 301. Si prefieres el patrón largo, lo implemento con redirecciones desde las rutas actuales (decisión D4).

Canonical: se generan con `Astro.site`, siempre con barra final y sin www. Cuando publiques, configura en el hosting la redirección 301 de `www` → sin `www` y de `http` → `https`. Astro no puede hacerlo.

## 5. Dominio

El configurado, **`selectividadresuelta.es`**, me parece el adecuado:
- "Selectividad" es el término que más usan los alumnos (más que PAU o PEvAU), y no caduca cuando cambie el nombre oficial, como ya pasó en 2025.
- Es corto, se dicta bien por WhatsApp y el `.es` refuerza la orientación a España.
- Coincide con la marca que ya está en el logo.

Alternativa si quieres dejar clara la región: `selectividadandalucia.es`. Pero limita crecer a otras comunidades, y los dominios que coinciden exactamente con la búsqueda ya no dan ventaja. Antes de publicar, comprueba que el dominio está libre.

## 6. Decisiones que necesito antes de aplicar

- **D1. Soluciones en la página del examen (punto 1).** Es el cambio más importante y altera lo que se ve en esa página: pasa a mostrar las soluciones en desplegables, como en las páginas de tema. ¿Lo apruebas?
- **D2. Física y Matemáticas aplicadas.** ¿Las quito de la portada y del índice hasta que estén resueltas, las borro o las dejo como están?
- **D3. Autor.** Necesito el nombre, las credenciales reales (titulación, años de experiencia, centro o academia si quieres que aparezca) y, si la hay, una foto y redes. Sin estos datos no creo la página "Sobre el autor": inventar credenciales iría contra E-E-A-T.
- **D4. URLs.** ¿Mantengo las actuales (lo que recomiendo) o aplico el patrón largo con 301?
- **D5. Writing modelo y contenido nuevo.** ¿Redacto yo los writings modelo (con nota estimada según los criterios oficiales) para que los revises, o los vas a escribir tú? Si me pasas los PDF de criterios de corrección oficiales, me ajusto a ellos.
- **D6. Imagen para compartir.** ¿Uso una imagen genérica de la marca o genero una por asignatura?

## 7. Orden de aplicación propuesto

1. Plantilla de examen: soluciones, H1, H2, title, descripción, `lang`, schema y enlaces relacionados (puntos 1, 3-6, 8-10).
2. Hubs por año y conexión con los breadcrumbs y la portada (7, 14, 17).
3. Layout común: Open Graph, Twitter, footer, header y 404 (20-24).
4. Portada, hubs de asignatura y páginas de tema (12, 13, 16, 18, 19).
5. Autor y E-E-A-T (11), cuando tenga los datos.
6. Contenido nuevo: writing modelo, empezando por Francés 2026 y 2025 (2).

Al terminar cada fase, compilaré, revisaré el HTML renderizado y validaré el JSON-LD.
