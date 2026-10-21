import { getCollection, type CollectionEntry } from 'astro:content';
import { convocatorias, ordenConvocatoria, type Convocatoria } from '../config/asignaturas';

export type Examen = CollectionEntry<'examenes'>;

export const slugExamen = (e: Examen) => `${e.data.anio}-${e.data.convocatoria}`;
export const urlExamen = (e: Examen) => `/${e.data.asignatura}/${slugExamen(e)}/`;
export const urlAsignatura = (slug: string) => `/${slug}/`;
export const nombreConvocatoria = (c: Convocatoria) => convocatorias[c];

/** Más reciente primero; dentro del año, la convocatoria del curso antes que la de recuperación. */
export const ordenar = (a: Examen, b: Examen) =>
  b.data.anio - a.data.anio || ordenConvocatoria[a.data.convocatoria] - ordenConvocatoria[b.data.convocatoria];

export async function examenes(asignatura?: string) {
  const todos = await getCollection('examenes', (e) => !asignatura || e.data.asignatura === asignatura);
  return todos.sort(ordenar);
}

// ---------------------------------------------------------------------------
// Estructura del examen leída de las directivas del Markdown.
// Se usa para el índice, la búsqueda y los recuentos, sin renderizar nada.
// ---------------------------------------------------------------------------

export interface ApartadoIdx { letra: string; puntos?: string; coord: string; id: string; texto: string }
export interface EjercicioIdx { id: string; puntos?: string; tema?: string; texto: string; apartados: ApartadoIdx[] }
export interface BloqueIdx { id: string; titulo: string; instruccion?: string; ejercicios: EjercicioIdx[] }

const attrs = (s: string) =>
  Object.fromEntries([...s.matchAll(/(\w+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));

/** Primer párrafo legible tras una directiva, sin LaTeX ni marcas. */
const resumen = (lineas: string[], desde: number) => {
  const out: string[] = [];
  for (let i = desde; i < lineas.length; i++) {
    const l = lineas[i].trim();
    if (!l) { if (out.length) break; continue; }
    if (l.startsWith(':') || l.startsWith('|') || l.startsWith('$$')) break;
    out.push(l);
  }
  return out.join(' ')
    .replace(/\$([^$]+)\$/g, (_, m: string) =>
      m
        .replace(/\\begin\{pmatrix\}[\s\S]*?\\end\{pmatrix\}/g, '(matriz)')
        .replace(/\{,\}/g, ',')
        .replace(/\\(?:text|mathrm|operatorname)\{([^}]*)\}/g, '$1')
        .replace(/\\cdot/g, '·')
        .replace(/\\[a-zA-Z]+/g, '')
        .replace(/[{}\\^_]/g, '')
        .replace(/\s+/g, ' ')
        .trim())
    .replace(/[*_]/g, '')
    .trim();
};

export function estructura(body = ''): BloqueIdx[] {
  const lineas = body.split(/\r?\n/);
  const bloques: BloqueIdx[] = [];
  let ej: EjercicioIdx | null = null;
  lineas.forEach((raw, i) => {
    const l = raw.trim();
    let m;
    if ((m = l.match(/^::bloque\{(.*)\}$/))) {
      const a = attrs(m[1]);
      bloques.push({ id: a.id, titulo: a.titulo, instruccion: a.instruccion, ejercicios: [] });
    } else if ((m = l.match(/^:{3,}ejercicio\{(.*)\}$/))) {
      const a = attrs(m[1]);
      ej = { id: a.id, puntos: a.puntos, tema: a.tema, texto: resumen(lineas, i + 1), apartados: [] };
      if (!bloques.length) bloques.push({ id: '', titulo: '', ejercicios: [] });
      bloques[bloques.length - 1].ejercicios.push(ej);
    } else if ((m = l.match(/^:{3,}apartado\{(.*)\}$/)) && ej) {
      const a = attrs(m[1]);
      ej.apartados.push({
        letra: a.letra, puntos: a.puntos,
        coord: `${ej.id}·${a.letra}`, id: `ej-${ej.id}-${a.letra}`,
        texto: resumen(lineas, i + 1),
      });
    }
  });
  return bloques;
}

export const contarEjercicios = (e: Examen) =>
  estructura(e.body).reduce((n, b) => n + b.ejercicios.length, 0);

export async function estadisticas() {
  const todos = await examenes();
  const resueltos = todos.filter((e) => e.data.resuelto);
  const anios = todos.map((e) => e.data.anio);
  return {
    examenes: todos.length,
    resueltos: resueltos.length,
    ejercicios: resueltos.reduce((n, e) => n + contarEjercicios(e), 0),
    desde: Math.min(...anios),
    hasta: Math.max(...anios),
  };
}
