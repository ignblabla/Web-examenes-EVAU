import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const examenes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/examenes' }),
  schema: z.object({
    asignatura: z.string(),
    anio: z.number().int(),
    convocatoria: z.enum(['ordinaria', 'extraordinaria', 'junio', 'julio', 'septiembre']),
    titulo: z.string(),
    duracion: z.number().int().default(90),
    pdf_oficial: z.string().optional(),
    bloques: z.array(z.string()).default([]),
    /** Instrucción general de la carátula, p. ej. "Un ejercicio de cada bloque". */
    responder: z.string().optional(),
    /** false = el enunciado existe pero la resolución está en preparación. */
    resuelto: z.boolean().default(true),
  }),
});

export const collections = { examenes };
