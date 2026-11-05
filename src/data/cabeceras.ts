// Cabeceras oficiales copiadas de los enunciados, por examen
// ("asignatura/año/convocatoria"). Solo se muestran en los exámenes que tienen una.

export interface Cabecera {
  titulo: string[]
  ambito: string
  curso: string
  // Varias líneas si la asignatura ocupa más de una en el enunciado.
  asignatura: string | string[]
  instrucciones: string[]
  // Instrucciones separadas por un pequeño espacio, como en algunos cursos.
  espaciadas?: boolean
  // Título, curso y asignatura en letra con serifa (curso 2020-2021).
  serifa?: boolean
}

// Título, ámbito y curso comunes a todos los exámenes del curso 2025-2026.
const comun2026 = {
  titulo: ["PRUEBA DE ACCESO A LA UNIVERSIDAD Y PRUEBA DE", "ADMISIÓN"],
  ambito: "ANDALUCÍA, CEUTA, MELILLA y CENTROS en MARRUECOS",
  curso: "CURSO 2025-2026",
}

const ingles2026: Cabecera = {
  ...comun2026,
  asignatura: ["LENGUA EXTRANJERA", "INGLÉS (ACCESO)"],
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Todas las cuestiones deben responderse en el papel entregado para la realización del examen y nunca en los folios que contienen los enunciados.",
    "c) Este examen consta de varios bloques. Debe responder a las preguntas que se indican en cada uno.",
    "d) La puntuación está indicada en cada uno de los apartados.",
    "e) No se permite el uso de diccionario.",
  ],
}

const frances2026: Cabecera = {
  ...comun2026,
  asignatura: ["LENGUA EXTRANJERA", "FRANCÉS (ACCESO)"],
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Todas las cuestiones deben responderse en el papel entregado para la realización del examen y nunca en los folios que contienen los enunciados.",
    "c) Responda en francés a las preguntas, numerándolas de manera clara.",
    "d) No se permite el uso de diccionario, ni de ningún otro material didáctico.",
    "e) El valor de cada pregunta está especificado al lado de su numeración.",
    "f) La presentación incorrecta (tachaduras, letra ilegible, etc.) puede penalizarse hasta con un punto.",
  ],
}

const frances2025: Cabecera = {
  ...frances2026,
  curso: "CURSO 2024-2025",
}

const matematicasAplicadas2026: Cabecera = {
  ...comun2026,
  asignatura: ["MATEMÁTICAS", "APLICADAS A LAS", "CIENCIAS SOCIALES II"],
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Esta prueba consta de 4 ejercicios.",
    "c) En algunos ejercicios se da la posibilidad de elegir entre los apartados A) o B). Responda solo el apartado que elija. En caso contrario, solo se corregirá el que aparezca en primer lugar.",
    "d) En cada ejercicio o apartado se indica la puntuación máxima asignada.",
    "e) Todos los resultados deben estar suficientemente justificados.",
    "f) Se permitirá el uso de calculadoras que no sean programables, gráficas ni con capacidad para almacenar o transmitir datos. Si obtiene resultados directamente con la calculadora, explique con detalle los pasos.",
    "g) La valoración de la corrección gramatical, léxica y ortográfica, así como la presentación del texto no será superior al 10 %.",
  ],
}

const matematicasII2026: Cabecera = {
  ...comun2026,
  asignatura: "MATEMÁTICAS II",
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Todas las cuestiones deben responderse en el papel entregado para la realización del examen y nunca en los folios que contienen los enunciados.",
    "c) Este examen consta de seis ejercicios distribuidos en una parte con dos ejercicios obligatorios y una parte con dos bloques con dos ejercicios optativos cada uno.",
    "d) Se deben resolver los dos ejercicios obligatorios y solamente un ejercicio de cada uno de los dos bloques con optatividad. En caso de responder a dos ejercicios de un mismo bloque optativo, sólo se corregirá el que aparezca físicamente en primer lugar.",
    "e) Cada ejercicio tiene un valor máximo de 2,5 puntos. En la puntuación máxima de cada ejercicio están contemplados 0,25 puntos para valorar la expresión correcta de los procesos y métodos utilizados.",
    "f) Se permitirá el uso de calculadoras que no sean programables, ni gráficas, ni con capacidad para almacenar o transmitir datos. No obstante, todos los procesos conducentes a la obtención de resultados deben estar suficientemente justificados.",
    "g) Se proporciona la tabla de la distribución Normal. Se permite el uso de regla.",
  ],
}

