// Fuente única de las asignaturas. Añadir una asignatura = añadir un objeto aquí
// (y sus exámenes en src/content/examenes/<slug>/). Ningún componente cambia.
//
// Reglas de color (ver DESIGN.md › Asignaturas):
// - `acento`: color sobre papel claro. Texto blanco encima ≥ 4.5:1 y él mismo ≥ 4.5:1 sobre el papel.
// - `acentoOscuro`: versión para modo oscuro. Texto tinta oscura encima ≥ 4.5:1.

export type Area = 'comunes' | 'ciencias' | 'sociales';

export interface Bloque {
  slug: string;
  nombre: string;
}

export interface Asignatura {
  slug: string;
  nombre: string;
  nombreCorto: string;
  descripcion: string;
  area: Area;
  acento: string;
  acentoOscuro: string;
  icono: IconoAsignatura;
  bloques: Bloque[];
  /** false = se lista como "próximamente" y su página muestra el estado vacío. */
  disponible: boolean;
}

export type IconoAsignatura =
  | 'orbita' | 'grafica' | 'integral' | 'matraz' | 'celula' | 'columna' | 'libro'
  | 'bocadillo' | 'mapa' | 'idea' | 'compas' | 'empresa' | 'pergamino' | 'roca' | 'marco';

export const areas: Record<Area, string> = {
  comunes: 'Materias comunes',
  ciencias: 'Ciencias y Tecnología',
  sociales: 'Humanidades y Ciencias Sociales',
};

