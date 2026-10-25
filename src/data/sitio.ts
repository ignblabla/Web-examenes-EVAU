// Datos de la web que se repiten en los metadatos y en los datos estructurados (schema.org).
export const sitio = {
  nombre: "Selectividad resuelta",
  nombreAlternativo: "Selectividad Resuelta Andalucía",
  descripcion:
    "Exámenes de Selectividad (PAU, antes PEvAU) de Andalucía resueltos y explicados pregunta a pregunta.",
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
