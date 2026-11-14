// Cómo era el examen de cada asignatura en cada curso, para las páginas de año
// (/<asignatura>/<año>/) y de curso (/examenes-<año>/).
//
// Sacado de las instrucciones oficiales de cada examen (src/data/cabeceras.ts) y de los
// enunciados (src/content): número de ejercicios, optatividad, puntos y palabras de la
// redacción. Al añadir un curso nuevo, añade aquí su formato a partir del examen oficial.

export interface Formato {
  desde: number
  hasta: number
  // Una o dos frases; el resumen corto va primero y se usa también en /examenes-<año>/.
  resumen: string
  detalle?: string
}

const formatos: Record<string, Formato[]> = {
  "matematicas-ii": [
    {
      desde: 2021,
      hasta: 2023,
      resumen:
        "8 ejercicios de 2,5 puntos en dos bloques, A y B, de 4 ejercicios cada uno; se hacían 4, los que quisieras, sin importar el bloque.",
      detalle:
        "Duraba 1 hora y 30 minutos y, de los 2,5 puntos de cada ejercicio, 0,25 eran para valorar la expresión correcta de los procesos y métodos. Como la elección era libre, en estos cursos un mismo tema puede aparecer en dos ejercicios del mismo examen.",
    },
    {
      desde: 2024,
      hasta: 2024,
      resumen:
        "8 ejercicios de 2,5 puntos en 4 bloques de 2; se hacía uno de cada bloque.",
      detalle:
        "Duraba 1 hora y 30 minutos y, de los 2,5 puntos de cada ejercicio, 0,25 eran para valorar la expresión correcta de los procesos y métodos. Si se respondían los dos ejercicios de un bloque, solo se corregía el que aparecía primero.",
    },
    {
      desde: 2025,
      hasta: 2025,
      resumen:
        "7 ejercicios de 2,5 puntos: uno obligatorio y tres bloques de dos, en los que se elegía uno.",
      detalle:
        "Duraba 1 hora y 30 minutos y, de los 2,5 puntos de cada ejercicio, 0,25 eran para valorar la expresión correcta de los procesos y métodos.",
    },
    {
      desde: 2026,
      hasta: 2026,
      resumen:
        "6 ejercicios de 2,5 puntos: dos obligatorios y dos bloques con optatividad de dos ejercicios, en los que se elegía uno.",
      detalle:
        "Duraba 1 hora y 30 minutos y, de los 2,5 puntos de cada ejercicio, 0,25 eran para valorar la expresión correcta de los procesos y métodos. Desde el curso 2026-2027 el examen vuelve a cambiar: siete ejercicios de 2 puntos, de los que se responden cinco.",
    },
  ],
  "matematicas-aplicadas": [
    {
      desde: 2021,
      hasta: 2023,
      resumen:
        "8 ejercicios repartidos en bloques; se elegían 4, de al menos tres bloques distintos.",
      detalle:
        "Duraba 1 hora y 30 minutos y la puntuación de cada ejercicio y de cada apartado venía en el enunciado. Se corregían los cuatro primeros ejercicios que cumplieran la condición de los bloques.",
    },
    {
      desde: 2024,
      hasta: 2024,
      resumen: "4 bloques de dos ejercicios; se elegía uno de 2,5 puntos en cada bloque.",
      detalle:
        "Duraba 1 hora y 30 minutos. Si se respondían los dos ejercicios de un bloque, solo se corregía el que aparecía primero.",
    },
    {
      desde: 2025,
      hasta: 2025,
      resumen:
        "4 ejercicios de 2,5 puntos, uno por bloque; en tres de los bloques se elegía entre dos ejercicios.",
      detalle:
        "Duraba 1 hora y 30 minutos. Si se respondían los dos ejercicios de un bloque, solo se corregía el que aparecía primero.",
    },
    {
      desde: 2026,
      hasta: 2026,
      resumen:
        "4 ejercicios: álgebra o programación lineal (3 puntos), funciones (3 puntos) y dos de probabilidad y estadística (2 puntos cada uno).",
      detalle:
        "Duraba 1 hora y 30 minutos. En algunos ejercicios se elegía entre los apartados A) y B), y si se respondían los dos solo se corregía el primero.",
    },
  ],
  fisica: [
    {
      desde: 2021,
      hasta: 2023,
      resumen:
        "8 ejercicios, dos por cada bloque (A, B, C y D); se hacían 4, elegidos libremente, aunque fueran del mismo bloque.",
      detalle:
        "Duraba 1 hora y 30 minutos. Cada ejercicio valía 2,5 puntos: el apartado a) hasta 1 punto y el b) hasta 1,5, y en cada ejercicio solo se podían usar los datos de su enunciado.",
    },
    {
      desde: 2024,
      hasta: 2024,
      resumen: "8 ejercicios, dos por cada bloque (A, B, C y D); se hacía uno de cada bloque.",
      detalle:
        "Duraba 1 hora y 30 minutos. Cada ejercicio valía 2,5 puntos: el apartado a) hasta 1 punto y el b) hasta 1,5.",
    },
    {
      desde: 2025,
      hasta: 2025,
      resumen:
        "4 ejercicios, uno por bloque, con un apartado a) obligatorio y dos apartados b) para elegir uno.",
      detalle:
        "Duraba 1 hora y 30 minutos. El apartado a) valía hasta 1 punto y el b) hasta 1,5.",
    },
    {
      desde: 2026,
      hasta: 2026,
      resumen:
        "4 ejercicios, uno por bloque: uno obligatorio y, en los otros tres, se elegía un apartado a) y un apartado b) entre dos opciones.",
      detalle:
        "Duraba 1 hora y 30 minutos. El apartado a), una cuestión de razonar, valía hasta 1 punto, y el b), un problema, hasta 1,5.",
    },
  ],
  ingles: [
    {
      desde: 2021,
      hasta: 2021,
      resumen:
        "Reading (4 puntos) con dos textos para elegir uno, Use of English (3 puntos) con 6 de 12 preguntas y Writing (3 puntos) de aproximadamente 120 palabras.",
      detalle:
        "Duraba 1 hora y 30 minutos, sin diccionario. En el Reading se respondían las 8 preguntas del texto elegido y en el Writing se escribía sobre uno de los dos temas propuestos.",
    },
    {
      desde: 2022,
      hasta: 2024,
      resumen:
        "Reading (4 puntos) con dos textos para elegir uno, Use of English (3 puntos) con 6 de 12 preguntas y Writing (3 puntos) de un mínimo de 120 palabras.",
      detalle:
        "Duraba 1 hora y 30 minutos, sin diccionario. En el Reading se respondían las 8 preguntas del texto elegido y en el Writing se escribía sobre uno de los dos temas propuestos.",
    },
    {
      desde: 2025,
      hasta: 2025,
      resumen:
        "Reading (4 puntos) con un único texto, Use of English (3 puntos) con dos opciones de 6 preguntas y Writing (3 puntos) de un mínimo de 120 palabras.",
      detalle:
        "Duraba 1 hora y 30 minutos, sin diccionario. Fue el primer año con un solo texto en el Reading: se respondían sus 8 preguntas, y en el Use of English se elegía una opción completa.",
    },
    {
      desde: 2026,
      hasta: 2026,
      resumen:
        "Reading (4 puntos) con un único texto, Use of English (3 puntos) con dos opciones de 6 preguntas y Writing (3 puntos) de 140 a 180 palabras.",
      detalle:
        "Duraba 1 hora y 30 minutos, sin diccionario. Lo nuevo de este curso fue la redacción, más larga: de 140 a 180 palabras, cuando hasta 2025 se pedía un mínimo de 120.",
    },
  ],
  frances: [
    {
      desde: 2021,
      hasta: 2024,
      resumen:
        "Compréhension (4 puntos) con dos textos para elegir uno, compétence linguistique (2 puntos) con 4 de 8 preguntas y expression (4 puntos) de 80 a 120 palabras.",
      detalle:
        "Duraba 1 hora y 30 minutos, sin diccionario ni otro material. La redacción se hacía sobre uno de los dos temas propuestos, y la presentación incorrecta podía restar hasta un punto.",
    },
    {
      desde: 2025,
      hasta: 2025,
      resumen:
        "Compréhension (4 puntos) con un único texto, compétence linguistique (2 puntos) con 4 de 8 preguntas y expression (4 puntos) de 80 a 120 palabras.",
      detalle:
        "Duraba 1 hora y 30 minutos, sin diccionario ni otro material. Fue el primer año con un solo texto en la compréhension.",
    },
    {
      desde: 2026,
      hasta: 2026,
      resumen:
        "Compréhension (5 puntos) con un único texto, compétence linguistique (2 puntos) con 4 de 5 preguntas y expression écrite (3 puntos) de 120 a 150 palabras.",
      detalle:
        "Duraba 1 hora y 30 minutos, sin diccionario ni otro material. Los bloques pasaron a llamarse I, II y III, la compréhension subió a 5 puntos y la redacción, más larga, bajó a 3.",
    },
  ],
}

export function formatoDe(asignatura: string, anio: number): Formato | undefined {
  return formatos[asignatura]?.find((f) => anio >= f.desde && anio <= f.hasta)
}

// Todos los formatos de una asignatura, del más reciente al más antiguo.
export function formatosDe(asignatura: string): Formato[] {
  return [...(formatos[asignatura] ?? [])].reverse()
}
