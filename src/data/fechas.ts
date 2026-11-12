import { execFileSync } from "node:child_process"
import fs from "node:fs"

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
function archivosDe(ruta: string) {
  const [asignatura, segunda, tercera, cuarta, quinta] = ruta.split("/").filter(Boolean)
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

// <lastmod> del sitemap: la misma fecha que article:modified_time. Solo la llevan los
// exámenes y las páginas de tema.
export function fechaSitemap(ruta: string) {
  return fechasDe(ruta)?.modificado
}

export function fechaLarga(fecha: string) {
  return new Date(`${fecha}T12:00:00Z`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}
