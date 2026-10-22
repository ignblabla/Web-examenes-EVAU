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

export function rutaExamen(asignatura: string, anio: number, examen: Examen) {
  return `/${asignatura}/${anio}/${examen.slug}/`
}

export interface Tema {
  slug: string
  titulo: string
}

export function rutaTema(asignatura: string, tema: Tema, anio: number) {
  return `/${asignatura}/temas/${tema.slug}/${anio}/`
}
