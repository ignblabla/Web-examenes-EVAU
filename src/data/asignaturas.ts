import { nombreCompleto, nombreTema, type Curso, type Tema } from "./examenes"

export interface Asignatura {
  slug: string
  nombre: string
  simbolo: "atom" | "graph" | "geometry" | "english" | "french"
  color: "physics" | "math" | "math-two" | "english" | "french"
  temas: Tema[]
  // Idioma del enunciado, si no es el español.
  idioma?: "en" | "fr"
  // Las asignaturas sin resolver no se indexan ni entran en el sitemap.
  indexable: boolean
  // Texto de la página de la asignatura: cómo es el examen.
  intro?: string
  // Cómo son las soluciones, para la meta descripción del examen: completa la frase
  // "resuelto paso a paso, con soluciones …". Si no cabe en 155 caracteres, se omite.
  soluciones?: string
  // Primer curso con exámenes, si la asignatura empieza después de primerAnio.
  desde?: number
  // Nombre para los title y las meta descripciones, si el nombre completo no cabe.
  nombreCorto?: string
  // Nombre aún más corto, solo para los title que no caben con "Andalucía" ("Mates CCSS").
  abreviatura?: string
  // Se añade al nombre del tema en el title de su página general si otra asignatura tiene un
  // tema con el mismo nombre (Funciones, Probabilidad…), para que los title no se repitan.
  sufijoTema?: string
  // Exámenes de reserva que existen en un curso, si no son los cuatro (en Física de 2026
  // solo se ha encontrado la reserva 1). Las demás no se muestran.
  reservas?: Record<number, number>
}

// El curso con solo las reservas que existen en la asignatura.
export function cursoDe(asignatura: Asignatura, curso: Curso): Curso {
  const n = asignatura.reservas?.[curso.anio]
  return n === undefined ? curso : { ...curso, reservas: curso.reservas.slice(0, n) }
}

// Los otros nombres de la prueba, para la intro de cada asignatura.
const otrosNombres = "antes PEvAU, también conocida como EBAU o Selectividad"

export function nombreSeo(asignatura: Asignatura) {
  return asignatura.nombreCorto ?? asignatura.nombre
}

