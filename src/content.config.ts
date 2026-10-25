import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

// Cada examen es un archivo .mdx en src/content/examenes/<asignatura>/<año>/<convocatoria>.mdx,
// por ejemplo src/content/examenes/ingles/2026/junio.mdx → /ingles/2026/junio/
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
    // "ingles": texto de comprensión con las líneas numeradas y opciones a dos columnas.
    // "frances": texto en párrafos justificados y preguntas sangradas por bloques (I, II y III).
    formato: z.enum(["normal", "sangrado", "bloque", "ingles", "frances"]).default("normal"),
    // Texto para la meta descripción; si falta se genera uno.
    descripcion: z.string().optional(),
  }),
})

// Ejercicios resueltos de un tema: la parte de cada examen que corresponde a ese tema, con
// las soluciones. Un archivo por examen en
// src/content/ejercicios/<asignatura>/<tema>/<año>/<convocatoria>.mdx, por ejemplo
// src/content/ejercicios/ingles/comprension-lectora/2026/junio.mdx → /ingles/temas/comprension-lectora/2026/
const ejercicios = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/ejercicios" }),
  schema: z.object({
    asignatura: z.string(),
    tema: z.string(),
    anio: z.number(),
    convocatoria: z.string(),
    formato: z.enum(["normal", "sangrado", "bloque", "ingles", "frances"]).default("normal"),
  }),
})

export const collections = { examenes, ejercicios }
