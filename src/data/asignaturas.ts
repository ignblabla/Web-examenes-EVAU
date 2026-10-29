import type { Tema } from "./examenes"

export interface Asignatura {
  slug: string
  nombre: string
  titulo: string
  simbolo: "atom" | "graph" | "english" | "french"
  color: "physics" | "math" | "english" | "french"
  temas: Tema[]
  // Idioma del enunciado, si no es el español.
  idioma?: "en" | "fr"
  // Las asignaturas sin resolver no se indexan ni entran en el sitemap.
  indexable: boolean
  // Texto de la página de la asignatura: cómo es el examen.
  intro?: string
  // Qué incluye cada examen resuelto, para la meta descripción (ajustado a 140-160 caracteres).
  resuelto?: string
  // Primer curso con exámenes, si la asignatura empieza después de primerAnio.
  desde?: number
  // Nombre para los title y las meta descripciones, si el nombre completo no cabe.
  nombreCorto?: string
}

export function nombreSeo(asignatura: Asignatura) {
  return asignatura.nombreCorto ?? asignatura.nombre
}

type DatosTema = string | Omit<Tema, "slug">

function temas(datos: DatosTema[]): Tema[] {
  return datos.map((d) => {
    const tema = typeof d === "string" ? { titulo: d } : d
    return {
      ...tema,
      slug: tema.titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    }
  })
}

export const asignaturas: Asignatura[] = [
  {
    slug: "ingles",
    nombre: "Inglés",
    titulo: "Exámenes de Inglés.",
    simbolo: "english",
    color: "english",
    idioma: "en",
    indexable: true,
    intro:
      "El examen de Inglés de la Selectividad de Andalucía tiene tres bloques: Reading (4 puntos), Use of English (3 puntos) y Writing (3 puntos). Aquí tienes todas las convocatorias desde 2021, la ordinaria, la extraordinaria y las cuatro de reserva, con las respuestas de comprensión y de gramática explicadas una a una.",
    resuelto: "Reading y Use of English con cada respuesta explicada en español",
    temas: temas([
      {
        titulo: "Comprensión lectora",
        termino: "Reading",
        intro:
          "El Reading vale 4 puntos: preguntas de opción múltiple, afirmaciones de verdadero o falso que hay que justificar con palabras del texto y búsqueda de sinónimos o definiciones. Cada respuesta va justificada con la cita y la línea del texto.",
      },
      {
        titulo: "Uso de la lengua",
        termino: "Use of English",
        intro:
          "El Use of English vale 3 puntos, a 0,5 por pregunta: reescribir frases sin cambiar su significado (condicionales, pasiva, estilo indirecto, comparativos…) y, hasta 2024, también completar huecos, corregir errores o formular preguntas. Cada respuesta lleva la explicación gramatical en español.",
      },
    ]),
  },
  {
    slug: "frances",
    nombre: "Francés",
    titulo: "Exámenes de Francés.",
    simbolo: "french",
    color: "french",
    idioma: "fr",
    indexable: true,
    intro:
      "El examen de Francés de la Selectividad de Andalucía tiene tres bloques: compréhension, compétence linguistique y expression écrite. Hasta 2025 valían 4, 2 y 4 puntos; desde 2026 valen 5, 2 y 3, y la redacción pasa a 120-150 palabras. Aquí tienes todas las convocatorias desde 2021, con las respuestas de comprensión y de gramática explicadas una a una.",
    resuelto: "compréhension y compétence linguistique con cada respuesta explicada",
    temas: temas([
      {
        titulo: "Comprensión lectora",
        termino: "Compréhension",
        intro:
          "La compréhension écrite vale 4 puntos (5 desde 2026): preguntas que se responden con frases del texto, verdadero o falso justificado y léxico, es decir, buscar en el texto palabras equivalentes. Cada respuesta indica la frase exacta del texto que la justifica.",
      },
      {
        titulo: "Uso de la lengua",
        termino: "Compétence linguistique",
        intro:
          "La compétence linguistique vale 2 puntos: se eligen 4 transformaciones entre las propuestas (pronombres, tiempos verbales, voz activa y pasiva, negación, participio presente…). Cada respuesta explica en español la regla que se aplica.",
      },
    ]),
  },
  {
    slug: "matematicas-aplicadas",
    nombre: "Matemáticas aplicadas",
    titulo: "Matemáticas aplicadas.",
    simbolo: "graph",
    color: "math",
    indexable: true,
    desde: 2021,
    nombreCorto: "Matemáticas CCSS",
    intro:
      "El examen de Matemáticas Aplicadas a las Ciencias Sociales II de la PAU de Andalucía dura 1 hora y 30 minutos. Desde 2026 tiene cuatro ejercicios: álgebra o programación lineal (3 puntos), funciones (3 puntos) y dos de probabilidad y estadística (2 puntos cada uno), con dos opciones, A) y B), en algunos de ellos. En 2024 y 2025 eran cuatro bloques y se elegía un ejercicio de 2.5 puntos en cada uno; de 2021 a 2023, cuatro de los ocho ejercicios, de al menos tres bloques. Aquí tienes todas las convocatorias resueltas paso a paso, con las gráficas y siguiendo los criterios oficiales de corrección.",
    resuelto: "todos los ejercicios paso a paso y justificados",
    temas: temas([
      "Matrices y determinantes",
      "Sistemas de ecuaciones lineales",
      "Programación lineal",
      "Funciones",
      "Probabilidad",
      "Distribución binomial",
      "Inferencia estadística",
    ]),
  },
]

export function buscarAsignatura(slug: string) {
  const asignatura = asignaturas.find((a) => a.slug === slug)
  if (!asignatura) throw new Error(`Asignatura desconocida: ${slug}`)
  return asignatura
}

// La otra lengua extranjera (Inglés ↔ Francés), para enlazar la misma convocatoria.
export function otraLengua(asignatura: Asignatura) {
  if (!asignatura.idioma) return undefined
  return asignaturas.find((a) => a.idioma && a.slug !== asignatura.slug)
}
