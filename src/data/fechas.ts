import { execFileSync } from "node:child_process"

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

export function fechaLarga(fecha: string) {
  return new Date(`${fecha}T12:00:00Z`).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}