// Física, curso 2025-2026: cuatro bloques (A-D), uno obligatorio y tres con dos opciones.
const fisica2026: Cabecera = {
  ...comun2026,
  asignatura: "FÍSICA",
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Todas las cuestiones deben responderse en el papel entregado para la realización del examen y nunca en los folios que contienen los enunciados.",
    "c) El examen consta de 4 ejercicios (un ejercicio por cada bloque A, B, C y D de los cuales uno será obligatorio y tres optativos). El estudiante debe desarrollar un apartado a) y un apartado b) por cada bloque. En caso de responder a dos apartados a) o b) de un mismo bloque en los ejercicios optativos, solo será tenido en cuenta el respondido en primer lugar.",
    "d) Puede utilizar regla, compás y calculadora que no sea programable, ni gráfica ni con capacidad para almacenar o transmitir datos.",
    "e) Cada ejercicio se calificará entre 0 y 2,5 puntos: apartado a) hasta 1 punto y b) hasta 1,5 puntos.",
    "f) En cada ejercicio solo se pueden utilizar los datos proporcionados en su enunciado.",
  ],
}

// Física, curso 2024-2025: en cada bloque, el apartado a) obligatorio y un b) a elegir entre dos.
const fisica2025: Cabecera = {
  ...fisica2026,
  curso: "CURSO 2024-2025",
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Todas las cuestiones deben responderse en el papel entregado para la realización del examen y nunca en los folios que contienen los enunciados.",
    "c) El examen consta de 4 ejercicios correspondientes a los bloques A, B, C y D. Cada ejercicio contiene un apartado a) y dos apartados b). El alumno deberá responder al apartado a) y elegir un apartado b) entre los dos propuestos en cada bloque. En caso de responder a los dos apartados b), sólo será tenido en cuenta el respondido en primer lugar",
    "d) Puede utilizar regla, compás y calculadora que no sea programable, ni gráfica ni con capacidad para almacenar o transmitir datos.",
    "e) Cada ejercicio se calificará entre 0 y 2,5 puntos: apartado (a) hasta 1 punto y (b) hasta 1,5 puntos.",
    "f) En cada ejercicio solo se pueden utilizar los datos proporcionados en su enunciado.",
  ],
}

// Física, curso 2023-2024 (PEvAU): cuatro bloques con dos ejercicios cada uno, de los que se elige uno.
const fisica2024: Cabecera = {
  ...fisica2026,
  titulo: ["PRUEBA DE EVALUACIÓN DE BACHILLERATO PARA EL", "ACCESO A LA UNIVERSIDAD Y PRUEBAS DE ADMISIÓN"],
  curso: "CURSO 2023-2024",
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Todas las cuestiones deben responderse en el papel entregado para la realización del examen y nunca en los folios que contienen los enunciados.",
    "c) El examen consta de 8 ejercicios (dos ejercicios por cada bloque A, B, C y D). El alumno/a debe desarrollar un ejercicio por cada bloque. En caso de responder a más ejercicios de los requeridos, solo será tenido en cuenta el respondido en primer lugar en cada bloque.",
    "d) Puede utilizar regla, compás y calculadora que no sea programable, ni gráfica ni con capacidad para almacenar o transmitir datos.",
    "e) Cada ejercicio se calificará entre 0 y 2,5 puntos: apartado (a) hasta 1 punto y (b) hasta 1,5 puntos.",
    "f) En cada ejercicio solo se pueden utilizar los datos proporcionados en su enunciado.",
  ],
}

// Curso 2024-2025: un ejercicio obligatorio y tres bloques con dos ejercicios optativos cada uno.
const matematicasII2025: Cabecera = {
  ...matematicasII2026,
  curso: "CURSO 2024-2025",
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Todas las cuestiones deben responderse en el papel entregado para la realización del examen y nunca en los folios que contienen los enunciados.",
    "c) Este examen consta de siete ejercicios distribuidos en un bloque con un ejercicio obligatorio y tres bloques con dos ejercicios optativos cada uno.",
    "d) Deberá resolver el ejercicio obligatorio y solamente un ejercicio de cada uno de los tres bloques con optatividad.",
    "e) En caso de responder a dos ejercicios de un bloque, sólo se corregirá el que aparezca físicamente en primer lugar.",
    "f) Cada ejercicio tiene un valor máximo de 2,5 puntos.",
    "g) En la puntuación máxima de cada ejercicio están contemplados 0,25 puntos para valorar la expresión correcta de los procesos y métodos utilizados.",
    "h) Se permitirá el uso de calculadoras que no sean programables, ni gráficas ni con capacidad para almacenar o transmitir datos. No obstante, todos los procesos conducentes a la obtención de resultados deben estar suficientemente justificados.",
    "i) Se proporcionará la tabla de la distribución Normal. Se permite el uso de regla.",
  ],
}

