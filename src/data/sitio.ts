// Datos de la web que se repiten en los metadatos y en los datos estructurados (schema.org).
export const sitio = {
  nombre: "Selectividad resuelta",
  nombreAlternativo: "Selectividad Resuelta Andalucía",
  descripcion:
    "Exámenes de Selectividad (PAU, antes PEvAU) de Andalucía resueltos y explicados pregunta a pregunta.",
  // ID de medición de Google Analytics 4.
  analytics: "G-WH506NXFVM",
  // ID de editor de Google AdSense (ca-pub-…). Vacío, la web no carga AdSense ni publica ads.txt.
  adsense: "ca-pub-8654055324951275",
}

// Nodo del editor de la web, al que apuntan el resto de datos estructurados con su @id.
export function editor(site: URL | undefined) {
  return {
    "@type": "Organization",
    "@id": new URL("/#editor", site).href,
    name: sitio.nombre,
    url: site?.href,
    logo: new URL("/logo.png", site).href,
  }
}

export function referenciaEditor(site: URL | undefined) {
  return { "@id": new URL("/#editor", site).href }
}

// El nodo WebSite completo está en la portada; el resto de páginas lo citan por su @id.
export function referenciaWeb(site: URL | undefined) {
  return { "@id": new URL("/#web", site).href }
}

// Autor de las soluciones: firma los exámenes resueltos y tiene su propia página.
export const autor = {
  nombre: "Ignacio Blanquero Blanco",
  ruta: "/sobre-el-autor/",
  linkedin: "https://www.linkedin.com/in/ignacio-blanquero-blanco/",
}

// De dónde salen los enunciados: la página de exámenes anteriores del Distrito Único Andaluz.
export const fuenteExamenes = {
  organismo: "Distrito Único Andaluz (Junta de Andalucía)",
  url: "https://www.juntadeandalucia.es/economiaconocimientoempresasyuniversidad/sguit/?q=grados&d=g_b_examenes_anteriores.php",
}

// Página de contacto, enlazada en el pie junto a "Sobre el autor".
export const contacto = {
  nombre: "Contacto",
  ruta: "/contacto/",
}

// Nodo del autor, con el mismo @id en su página y en los exámenes que firma.
export function persona(site: URL | undefined) {
  return {
    "@type": "Person",
    "@id": new URL(`${autor.ruta}#autor`, site).href,
    name: autor.nombre,
    url: new URL(autor.ruta, site).href,
    jobTitle: "Ingeniero de software",
    knowsLanguage: ["es", "en", "fr"],
    worksFor: referenciaEditor(site),
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad de Sevilla" },
    // Títulos que ha dado el autor; no añadir ninguno que no haya dado él.
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Grado en Ingeniería Informática - Ingeniería del Software",
        recognizedBy: { "@type": "CollegeOrUniversity", name: "Universidad de Sevilla" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "Inglés, nivel B2",
        recognizedBy: { "@type": "Organization", name: "Cambridge" },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certificate",
        name: "Francés, nivel B1",
        recognizedBy: { "@type": "Organization", name: "Ministerio de Educación Nacional de Francia" },
      },
    ],
    sameAs: [autor.linkedin],
  }
}

export function referenciaAutor(site: URL | undefined) {
  return { "@id": new URL(`${autor.ruta}#autor`, site).href }
}

// BreadcrumbList con las mismas migas que se ven en la página, empezando por Inicio.
export function migas(site: URL | undefined, niveles: { nombre: string; ruta: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ nombre: "Inicio", ruta: "/" }, ...niveles].map((nivel, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: nivel.nombre,
      item: new URL(nivel.ruta, site).href,
    })),
  }
}
