// Páginas de orientaciones (/<asignatura>/orientaciones/): las directrices y orientaciones
// oficiales de cada asignatura explicadas. Todo el contenido sale del documento oficial, que
// está en fuentes/orientaciones/ (fuera de public/, así que no se publica). No se añade nada
// que no esté en él; lo que no aparece queda como TODO.

export interface BloqueContenido {
  titulo: string
  // Qué entra, en lenguaje claro.
  entra: string[]
  // Slugs de los temas de la asignatura que corresponden al bloque (página general de cada uno).
  temas: string[]
  // Ejercicios resueltos de exámenes anteriores: tema, año y convocatoria. Los rótulos
  // ("Ejercicio 3.1") salen de src/data/ejercicios.ts.
  ejemplos: { tema: string; anio: number; convocatoria: string }[]
}

export interface Orientaciones {
  asignatura: string
  // Curso del documento, tal como lo escribe ("2026-2027"), y el año corto para los title.
  curso: string
  anio: number
  // URL oficial del PDF.
  url: string
  // Día en que se consultó el documento oficial (AAAA-MM-DD). No es la fecha del documento:
  // los documentos no la llevan impresa y no se usa la de los metadatos del PDF.
  consultado: string
  // Quién lo elabora, solo si el documento lo nombra ("la Ponencia de Francés"). Si no, la
  // página habla del documento oficial de directrices y orientaciones de la PAU de Andalucía.
  autoria?: string
  // Última revisión de la página (AAAA-MM-DD). Se cambia a mano al revisarla.
  publicado: string
  revisado: string
  resumen: string[]
  estructura: {
    // Filas de la tabla: parte, ejercicios, cómo se eligen y puntuación.
    filas: { parte: string; ejercicios: string; eleccion: string; puntos: string }[]
    total: string
    notas: string[]
  }
  bloquesIntro: string
  bloques: BloqueContenido[]
  // Qué cambia respecto al examen de 2026, comparado con sus instrucciones oficiales
  // (src/data/cabeceras.ts). Si no se puede deducir de documentos oficiales, se omite.
  cambios?: { fuente: string; filas: { aspecto: string; antes: string; ahora: string }[]; igual: string }
  criterios: { puntua: string[]; penaliza: string[] }
  materiales?: string[]
  // Otras cosas que incluye el documento, para la sección del enlace oficial.
  incluye?: string
  faqs: { pregunta: string; respuesta: string }[]
}

