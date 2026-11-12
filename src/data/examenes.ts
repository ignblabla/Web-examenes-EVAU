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
  // Texto propio de la página del tema: qué ejercicios entran y cómo se resuelven.
  intro?: string
}

export function rutaTema(asignatura: string, tema: Tema, anio: number) {
  return `/${asignatura}/temas/${tema.slug}/${anio}/`
}
