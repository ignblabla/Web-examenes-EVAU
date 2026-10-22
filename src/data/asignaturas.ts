import type { Tema } from "./examenes"

export interface Asignatura {
  slug: string
  nombre: string
  titulo: string
  simbolo: "atom" | "graph" | "geometry" | "chemistry"
  color: "physics" | "math" | "math-two" | "chemistry"
  temas: Tema[]
}

function temas(titulos: string[]): Tema[] {
  return titulos.map((titulo) => ({
    titulo,
    slug: titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
  }))
}

export const asignaturas: Asignatura[] = [
  {
    slug: "fisica",
    nombre: "Física",
    titulo: "Exámenes de Física.",
    simbolo: "atom",
    color: "physics",
    temas: temas([
      "Campo gravitatorio",
      "Campo eléctrico y magnético",
      "Ondas",
      "Óptica geométrica",
      "Física cuántica y nuclear",
    ]),
  },
  {
    slug: "matematicas-aplicadas",
    nombre: "Matemáticas aplicadas",
    titulo: "Matemáticas aplicadas.",
    simbolo: "graph",
    color: "math",
    temas: temas([
      "Matrices y determinantes",
      "Sistemas de ecuaciones lineales",
      "Programación lineal",
      "Funciones",
      "Probabilidad",
      "Teoría de muestras",
      "Distribución binomial",
    ]),
  },
  {
    slug: "matematicas-ii",
    nombre: "Matemáticas II",
    titulo: "Matemáticas II.",
    simbolo: "geometry",
    color: "math-two",
    temas: temas([
      "Matrices y determinantes",
      "Sistemas de ecuaciones lineales",
      "Espacio afín y euclídeo",
      "Funciones",
      "Integrales",
      "Distribución binomial y normal",
      "Probabilidad",
    ]),
  },
  {
    slug: "quimica",
    nombre: "Química",
    titulo: "Exámenes de Química.",
    simbolo: "chemistry",
    color: "chemistry",
    temas: temas([
      "Formulación química",
      "Estructura del átomo",
      "Enlaces químicos",
      "Energía de las reacciones químicas",
      "Equilibrio químico",
      "Enlaces ácido-base",
      "Reacciones redox",
      "Equilibrio de precipitación",
      "Química orgánica",
    ]),
  },
]

export function buscarAsignatura(slug: string) {
  const asignatura = asignaturas.find((a) => a.slug === slug)
  if (!asignatura) throw new Error(`Asignatura desconocida: ${slug}`)
  return asignatura
}
