// Tras rehype-katex, cada fórmula pasa a ser una sola cadena de HTML (<Fragment set:html>) en vez
// de un árbol de cientos de <span>. MDX convierte cada elemento en una llamada _jsx(…): con KaTeX,
// un ejercicio de 4 KB generaba unos 500 KB de JavaScript y el build llegó a necesitar más de 4 GB
// de memoria. El HTML de la página es el mismo.
import { toHtml } from "hast-util-to-html"
import { SKIP, visit } from "unist-util-visit"

const esFormula = (nodo) =>
  nodo.tagName === "span" &&
  (nodo.properties?.className ?? []).some((c) => c === "katex" || c === "katex-display")

export default function rehypeFormulasHtml() {
  return (arbol) => {
    visit(arbol, "element", (nodo, indice, padre) => {
      if (!padre || indice === undefined || !esFormula(nodo)) return
      padre.children[indice] = {
        type: "mdxJsxTextElement",
        name: "Fragment",
        attributes: [{ type: "mdxJsxAttribute", name: "set:html", value: toHtml(nodo) }],
        children: [],
      }
      // La fórmula entera ya está en la cadena: no hay que entrar en sus <span>.
      return SKIP
    })
  }
}
