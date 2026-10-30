import { execFileSync } from "node:child_process"
import fs from "node:fs"

// Fechas de publicación y de última modificación de una página, sacadas del historial de git
// de los archivos que la forman. Sin historial (archivo nuevo o copia sin .git), la de hoy.
export function fechas(archivos: string[]) {
  let lineas: string[] = []
  try {
    lineas = execFileSync("git", ["log", "--format=%cs", "--", ...archivos], { encoding: "utf8" })
      .split("\n")
      .filter(Boolean)
  } catch {
    // Sin git disponible se usa la fecha de hoy.
  }
  const hoy = new Date().toISOString().slice(0, 10)
  return { publicado: lineas.at(-1) ?? hoy, modificado: lineas[0] ?? hoy }
}

// Fecha de la última modificación de cada archivo de contenido, con un solo git log para
// todo el sitemap en lugar de uno por página.
let modificaciones: Map<string, string> | undefined
function ultimaModificacion(archivo: string) {
  if (!modificaciones) {
    modificaciones = new Map()
    try {
      const salida = execFileSync("git", ["log", "--format=%cs", "--name-only", "--", "src/content"], {
        encoding: "utf8",
      })
      let fecha = ""
      for (const linea of salida.split("\n")) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(linea)) fecha = linea
        else if (linea && !modificaciones.has(linea)) modificaciones.set(linea, fecha)
      }
    } catch {
      // Sin git disponible no hay fechas en el sitemap.
    }
  }
  return modificaciones.get(archivo)
}

const mdx = (carpeta: string) =>
  fs.existsSync(carpeta)
    ? fs
        .readdirSync(carpeta, { recursive: true, encoding: "utf8" })
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => `${carpeta}/${f.replace(/\\/g, "/")}`)
    : []

// <lastmod> del sitemap: la misma fecha que article:modified_time, sacada de los mismos
// archivos que usan las páginas de examen y de tema. El resto de páginas no la llevan.
export function fechaSitemap(ruta: string) {
  const [asignatura, segunda, tercera, cuarta] = ruta.split("/").filter(Boolean)
  let archivos: string[]
  if (segunda === "temas" && cuarta) {
    archivos = mdx(`src/content/ejercicios/${asignatura}/${tercera}/${cuarta}`)
  } else if (/^\d{4}$/.test(segunda ?? "") && tercera && !cuarta) {
    archivos = [
      `src/content/examenes/${asignatura}/${segunda}/${tercera}.mdx`,
      ...mdx(`src/content/ejercicios/${asignatura}`).filter((f) => f.endsWith(`/${segunda}/${tercera}.mdx`)),
    ]
  } else {
    return undefined
  }
  const conHistorial = archivos.map(ultimaModificacion).filter(Boolean) as string[]
  // Como fechas(): sin historial (contenido aún sin commit), la de hoy.
  return conHistorial.sort().at(-1) ?? new Date().toISOString().slice(0, 10)
}

export function fechaLarga(fecha: string) {
  return new Date(`${fecha}T12:00:00Z`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}
