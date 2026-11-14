// Temas de la redacción (Writing en Inglés, expression écrite en Francés) de cada examen,
// sacados del MDX del examen completo. Los usa la página de la asignatura para el resumen
// de qué piden los temas y la lista de todos ellos.

const limpiar = (s: string) =>
  s
    .replace(/<strong>Sur le sujet[\s\S]*?<\/strong>/, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;| /g, " ")
    .replace(/^\s*(C\d|29\.\d|Sujet \d)\.\s*/, "")
    .replace(/^\s*«\s*|\s*»\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim()

export function temasRedaccion(mdx: string, asignatura: string): string[] {
  // El bloque de la redacción va al final del examen, antes de las redacciones modelo.
  const fin = mdx.indexOf("<Redaccion")
  const texto = fin === -1 ? mdx : mdx.slice(0, fin)
  if (asignatura === "ingles") {
    const bloque = texto.match(/class="en-list en-topics">([\s\S]*?)<\/div>/)?.[1] ?? ""
    return [...bloque.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => limpiar(m[1])).filter(Boolean)
  }
  const inicio = Math.max(texto.lastIndexOf("BLOQUE C"), texto.lastIndexOf("BLOQUE III"))
  const bloque = inicio === -1 ? "" : texto.slice(inicio)
  return [...bloque.matchAll(/<div class="fr-items[^"]*">([\s\S]*?)<\/div>/g)]
    .flatMap((d) => [...d[1].matchAll(/<p(?![^>]*fr-question)[^>]*>([\s\S]*?)<\/p>/g)])
    .map((m) => limpiar(m[1]))
    .filter(Boolean)
}

// Qué pide cada tema según la instrucción con la que termina.
export const instruccionesIngles = [
  { nombre: "Discuss", patron: /Discuss\b/i },
  { nombre: "Explain", patron: /Explain\b/i },
  { nombre: "Give reasons", patron: /Give reasons|Why\?/i },
]

export const instruccionesFrances = [
  { nombre: "Argumentez votre réponse", patron: /Argumentez/i },
  { nombre: "Racontez / Expliquez", patron: /Racontez|Expliquez|Illustrez/i },
]

// Asuntos que se repiten. Cuenta los temas cuyo enunciado menciona alguna de las palabras.
export const asuntos = [
  {
    nombre: "redes sociales e Internet",
    patron: /social media|réseaux sociaux|influenc|internet|\bapps?\b|smartphone|online|en ligne|achats/i,
  },
  {
    nombre: "tecnología e inteligencia artificial",
    patron: /technolog|artificial intelligence|intelligence artificielle|\bIA\b|ChatGPT|video games|scientific/i,
  },
  {
    nombre: "medio ambiente",
    patron: /pollution|climat|environnement|environment|plastique|plastic|énergie|énergétique|vertes|catastrophe/i,
  },
  {
    nombre: "salud y hábitos",
    patron: /santé|health|sport|alimentation|alimentaires|eating|eat\b|sleep|habitudes|physique|fumer|rest\b/i,
  },
  {
    nombre: "familia, amistad y personas mayores",
    patron: /famil|parents|grandparents|friend|elderly|older generations|admire/i,
  },
  { nombre: "acoso", patron: /harcèlement/i },
  { nombre: "trabajo y teletrabajo", patron: /télétravail|travail|working from home|work and rest|dream job|métiers|professions/i },
]