// Nombres que se prueban, en orden, para que un title quepa sin quitar "Andalucía".
export function nombresSeo(asignatura: Asignatura) {
  return asignatura.abreviatura ? [nombreSeo(asignatura), asignatura.abreviatura] : [nombreSeo(asignatura)]
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
    slug: "matematicas-ii",
    nombre: "Matemáticas II",
    simbolo: "geometry",
    color: "math-two",
    indexable: true,
    desde: 2021,
    intro:
      `El examen de Matemáticas II de la PAU de Andalucía (${otrosNombres}) dura 1 hora y 30 minutos y todos sus ejercicios valen 2,5 puntos. Desde 2026 tiene seis: dos obligatorios y dos bloques con optatividad, en los que se elige uno de los dos ejercicios. En 2025 eran siete: uno obligatorio y tres bloques de dos ejercicios, para elegir uno en cada bloque; en 2024, ocho ejercicios en cuatro bloques de dos, y se elegía uno de cada bloque, y de 2021 a 2023, ocho en dos bloques de cuatro, y se elegían cuatro cualesquiera. Aquí tienes los exámenes resueltos paso a paso, con las figuras y siguiendo los criterios oficiales de corrección.`,
    soluciones: "justificadas y figuras",
    temas: temas([
      {
        titulo: "Matrices y determinantes",
        corto: "Matrices",
        queCae:
          "Matrices de orden 2 o 3 que a menudo dependen de un parámetro: para qué valores tienen inversa o qué rango tienen, ecuaciones matriciales como AX + B = C y determinantes que se calculan con sus propiedades.",
      },
      {
        titulo: "Sistemas de ecuaciones lineales",
        corto: "Sistemas de ecuaciones",
        queCae:
          "Discutir un sistema de tres ecuaciones según los valores de un parámetro y resolverlo en algún caso, o plantear y resolver un sistema a partir de un enunciado con precios, pedidos o las cifras de un número.",
      },
      {
        titulo: "Espacio afín y euclídeo",
        queCae:
          "Rectas y planos en el espacio: posiciones relativas, planos y rectas paralelos o perpendiculares a otros, puntos simétricos, distancias y ángulos, y áreas de triángulos y volúmenes de tetraedros con los productos vectorial y mixto.",
      },
      {
        titulo: "Límites, continuidad y derivabilidad",
        corto: "Límites y derivabilidad",
        queCae:
          "Límites que dan indeterminaciones, a menudo con logaritmos o exponenciales, y funciones definidas a trozos en las que hay que calcular parámetros para que sean continuas o derivables.",
      },
      {
        titulo: "Funciones",
        queCae:
          "Estudio de una función (monotonía, extremos, curvatura y asíntotas), rectas tangentes y normales, parámetros que se deducen de propiedades de la gráfica y problemas de optimización.",
      },
      {
        titulo: "Integrales",
        queCae:
          "Integrales indefinidas y definidas (por partes, por cambio de variable o descomponiendo en fracciones simples), la primitiva que pasa por un punto dado y áreas de recintos limitados por curvas y rectas.",
      },
      {
        titulo: "Probabilidad",
        queCae:
          "Probabilidad total y teorema de Bayes en experimentos de varias etapas, y tablas de contingencia. En Matemáticas II este tema entra en el examen desde 2025.",
      },
      {
        titulo: "Distribución binomial y normal",
        corto: "Binomial y normal",
        queCae:
          "Problemas con la distribución normal: tipificar, calcular probabilidades con la tabla y hallar la media o la desviación típica a partir de un porcentaje. Este tema entra en el examen desde 2025 y, hasta ahora, todos sus ejercicios han sido de la normal.",
      },
    ]),
  },
  {
    slug: "matematicas-aplicadas",
    nombre: "Matemáticas CCSS",
    simbolo: "graph",
    color: "math",
    indexable: true,
    desde: 2021,
    abreviatura: "Mates CCSS",
    intro:
      "Matemáticas CCSS (Matemáticas Aplicadas a las Ciencias Sociales II, las «mates sociales») es una de las asignaturas de la PAU de Andalucía (antes PEvAU, también conocida como EBAU). Su examen dura 1 hora y 30 minutos. Desde 2026 tiene cuatro ejercicios: álgebra o programación lineal (3 puntos), funciones (3 puntos) y dos de probabilidad y estadística (2 puntos cada uno), con dos opciones, A) y B), en algunos de ellos. En 2024 y 2025 eran cuatro bloques y se elegía un ejercicio de 2.5 puntos en cada uno; de 2021 a 2023, cuatro de los ocho ejercicios, de al menos tres bloques. Aquí tienes todas las convocatorias resueltas paso a paso, con las gráficas y siguiendo los criterios oficiales de corrección.",
    soluciones: "justificadas y gráficas",
    sufijoTema: "CCSS",
    temas: temas([
      {
        titulo: "Matrices y determinantes",
        corto: "Matrices",
        queCae:
          "Operaciones con matrices y sus dimensiones, valores de un parámetro para que una matriz tenga inversa o un rango dado, y ecuaciones y sistemas matriciales.",
      },
      {
        titulo: "Sistemas de ecuaciones lineales",
        corto: "Sistemas de ecuaciones",
        queCae:
          "Plantear y resolver un sistema de tres ecuaciones a partir de un enunciado (entradas vendidas, producción, números) y, a veces, clasificarlo según sus soluciones. Aparece en el examen desde 2025.",
      },
      {
        titulo: "Programación lineal",
        queCae:
          "Plantear un problema de producción o de reparto con dos variables, representar la región factible, hallar sus vértices y obtener el máximo o el mínimo de la función objetivo, normalmente un beneficio o un coste. A veces se da directamente el recinto definido por las inecuaciones.",
      },
      {
        titulo: "Funciones",
        queCae:
          "Continuidad y derivabilidad de funciones a trozos, monotonía y extremos, asíntotas, rectas tangentes, representación gráfica e integrales para calcular áreas, a menudo con un contexto económico (ingresos, costes o beneficios).",
      },
      {
        titulo: "Probabilidad",
        queCae:
          "Probabilidad condicionada, probabilidad total y teorema de Bayes con diagramas de árbol o tablas, y sucesos independientes o incompatibles a partir de probabilidades dadas.",
      },
      {
        titulo: "Distribución binomial",
        queCae:
          "La distribución binomial (probabilidad de un número exacto de éxitos o de al menos uno, media y desviación típica) y, en 2026, también la normal. Aparece en el examen desde 2025.",
      },
      {
        titulo: "Inferencia estadística",
        queCae:
          "Intervalos de confianza para la media o la proporción, error máximo y tamaño mínimo de la muestra, distribución de las medias muestrales y muestreo aleatorio estratificado con afijación proporcional.",
      },
    ]),
  },
  {
    slug: "fisica",
    nombre: "Física",
    simbolo: "atom",
    color: "physics",
    indexable: true,
    desde: 2021,
    // En 2026 solo se ha encontrado la reserva 1; de 2021 a 2025 están las cuatro.
    reservas: { 2026: 1 },
    intro:
      `El examen de Física de la PAU de Andalucía (${otrosNombres}) dura 1 hora y 30 minutos y tiene cuatro bloques: campo gravitatorio, campo electromagnético, vibraciones y ondas, y física relativista, cuántica y de partículas. En cada bloque se responde un apartado a), una cuestión de razonar que vale 1 punto, y un apartado b), un problema que vale 1,5 puntos. Desde 2026 un bloque es obligatorio y en los otros tres se elige entre dos opciones de a) y de b); en 2025 el a) era obligatorio en todos los bloques y solo se elegía el b), en 2024 cada bloque tenía dos ejercicios completos y se elegía uno, y de 2021 a 2023 se elegían libremente cuatro de los ocho ejercicios. Aquí tienes los exámenes resueltos paso a paso, con los esquemas y siguiendo los criterios oficiales de corrección.`,
    soluciones: "razonadas, esquemas y unidades",
    temas: temas([
      {
        titulo: "Campo gravitatorio",
        intro:
          "El bloque A del examen: gravitación (campo, potencial, satélites y velocidad de escape) y trabajo y energía, con planos inclinados y rozamiento. Cada ejercicio lleva su esquema de fuerzas y el balance de energía.",
      },
      {
        titulo: "Campo eléctrico y magnético",
        intro:
          "El bloque B del examen: campo y potencial eléctricos de cargas puntuales, fuerzas magnéticas sobre cargas y corrientes, e inducción electromagnética con las leyes de Faraday y Lenz.",
      },
      {
        titulo: "Ondas",
        intro:
          "La parte de vibraciones y ondas del bloque C: movimiento armónico simple, ecuación de una onda armónica, ondas estacionarias y paso de una onda de un medio a otro.",
      },
      {
        titulo: "Óptica geométrica",
        intro:
          "La parte de óptica del bloque C: lentes y espejos esféricos, con el trazado de rayos y las ecuaciones de las lentes y los espejos con el criterio de signos indicado en cada problema.",
      },
      {
        titulo: "Física cuántica y nuclear",
        intro:
          "El bloque D del examen: efecto fotoeléctrico, longitud de onda de De Broglie, reacciones nucleares y energía de enlace por nucleón.",
      },
    ]),
  },
  {
    slug: "ingles",
    nombre: "Inglés",
    simbolo: "english",
    color: "english",
    idioma: "en",
    indexable: true,
    intro:
      `El examen de Inglés de la PAU de Andalucía (${otrosNombres}) tiene tres bloques: Reading (4 puntos), Use of English (3 puntos) y Writing (3 puntos). Aquí tienes todas las convocatorias desde 2021, la ordinaria, la extraordinaria y las cuatro de reserva, con las respuestas de comprensión y de gramática explicadas una a una.`,
    soluciones: "del Reading y el Use of English",
    temas: temas([
      {
        titulo: "Comprensión lectora",
        termino: "Reading",
        espanol: "comprensión lectora",
        corto: "Reading",
        intro:
          "El Reading vale 4 puntos: preguntas de opción múltiple, afirmaciones de verdadero o falso que hay que justificar con palabras del texto y búsqueda de sinónimos o definiciones. Cada respuesta va justificada con la cita y la línea del texto.",
      },
      {
        titulo: "Uso de la lengua",
        termino: "Use of English",
        espanol: "uso de la lengua",
        corto: "Use of English",
        intro:
          "El Use of English vale 3 puntos, a 0,5 por pregunta: reescribir frases sin cambiar su significado (condicionales, pasiva, estilo indirecto, comparativos…) y, hasta 2024, también completar huecos, corregir errores o formular preguntas. Cada respuesta lleva la explicación gramatical en español.",
      },
    ]),
  },
  {
    slug: "frances",
    nombre: "Francés",
    simbolo: "french",
    color: "french",
    idioma: "fr",
    indexable: true,
    intro:
      `El examen de Francés de la PAU de Andalucía (${otrosNombres}) tiene tres bloques: compréhension, compétence linguistique y expression écrite. Hasta 2025 valían 4, 2 y 4 puntos; desde 2026 valen 5, 2 y 3, y la redacción pasa a 120-150 palabras. Aquí tienes todas las convocatorias desde 2021, con las respuestas de comprensión y de gramática explicadas una a una.`,
    soluciones: "de la compréhension y la compétence",
    temas: temas([
      {
        titulo: "Comprensión lectora",
        termino: "Compréhension",
        espanol: "comprensión lectora",
        corto: "Compréhension",
        intro:
          "La compréhension écrite vale 4 puntos (5 desde 2026): preguntas que se responden con frases del texto, verdadero o falso justificado y léxico, es decir, buscar en el texto palabras equivalentes. Cada respuesta indica la frase exacta del texto que la justifica.",
      },
      {
        titulo: "Uso de la lengua",
        termino: "Compétence linguistique",
        espanol: "gramática y vocabulario",
        corto: "Compétence linguistique",
        intro:
          "La compétence linguistique vale 2 puntos: se eligen 4 transformaciones entre las propuestas (pronombres, tiempos verbales, voz activa y pasiva, negación, participio presente…). Cada respuesta explica en español la regla que se aplica.",
      },
    ]),
  },
]