// Curso 2023-2024 (PEvAU): cuatro bloques con dos ejercicios cada uno.
const matematicasII2024: Cabecera = {
  ...matematicasII2026,
  titulo: ["PRUEBA DE EVALUACIÓN DE BACHILLERATO PARA EL", "ACCESO A LA UNIVERSIDAD Y PRUEBAS DE ADMISIÓN"],
  curso: "CURSO 2023-2024",
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Todas las cuestiones deben responderse en el papel entregado para la realización del examen y nunca en los folios que contienen los enunciados.",
    "c) Este examen consta de 8 ejercicios distribuidos en 4 bloques de 2 ejercicios cada uno.",
    "d) Cada ejercicio tiene un valor máximo de 2,5 puntos.",
    "e) Se realizará únicamente un ejercicio de cada bloque. En caso de responder a dos ejercicios de un bloque, sólo se corregirá el que aparezca físicamente en primer lugar.",
    "f) Se permitirá el uso de calculadoras que no sean programables, ni gráficas ni con capacidad para almacenar o transmitir datos. No obstante, todos los procesos conducentes a la obtención de resultados deben estar suficientemente justificados.",
    "g) En la puntuación máxima de cada ejercicio están contemplados 0,25 puntos para valorar la expresión correcta de los procesos y métodos utilizados.",
  ],
}

// Curso 2022-2023 (PEvAU): dos bloques (A y B) de cuatro ejercicios; se eligen cuatro cualesquiera.
const matematicasII2023: Cabecera = {
  ...matematicasII2024,
  curso: "CURSO 2022-2023",
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Este examen consta de 8 ejercicios distribuidos en 2 bloques (A y B) de 4 ejercicios cada uno.",
    "c) Cada ejercicio tiene un valor máximo de 2,5 puntos.",
    "d) Se realizarán únicamente cuatro ejercicios, independientemente del bloque al que pertenezcan. En caso de responder a más de cuatro ejercicios, se corregirán únicamente los cuatro que aparezcan físicamente en primer lugar.",
    "e) Se permitirá el uso de calculadoras que no sean programables, ni gráficas ni con capacidad para almacenar o transmitir datos. No obstante, todos los procesos conducentes a la obtención de resultados deben estar suficientemente justificados.",
    "f) En la puntuación máxima de cada ejercicio están contemplados 0,25 puntos para valorar la expresión correcta de los procesos y métodos utilizados.",
  ],
}

// Curso 2021-2022 (PEvAU): como 2022-2023, con la convocatoria en el curso.
const matematicasII2022Junio: Cabecera = {
  ...matematicasII2023,
  curso: "CONVOCATORIA ORDINARIA. CURSO 2021-2022",
}

const matematicasII2022Julio: Cabecera = {
  ...matematicasII2022Junio,
  curso: "CONVOCATORIA EXTRAORDINARIA. CURSO 2021-2022",
}

// En las reservas de 2021-2022 el curso aparece sin la convocatoria.
const matematicasII2022Reserva: Cabecera = {
  ...matematicasII2022Junio,
  curso: "CURSO 2021-2022",
}

// Curso 2020-2021: como 2022-2023, con otro título, la convocatoria en el curso, letra con serifa
// y punto decimal en las puntuaciones.
const matematicasII2021Junio: Cabecera = {
  ...matematicasII2023,
  titulo: ["PRUEBA DE ACCESO Y ADMISIÓN A LA", "UNIVERSIDAD"],
  curso: "CONVOCATORIA ORDINARIA, CURSO 2020-2021",
  serifa: true,
  instrucciones: matematicasII2023.instrucciones.map((i) => i.replace("2,5 puntos", "2.5 puntos").replace("0,25 puntos", "0.25 puntos")),
}

