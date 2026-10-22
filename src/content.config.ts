import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

// Cada examen es un archivo .mdx en src/content/examenes/<asignatura>/<año>/<convocatoria>.mdx,
// por ejemplo src/content/examenes/fisica/2026/junio.mdx → /fisica/2026/junio/
const examenes = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/examenes" }),
  schema: z.object({
    asignatura: z.string(),
    anio: z.number(),
    convocatoria: z.string(),
    // Maquetación del enunciado: "normal" (apartados en párrafos) o "sangrado"
    // (ejercicios A1, A2… con sangría francesa, como en los cursos hasta 2023-2024).
    // "bloque" (curso 2020-2021): el primer apartado con sangría francesa y los siguientes
    // como bloques sangrados, en letra estrecha.
    formato: z.enum(["normal", "sangrado", "bloque"]).default("normal"),
    // Texto para la meta descripción; si falta se genera uno.
    descripcion: z.string().optional(),
  }),
})

export const collections = { examenes }