export function buscarAsignatura(slug: string) {
  const asignatura = asignaturas.find((a) => a.slug === slug)
  if (!asignatura) throw new Error(`Asignatura desconocida: ${slug}`)
  return asignatura
}

// Title de la página general de un tema (sin la asignatura, que va en el H1, la descripción
// y las migas): la primera opción que quepa en 60 caracteres. Si otra asignatura tiene un tema
// con el mismo nombre, se añade el sufijo de la asignatura (Funciones CCSS) para no repetir title.
export function tituloTemaGeneral(asignatura: Asignatura, tema: Tema) {
  const repetido = asignaturas.some(
    (a) => a.slug !== asignatura.slug && a.temas.some((t) => nombreTema(t) === nombreTema(tema)),
  )
  const sufijo = repetido && asignatura.sufijoTema ? ` ${asignatura.sufijoTema}` : ""
  const nombre = nombreCompleto(tema) + sufijo
  const corto = (tema.corto ?? nombreTema(tema)) + sufijo
  // En los idiomas, si el nombre en español no cabe, se quita antes de bajar a c) y d):
  // "Reading: ejercicios resueltos…". El nombre en español sigue en el H1 y la descripción.
  const sinEspanol = tema.espanol ? [nombreTema(tema) + sufijo] : []
  const opciones = [
    ...[nombre, ...sinEspanol].flatMap((n) => [
      `${n}: ejercicios resueltos Selectividad Andalucía`,
      `${n} Selectividad Andalucía: ejercicios resueltos`,
    ]),
    `${nombre} Selectividad Andalucía resueltos`,
    ...sinEspanol.map((n) => `${n} Selectividad Andalucía resueltos`),
    `${corto} Selectividad Andalucía resueltos`,
  ]
  return opciones.find((t) => t.length <= 60) ?? opciones.at(-1)!
}

// La otra lengua extranjera (Inglés ↔ Francés), para enlazar la misma convocatoria.
export function otraLengua(asignatura: Asignatura) {
  if (!asignatura.idioma) return undefined
  return asignaturas.find((a) => a.idioma && a.slug !== asignatura.slug)
}