const matematicasII2021Julio: Cabecera = {
  ...matematicasII2021Junio,
  curso: "CONVOCATORIA EXTRAORDINARIA, CURSO 2020-2021",
}

// En las reservas de 2020-2021 el curso aparece sin la convocatoria y con raya, como en el PDF.
const matematicasII2021Reserva: Cabecera = {
  ...matematicasII2021Junio,
  curso: "CURSO 2020–2021",
}

// La reserva 3 dice "Se permite" en la instrucción f), en vez de "Se permitirá".
const matematicasII2026Reserva3: Cabecera = {
  ...matematicasII2026,
  instrucciones: matematicasII2026.instrucciones.map((i) =>
    i.startsWith("f) ") ? i.replace("Se permitirá", "Se permite") : i,
  ),
}

// Curso 2024-2025: cuatro bloques (A, B, C y D) y un ejercicio de cada uno.
const matematicasAplicadas2025: Cabecera = {
  ...matematicasAplicadas2026,
  curso: "CURSO 2024-2025",
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Debe resolver 4 ejercicios, uno de cada bloque. Elija solo un ejercicio en los tres bloques donde tiene posibilidad de elección. En caso de responder a dos ejercicios de un mismo bloque, se corregirá solo el que aparezca en primer lugar.",
    "c) En cada ejercicio, parte o apartado se indica la puntuación máxima asignada.",
    "d) Todos los resultados deben estar suficientemente justificados.",
    "e) Se permitirá el uso de calculadoras que no sean programables, gráficas ni con capacidad para almacenar o transmitir datos. Si obtiene resultados directamente con la calculadora, explique con detalle los pasos necesarios para su obtención sin el uso de la misma.",
  ],
}

// Curso 2023-2024 (PEvAU): cuatro bloques con dos ejercicios cada uno.
const matematicasAplicadas2024: Cabecera = {
  ...matematicasAplicadas2026,
  titulo: ["PRUEBA DE EVALUACIÓN DE BACHILLERATO PARA EL", "ACCESO A LA UNIVERSIDAD Y PRUEBAS DE ADMISIÓN"],
  curso: "CURSO 2023-2024",
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Elija un único ejercicio de cada bloque. En caso de responder a dos ejercicios de un mismo bloque, se corregirá solo el que aparezca en primer lugar.",
    "c) En cada ejercicio, parte o apartado se indica la puntuación máxima asignada.",
    "d) Todos los resultados deben estar suficientemente justificados.",
    "e) Se permitirá el uso de calculadoras que no sean programables, gráficas ni con capacidad para almacenar o transmitir datos. Si obtiene resultados directamente con la calculadora, explique con detalle los pasos necesarios para su obtención sin el uso de la misma.",
  ],
}

// Curso 2022-2023 (PEvAU): cuatro bloques con dos ejercicios; se eligen cuatro de al menos tres bloques.
const matematicasAplicadas2023: Cabecera = {
  ...matematicasAplicadas2024,
  curso: "CURSO 2022-2023",
  asignatura: ["MATEMATICAS", "APLICADAS A LAS", "CIENCIAS SOCIALES II"],
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Elija cuatro de los ocho ejercicios propuestos de al menos tres bloques distintos. Se corregirán los cuatro primeros ejercicios que aparezcan en el examen y que cumplan el requisito anterior.",
    ...matematicasAplicadas2024.instrucciones.slice(2),
  ],
}

// Curso 2021-2022 (PEvAU): como 2022-2023, con la convocatoria en el curso y una instrucción más.
const matematicasAplicadas2022Junio: Cabecera = {
  ...matematicasAplicadas2024,
  curso: "CONVOCATORIA ORDINARIA. CURSO 2021-2022",
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Este examen consta de 4 Bloques (A, B, C y D)",
    "c) Elija cuatro de los ocho ejercicios propuestos de al menos tres bloques distintos. Se corregirán los cuatro primeros ejercicios que aparezcan en el examen y que cumplan el requisito anterior.",
    "d) En cada ejercicio, parte o apartado se indica la puntuación máxima asignada.",
    "e) Todos los resultados deben estar suficientemente justificados.",
    "f) Se permitirá el uso de calculadoras que no sean programables, gráficas ni con capacidad para almacenar o transmitir datos. Si obtiene resultados directamente con la calculadora, explique con detalle los pasos necesarios para su obtención sin el uso de la misma.",
  ],
}

