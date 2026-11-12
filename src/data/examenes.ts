// Convocatorias de cada curso: la ordinaria de junio, la extraordinaria de julio
// y los cuatro exámenes de reserva.

export type Tipo = "ordinaria" | "extraordinaria" | "reserva"

export interface Examen {
  slug: string
  tipo: Tipo
  titulo: string
}

export interface Curso {
  anio: number
  curso: string
  oficiales: Examen[]
  reservas: Examen[]
}

export const primerAnio = 2021
export const ultimoAnio = 2026

function examen(tipo: Tipo, titulo: string): Examen {
  return { slug: titulo.toLowerCase().replace(" ", "-"), tipo, titulo }
}

export const cursos: Curso[] = Array.from(
  { length: ultimoAnio - primerAnio + 1 },
  (_, i) => {
    const anio = ultimoAnio - i
    return {
      anio,
      curso: `${anio - 1}–${anio}`,
      oficiales: [
        examen("ordinaria", "Junio"),
        examen("extraordinaria", "Julio"),
      ],
      reservas: [1, 2, 3, 4].map((n) => examen("reserva", `Reserva ${n}`)),
    }
  },
)

export const totalExamenes = cursos.reduce(
  (n, c) => n + c.oficiales.length + c.reservas.length,
  0,
)

// Todos los exámenes de un curso, en el orden en que se celebran: junio, julio y reservas.
export function examenesDe(curso: Curso) {
  return [...curso.oficiales, ...curso.reservas]
}

// Nombre oficial de la prueba en Andalucía: PEvAU hasta 2024 y PAU desde 2025.
export function prueba(anio: number) {
  return anio >= 2025 ? "PAU" : "PEvAU"
}

export function tipoLargo(tipo: Tipo) {
  return tipo === "ordinaria"
    ? "Convocatoria ordinaria"
    : tipo === "extraordinaria"
      ? "Convocatoria extraordinaria"
      : "Examen de reserva"
}

// "junio de 2025", "reserva 2 de 2025": para anchors y textos.
export function nombreExamen(anio: number, examen: Examen) {
  return `${examen.titulo.toLowerCase()} de ${anio}`
}

// "junio", "julio (extraordinaria)", "reserva 2": para los title y las descripciones de los exámenes.
export function convocatoriaSeo(examen: Examen) {
  const nombre = examen.titulo.toLowerCase()
  return examen.tipo === "extraordinaria" ? `${nombre} (extraordinaria)` : nombre
}

export function rutaAnio(asignatura: string, anio: number) {
  return `/${asignatura}/${anio}/`
}

export function rutaExamen(asignatura: string, anio: number, examen: Examen) {
  return `/${asignatura}/${anio}/${examen.slug}/`
}

export interface Tema {
  slug: string
  titulo: string
  // Nombre del bloque en el propio examen ("Reading", "Compétence linguistique"),
  // que es como lo buscan los alumnos.
  termino?: string
  // Nombre en español que acompaña al término del examen cuando este no lo es
  // ("Reading (comprensión lectora)"), en el H1 y, si cabe, en el title.
  espanol?: string
  // Nombre abreviado para los title que no caben con el nombre completo.
  corto?: string
  // Texto propio de la página del tema: qué ejercicios entran y cómo se resuelven.
  intro?: string
  // Qué suele caer, para la página general del tema si no hay intro. Sale de leer los
  // enunciados del proyecto.
  queCae?: string
}

export function rutaTema(asignatura: string, tema: Tema, anio: number) {
  return `/${asignatura}/temas/${tema.slug}/${anio}/`
}

// Página general del tema, con los ejercicios de todos los años.
export function rutaTemaGeneral(asignatura: string, tema: Tema) {
  return `/${asignatura}/temas/${tema.slug}/`
}

// Nombre del tema como lo usa el examen: "Integrales", "Reading".
export function nombreTema(tema: Tema) {
  return tema.termino ?? tema.titulo
}

// Con el nombre en español si el del examen no lo es: "Reading (comprensión lectora)".
export function nombreCompleto(tema: Tema) {
  return tema.espanol ? `${nombreTema(tema)} (${tema.espanol})` : nombreTema(tema)
}

// Para usar dentro de una frase: "Más ejercicios de integrales", "Más ejercicios de Reading".
export function nombreEnFrase(tema: Tema) {
  return tema.termino ?? tema.titulo.charAt(0).toLowerCase() + tema.titulo.slice(1)
}

// "Ejercicio 7", "Ejercicios 7 y 8", "Bloque C, apartado b2": rótulos del frontmatter
// `ejercicios` de cada archivo de tema, juntos.
export function etiquetaEjercicios(etiquetas: string[]) {
  if (etiquetas.length > 1 && etiquetas.every((e) => /^Ejercicio [^,(]+$/.test(e))) {
    const numeros = etiquetas.map((e) => e.replace("Ejercicio ", ""))
    return `Ejercicios ${numeros.slice(0, -1).join(", ")} y ${numeros.at(-1)}`
  }
  return etiquetas.join(" y ")
}