export const asignaturas: Asignatura[] = [
  {
    slug: 'fisica',
    nombre: 'Física',
    nombreCorto: 'Física',
    descripcion: 'Campos gravitatorio y electromagnético, ondas, óptica y física moderna.',
    area: 'ciencias',
    acento: '#2447C8',
    acentoOscuro: '#93A8FF',
    icono: 'orbita',
    disponible: true,
    bloques: [
      { slug: 'campo-gravitatorio', nombre: 'Campo gravitatorio' },
      { slug: 'electromagnetismo', nombre: 'Electromagnetismo' },
      { slug: 'ondas', nombre: 'Ondas' },
      { slug: 'optica', nombre: 'Óptica' },
      { slug: 'fisica-moderna', nombre: 'Física moderna' },
    ],
  },
  {
    slug: 'matematicas-ccss',
    nombre: 'Matemáticas Aplicadas a las Ciencias Sociales II',
    nombreCorto: 'Matemáticas CCSS II',
    descripcion: 'Matrices y programación lineal, funciones y derivadas, probabilidad e inferencia.',
    area: 'sociales',
    acento: '#0B7A55',
    acentoOscuro: '#4FD1A0',
    icono: 'grafica',
    disponible: true,
    bloques: [
      { slug: 'algebra', nombre: 'Álgebra' },
      { slug: 'analisis', nombre: 'Análisis' },
      { slug: 'probabilidad-estadistica', nombre: 'Probabilidad y Estadística' },
    ],
  },
  { slug: 'matematicas-ii', nombre: 'Matemáticas II', nombreCorto: 'Matemáticas II', descripcion: 'Álgebra lineal, geometría en el espacio, análisis y probabilidad.', area: 'ciencias', acento: '#6A35B8', acentoOscuro: '#C2A2FF', icono: 'integral', disponible: false, bloques: [] },
  { slug: 'quimica', nombre: 'Química', nombreCorto: 'Química', descripcion: 'Estructura atómica, enlace, equilibrio, ácido-base, redox y orgánica.', area: 'ciencias', acento: '#B23A1E', acentoOscuro: '#FF9C80', icono: 'matraz', disponible: false, bloques: [] },
  { slug: 'biologia', nombre: 'Biología', nombreCorto: 'Biología', descripcion: 'Biomoléculas, célula, genética, microbiología e inmunología.', area: 'ciencias', acento: '#4D7A0F', acentoOscuro: '#A9D86A', icono: 'celula', disponible: false, bloques: [] },
  { slug: 'historia-espana', nombre: 'Historia de España', nombreCorto: 'Historia de España', descripcion: 'De la Prehistoria a la España democrática, con comentario de fuentes.', area: 'comunes', acento: '#8A4B12', acentoOscuro: '#E7AE73', icono: 'columna', disponible: false, bloques: [] },
  { slug: 'lengua', nombre: 'Lengua Castellana y Literatura II', nombreCorto: 'Lengua II', descripcion: 'Comentario de texto, sintaxis y literatura española.', area: 'comunes', acento: '#A3205A', acentoOscuro: '#FF8FBF', icono: 'libro', disponible: false, bloques: [] },
  { slug: 'ingles', nombre: 'Inglés II', nombreCorto: 'Inglés II', descripcion: 'Comprensión lectora, gramática y redacción.', area: 'comunes', acento: '#1F6B8F', acentoOscuro: '#7FCBEF', icono: 'bocadillo', disponible: false, bloques: [] },
  { slug: 'historia-filosofia', nombre: 'Historia de la Filosofía', nombreCorto: 'Historia de la Filosofía', descripcion: 'Autores, textos y problemas de la filosofía occidental.', area: 'comunes', acento: '#5B4A9E', acentoOscuro: '#B5A8F2', icono: 'idea', disponible: false, bloques: [] },
  { slug: 'geografia', nombre: 'Geografía', nombreCorto: 'Geografía', descripcion: 'Medio físico, población, actividades económicas y territorio.', area: 'sociales', acento: '#6B660C', acentoOscuro: '#D8D06A', icono: 'mapa', disponible: false, bloques: [] },
  { slug: 'empresa', nombre: 'Empresa y Diseño de Modelos de Negocio', nombreCorto: 'Empresa', descripcion: 'La empresa, su entorno, la función financiera y los modelos de negocio.', area: 'sociales', acento: '#0F6E6E', acentoOscuro: '#6FD6D3', icono: 'empresa', disponible: false, bloques: [] },
  { slug: 'latin', nombre: 'Latín II', nombreCorto: 'Latín II', descripcion: 'Traducción, morfosintaxis y literatura latina.', area: 'sociales', acento: '#8C2F2F', acentoOscuro: '#F0A0A0', icono: 'pergamino', disponible: false, bloques: [] },
  { slug: 'historia-arte', nombre: 'Historia del Arte', nombreCorto: 'Historia del Arte', descripcion: 'Estilos, obras y comentario de imagen.', area: 'sociales', acento: '#7C3E8F', acentoOscuro: '#D7A3E8', icono: 'marco', disponible: false, bloques: [] },
  { slug: 'dibujo-tecnico', nombre: 'Dibujo Técnico II', nombreCorto: 'Dibujo Técnico II', descripcion: 'Geometría plana, sistemas de representación y normalización.', area: 'ciencias', acento: '#3C4A5C', acentoOscuro: '#A8B6C8', icono: 'compas', disponible: false, bloques: [] },
  { slug: 'geologia', nombre: 'Geología y Ciencias Ambientales', nombreCorto: 'Geología', descripcion: 'Tectónica, minerales y rocas, riesgos y medio ambiente.', area: 'ciencias', acento: '#7A5530', acentoOscuro: '#D9B48C', icono: 'roca', disponible: false, bloques: [] },
];

export const getAsignatura = (slug: string) => asignaturas.find((a) => a.slug === slug);

export const nombreBloque = (asig: Asignatura, slug: string) =>
  asig.bloques.find((b) => b.slug === slug)?.nombre ?? slug;

export const convocatorias = {
  ordinaria: 'Ordinaria',
  extraordinaria: 'Extraordinaria',
  junio: 'Junio',
  julio: 'Julio',
  septiembre: 'Septiembre',
} as const;

export type Convocatoria = keyof typeof convocatorias;

/** Orden dentro de un año: la primera convocatoria del curso va primero. */
export const ordenConvocatoria: Record<Convocatoria, number> = {
  ordinaria: 0, junio: 0, julio: 1, extraordinaria: 2, septiembre: 2,
};

/** Estilo inline que inyecta el acento de una asignatura en cualquier subárbol. */
export const estiloAcento = (a: Pick<Asignatura, 'acento' | 'acentoOscuro'>) =>
  `--acc-l:${a.acento};--acc-d:${a.acentoOscuro};`;