const matematicasAplicadas2022Julio: Cabecera = {
  ...matematicasAplicadas2022Junio,
  curso: "CONVOCATORIA EXTRAORDINARIA. CURSO 2021-2022",
}

// En las reservas de 2021-2022 el curso aparece sin la convocatoria.
const matematicasAplicadas2022Reserva: Cabecera = {
  ...matematicasAplicadas2022Junio,
  curso: "CURSO 2021-2022",
}

// Curso 2020-2021: como 2022-2023, con otro título, la convocatoria en el curso y letra con serifa.
const matematicasAplicadas2021Junio: Cabecera = {
  ...matematicasAplicadas2023,
  titulo: ["PRUEBA DE ACCESO Y ADMISIÓN A LA", "UNIVERSIDAD"],
  curso: "CONVOCATORIA ORDINARIA, CURSO 2020-2021",
  asignatura: ["MATEMÁTICAS", "APLICADAS A LAS", "CIENCIAS SOCIALES II"],
  serifa: true,
}

const matematicasAplicadas2021Julio: Cabecera = {
  ...matematicasAplicadas2021Junio,
  curso: "CONVOCATORIA EXTRAORDINARIA, CURSO 2020-2021",
}

// En las reservas de 2020-2021 el curso aparece sin la convocatoria y con raya, como en el PDF.
const matematicasAplicadas2021Reserva: Cabecera = {
  ...matematicasAplicadas2021Junio,
  curso: "CURSO 2020–2021",
}

const ingles2025: Cabecera = {
  ...ingles2026,
  titulo: ["PRUEBA DE ACCESO A LA UNIVERSIDAD", "Y PRUEBA DE ADMISIÓN"],
  curso: "CURSO 2024-2025",
}

// En julio de 2025 la asignatura aparece como «Lengua Extranjera II».
const ingles2025Julio: Cabecera = {
  ...ingles2025,
  asignatura: ["LENGUA EXTRANJERA II", "INGLÉS - ACCESO"],
}

// Las instrucciones son las mismas que en los cursos siguientes.
const ingles2024: Cabecera = {
  titulo: ["PRUEBA DE EVALUACIÓN DE BACHILLERATO PARA EL", "ACCESO A LA UNIVERSIDAD Y PRUEBAS DE ADMISIÓN"],
  ambito: "ANDALUCÍA, CEUTA, MELILLA y CENTROS en MARRUECOS",
  curso: "CURSO 2023-2024",
  asignatura: ["LENGUA EXTRANJERA", "(INGLÉS) ACCESO"],
  instrucciones: ingles2026.instrucciones,
}

const frances2024: Cabecera = {
  ...ingles2024,
  asignatura: ["LENGUA EXTRANJERA", "(FRANCÉS) ACCESO"],
  instrucciones: [
    "a. Duración: 1 hora y 30 minutos.",
    "b. Responda en francés a las preguntas, numerándolas de manera clara.",
    "c. No se permite el uso de diccionario, ni de ningún otro material didáctico.",
    "d. El valor de cada pregunta está especificado al lado de su numeración.",
    "e. La presentación incorrecta (tachaduras, letra ilegible, etc.) puede penalizarse hasta con un punto.",
  ],
}

const frances2023: Cabecera = {
  ...frances2024,
  curso: "CURSO 2022-2023",
  asignatura: ["LENGUA EXTRANJERA", "FRANCÉS"],
}

const frances2022Junio: Cabecera = {
  ...frances2024,
  curso: "CONVOCATORIA ORDINARIA. CURSO 2021-2022",
  asignatura: ["LENGUA EXTRANJERA", "FRANCÉS", "(ACCESO)"],
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Responda en francés a las preguntas, numerándolas de manera clara.",
    "c) No se permite el uso de diccionario, ni de ningún otro material didáctico.",
    "d) El valor de cada pregunta está especificado al lado de su numeración.",
    "e) La presentación incorrecta (tachaduras, letra ilegible, etc.) puede penalizarse hasta con un punto.",
  ],
}

const frances2022Julio: Cabecera = {
  ...frances2022Junio,
  curso: "CONVOCATORIA EXTRAORDINARIA. CURSO 2021-2022",
}

