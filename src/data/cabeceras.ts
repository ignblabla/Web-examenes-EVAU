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

const fisica2026: Cabecera = {
  titulo: ["PRUEBA DE ACCESO A LA UNIVERSIDAD Y PRUEBA DE", "ADMISIÓN"],
  ambito: "ANDALUCÍA, CEUTA, MELILLA y CENTROS en MARRUECOS",
  curso: "CURSO 2025-2026",
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

const fisica2023: Cabecera = {
  titulo: ["PRUEBA DE EVALUACIÓN DE BACHILLERATO PARA EL", "ACCESO A LA UNIVERSIDAD Y PRUEBAS DE ADMISIÓN"],
  ambito: "ANDALUCÍA, CEUTA, MELILLA y CENTROS en MARRUECOS",
  curso: "CURSO 2022-2023",
  asignatura: "FÍSICA",
  espaciadas: true,
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) El examen consta de 8 ejercicios (dos ejercicios por cada bloque A, B, C y D). Debe desarrollar en total cuatro ejercicios, elegidos libremente (puede seleccionar más de un ejercicio por bloque). En caso de responder a más ejercicios de los requeridos, serán tenidos en cuenta los 4 respondidos en primer lugar.",
    "c) Puede utilizar regla y calculadora que no sea programable, ni gráfica ni con capacidad para almacenar o transmitir datos.",
    "d) Cada ejercicio se calificará entre 0 y 2,5 puntos: apartado (a) hasta 1 punto y (b) hasta 1,5 puntos.",
    "e) En cada ejercicio solo se pueden utilizar los datos proporcionados en su enunciado.",
  ],
}

const fisica2021Junio: Cabecera = {
  titulo: ["PRUEBA DE ACCESO Y ADMISIÓN A LA", "UNIVERSIDAD"],
  ambito: "ANDALUCÍA, CEUTA, MELILLA y CENTROS en MARRUECOS",
  curso: "CONVOCATORIA ORDINARIA, CURSO 2020-2021",
  asignatura: "FÍSICA",
  espaciadas: true,
  serifa: true,
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) El examen consta de 8 ejercicios (dos ejercicios por cada bloque A, B, C y D). Debe desarrollar en total cuatro ejercicios, elegidos libremente (puede seleccionar más de un ejercicio por bloque). En caso de responder a más ejercicios de los requeridos, serán tenidos en cuenta los 4 respondidos en primer lugar.",
    "c) Puede utilizar material de dibujo y calculadora que no sea programable, ni gráfica ni con capacidad para almacenar o transmitir datos.",
    "d) Cada ejercicio se calificará entre 0 y 2,5 puntos: apartado (a) hasta 1 punto y (b) hasta 1,5 puntos.",
    "e) En cada ejercicio solo se pueden utilizar los datos proporcionados en su enunciado.",
  ],
}

const fisica2021Julio: Cabecera = {
  ...fisica2021Junio,
  curso: "CONVOCATORIA EXTRAORDINARIA, CURSO 2020-2021",
}

// En el curso 2021-2022 las instrucciones son las mismas que en 2022-2023.
const fisica2022Junio: Cabecera = {
  ...fisica2023,
  curso: "CONVOCATORIA ORDINARIA. CURSO 2021-2022",
}

const fisica2022Julio: Cabecera = {
  ...fisica2023,
  curso: "CONVOCATORIA EXTRAORDINARIA. CURSO 2021-2022",
}

// En julio de 2023 las instrucciones d) y e) aparecen en un mismo párrafo.
const fisica2023Julio: Cabecera = {
  ...fisica2023,
  instrucciones: [
    ...fisica2023.instrucciones.slice(0, 3),
    `${fisica2023.instrucciones[3]} ${fisica2023.instrucciones[4]}`,
  ],
}

const fisica2024: Cabecera = {
  titulo: ["PRUEBA DE EVALUACIÓN DE BACHILLERATO PARA EL", "ACCESO A LA UNIVERSIDAD Y PRUEBAS DE ADMISIÓN"],
  ambito: "ANDALUCÍA, CEUTA, MELILLA y CENTROS en MARRUECOS",
  curso: "CURSO 2023-2024",
  asignatura: "FÍSICA",
  espaciadas: true,
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Todas las cuestiones deben responderse en el papel entregado para la realización del examen y nunca en los folios que contienen los enunciados.",
    "c) El examen consta de 8 ejercicios (dos ejercicios por cada bloque A, B, C y D). El alumno/a debe desarrollar un ejercicio por cada bloque. En caso de responder a más ejercicios de los requeridos, solo será tenido en cuenta el respondido en primer lugar en cada bloque.",
    "d) Puede utilizar regla, compás y calculadora que no sea programable, ni gráfica ni con capacidad para almacenar o transmitir datos.",
    "e) Cada ejercicio se calificará entre 0 y 2,5 puntos: apartado (a) hasta 1 punto y (b) hasta 1,5 puntos.",
    "f) En cada ejercicio solo se pueden utilizar los datos proporcionados en su enunciado.",
  ],
}

const fisica2025: Cabecera = {
  titulo: ["PRUEBA DE ACCESO A LA UNIVERSIDAD Y PRUEBA DE", "ADMISIÓN"],
  ambito: "ANDALUCÍA, CEUTA, MELILLA y CENTROS en MARRUECOS",
  curso: "CURSO 2024-2025",
  asignatura: "FÍSICA",
  instrucciones: [
    "a) Duración: 1 hora y 30 minutos.",
    "b) Todas las cuestiones deben responderse en el papel entregado para la realización del examen y nunca en los folios que contienen los enunciados.",
    "c) El examen consta de 4 ejercicios correspondientes a los bloques A, B, C y D. Cada ejercicio contiene un apartado a) y dos apartados b). El alumno deberá responder al apartado a) y elegir un apartado b) entre los dos propuestos en cada bloque. En caso de responder a los dos apartados b), sólo será tenido en cuenta el respondido en primer lugar",
    "d) Puede utilizar regla, compás y calculadora que no sea programable, ni gráfica ni con capacidad para almacenar o transmitir datos.",
    "e) Cada ejercicio se calificará entre 0 y 2,5 puntos: apartado (a) hasta 1 punto y (b) hasta 1,5 puntos.",
    "f) En cada ejercicio solo se pueden utilizar los datos proporcionados en su enunciado.",
  ],
}

const ingles2026: Cabecera = {
  ...fisica2026,
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
  ...fisica2026,
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
  "fisica/2021/junio": fisica2021Junio,
  "fisica/2021/julio": fisica2021Julio,
  "fisica/2022/junio": fisica2022Junio,
  "fisica/2022/julio": fisica2022Julio,
  "fisica/2023/junio": fisica2023,
  "fisica/2023/julio": fisica2023Julio,
  "fisica/2024/junio": fisica2024,
  "fisica/2024/julio": fisica2024,
  "fisica/2025/junio": fisica2025,
  "fisica/2025/julio": fisica2025,
  "fisica/2026/junio": fisica2026,
  "fisica/2026/julio": fisica2026,
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
}
