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
  // ("Ejercicio 3.1") salen de src/data/ejercicios.ts. Sin tema, se enlaza el examen completo
  // (el Writing y la expression écrite no tienen página de tema).
  ejemplos: { tema?: string; anio: number; convocatoria: string }[]
  // Rótulo de la lista de ejemplos, si no son ejercicios resueltos.
  tituloEjemplos?: string
  // Dato que no sale del documento oficial sino de los exámenes del proyecto ("En los exámenes
  // de 2026…"). Se pinta aparte, para que no se confunda con lo que dicen las orientaciones.
  nota?: { texto: string; tema?: string }
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
  // Título de la sección de materiales, si no hay calculadora.
  tituloMateriales?: string
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
      "El ejercicio 1 tiene carácter competencial-contextualizado y puede ser de cualquiera de las cuatro áreas.",
      "En cada ejercicio, 0,2 puntos valoran el uso correcto del lenguaje matemático, la elección de estrategias y herramientas de resolución y la toma de decisiones. Los errores en las operaciones aritméticas elementales restan como máximo 0,2 puntos por ejercicio.",
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
        "Aunque uses la calculadora, todos los procesos que llevan a los resultados tienen que estar suficientemente justificados.",
        "Responder los dos ejercicios de un bloque con optatividad: solo se corrige el que aparece primero.",
        "Ortografía y redacción, solo en los ejercicios o tareas que requieran componer un texto prolijo: las dos primeras faltas no restan, una falta repetida cuenta una vez y desde la tercera se restan 0,1 puntos; la redacción, la coherencia y la presentación pueden restar hasta 0,5. En total, nunca más de 1 punto.",
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
        pregunta: "¿Cómo es el examen de Matemáticas II de la PAU de Andalucía?",
        respuesta:
          "Dura 1 hora y 30 minutos y tiene 7 ejercicios de 2 puntos, de los que respondes 5: los tres obligatorios y uno de cada uno de los dos bloques con optatividad. Entre los cinco hay 2 de Análisis, 1 de Álgebra, 1 de Geometría y 1 de Estadística y Probabilidad.",
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
  {
    asignatura: "matematicas-aplicadas",
    curso: "2026-2027",
    anio: 2027,
    url: "https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/examanes_anios_anteriores/selectividad/sel_2026-2027-Orientaciones_matematicas_aplicadas.pdf",
    consultado: "2026-11-12",
    publicado: "2026-11-12",
    revisado: "2026-11-12",
    resumen: [
      "El examen dura 1 hora y 30 minutos y tiene 4 ejercicios, que valen 10 puntos en total.",
      "Un ejercicio de álgebra y programación lineal (3 puntos), uno de análisis (3 puntos) y dos de probabilidad y estadística, inferencia incluida (2 puntos cada uno).",
      "Algunos ejercicios pueden dejarte elegir entre un apartado A) y otro B). El 50 % de la prueba es obligatorio y el 50 % es competencial.",
      "Lo que se valora es el planteamiento y su desarrollo matemático: describirlo sin ejecutarlo no cuenta. Si respondes más apartados de los que debes, solo se corrige el primero.",
      "Los errores de cálculo operativo, no conceptuales, restan como máximo el 10 % de la puntuación del ejercicio o del apartado en el que se cometen.",
      "Aparte, la corrección gramatical, léxica y ortográfica y la presentación cuentan como máximo el 10 % de la puntuación total: hasta 1 punto sobre 10 en todo el examen.",
      "Puedes usar calculadora no programable ni gráfica, pero si sacas un resultado directamente con ella tienes que explicar con detalle los pasos para obtenerlo sin ella. Te dan la tabla de la normal.",
    ],
    estructura: {
      filas: [
        {
          parte: "Álgebra y programación lineal",
          ejercicios: "1 ejercicio",
          eleccion: "Puede tener opción A) o B)",
          puntos: "3",
        },
        {
          parte: "Análisis",
          ejercicios: "1 ejercicio",
          eleccion: "Puede tener opción A) o B)",
          puntos: "3",
        },
        {
          parte: "Probabilidad y estadística",
          ejercicios: "2 ejercicios",
          eleccion: "Pueden tener opción A) o B)",
          puntos: "4 (2 cada uno)",
        },
      ],
      total: "10 puntos: 4 ejercicios, en 1 hora y 30 minutos",
      notas: [
        "El 50 % de la prueba es obligatorio y el 50 % tiene carácter competencial.",
        "En el modelo oficial hay opciones en los ejercicios 1 y 3, pero el documento avisa de que no siempre será así, ni el carácter competencial irá siempre en los mismos ejercicios.",
        "Puedes responder en el orden que quieras y sin copiar los enunciados: basta con indicar el número y el apartado de cada ejercicio.",
      ],
    },
    bloquesIntro:
      "El documento ordena los saberes en cuatro «sentidos» (numérico, de la medida, algebraico y estocástico) y dice de qué apartados sale cada ejercicio: A1, C2 y C3 para el primero de 3 puntos; B1, B2 y C4 para el segundo, y D1, D2 y D3 para los dos de 2 puntos. Aquí están agrupados así.",
    bloques: [
      {
        titulo: "Álgebra y programación lineal (3 puntos)",
        entra: [
          "Matrices: suma y producto con sus propiedades, aplicados a problemas en contextos reales, y matrices para representar datos y situaciones reales.",
          "Determinantes de orden 3 como máximo, para calcular el rango y la matriz inversa, con sus definiciones y propiedades.",
          "Sistemas de ecuaciones: plantearlos a partir de situaciones reales y resolverlos, también por la regla de Cramer (sistemas compatibles, determinados o indeterminados, de tres ecuaciones con tres incógnitas). También inecuaciones.",
          "Ecuaciones matriciales, resueltas con la matriz inversa o pasándolas a un sistema de ecuaciones.",
          "Programación lineal: modelizar problemas reales, determinar gráficamente la región factible y calcular de forma analítica sus vértices y la solución óptima.",
          "Relaciones cuantitativas en situaciones complejas: identificar qué clase o clases de funciones pueden modelizarlas.",
        ],
        temas: ["matrices-y-determinantes", "sistemas-de-ecuaciones-lineales", "programacion-lineal"],
        ejemplos: [
          { tema: "sistemas-de-ecuaciones-lineales", anio: 2026, convocatoria: "junio" },
          { tema: "programacion-lineal", anio: 2026, convocatoria: "junio" },
          { tema: "matrices-y-determinantes", anio: 2026, convocatoria: "julio" },
        ],
      },
      {
        titulo: "Análisis (3 puntos)",
        entra: [
          "Derivadas de funciones polinómicas, racionales, irracionales, exponenciales y logarítmicas, con las reglas de derivación y la regla de la cadena, y su uso para calcular límites.",
          "Derivabilidad, también de funciones a trozos, derivadas laterales y relación entre derivabilidad y continuidad.",
          "Aplicaciones de la derivada: recta tangente en un punto, coeficientes de una función para que cumpla unas propiedades y optimización en contextos diversos.",
          "Estudio y representación de funciones polinómicas, racionales, exponenciales, logarítmicas y a trozos sencillas: extremos relativos, puntos de inflexión, crecimiento y decrecimiento, y concavidad y convexidad.",
          "Integrales: la integral definida como área bajo una curva, primitivas inmediatas simples y compuestas, regla de Barrow y cálculo de áreas.",
        ],
        temas: ["funciones"],
        ejemplos: [
          { tema: "funciones", anio: 2026, convocatoria: "junio" },
          { tema: "funciones", anio: 2026, convocatoria: "julio" },
          { tema: "funciones", anio: 2026, convocatoria: "reserva-1" },
        ],
      },
      {
        titulo: "Probabilidad y estadística (2 ejercicios de 2 puntos)",
        entra: [
          "Experimentos compuestos, probabilidad condicionada e independencia, con diagramas de árbol y tablas de contingencia, y problemas con los axiomas de Kolmogorov o diagramas de Venn.",
          "Teoremas de la probabilidad total y de Bayes en problemas de contexto real.",
          "Variables aleatorias discretas y continuas, distribuciones binomial y normal, y cuándo se puede aproximar la binomial por la normal: hay que comprobar que n·p ≥ 5 y n·(1 − p) ≥ 5 y usar la corrección por continuidad.",
          "Inferencia: técnicas de muestreo y representatividad de una muestra, estimación puntual y por intervalo, y distribución de la media y de la proporción muestrales.",
          "Intervalos de confianza para la media de una normal con desviación típica conocida y para una proporción, tamaño muestral mínimo y relación entre confianza, error y tamaño de la muestra.",
          "Las muestras se entienden obtenidas por muestreo aleatorio simple (con reemplazamiento en poblaciones finitas) y son grandes si n ≥ 30. Si al buscar en la tabla de la normal al revés no aparece el valor, valen la interpolación o el valor más cercano.",
        ],
        temas: ["probabilidad", "distribucion-binomial", "inferencia-estadistica"],
        ejemplos: [
          { tema: "probabilidad", anio: 2026, convocatoria: "junio" },
          { tema: "distribucion-binomial", anio: 2026, convocatoria: "julio" },
          { tema: "inferencia-estadistica", anio: 2026, convocatoria: "junio" },
        ],
      },
    ],
    cambios: {
      fuente:
        "Comparado con las instrucciones oficiales del examen de junio de 2026 (curso 2025-2026) y la puntuación de sus ejercicios.",
      filas: [
        { aspecto: "Duración", antes: "1 hora y 30 minutos", ahora: "1 hora y 30 minutos" },
        { aspecto: "Ejercicios", antes: "4", ahora: "4" },
        { aspecto: "Puntos de cada ejercicio", antes: "3, 3, 2 y 2", ahora: "3, 3, 2 y 2" },
        { aspecto: "Opciones", antes: "A) o B) en algunos ejercicios", ahora: "A) o B) en algunos ejercicios" },
        {
          aspecto: "Corrección gramatical, léxica y ortográfica y presentación",
          antes: "No superior al 10 %",
          ahora: "Como máximo el 10 % de la puntuación total (1 punto sobre 10)",
        },
      ],
      igual:
        "No hay cambios en la estructura: el examen de 2027 se plantea igual que el de 2026. Las instrucciones de 2026 no hablaban de los errores de cálculo; el documento de 2027 los limita al 10 % de la puntuación del ejercicio o apartado, una regla distinta de la de la corrección gramatical.",
    },
    criterios: {
      puntua: [
        "El planteamiento de cada ejercicio y su desarrollo matemático.",
        "El orden, la claridad de exposición y la capacidad de síntesis.",
        "Usar el lenguaje y la notación adecuados, justificar y razonar de forma explícita e interpretar la solución en el contexto del problema.",
        "En el modelo oficial, por ejemplo, plantear el sistema del ejercicio 1 A) vale hasta 0,75 puntos, y el planteamiento del problema de programación lineal, 1 punto de 3.",
      ],
      penaliza: [
        "Describir el planteamiento sin llevarlo a cabo no se tiene en cuenta.",
        "Errores de cálculo operativo, no conceptuales: como máximo el 10 % de la puntuación asignada al ejercicio o al apartado correspondiente.",
        "Dar un resultado obtenido con la calculadora sin explicar con detalle los pasos para llegar a él sin ella.",
        "Responder más apartados de los que debes: solo se corrige el que aparece en primer lugar.",
        "Corrección gramatical, léxica y ortográfica y presentación (Real Decreto 534/2024): como máximo el 10 % de la puntuación total, es decir, nunca más de 1 punto sobre 10 en todo el examen. Solo se aplica si hay un texto prolijo: las dos primeras faltas no restan, una falta repetida cuenta una vez y desde la tercera se restan 0,10 puntos; los errores de redacción, coherencia, cohesión, léxico, gramática y presentación pueden restar hasta 0,5.",
      ],
    },
    materiales: [
      "Útiles de escritura y regla.",
      "Calculadora que no sea programable ni gráfica ni pueda almacenar o transmitir datos. Si obtienes un resultado directamente con ella, explica con detalle los pasos para obtenerlo sin calculadora.",
      "La tabla de la distribución normal te la dan en el examen.",
    ],
    incluye:
      "El documento incluye también la notación del examen (por ejemplo, 7.5 se escribe con punto decimal), la tabla de la normal, un modelo de examen y sus criterios específicos de corrección.",
    faqs: [
      {
        pregunta: "¿Cómo es el examen de Matemáticas CCSS de la PAU de Andalucía?",
        respuesta:
          "Dura 1 hora y 30 minutos y tiene 4 ejercicios: uno de 3 puntos de matrices, sistemas y programación lineal, otro de 3 puntos de análisis y dos de 2 puntos de probabilidad y estadística. Algunos ejercicios pueden tener opción A) o B).",
      },
      {
        pregunta: "¿Hay que elegir entre opciones en el examen de Matemáticas CCSS?",
        respuesta:
          "En algunos ejercicios se puede elegir entre un apartado A) y otro B). Si respondes los dos, solo se corrige el primero. El 50 % de la prueba es obligatorio.",
      },
      {
        pregunta: "¿Se puede usar calculadora en Matemáticas CCSS?",
        respuesta:
          "Sí, siempre que no sea programable ni gráfica ni pueda almacenar o transmitir datos. Si sacas un resultado directamente con ella, tienes que explicar los pasos para obtenerlo sin calculadora.",
      },
      {
        pregunta: "¿Entra la inferencia estadística?",
        respuesta:
          "Sí: intervalos de confianza para la media y para la proporción, tamaño muestral mínimo y la relación entre confianza, error y tamaño de la muestra.",
      },
    ],
  },
  {
    asignatura: "fisica",
    curso: "2026-2027",
    anio: 2027,
    url: "https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/examanes_anios_anteriores/selectividad/sel_2026-2027-Orientaciones_fisica.pdf",
    consultado: "2026-11-12",
    publicado: "2026-11-12",
    revisado: "2026-11-12",
    resumen: [
      "El examen tiene 4 ejercicios, uno por bloque: campo gravitatorio, campo electromagnético, vibraciones y ondas (con la óptica geométrica) y física relativista, cuántica, nuclear y de partículas.",
      "Un ejercicio es obligatorio y puede ser de cualquier bloque. En los otros tres eliges un apartado a) y un apartado b) entre los dos que se proponen.",
      "Cada ejercicio vale 2,5 puntos: el a), una cuestión teórica, hasta 1 punto, y el b), un problema, hasta 1,5.",
      "El ejercicio obligatorio puede tratar de aplicaciones tecnológicas o industriales, basarse en un texto o un gráfico o tener un contexto narrativo.",
      "Hay expresiones que siempre hay que deducir antes de usarlas, como la velocidad orbital, la velocidad de escape o el ángulo límite.",
      "Restan 0,1 puntos los errores de unidades (hasta 0,25 por apartado b), de notación vectorial, de redondeo, de prefijos y al copiar los datos.",
      "Material: bolígrafo de un solo color (azul o negro), regla graduada, compás y calculadora no programable ni gráfica.",
    ],
    estructura: {
      filas: [
        {
          parte: "Ejercicio obligatorio",
          ejercicios: "1 ejercicio, de cualquier bloque (A a D)",
          eleccion: "Un apartado a) y un b), los dos obligatorios",
          puntos: "2,5 (a: 1; b: 1,5)",
        },
        {
          parte: "Ejercicios optativos",
          ejercicios: "Los otros 3 bloques",
          eleccion: "En cada uno, un a) de dos y un b) de dos",
          puntos: "7,5 (2,5 cada uno)",
        },
      ],
      // TODO: el documento no indica la duración del examen (las instrucciones de 2026 decían
      // 1 hora y 30 minutos). No se da como dato de 2027 hasta que lo diga una fuente oficial.
      total:
        "10 puntos: 4 ejercicios de 2,5 puntos. El documento de orientaciones no indica la duración (en 2026 fue de 1 hora y 30 minutos).",
      notas: [
        "El apartado a) es una cuestión teórica: validez de modelos y teorías, relaciones de causa y efecto, analogías y diferencias, interpretación de fenómenos cotidianos o análisis de si una afirmación es verdadera o falsa.",
        "El apartado b) es un problema que se resuelve solo con los datos del enunciado: explicar la situación y las leyes, resolverlo y comentar los resultados, o justificar qué cambiaría si se modifica algún dato o hipótesis.",
        "Si respondes los dos a) o los dos b) de un ejercicio optativo, solo se tiene en cuenta el primero.",
        "En el modelo oficial el obligatorio es el bloque D, pero el documento insiste en que puede ser cualquiera.",
      ],
    },
    bloquesIntro:
      "El documento sigue los cuatro bloques del currículo y añade comentarios que aclaran hasta dónde llega cada uno, aunque avisa de que no son una lista cerrada de los ejercicios posibles. También puede hacer falta Física y Matemáticas de cursos anteriores.",
    bloques: [
      {
        titulo: "A) Campo gravitatorio",
        entra: [
          "Ley de gravitación universal, campo y potencial gravitatorios, fuerzas conservativas y energía potencial: lo que tiene sentido físico es la diferencia de energía potencial entre dos puntos.",
          "Problemas con, como máximo, dos masas que actúan sobre una tercera, con el principio de superposición y tratando bien los vectores.",
          "Balances de energía y movimientos cerca de la superficie terrestre en casos sencillos (cuerpos apoyados, con o sin rozamiento), con el esquema de fuerzas.",
          "Satélites y planetas: velocidad orbital, velocidad de escape, órbita geoestacionaria, leyes de Kepler y momento angular de una partícula y su conservación.",
          "No se pide el gradiente ni deducir la expresión del campo gravitatorio terrestre.",
        ],
        temas: ["campo-gravitatorio"],
        ejemplos: [
          { tema: "campo-gravitatorio", anio: 2026, convocatoria: "junio" },
          { tema: "campo-gravitatorio", anio: 2026, convocatoria: "julio" },
          { tema: "campo-gravitatorio", anio: 2026, convocatoria: "reserva-1" },
        ],
      },
      {
        titulo: "B) Campo electromagnético",
        entra: [
          "Ley de Coulomb y campo y potencial eléctricos de cargas puntuales, con dos cargas como máximo actuando sobre una tercera, y trabajo al desplazar una carga.",
          "Movimiento de cargas en campos eléctricos y magnéticos y ley de Lorentz (solo su expresión). El campo magnético no es conservativo y no tiene energía potencial.",
          "Campo magnético de una corriente rectilínea y fuerza entre corrientes paralelas, también con dos corrientes superpuestas. No se piden las expresiones del campo de una espira, una bobina o un solenoide.",
          "Flujo magnético en superficies planas e inducción electromagnética: leyes de Faraday-Henry y Lenz, fuerza electromotriz inducida y sentido de la corriente.",
        ],
        temas: ["campo-electrico-y-magnetico"],
        ejemplos: [
          { tema: "campo-electrico-y-magnetico", anio: 2026, convocatoria: "junio" },
          { tema: "campo-electrico-y-magnetico", anio: 2026, convocatoria: "julio" },
          { tema: "campo-electrico-y-magnetico", anio: 2026, convocatoria: "reserva-1" },
        ],
      },
      {
        titulo: "C) Vibraciones y ondas (con la óptica geométrica)",
        entra: [
          "Movimiento armónico simple: magnitudes, ecuación de movimiento (sin deducirla), con seno o coseno, y balance de energía; péndulos y muelles.",
          "Ondas armónicas unidimensionales: ecuación y magnitudes, distinguiendo la velocidad de propagación de la de vibración, y ondas estacionarias en una cuerda.",
          "Fenómenos ondulatorios de forma cualitativa: principio de Huygens, interferencia, difracción, reflexión, refracción y dispersión, y ondas electromagnéticas y su espectro.",
          "Reflexión y refracción de la luz: sus leyes, ángulo límite, reflexión total e imagen virtual.",
          "Óptica geométrica: espejos planos y esféricos y lentes delgadas, con la construcción gráfica, las características de la imagen y el cálculo analítico indicando el criterio de signos. No hay que calcular la focal a partir de los radios.",
        ],
        temas: ["ondas", "optica-geometrica"],
        ejemplos: [
          { tema: "ondas", anio: 2026, convocatoria: "junio" },
          { tema: "optica-geometrica", anio: 2026, convocatoria: "junio" },
          { tema: "ondas", anio: 2026, convocatoria: "julio" },
        ],
      },
      {
        titulo: "D) Física relativista, cuántica, nuclear y de partículas",
        entra: [
          "Insuficiencia de la física clásica, hipótesis de Planck y efecto fotoeléctrico, con problemas de aplicación directa de sus ecuaciones.",
          "Dualidad onda-corpúsculo y principio de incertidumbre, también con aplicación directa de sus ecuaciones.",
          "Núcleo atómico e isótopos, energía de enlace, defecto de masa y equivalencia masa-energía, y curva de estabilidad. No se piden los modelos nucleares.",
          "Radiactividad: tipos, leyes de desplazamiento y ley de desintegración (actividad, constante de desintegración y periodo de semidesintegración).",
          "Fisión y fusión, ajuste de reacciones nucleares y balances masa-energía, y las cuatro interacciones fundamentales.",
        ],
        temas: ["fisica-cuantica-y-nuclear"],
        ejemplos: [
          { tema: "fisica-cuantica-y-nuclear", anio: 2026, convocatoria: "junio" },
          { tema: "fisica-cuantica-y-nuclear", anio: 2026, convocatoria: "julio" },
          { tema: "fisica-cuantica-y-nuclear", anio: 2026, convocatoria: "reserva-1" },
        ],
      },
    ],
    cambios: {
      fuente: "Comparado con las instrucciones oficiales del examen de junio de 2026 (curso 2025-2026).",
      filas: [
        { aspecto: "Ejercicios", antes: "4, uno por bloque", ahora: "4, uno por bloque" },
        { aspecto: "Ejercicio obligatorio", antes: "1, con a) y b) obligatorios", ahora: "1, con a) y b) obligatorios" },
        { aspecto: "Ejercicios optativos", antes: "3, eligiendo un a) y un b)", ahora: "3, eligiendo un a) y un b)" },
        { aspecto: "Puntos por ejercicio", antes: "2,5 (a: 1; b: 1,5)", ahora: "2,5 (a: 1; b: 1,5)" },
        { aspecto: "Duración", antes: "1 hora y 30 minutos", ahora: "El documento no la indica" },
        {
          aspecto: "Material",
          antes: "Regla, compás y calculadora",
          ahora: "Bolígrafo azul o negro, regla graduada, compás y calculadora",
        },
      ],
      igual:
        "La estructura es la misma que en 2026. El documento no indica la duración y menciona el bolígrafo de un solo color (azul o negro), que no aparecía en las instrucciones del examen de 2026.",
    },
    criterios: {
      puntua: [
        "Analizar la situación física: separar los fenómenos, las leyes que los rigen y su ámbito de validez, las variables y sus relaciones de causa y efecto, e interpretar bien el enunciado.",
        "Relacionar el problema con la experiencia cotidiana y describir en términos científicos situaciones corrientes.",
        "Claridad, orden lógico y precisión: el camino más corto, el lenguaje matemático, la interpretación de los resultados, los esquemas y gráficas y el uso correcto de las unidades.",
        "En el apartado b), interpretar bien la situación se valora apreciablemente aunque no llegues al resultado final.",
      ],
      penaliza: [
        "No deducir antes de usarlas las expresiones que el documento exige deducir siempre: la velocidad orbital, la velocidad de escape, la energía mecánica en una órbita circular, la tercera ley de Kepler, el periodo orbital, el radio de giro de una carga, la fuerza por unidad de longitud entre hilos, la velocidad de una carga acelerada o frenada por una diferencia de potencial, los nodos y vientres, la diferencia de fase entre dos puntos, la velocidad y la aceleración máximas de vibración y el ángulo límite. En óptica, no explicar el trazado de rayos o no indicar el criterio de signos.",
        "Unidades ausentes o incorrectas en los datos, los resultados intermedios o el resultado final: 0,1 puntos por cada una, hasta 0,25 por apartado b). También si se piden unas unidades concretas y das otras.",
        "0,1 puntos por: omitir el símbolo de vector más de una vez (o ponerlo en un escalar), redondear un resultado intermedio más de un 5 %, usar mal los prefijos, un resultado que difiere en un múltiplo de 10 o copiar mal un dato.",
        "Ortografía y redacción: las dos primeras faltas no restan, una falta repetida cuenta una vez y desde la tercera se restan 0,10 puntos por falta; la redacción, la coherencia y la presentación pueden restar hasta 0,5. Nunca más de 1 punto en total.",
      ],
    },
    materiales: [
      "Bolígrafo de un solo color, azul o negro.",
      "Regla graduada y compás.",
      "Calculadora que no sea programable ni gráfica ni pueda almacenar o transmitir datos.",
    ],
    incluye:
      "El documento incluye también los criterios de evaluación de cada bloque, un modelo de examen y la aplicación de los criterios de corrección a ese modelo.",
    faqs: [
      {
        pregunta: "¿Cómo es el examen de Física de la PAU de Andalucía?",
        respuesta:
          "Tiene 4 ejercicios, uno por bloque: campo gravitatorio, campo electromagnético, vibraciones y ondas, y física relativista, cuántica, nuclear y de partículas. Uno es obligatorio y en los otros tres eliges un apartado a) y un b) entre dos. Cada ejercicio vale 2,5 puntos: hasta 1 el a), una cuestión teórica, y hasta 1,5 el b), un problema.",
      },
      {
        pregunta: "¿Qué bloque es el obligatorio en Física?",
        respuesta:
          "Puede ser cualquiera de los cuatro. En el modelo oficial es el D, pero el documento avisa de que en el examen puede tocar otro.",
      },
      {
        pregunta: "¿Qué expresiones hay que deducir siempre en Física?",
        respuesta:
          "Entre otras, la velocidad orbital, la velocidad de escape, la energía mecánica en una órbita circular, la tercera ley de Kepler, el radio de giro de una carga y el ángulo límite. Ante la duda, dedúcela.",
      },
      {
        pregunta: "¿Cuánto restan los errores de unidades?",
        respuesta: "0,1 puntos por cada unidad ausente o incorrecta, hasta un máximo de 0,25 en cada apartado b).",
      },
    ],
  },
  {
    asignatura: "ingles",
    curso: "2026-2027",
    anio: 2027,
    url: "https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/examanes_anios_anteriores/selectividad/sel_2026-2027-Orientaciones_ingles.pdf",
    consultado: "2026-11-12",
    autoria: "la Ponencia de Lengua Extranjera (Inglés)",
    publicado: "2026-11-12",
    revisado: "2026-11-12",
    resumen: [
      "El examen dura 1 hora y 30 minutos y tiene tres bloques: Comprehension (Reading) (4 puntos), Use of English (3 puntos) y Writing (3 puntos).",
      "Comprehension (Reading): un texto de 350 a 500 palabras con 8 preguntas de 0,5 puntos (2 de opción múltiple, 4 de verdadero o falso y 2 de vocabulario). No tiene opciones.",
      "Use of English: eliges una de dos opciones de 6 preguntas, de 0,5 puntos cada una, que evalúan el uso y la comprensión del vocabulario y de las estructuras de la lengua. Solo se responden las preguntas de la opción elegida.",
      "Writing: una redacción de 140 a 180 palabras sobre uno de los dos temas propuestos.",
      "En el verdadero o falso hay que justificar copiando las palabras exactas del texto, en una oración como máximo y sin puntos suspensivos. Sin justificación, la pregunta vale 0.",
      "No se permite el diccionario ni ningún otro material de apoyo.",
      "Si das más de una respuesta, solo cuenta la que aparece en primer lugar.",
    ],
    estructura: {
      filas: [
        {
          parte: "Bloque A · Comprehension (Reading)",
          ejercicios: "8 preguntas sobre un texto",
          eleccion: "Se responden todas, sin opciones",
          puntos: "4 (0,5 cada pregunta)",
        },
        {
          parte: "Bloque B · Use of English",
          ejercicios: "6 preguntas de vocabulario y estructuras de la lengua",
          eleccion: "Solo las de una de las dos opciones (B1-B6 o B7-B12)",
          puntos: "3 (0,5 cada pregunta)",
        },
        {
          parte: "Bloque C · Writing",
          ejercicios: "1 redacción de 140 a 180 palabras",
          eleccion: "Uno de los dos temas (C1 o C2)",
          puntos: "3",
        },
      ],
      total: "10 puntos, en 1 hora y 30 minutos",
      notas: [
        "Salvo el encabezado, el examen está entero en inglés, y las respuestas tienen que ir exclusivamente en inglés.",
        "En el bloque B no se pueden combinar preguntas de las dos opciones.",
        "Conviene responder en el orden del examen y, en cualquier caso, identificar cada respuesta sin ambigüedad.",
      ],
    },
    bloquesIntro:
      "El documento no da un temario de gramática ni de vocabulario: describe cómo es cada bloque y cómo se corrige. Esto es lo que entra en cada uno.",
    bloques: [
      {
        titulo: "Bloque A: Comprehension (Reading)",
        entra: [
          "Un texto de 350 a 500 palabras, de fuentes auténticas más o menos adaptadas (puede llevar notas aclaratorias) y en lenguaje no especializado: informativo, argumentativo, descriptivo o narrativo.",
          "2 preguntas de opción múltiple (A, B, C o D), sin puntuación parcial.",
          "4 afirmaciones de verdadero o falso que se justifican copiando las palabras exactas del texto. No vale justificar con tus palabras, ni dar solo el número de línea, ni usar puntos suspensivos.",
          "2 preguntas de vocabulario, cada una con dos partes de 0,25: encontrar un sinónimo o un antónimo y una palabra que corresponda a una definición.",
        ],
        temas: ["comprension-lectora"],
        ejemplos: [
          { tema: "comprension-lectora", anio: 2026, convocatoria: "junio" },
          { tema: "comprension-lectora", anio: 2026, convocatoria: "julio" },
          { tema: "comprension-lectora", anio: 2026, convocatoria: "reserva-1" },
        ],
      },
      {
        titulo: "Bloque B: Use of English",
        entra: [
          "Dos opciones de seis preguntas cada una, que evalúan el uso y la comprensión del vocabulario (aspectos léxicos) y de las estructuras de la lengua (estructuras lingüístico-discursivas).",
          "Solo se responden las preguntas de la opción elegida: B1 a B6 o B7 a B12, sin mezclarlas.",
          "Cada pregunta vale 0,5: correcta, 0,5; con un error, 0,25; con dos o más, 0.",
          "El vocabulario de los enunciados no tiene por qué coincidir con el tema del texto.",
        ],
        nota: {
          texto:
            "En los exámenes de 2026 cayeron preguntas de un solo tipo: reescribir frases sin cambiar su significado, empezando como se indica o usando una palabra dada (WISH, MUST, MAY, MIGHT, WHICH, WHERE, LIKELY, BETTER, PREFER…). Este dato sale de esos exámenes, no del documento oficial.",
          tema: "uso-de-la-lengua",
        },
        temas: ["uso-de-la-lengua"],
        ejemplos: [
          { tema: "uso-de-la-lengua", anio: 2026, convocatoria: "junio" },
          { tema: "uso-de-la-lengua", anio: 2026, convocatoria: "julio" },
          { tema: "uso-de-la-lengua", anio: 2026, convocatoria: "reserva-1" },
        ],
      },
      {
        titulo: "Bloque C: Writing",
        entra: [
          "Una redacción de 140 a 180 palabras sobre uno de los dos temas, indicando el número de palabras. Puede ser informativa, argumentativa, descriptiva o narrativa.",
          "Contenido (1,25): adecuación al tema (0,5) y organización (0,75). Expresión (1,75): repertorio gramatical (0,75), léxico (0,75) y ortografía y puntuación (0,25).",
          "Si la redacción no se ciñe al tema elegido, vale 0.",
        ],
        temas: [],
        // Fase 7: cuando el Writing tenga su página propia, enlazar ahí en vez de a los exámenes.
        tituloEjemplos: "Temas de Writing de exámenes anteriores:",
        ejemplos: [
          { anio: 2026, convocatoria: "junio" },
          { anio: 2026, convocatoria: "julio" },
        ],
      },
    ],
    cambios: {
      fuente:
        "Comparado con el examen de junio de 2026 (curso 2025-2026): sus instrucciones oficiales y la estructura de sus bloques.",
      filas: [
        { aspecto: "Duración", antes: "1 hora y 30 minutos", ahora: "1 hora y 30 minutos" },
        { aspecto: "Comprehension (Reading)", antes: "8 preguntas, 4 puntos", ahora: "8 preguntas, 4 puntos" },
        { aspecto: "Use of English", antes: "2 opciones de 6 preguntas, 3 puntos", ahora: "2 opciones de 6 preguntas, 3 puntos" },
        { aspecto: "Writing", antes: "140 a 180 palabras, 3 puntos", ahora: "140 a 180 palabras, 3 puntos" },
        { aspecto: "Diccionario", antes: "No", ahora: "No" },
      ],
      igual: "No hay cambios: el examen de 2027 tiene la misma estructura que el de 2026.",
    },
    criterios: {
      puntua: [
        "Comprehension (Reading): cada pregunta vale 0,5 y solo se valora la comprensión, no la expresión.",
        "Use of English: 0,5 si la respuesta es correcta y 0,25 si tiene un solo error.",
        "Writing: variedad de ideas relevantes, conectores y otros mecanismos de cohesión, construcciones complejas bien usadas y léxico rico y preciso. La corrección se hace «desde una óptica favorable» y un mismo error solo cuenta una vez.",
        "En las tareas en las que hay que escribir, la coherencia, la cohesión, la corrección gramatical, léxica y ortográfica y la presentación suponen al menos el 15 % de la nota del examen.",
      ],
      penaliza: [
        "Un verdadero o falso sin justificar, justificado con tus palabras, solo con el número de línea o con puntos suspensivos: 0 puntos.",
        "Una respuesta de Use of English con dos o más errores: 0 puntos.",
        "Una redacción que no se ciñe al tema: 0 puntos en el Writing.",
        "Extensión del Writing: más de 180 palabras, −0,25; de 120 a 139, −0,25; de 100 a 119, −0,75; de 80 a 99, −1,25; menos de 80, −2.",
        "Presentación poco limpia, sin márgenes o interlineado suficientes o con letra ilegible: −0,25.",
        "Dar más de una respuesta: solo cuenta la primera.",
      ],
    },
    tituloMateriales: "Materiales permitidos",
    materiales: [
      "No se permite el diccionario ni ningún otro material de apoyo.",
      "Las respuestas van en el papel que te entregan para el examen, nunca en los folios del enunciado.",
    ],
    incluye:
      "El documento incluye también una lista de recursos y obras de referencia recomendados, un modelo de examen con sus soluciones y la rúbrica completa de corrección del Writing.",
    faqs: [
      {
        pregunta: "¿Cómo es el examen de Inglés de la PAU de Andalucía?",
        respuesta:
          "Dura 1 hora y 30 minutos y tiene tres bloques: Comprehension (Reading), con 8 preguntas sobre un texto (4 puntos); Use of English, dos opciones de 6 preguntas de las que eliges una (3 puntos), y Writing, una redacción de 140 a 180 palabras sobre uno de dos temas (3 puntos). No se permite el diccionario.",
      },
      {
        pregunta: "¿Cuántas palabras tiene que tener el Writing de Inglés?",
        respuesta:
          "Entre 140 y 180. Si pasas de 180 o te quedas entre 120 y 139 se resta 0,25, y más cuanto más corta sea: hasta −2 si no llega a 80.",
      },
      {
        pregunta: "¿Cómo se justifica un verdadero o falso en el Reading?",
        respuesta:
          "Copiando las palabras exactas del texto, en una oración como máximo y sin puntos suspensivos. Sin justificación, la pregunta vale 0.",
      },

      {
        pregunta: "¿Puedo mezclar preguntas de las dos opciones del Use of English?",
        respuesta: "No. Tienes que responder las 6 preguntas de la opción que elijas.",
      },
    ],
  },
  {
    asignatura: "frances",
    curso: "2026-2027",
    anio: 2027,
    url: "https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/examanes_anios_anteriores/selectividad/sel_2026-2027-Orientaciones_frances.pdf",
    consultado: "2026-11-12",
    autoria: "la Ponencia de Francés",
    publicado: "2026-11-12",
    revisado: "2026-11-12",
    resumen: [
      "El examen dura 1 hora y 30 minutos y tiene tres bloques: compréhension et expression écrites (5 puntos), compétence linguistique (2 puntos) y expression écrite (3 puntos).",
      "Bloque I: un texto de unas 350-400 palabras con 8 preguntas que se responden todas: 3 de verdadero o falso justificado, 3 de elegir la opción correcta y 2 preguntas abiertas de 1 punto.",
      "Bloque II: eliges 4 de las 5 preguntas de vocabulario y gramática, de 0,5 puntos cada una.",
      "Bloque III: una redacción de 120 a 150 palabras sobre uno de los dos temas propuestos.",
      "En las preguntas abiertas del bloque I hay que responder con tus palabras, sin copiar el texto.",
      "Todo se responde en francés. La presentación incorrecta puede restar hasta 1 punto.",
      "No se permite el diccionario ni ningún otro material didáctico.",
    ],
    estructura: {
      filas: [
        {
          parte: "Bloque I · Compréhension et expression écrites",
          ejercicios: "8 preguntas sobre un texto",
          eleccion: "Se responden todas",
          puntos: "5",
        },
        {
          parte: "Bloque II · Compétence linguistique",
          ejercicios: "5 preguntas",
          eleccion: "Se responden 4",
          puntos: "2 (0,5 cada pregunta)",
        },
        {
          parte: "Bloque III · Expression écrite",
          ejercicios: "1 redacción de 120 a 150 palabras",
          eleccion: "Uno de los dos temas",
          puntos: "3",
        },
      ],
      total: "10 puntos, en 1 hora y 30 minutos",
      notas: [
        "En el bloque II, si respondes más de 4 preguntas, cuentan las 4 primeras.",
        "Hay que numerar claramente las respuestas; el valor de cada pregunta aparece junto a su número.",
        "En las tareas en las que hay que escribir, la coherencia, la cohesión, la corrección y la presentación suponen como mínimo el 15 % de la nota del examen.",
      ],
    },
    bloquesIntro:
      "El documento describe cada bloque del examen y los saberes de segundo de Bachillerato que hay que dominar, relacionados con el ámbito personal (vida cotidiana y relaciones, ocio, hábitos saludables, voluntariado, medio ambiente, nuevas tecnologías), el público (cultura, administración y servicios públicos, medios de comunicación, entorno, viajes, Europa, globalización, ONG) y el educativo y profesional (sistema educativo, profesiones, herramientas digitales y redes sociales), además del conocimiento de la lengua.",
    bloques: [
      {
        titulo: "Bloque I: Compréhension et expression écrites",
        entra: [
          "Un texto de unas 350-400 palabras redactado en un lenguaje inespecífico.",
          "I.1: tres frases de verdadero o falso (vrai ou faux) que se justifican con elementos del texto, de 0,5 puntos cada una.",
          "I.2: tres preguntas de elegir la opción correcta entre cuatro, de 0,5 puntos cada una. Basta con indicar la opción, y la respuesta correcta no es una frase literal del texto.",
          "I.3: dos preguntas de 1 punto que se responden en una o dos frases con tus palabras, sin copiar el texto: 0,5 por las ideas y 0,5 por la expresión.",
        ],
        temas: ["comprension-lectora"],
        ejemplos: [
          { tema: "comprension-lectora", anio: 2026, convocatoria: "junio" },
          { tema: "comprension-lectora", anio: 2026, convocatoria: "julio" },
          { tema: "comprension-lectora", anio: 2026, convocatoria: "reserva-1" },
        ],
      },
      {
        titulo: "Bloque II: Compétence linguistique",
        entra: [
          "Cinco preguntas abiertas o semiabiertas, de las que respondes cuatro: sinónimos, antónimos o definiciones del vocabulario del texto y transformaciones gramaticales. En el modelo oficial hay que poner un verbo en condicional, pasar una frase a plural y completar una frase con una palabra de una lista.",
          "La gramática que hay que dominar: el grupo nominal y el verbal (género, número, modo, tiempo, persona y voz activa y pasiva), conectores, adverbios, preposiciones y conjunciones, negación, interrogación, estilo directo e indirecto, obligación, passé composé e imparfait, perífrasis temporales, coordinación y subordinación (completivas, relativas, temporales, causales, consecutivas, concesivas, finales, condicionales e hipotéticas) y comparación.",
        ],
        temas: ["uso-de-la-lengua"],
        ejemplos: [
          { tema: "uso-de-la-lengua", anio: 2026, convocatoria: "junio" },
          { tema: "uso-de-la-lengua", anio: 2026, convocatoria: "julio" },
          { tema: "uso-de-la-lengua", anio: 2026, convocatoria: "reserva-1" },
        ],
      },
      {
        titulo: "Bloque III: Expression écrite",
        entra: [
          "Una redacción de 120 a 150 palabras sobre uno de los dos temas: por ejemplo, un essai d'opinion o un essai pour et contre.",
          "Contenido, hasta 1,5 puntos: coherencia, claridad, relación de las ideas con el tema, madurez y registro adecuado. Corrección y precisión de la forma, hasta 1,5: construcción de las frases, vocabulario variado y preciso y normas morfosintácticas y ortográficas.",
          "Lo que se espera: párrafos con introducción, desarrollo y conclusión, conectores y oraciones complejas, vocabulario pertinente que no esté en el texto, nada de palabras en español, en inglés o inventadas, y sin copiar ni parafrasear el texto del bloque I.",
        ],
        temas: [],
        // Fase 7: cuando la expression écrite tenga su página propia, enlazar ahí en vez de a los exámenes.
        tituloEjemplos: "Temas de redacción de exámenes anteriores:",
        ejemplos: [
          { anio: 2026, convocatoria: "junio" },
          { anio: 2026, convocatoria: "julio" },
        ],
      },
    ],
    cambios: {
      fuente:
        "Comparado con el examen de junio de 2026 (curso 2025-2026): sus instrucciones oficiales y la estructura de sus bloques.",
      filas: [
        { aspecto: "Duración", antes: "1 hora y 30 minutos", ahora: "1 hora y 30 minutos" },
        { aspecto: "Bloque I (compréhension)", antes: "5 puntos (I.1, I.2 e I.3)", ahora: "5 puntos (I.1, I.2 e I.3)" },
        { aspecto: "Bloque II (compétence linguistique)", antes: "4 de 5 preguntas, 2 puntos", ahora: "4 de 5 preguntas, 2 puntos" },
        { aspecto: "Bloque III (expression écrite)", antes: "120 a 150 palabras, 3 puntos", ahora: "120 a 150 palabras, 3 puntos" },
        { aspecto: "Presentación incorrecta", antes: "Hasta −1 punto", ahora: "Hasta −1 punto" },
        { aspecto: "Diccionario", antes: "No", ahora: "No" },
      ],
      igual: "No hay cambios: el examen de 2027 tiene la misma estructura que el de 2026.",
    },
    criterios: {
      puntua: [
        "Bloque I: en las preguntas I.3, 0,5 puntos por las ideas y 0,5 por la expresión de cada respuesta.",
        "Redacción: contenido (hasta 1,5 puntos) y corrección y precisión de la forma (hasta 1,5).",
        "En la redacción, la organización en párrafos, los conectores y las oraciones complejas, y el vocabulario pertinente que no aparece en el texto.",
        "En las tareas en las que hay que escribir, la coherencia, la cohesión, la corrección y la presentación suponen como mínimo el 15 % de la nota.",
      ],
      penaliza: [
        "Copiar frases del texto en las preguntas I.3: hay que reformular con tus palabras.",
        "Una redacción que no respeta las 120-150 palabras se penaliza de forma proporcional.",
        "La presentación incorrecta (letra ilegible, no seguir las instrucciones, sin márgenes…) puede restar hasta 1 punto.",
        "En la redacción, usar palabras en español, en inglés o inventadas, abusar de muletillas para alargar el texto o meter frases aprendidas que desentonan.",
        "En el bloque II, responder más de 4 preguntas: solo cuentan las 4 primeras.",
      ],
    },
    tituloMateriales: "Materiales permitidos",
    materiales: [
      "No se permite el diccionario ni ningún otro material didáctico.",
      "Se responde en francés, en el papel que te entregan y no en los folios del enunciado, numerando claramente cada respuesta.",
    ],
    incluye:
      "El documento incluye también las competencias de la materia, un modelo de examen con sus soluciones y los criterios específicos de corrección.",
    faqs: [
      {
        pregunta: "¿Cómo es el examen de Francés de la PAU de Andalucía?",
        respuesta:
          "Dura 1 hora y 30 minutos y tiene tres bloques: compréhension et expression écrites, 8 preguntas sobre un texto (5 puntos); compétence linguistique, 4 de 5 preguntas de léxico y gramática (2 puntos), y expression écrite, una redacción de 120 a 150 palabras sobre uno de dos temas (3 puntos). No se permite el diccionario.",
      },
      {
        pregunta: "¿Cuántas palabras tiene la redacción de Francés?",
        respuesta: "Entre 120 y 150. Si no respetas esa extensión, se penaliza de forma proporcional.",
      },
      {
        pregunta: "¿Cuántas preguntas de compétence linguistique hay que hacer?",
        respuesta: "Cuatro de las cinco. Si respondes más, solo cuentan las cuatro primeras.",
      },
      {
        pregunta: "¿Se puede copiar del texto en la compréhension?",
        respuesta:
          "En el verdadero o falso, sí: se justifica con elementos del texto. En la elección de opción basta con indicar la letra. En las preguntas I.3, no: hay que responder con tus palabras.",
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