const ingles2023: Cabecera = {
  ...ingles2024,
  curso: "CURSO 2022-2023",
  asignatura: ["LENGUA EXTRANJERA", "(INGLÉS)"],
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Este examen consta de varios bloques. Debe responder a las preguntas que se indican en cada uno.",
    "c) La puntuación está indicada en cada uno de los apartados.",
    "d) No se permite el uso de diccionario.",
  ],
}

const ingles2022Junio: Cabecera = {
  ...ingles2023,
  curso: "CONVOCATORIA ORDINARIA. CURSO 2021-2022",
  asignatura: ["LENGUA EXTRANJERA", "INGLÉS", "(ACCESO)"],
}

// Asignatura y convocatoria según los criterios de corrección; se suponen las mismas
// instrucciones que en junio.
const ingles2022Julio: Cabecera = {
  ...ingles2022Junio,
  curso: "CONVOCATORIA EXTRAORDINARIA. CURSO 2021-2022",
  asignatura: ["LENGUA EXTRANJERA II:", "INGLÉS", "(ACCESO)"],
}

const ingles2021Junio: Cabecera = {
  ...ingles2023,
  titulo: ["PRUEBA DE ACCESO Y ADMISIÓN A LA", "UNIVERSIDAD"],
  curso: "CONVOCATORIA ORDINARIA, CURSO 2020-2021",
  asignatura: ["LENGUA EXTRANJERA", "INGLÉS", "(ACCESO)"],
  serifa: true,
}

// Se supone la misma cabecera que en junio, con la convocatoria extraordinaria.
const ingles2021Julio: Cabecera = {
  ...ingles2021Junio,
  curso: "CONVOCATORIA EXTRAORDINARIA, CURSO 2020-2021",
}

// Curso 2020-2021: cabecera con serifa, como Inglés 2021.
const frances2021Junio: Cabecera = {
  ...frances2022Junio,
  titulo: ["PRUEBA DE ACCESO Y ADMISIÓN A LA", "UNIVERSIDAD"],
  curso: "CONVOCATORIA ORDINARIA, CURSO 2020-2021",
  instrucciones: [
    "a. Duración: 1 hora y 30 minutos.",
    "b. Responda en francés a las preguntas, numerándolas de manera clara.",
    "c. No se permite el uso de diccionario, ni de ningún otro material didáctico.",
    "d. El valor de cada pregunta está especificado al lado de su numeración.",
    "e. La presentación incorrecta (tachaduras, letra ilegible, etc.) puede penalizarse hasta con un punto.",
  ],
  serifa: true,
};

const frances2021Julio: Cabecera = {
  ...frances2021Junio,
  curso: "CONVOCATORIA EXTRAORDINARIA, CURSO 2020-2021",
};

