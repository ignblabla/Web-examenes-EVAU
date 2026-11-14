import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import { asignaturas } from "../data/asignaturas"
import { calendario, rutaFechas } from "../data/calendario"
import {
  cursos,
  nombreCompleto,
  rutaAnteriores,
  rutaCurso,
  rutaExtraordinaria,
  rutaNombres,
  rutaTemaGeneral,
} from "../data/examenes"
import { orientacionesDe, rutaOrientaciones } from "../data/orientaciones"
import { autor, contacto, sitio } from "../data/sitio"

// llms.txt (https://llmstxt.org): qué es la web y sus secciones principales, para los
// asistentes de IA. Se genera en cada build a partir de los mismos datos que las páginas, así
// que al añadir exámenes, temas u orientaciones se actualiza solo.
export const GET: APIRoute = async ({ site }) => {
  const url = (ruta: string) => new URL(ruta, site).href
  const examenes = await getCollection("examenes")
  const ejercicios = await getCollection("ejercicios")
  const publicadas = asignaturas.filter((a) => a.indexable)

  const aniosDe = (slug?: string) =>
    cursos
      .map((c) => c.anio)
      .filter((anio) => examenes.some((e) => e.data.anio === anio && (!slug || e.data.asignatura === slug)))
      .sort((a, b) => a - b)
  const anios = aniosDe()
  const rango = `de ${anios[0]} a ${anios.at(-1)}`
  const nombres = publicadas.map((a) => a.nombre)

  const lineas = [
    `# ${sitio.nombre}`,
    "",
    `> Exámenes oficiales de Selectividad de Andalucía (PAU desde 2025, PEvAU hasta 2024; también llamada EBAU) ${rango}, resueltos paso a paso y explicados en español. Para el alumnado de 2.º de Bachillerato de Andalucía.`,
    "",
    `Asignaturas: ${nombres.slice(0, -1).join(", ")} y ${nombres.at(-1)}. De cada curso están la convocatoria ordinaria (junio), la extraordinaria (julio) y los exámenes de reserva disponibles.`,
    "",
    `Los enunciados son los oficiales de cada convocatoria. Las soluciones y las explicaciones son propias, de ${autor.nombre} (${url(autor.ruta)}), y siguen los criterios oficiales de corrección cuando están publicados. La web no está vinculada a las universidades andaluzas ni a la Junta de Andalucía. Es gratuita y no pide registro.`,
    "",
    "Cada examen está en /<asignatura>/<año>/<junio|julio|reserva-1…reserva-4>/, por ejemplo " +
      `${url(`/${publicadas[0].slug}/${anios.at(-1)}/junio/`)}`,
    "",
    "## Asignaturas",
    "",
    ...publicadas.map((a) => {
      const suyos = aniosDe(a.slug)
      return `- [${a.nombre}](${url(`/${a.slug}/`)}): exámenes de ${suyos[0]} a ${suyos.at(-1)}`
    }),
    "",
    "## Exámenes por año",
    "",
    ...[...anios].reverse().map((anio) => `- [Selectividad Andalucía ${anio}](${url(rutaCurso(anio))}): todas las asignaturas`),
    `- [Convocatoria extraordinaria](${url(rutaExtraordinaria)}): los exámenes de julio de todos los años`,
    `- [Exámenes de años anteriores](${url(rutaAnteriores)}): PEvAU y PAU`,
    "",
    "## Ejercicios por temas",
    "",
    ...publicadas.flatMap((a) => {
      const temas = a.temas.filter((t) => ejercicios.some((e) => e.data.asignatura === a.slug && e.data.tema === t.slug))
      return temas.length
        ? [`### ${a.nombre}`, "", ...temas.map((t) => `- [${nombreCompleto(t)}](${url(rutaTemaGeneral(a.slug, t))})`), ""]
        : []
    }),
    "## Orientaciones oficiales explicadas",
    "",
    ...publicadas.flatMap((a) => {
      const o = orientacionesDe(a.slug)
      return o ? [`- [Orientaciones de ${a.nombre} para la PAU ${o.anio}](${url(rutaOrientaciones(a.slug))}): curso ${o.curso}`] : []
    }),
    "",
    "## La prueba",
    "",
    `- [Fechas de la PAU ${calendario.anio} en Andalucía](${url(rutaFechas)}): calendario y horario`,
    `- [PAU, PEvAU, EBAU o Selectividad: ¿es lo mismo?](${url(rutaNombres)})`,
    "",
    "## Optional",
    "",
    `- [Sobre el autor](${url(autor.ruta)})`,
    `- [${contacto.nombre}](${url(contacto.ruta)})`,
    `- [Sitemap](${url("/sitemap-index.xml")})`,
    "",
  ]
  return new Response(lineas.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
