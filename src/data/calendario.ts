// Calendario y horario de la PAU de Andalucía. Para el curso que viene basta con cambiar este
// archivo: la página /fechas-pau-andalucia/ se construye entera a partir de él.
//
// Fuente: página del Distrito Único Andaluz (Junta de Andalucía), copiada en
// fuentes/calendario-2027.md y con la tabla del horario en fuentes/calendario-2027.png
// (consultada el 14 de noviembre de 2026). El reparto de asignaturas por día sale de la captura.
// No hay fechas de inscripción, notas ni revisión en la fuente, así que la página no las da.
// La fuente publica un único horario por días (1.er, 2.º y 3.er día), debajo de las dos
// convocatorias: los días de la extraordinaria se corresponden con el 1.er, 2.º y 3.er día.

export interface Materia {
  nombre: string
  // Asignaturas de la web a las que corresponde (se destacan y enlazan a sus orientaciones).
  asignaturas?: string[]
}

export interface Franja {
  hora: string
  // Una lista de materias por día; vacía si ese día no hay exámenes en la franja.
  dias: Materia[][]
}

const ext = (nombre: string): Materia => ({ nombre, asignaturas: ["ingles", "frances"] })
const coincidencia: Materia[] = [{ nombre: "Exámenes de coincidencia horaria" }]

export const calendario = {
  anio: 2027,
  curso: "2026-2027",
  fuente:
    "https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/?q=grados&d=g_b_calendario.php",
  organismo: "Distrito Único Andaluz (Junta de Andalucía)",
  // Fecha en que se consultó la fuente y se revisó la página.
  actualizado: "2026-11-14",
  // La web oficial dice "Pendiente de publicación en BOJA". Cambiar a false al publicarse.
  pendienteBoja: true,
  ordinaria: ["2027-06-01", "2027-06-02", "2027-06-03"],
  extraordinaria: ["2027-06-29", "2027-06-30", "2027-07-01"],
  citacion: "08:00",
  manana: [
    {
      hora: "08:30 - 10:00",
      dias: [
        [{ nombre: "Lengua Castellana y Literatura II" }],
        [
          { nombre: "Análisis Musical II" },
          { nombre: "Dibujo Artístico II" },
          { nombre: "Latín II" },
          { nombre: "Matemáticas II", asignaturas: ["matematicas-ii"] },
          { nombre: "Ciencias Generales" },
        ],
        [
          { nombre: "Historia de la Música y de la Danza" },
          { nombre: "Dibujo Técnico II" },
          { nombre: "Geografía" },
          { nombre: "Diseño" },
          { nombre: "Biología" },
        ],
      ],
    },
    {
      hora: "11:00 - 12:30",
      dias: [
        [{ nombre: "Historia de España" }, { nombre: "Historia de la Filosofía" }],
        [
          { nombre: "Artes Escénicas II" },
          { nombre: "Matemáticas Aplicadas a las CC. Sociales II", asignaturas: ["matematicas-aplicadas"] },
          { nombre: "Griego II" },
          { nombre: "D.T. Aplicado a las Artes Plásticas y al Diseño II" },
        ],
        [
          ext("Lengua Extranjera (fase de admisión)"),
          { nombre: "Técnicas de Expresión Gráfico-Plástica" },
          { nombre: "Literatura Dramática" },
          { nombre: "Química" },
        ],
      ],
    },
    {
      hora: "13:30 - 15:00",
      dias: [
        [ext("Lengua Extranjera (fase de acceso)")],
        [
          { nombre: "Coro y Técnica Vocal II" },
          { nombre: "Movimientos Culturales y Artísticos" },
          { nombre: "Física", asignaturas: ["fisica"] },
          { nombre: "Empresa y Diseño de Modelos de Negocio" },
        ],
        [
          { nombre: "Historia del Arte" },
          { nombre: "Fundamentos Artísticos" },
          { nombre: "Geología y Ciencias Ambientales" },
          { nombre: "Tecnología e Ingeniería II" },
        ],
      ],
    },
  ] as Franja[],
  // Horario de tarde: solo para incompatibilidades horarias.
  tarde: [
    { hora: "17:00 - 18:30", dias: [[], coincidencia, coincidencia] },
    { hora: "19:00 - 20:30", dias: [[], [], coincidencia] },
    { hora: "21:00 - 22:30", dias: [[], [], coincidencia] },
  ] as Franja[],
}

export const rutaFechas = "/fechas-pau-andalucia/"

const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
  "septiembre", "octubre", "noviembre", "diciembre"]

function enLista(partes: string[]) {
  return partes.length < 2 ? partes.join("") : `${partes.slice(0, -1).join(", ")} y ${partes.at(-1)}`
}

const partes = (fecha: string) => fecha.split("-").map(Number) as [number, number, number]

// "1, 2 y 3 de junio" o "29 y 30 de junio y 1 de julio" (todas las fechas del mismo año).
export function diasEnTexto(fechas: string[], conAnio = false) {
  const grupos: { mes: number; dias: number[] }[] = []
  for (const f of fechas) {
    const [, mes, dia] = partes(f)
    const ultimo = grupos.at(-1)
    if (ultimo?.mes === mes) ultimo.dias.push(dia)
    else grupos.push({ mes, dias: [dia] })
  }
  const texto = enLista(grupos.map((g) => `${enLista(g.dias.map(String))} de ${meses[g.mes - 1]}`))
  return conAnio ? `${texto} de ${partes(fechas[0])[0]}` : texto
}

// "martes 1 de junio"
export function diaConSemana(fecha: string) {
  const [anio, mes, dia] = partes(fecha)
  const semana = new Date(Date.UTC(anio, mes - 1, dia)).toLocaleDateString("es-ES", {
    weekday: "long",
    timeZone: "UTC",
  })
  return `${semana} ${dia} de ${meses[mes - 1]}`
}

export const ordinales = ["1.er día", "2.º día", "3.er día"]