export const cabeceras: Record<string, Cabecera> = {
  "ingles/2021/junio": ingles2021Junio,
  "ingles/2021/julio": ingles2021Julio,
  "ingles/2021/reserva-1": ingles2021Junio,
  "ingles/2021/reserva-2": ingles2021Junio,
  "ingles/2021/reserva-3": ingles2021Junio,
  "ingles/2021/reserva-4": ingles2021Junio,
  "ingles/2022/junio": ingles2022Junio,
  "ingles/2022/julio": ingles2022Julio,
  "ingles/2022/reserva-1": ingles2022Junio,
  "ingles/2022/reserva-2": ingles2022Junio,
  "ingles/2022/reserva-3": ingles2022Junio,
  "ingles/2022/reserva-4": ingles2022Junio,
  "ingles/2023/junio": ingles2023,
  "ingles/2023/julio": ingles2023,
  "ingles/2023/reserva-1": ingles2023,
  "ingles/2023/reserva-2": ingles2023,
  "ingles/2023/reserva-3": ingles2023,
  "ingles/2023/reserva-4": ingles2023,
  "ingles/2024/junio": ingles2024,
  "ingles/2024/julio": ingles2024,
  "ingles/2024/reserva-1": ingles2024,
  "ingles/2024/reserva-2": ingles2024,
  "ingles/2024/reserva-3": ingles2024,
  "ingles/2024/reserva-4": ingles2024,
  "ingles/2025/junio": ingles2025,
  "ingles/2025/julio": ingles2025Julio,
  "ingles/2025/reserva-1": ingles2025,
  "ingles/2025/reserva-2": ingles2025,
  "ingles/2025/reserva-3": ingles2025,
  "ingles/2025/reserva-4": ingles2025,
  "ingles/2026/junio": ingles2026,
  "ingles/2026/julio": ingles2026,
  "ingles/2026/reserva-1": ingles2026,
  "ingles/2026/reserva-2": ingles2026,
  "ingles/2026/reserva-3": ingles2026,
  "ingles/2026/reserva-4": ingles2026,
  "fisica/2024/junio": fisica2024,
  "fisica/2024/julio": fisica2024,
  "fisica/2024/reserva-1": fisica2024,
  "fisica/2024/reserva-2": fisica2024,
  "fisica/2024/reserva-3": fisica2024,
  "fisica/2024/reserva-4": fisica2024,
  "fisica/2025/junio": fisica2025,
  "fisica/2025/julio": fisica2025,
  "fisica/2025/reserva-1": fisica2025,
  "fisica/2025/reserva-2": fisica2025,
  "fisica/2025/reserva-3": fisica2025,
  "fisica/2025/reserva-4": fisica2025,
  "fisica/2026/junio": fisica2026,
  "fisica/2026/julio": fisica2026,
  "fisica/2026/reserva-1": fisica2026,
  "frances/2021/junio": frances2021Junio,
  "frances/2021/julio": frances2021Julio,
  "frances/2021/reserva-1": frances2021Junio,
  "frances/2021/reserva-2": frances2021Junio,
  "frances/2021/reserva-3": frances2021Junio,
  "frances/2021/reserva-4": frances2021Junio,
  "frances/2022/junio": frances2022Junio,
  "frances/2022/julio": frances2022Julio,
  "frances/2022/reserva-1": frances2022Junio,
  "frances/2022/reserva-2": frances2022Junio,
  "frances/2022/reserva-3": frances2022Junio,
  "frances/2022/reserva-4": frances2022Junio,
  "frances/2023/junio": frances2023,
  "frances/2023/julio": frances2023,
  "frances/2023/reserva-1": frances2023,
  "frances/2023/reserva-2": frances2023,
  "frances/2023/reserva-3": frances2023,
  "frances/2023/reserva-4": frances2023,
  "frances/2024/junio": frances2024,
  "frances/2024/julio": frances2024,
  "frances/2024/reserva-1": frances2024,
  "frances/2024/reserva-2": frances2024,
  "frances/2024/reserva-3": frances2024,
  "frances/2024/reserva-4": frances2024,
  "frances/2025/junio": frances2025,
  "frances/2025/julio": frances2025,
  "frances/2025/reserva-1": frances2025,
  "frances/2025/reserva-2": frances2025,
  "frances/2025/reserva-3": frances2025,
  "frances/2025/reserva-4": frances2025,
  "frances/2026/junio": frances2026,
  "frances/2026/julio": frances2026,
  "frances/2026/reserva-1": frances2026,
  "frances/2026/reserva-2": frances2026,
  "frances/2026/reserva-3": frances2026,
  "frances/2026/reserva-4": frances2026,
  "matematicas-aplicadas/2021/junio": matematicasAplicadas2021Junio,
  "matematicas-aplicadas/2021/julio": matematicasAplicadas2021Julio,
  "matematicas-aplicadas/2021/reserva-1": matematicasAplicadas2021Reserva,
  "matematicas-aplicadas/2021/reserva-2": matematicasAplicadas2021Reserva,
  "matematicas-aplicadas/2021/reserva-3": matematicasAplicadas2021Reserva,
  "matematicas-aplicadas/2021/reserva-4": matematicasAplicadas2021Reserva,
  "matematicas-aplicadas/2022/junio": matematicasAplicadas2022Junio,
  "matematicas-aplicadas/2022/julio": matematicasAplicadas2022Julio,
  "matematicas-aplicadas/2022/reserva-1": matematicasAplicadas2022Reserva,
  "matematicas-aplicadas/2022/reserva-2": matematicasAplicadas2022Reserva,
  "matematicas-aplicadas/2022/reserva-3": matematicasAplicadas2022Reserva,
  "matematicas-aplicadas/2022/reserva-4": matematicasAplicadas2022Reserva,
  "matematicas-aplicadas/2023/junio": matematicasAplicadas2023,
  "matematicas-aplicadas/2023/julio": matematicasAplicadas2023,
  "matematicas-aplicadas/2023/reserva-1": matematicasAplicadas2023,
  "matematicas-aplicadas/2023/reserva-2": matematicasAplicadas2023,
  "matematicas-aplicadas/2023/reserva-3": matematicasAplicadas2023,
  "matematicas-aplicadas/2023/reserva-4": matematicasAplicadas2023,
  "matematicas-aplicadas/2024/junio": matematicasAplicadas2024,
  "matematicas-aplicadas/2024/julio": matematicasAplicadas2024,
  "matematicas-aplicadas/2024/reserva-1": matematicasAplicadas2024,
  "matematicas-aplicadas/2024/reserva-2": matematicasAplicadas2024,
  "matematicas-aplicadas/2024/reserva-3": matematicasAplicadas2024,
  "matematicas-aplicadas/2024/reserva-4": matematicasAplicadas2024,
  "matematicas-aplicadas/2025/junio": matematicasAplicadas2025,
  "matematicas-aplicadas/2025/julio": matematicasAplicadas2025,
  "matematicas-aplicadas/2025/reserva-1": matematicasAplicadas2025,
  "matematicas-aplicadas/2025/reserva-2": matematicasAplicadas2025,
  "matematicas-aplicadas/2025/reserva-3": matematicasAplicadas2025,
  "matematicas-aplicadas/2025/reserva-4": matematicasAplicadas2025,
  "matematicas-aplicadas/2026/junio": matematicasAplicadas2026,
  "matematicas-aplicadas/2026/julio": matematicasAplicadas2026,
  "matematicas-aplicadas/2026/reserva-1": matematicasAplicadas2026,
  "matematicas-aplicadas/2026/reserva-2": matematicasAplicadas2026,
  "matematicas-aplicadas/2026/reserva-3": matematicasAplicadas2026,
  "matematicas-aplicadas/2026/reserva-4": matematicasAplicadas2026,
  "matematicas-ii/2021/junio": matematicasII2021Junio,
  "matematicas-ii/2021/julio": matematicasII2021Julio,
  "matematicas-ii/2021/reserva-1": matematicasII2021Reserva,
  "matematicas-ii/2021/reserva-2": matematicasII2021Reserva,
  "matematicas-ii/2021/reserva-3": matematicasII2021Reserva,
  "matematicas-ii/2021/reserva-4": matematicasII2021Reserva,
  "matematicas-ii/2022/junio": matematicasII2022Junio,
  "matematicas-ii/2022/julio": matematicasII2022Julio,
  "matematicas-ii/2022/reserva-1": matematicasII2022Reserva,
  "matematicas-ii/2022/reserva-2": matematicasII2022Reserva,
  "matematicas-ii/2022/reserva-3": matematicasII2022Reserva,
  "matematicas-ii/2022/reserva-4": matematicasII2022Reserva,
  "matematicas-ii/2023/junio": matematicasII2023,
  "matematicas-ii/2023/julio": matematicasII2023,
  "matematicas-ii/2023/reserva-1": matematicasII2023,
  "matematicas-ii/2023/reserva-2": matematicasII2023,
  "matematicas-ii/2023/reserva-3": matematicasII2023,
  "matematicas-ii/2023/reserva-4": matematicasII2023,
  "matematicas-ii/2024/junio": matematicasII2024,
  "matematicas-ii/2024/julio": matematicasII2024,
  "matematicas-ii/2024/reserva-1": matematicasII2024,
  "matematicas-ii/2024/reserva-2": matematicasII2024,
  "matematicas-ii/2024/reserva-3": matematicasII2024,
  "matematicas-ii/2024/reserva-4": matematicasII2024,
  "matematicas-ii/2025/junio": matematicasII2025,
  "matematicas-ii/2025/julio": matematicasII2025,
  "matematicas-ii/2025/reserva-1": matematicasII2025,
  "matematicas-ii/2025/reserva-2": matematicasII2025,
  "matematicas-ii/2025/reserva-3": matematicasII2025,
  "matematicas-ii/2025/reserva-4": matematicasII2025,
  "matematicas-ii/2026/junio": matematicasII2026,
  "matematicas-ii/2026/julio": matematicasII2026,
  "matematicas-ii/2026/reserva-1": matematicasII2026,
  "matematicas-ii/2026/reserva-2": matematicasII2026,
  "matematicas-ii/2026/reserva-3": matematicasII2026Reserva3,
  "matematicas-ii/2026/reserva-4": matematicasII2026,
}