export const orientaciones: Orientaciones[] = [
  {
    asignatura: "matematicas-ii",
    curso: "2026-2027",
    anio: 2027,
    url: "https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/examanes_anios_anteriores/selectividad/sel_2026-2027-Orientaciones_matematicas.pdf",
    consultado: "2026-11-12",
    publicado: "2026-11-12",
    revisado: "2026-11-12",
    resumen: [
      "El examen dura 1 hora y 30 minutos y tiene 7 ejercicios, de los que respondes 5. Cada uno vale 2 puntos.",
      "Los ejercicios 1, 2 y 3 son obligatorios. Los ejercicios 4 y 5 tienen dos opciones cada uno, de la misma área, y eliges una de cada.",
      "Entre los cinco que respondes hay 2 de Análisis, 1 de Álgebra, 1 de Geometría y 1 de Estadística y Probabilidad.",
      "El ejercicio 1 es competencial y contextualizado (un problema con contexto) y puede ser de cualquiera de las cuatro áreas.",
      "En cada ejercicio, 0,2 puntos son por expresarte bien: lenguaje matemático correcto, razonamiento y justificación. Los errores en operaciones elementales restan como máximo 0,2 puntos por ejercicio.",
      "Puedes usar calculadora no programable ni gráfica y regla, y te dan la tabla de la normal.",
      "No se piden demostraciones de teoremas y ningún ejercicio es solo teórico.",
    ],
    estructura: {
      filas: [
        {
          parte: "Parte obligatoria",
          ejercicios: "Ejercicios 1, 2 y 3",
          eleccion: "Se responden los tres, sin opciones",
          puntos: "6 (2 cada uno)",
        },
        {
          parte: "Bloque con optatividad 1",
          ejercicios: "Ejercicio 4.1 o 4.2",
          eleccion: "Uno de los dos, de la misma área",
          puntos: "2",
        },
        {
          parte: "Bloque con optatividad 2",
          ejercicios: "Ejercicio 5.1 o 5.2",
          eleccion: "Uno de los dos, de la misma área",
          puntos: "2",
        },
      ],
      total: "10 puntos: 5 ejercicios de 2 puntos, en 1 hora y 30 minutos",
      notas: [
        "Uno de los dos ejercicios de Análisis está entre los tres obligatorios y el otro en el ejercicio 4 o en el 5.",
        "Entre el 25 % y el 40 % de la prueba tiene enfoque competencial: el ejercicio 1 aporta siempre un 20 % y en los ejercicios 2 a 5 puede haber preguntas más conceptuales y menos mecánicas, que pesan al menos 0,5 puntos.",
        "Si respondes los dos ejercicios de un bloque con optatividad, solo se corrige el que aparece primero en tu examen.",
      ],
    },
    bloquesIntro:
      "El documento ordena los contenidos en seis «sentidos» (numérico, de la medida, espacial, algebraico, estocástico y socioafectivo). Aquí están agrupados por las cuatro áreas con las que se reparten los ejercicios del examen. También avisa de que hace falta dominar las bases de primero de Bachillerato.",
    bloques: [
      {
        titulo: "Análisis",
        entra: [
          "Límites, incluidos los laterales, con las indeterminaciones infinito menos infinito, infinito entre infinito, cero por infinito y cero entre cero, y la regla de L'Hôpital. Se usan para estudiar la continuidad y las asíntotas verticales, horizontales y oblicuas.",
          "Continuidad en un punto y en un intervalo, y los tipos de discontinuidad: evitable y de salto finito o infinito.",
          "Derivabilidad: derivadas laterales, relación entre continuidad y derivabilidad, dominio de derivabilidad, regla de la cadena y funciones definidas a trozos.",
          "Aplicaciones de la derivada: crecimiento y decrecimiento, puntos críticos, extremos relativos y absolutos, concavidad (f''(x) < 0) y convexidad (f''(x) > 0), rectas tangente y normal, y problemas de optimización interpretando el resultado en su contexto.",
          "Representar de forma aproximada funciones polinómicas, racionales, exponenciales, logarítmicas, trigonométricas y a trozos (dominio, simetrías, periodicidad, cortes con los ejes, asíntotas, monotonía, extremos y puntos de inflexión), y sacar información de una función a partir de su gráfica o de la de su derivada.",
          "Integrales: primitivas inmediatas, racionales con raíces reales en el denominador, por partes (también aplicada varias veces) y por cambio de variable; la primitiva que pasa por un punto, la regla de Barrow, áreas de recintos planos y volúmenes de revolución al girar una gráfica alrededor del eje OX.",
        ],
        temas: ["limites-continuidad-y-derivabilidad", "funciones", "integrales"],
        ejemplos: [
          { tema: "funciones", anio: 2026, convocatoria: "junio" },
          { tema: "integrales", anio: 2026, convocatoria: "junio" },
          { tema: "limites-continuidad-y-derivabilidad", anio: 2026, convocatoria: "reserva-1" },
        ],
      },
      {
        titulo: "Álgebra",
        entra: [
          "Matrices: tipos (fila, columna, cuadrada, diagonal, triangular, nula, identidad, traspuesta, simétrica y antisimétrica), operaciones y sus propiedades, y potencias de una matriz cuando se repiten de forma cíclica.",
          "Determinantes y matriz inversa de orden 3 como máximo, y rango de una matriz que puede depender de uno o dos parámetros, por Gauss o por determinantes.",
          "Ecuaciones matriciales, resueltas con la matriz inversa o pasándolas a un sistema de ecuaciones.",
          "Sistemas de ecuaciones lineales: forma matricial y matriz ampliada, teorema de Rouché-Frobenius, discusión según un parámetro (por Gauss o por rangos) y resolución por Gauss o por la regla de Cramer.",
          "Plantear sistemas y usar matrices para representar datos y situaciones de contexto real.",
        ],
        temas: ["matrices-y-determinantes", "sistemas-de-ecuaciones-lineales"],
        ejemplos: [
          { tema: "sistemas-de-ecuaciones-lineales", anio: 2026, convocatoria: "junio" },
          { tema: "matrices-y-determinantes", anio: 2026, convocatoria: "junio" },
          { tema: "matrices-y-determinantes", anio: 2026, convocatoria: "reserva-1" },
        ],
      },
      {
        titulo: "Geometría",
        entra: [
          "Vectores en el espacio: operaciones, productos escalar, vectorial y mixto (con sus propiedades y aplicaciones), base, dependencia e independencia lineal y combinaciones lineales.",
          "Ecuaciones de rectas y planos, eligiendo la expresión más adecuada en cada caso, y posiciones relativas de puntos, rectas y planos, también como discusión de un sistema de ecuaciones.",
          "Construcciones: el plano que contiene una recta y un punto exterior, el que contiene dos rectas paralelas o secantes, la perpendicular común a dos rectas que se cruzan y la recta que pasa por un punto y corta a dos rectas que se cruzan.",
          "Geometría métrica: ángulos, distancias entre puntos, rectas y planos, perpendicularidad, áreas de triángulos y paralelogramos y volúmenes de tetraedros y paralelepípedos.",
          "Simetrías: punto simétrico respecto de un punto, de un plano o de una recta; recta simétrica respecto de un plano y proyección ortogonal de una recta sobre un plano.",
        ],
        temas: ["espacio-afin-y-euclideo"],
        ejemplos: [
          { tema: "espacio-afin-y-euclideo", anio: 2026, convocatoria: "junio" },
          { tema: "espacio-afin-y-euclideo", anio: 2026, convocatoria: "julio" },
          { tema: "espacio-afin-y-euclideo", anio: 2026, convocatoria: "reserva-1" },
        ],
      },
      {
        titulo: "Estadística y Probabilidad",
        entra: [
          "Operaciones con sucesos, leyes de De Morgan, axiomas de Kolmogorov y diagramas de Venn.",
          "Experimentos compuestos, probabilidad condicionada e independencia, con diagramas de árbol y tablas de contingencia.",
          "Teoremas de la probabilidad total y de Bayes en problemas de contexto real.",
          "Variables aleatorias discretas y continuas y sus parámetros.",
          "Distribución binomial (con números combinatorios sencillos), distribución normal con la tabla de la normal estándar y aproximación de la binomial por la normal con la corrección de Yates.",
          "Se trabaja con cuatro cifras decimales. Si al buscar en la tabla de la normal al revés no aparece el valor exacto, vale cualquier criterio (la media, interpolar…).",
        ],
        temas: ["probabilidad", "distribucion-binomial-y-normal"],
        ejemplos: [
          { tema: "probabilidad", anio: 2026, convocatoria: "junio" },
          { tema: "probabilidad", anio: 2026, convocatoria: "julio" },
          { tema: "distribucion-binomial-y-normal", anio: 2026, convocatoria: "reserva-2" },
        ],
      },
    ],
    cambios: {
      fuente: "Comparado con las instrucciones oficiales del examen de junio de 2026 (curso 2025-2026).",
      filas: [
        { aspecto: "Ejercicios en el examen", antes: "6", ahora: "7" },
        { aspecto: "Ejercicios obligatorios", antes: "2", ahora: "3" },
        { aspecto: "Ejercicios que se responden", antes: "4", ahora: "5" },
        { aspecto: "Puntos por ejercicio", antes: "2,5", ahora: "2" },
        { aspecto: "Puntos por la expresión, en cada ejercicio", antes: "0,25", ahora: "0,2" },
      ],
      igual:
        "Se mantienen la duración (1 hora y 30 minutos), los dos bloques con optatividad, la calculadora no programable ni gráfica, la tabla de la normal y la regla.",
    },
    criterios: {
      puntua: [
        "Explicar el proceso de forma razonada, con rigor, la notación adecuada y justificaciones explícitas: hasta 0,2 puntos en cada ejercicio.",
        "El planteamiento: en el modelo oficial, por ejemplo, el planteamiento vale hasta 0,5 de cada apartado de 1 punto del ejercicio 1, y plantear bien la ecuación, hasta 1,5 de los 2 puntos del ejercicio 2.",
        "Los errores arrastrados no cuentan: si te equivocas en un apartado (por ejemplo, al calcular un parámetro), no se tiene en cuenta en los desarrollos posteriores, siempre que sean de complejidad equivalente.",
      ],
      penaliza: [
        "Describir el planteamiento sin llegar a resolverlo no basta para la nota completa.",
        "Si el ejercicio pide una deducción razonada, aplicar una fórmula sin más no basta.",
        "Los errores en operaciones aritméticas elementales restan hasta 0,2 puntos por ejercicio.",
        "Dar resultados de la calculadora sin justificar: todos los procesos deben estar justificados.",
        "Responder los dos ejercicios de un bloque con optatividad: solo se corrige el que aparece primero.",
        "Ortografía y redacción, solo en los ejercicios que piden redactar un texto largo: las dos primeras faltas no restan, una falta repetida cuenta una vez y desde la tercera se restan 0,1 puntos; la redacción, la coherencia y la presentación pueden restar hasta 0,5. En total, nunca más de 1 punto.",
      ],
    },
    materiales: [
      "Calculadora que no sea programable ni gráfica ni pueda almacenar o transmitir datos. No se pueden prestar calculadoras durante el examen.",
      "Regla.",
      "La tabla de la distribución normal te la dan en el examen.",
      "Las respuestas van en el papel que te entregan para el examen, nunca en los folios del enunciado.",
    ],
    incluye:
      "El documento incluye también la notación que se usa en el examen, un modelo de examen del curso 2026-2027 y los criterios específicos de corrección de ese modelo.",
    faqs: [
      {
        pregunta: "¿Cuántos ejercicios tiene el examen de Matemáticas II en la PAU de 2027?",
        respuesta:
          "Siete, de los que respondes cinco: los tres obligatorios y uno de cada uno de los dos bloques con optatividad. Cada ejercicio vale 2 puntos y el examen dura 1 hora y 30 minutos.",
      },
      {
        pregunta: "¿Se puede usar calculadora en el examen de Matemáticas II?",
        respuesta:
          "Sí, siempre que no sea programable ni gráfica ni pueda almacenar o transmitir datos. No se pueden prestar y todos los procesos deben estar justificados.",
      },
      {
        pregunta: "¿Qué pasa si respondo los dos ejercicios de un bloque optativo?",
        respuesta: "Solo se corrige el que aparece físicamente en primer lugar en tu examen.",
      },
      {
        pregunta: "¿Hay que saberse demostraciones de teoremas?",
        respuesta:
          "No. Las orientaciones dicen que no se piden demostraciones de teoremas y que ningún ejercicio es exclusivamente teórico.",
      },
    ],
  },
]

export function orientacionesDe(asignatura: string) {
  return orientaciones.find((o) => o.asignatura === asignatura)
}

export function rutaOrientaciones(asignatura: string) {
  return `/${asignatura}/orientaciones/`
}
