import { execFileSync } from "node:child_process"
import fs from "node:fs"
import { calendario, rutaFechas } from "./calendario"
import { fechasNombres, rutaNombres } from "./examenes"
import { orientaciones, rutaOrientaciones } from "./orientaciones"

// Fechas de publicación y de última modificación de cada página, sacadas del historial de git
// de los archivos que la forman. La página (article:modified_time, "Revisado el…") y el
// sitemap (<lastmod>) las piden con fechasDe(ruta), así que siempre coinciden.

// Primer y último commit de cada archivo de contenido, con un solo git log para todo el build
// en lugar de uno por página.
let historial: Map<string, { primera: string; ultima: string }> | undefined
function historialDe(archivo: string) {
  if (!historial) {
    historial = new Map()
    try {
      const salida = execFileSync("git", ["log", "--format=%cs", "--name-only", "--", "src/content"], {
        encoding: "utf8",
      })
      // El log va del commit más reciente al más antiguo.
      let fecha = ""
      for (const linea of salida.split("\n")) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(linea)) fecha = linea
        else if (linea) {
          const previo = historial.get(linea)
          historial.set(linea, { primera: fecha, ultima: previo?.ultima ?? fecha })
        }
      }
    } catch {
      // Sin git disponible no hay historial y se usa la fecha de hoy.
    }
  }
  return historial.get(archivo)
}

const mdx = (carpeta: string) =>
  fs.existsSync(carpeta)
    ? fs
        .readdirSync(carpeta, { recursive: true, encoding: "utf8" })
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => `${carpeta}/${f.replace(/\\/g, "/")}`)
    : []

// Archivos de contenido que forman la página de una ruta, o undefined si la página no sale
// de la colección (portada, asignatura, año, páginas legales…).
// - Examen (/fisica/2026/junio/): el examen y sus partes resueltas en cada tema, incluidos
//   los tramos de un tema partido (junio-2.mdx).
// - Tema (/fisica/temas/ondas/2026/): todos los archivos del tema en ese año.
// - Página general del tema (/fisica/temas/ondas/): todos los archivos del tema, de todos los
//   años; su fecha de modificación es la del ejercicio cambiado más recientemente.
// - Año de una asignatura (/fisica/2026/) y curso (/examenes-2026/): todos los archivos de los
//   exámenes de ese año; su fecha es la del examen revisado más recientemente.
function archivosDe(ruta: string) {
  const [asignatura, segunda, tercera, cuarta, quinta] = ruta.split("/").filter(Boolean)
  const curso = asignatura?.match(/^examenes-(\d{4})$/)?.[1]
  if (curso && !segunda) {
    const delAnio = (f: string) => f.includes(`/${curso}/`)
    return [...mdx("src/content/examenes"), ...mdx("src/content/ejercicios")].filter(delAnio)
  }
  if (/^\d{4}$/.test(segunda ?? "") && !tercera) {
    const delAnio = (f: string) => f.includes(`/${segunda}/`)
    return [...mdx(`src/content/examenes/${asignatura}`), ...mdx(`src/content/ejercicios/${asignatura}`)].filter(delAnio)
  }
  if (segunda === "temas" && tercera && !cuarta) {
    return mdx(`src/content/ejercicios/${asignatura}/${tercera}`)
  }
  if (segunda === "temas" && cuarta && !quinta) {
    return mdx(`src/content/ejercicios/${asignatura}/${tercera}/${cuarta}`)
  }
  if (/^\d{4}$/.test(segunda ?? "") && tercera && !cuarta) {
    const parte = new RegExp(`/${segunda}/${tercera}(-\\d+)?\\.mdx$`)
    return [
      `src/content/examenes/${asignatura}/${segunda}/${tercera}.mdx`,
      ...mdx(`src/content/ejercicios/${asignatura}`).filter((f) => parte.test(f)),
    ]
  }
  return undefined
}

// Fechas de una página a partir de su ruta. Sin historial (contenido aún sin commit o copia
// sin .git), la de hoy.
export function fechasDe(ruta: string) {
  const archivos = archivosDe(ruta)
  if (!archivos) return undefined
  const conHistorial = archivos.map(historialDe).filter((h) => h !== undefined)
  const hoy = new Date().toISOString().slice(0, 10)
  return {
    publicado: conHistorial.map((h) => h.primera).sort()[0] ?? hoy,
    modificado: conHistorial.map((h) => h.ultima).sort().at(-1) ?? hoy,
  }
}

// Páginas que no salen de la colección y cuya revisión se anota a mano en su archivo de datos:
// las orientaciones, el calendario y la página de PAU, PEvAU, EBAU.
const fechasFijas = new Map<string, string>([
  ...orientaciones.map((o): [string, string] => [rutaOrientaciones(o.asignatura), o.revisado]),
  [rutaFechas, calendario.actualizado],
  [rutaNombres, fechasNombres.revisado],
])

// <lastmod> del sitemap: la misma fecha que se ve en la página ("Revisado el…", "Actualizado
// el…"). La llevan los exámenes, los temas, las páginas de año y las de fecha fija.
export function fechaSitemap(ruta: string) {
  return fechasFijas.get(ruta) ?? fechasDe(ruta)?.modificado
}

export function fechaLarga(fecha: string) {
  return new Date(`${fecha}T12:00:00Z`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}
