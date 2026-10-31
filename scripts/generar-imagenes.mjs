// Genera las imágenes para compartir (Open Graph, 1200×630) y el logo en PNG.
// Uso: node scripts/generar-imagenes.mjs  →  public/og/*.png y public/logo.png
import fs from "node:fs"
import sharp from "sharp"

const tinta = "#172c27"
const crema = "#f5f1e8"
const verde = "#195c51"

const imagenes = [
  { archivo: "inicio", titulo: "Exámenes de Selectividad", color: "#c8ef59", marca: "✓", pie: "Inglés, Francés y Matemáticas · Junio, julio y reservas" },
  { archivo: "ingles", titulo: "Exámenes de Inglés", color: "#edc767", marca: "En", pie: "Reading · Use of English · Writing · 2021–2026" },
  { archivo: "frances", titulo: "Exámenes de Francés", color: "#e99887", marca: "Fr", pie: "Compréhension · Compétence linguistique · 2021–2026" },
  { archivo: "matematicas-aplicadas", titulo: "Matemáticas CCSS", subtitulo: "resueltas paso a paso.", color: "#d8e5ed", marca: "Σ", pie: "Álgebra · Funciones · Probabilidad · Inferencia · 2021–2026" },
  { archivo: "matematicas-ii", titulo: "Matemáticas II", subtitulo: "resueltas paso a paso.", color: verde, marca: "∫", pie: "Álgebra · Geometría · Análisis · Probabilidad · 2024–2026" },
]

const escapar = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;")

function logo(x, y, escala = 1) {
  return `<g transform="translate(${x} ${y}) scale(${escala})">
    <circle cx="22" cy="22" r="22" fill="${tinta}"/>
    <rect x="11" y="24" width="5" height="9" rx="2" fill="#c8ef59" transform="rotate(12 13 28)"/>
    <rect x="20" y="19" width="5" height="14" rx="2" fill="#c8ef59" transform="rotate(12 22 26)"/>
    <rect x="29" y="13" width="5" height="20" rx="2" fill="#c8ef59" transform="rotate(12 31 23)"/>
  </g>`
}

function og({ titulo, subtitulo = "resueltos y explicados.", color, marca, pie }) {
  const oscuro = color === verde
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${crema}"/>
  <rect x="820" width="380" height="630" fill="${color}"/>
  <text x="1010" y="390" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="260" fill="${oscuro ? "#ffffff" : tinta}" opacity="0.9">${escapar(marca)}</text>
  ${logo(80, 70)}
  <text x="140" y="100" font-family="Arial, sans-serif" font-weight="700" font-size="24" fill="${tinta}">Selectividad resuelta</text>
  <text x="80" y="245" font-family="Arial, sans-serif" font-weight="700" font-size="22" letter-spacing="3" fill="${tinta}">SELECTIVIDAD (PAU) · ANDALUCÍA</text>
  <text x="80" y="345" font-family="Georgia, serif" font-size="76" letter-spacing="-2" fill="${tinta}">${escapar(titulo)}</text>
  <text x="80" y="432" font-family="Georgia, serif" font-style="italic" font-size="76" letter-spacing="-2" fill="${verde}">${escapar(subtitulo)}</text>
  <text x="80" y="550" font-family="Arial, sans-serif" font-size="24" fill="#41534e">${escapar(pie)}</text>
</svg>`
}

fs.mkdirSync("public/og", { recursive: true })
for (const imagen of imagenes) {
  await sharp(Buffer.from(og(imagen))).png({ compressionLevel: 9 }).toFile(`public/og/${imagen.archivo}.png`)
}
await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 44 44">${logo(0, 0)}</svg>`))
  .png()
  .toFile("public/logo.png")
console.log("Imágenes generadas:", imagenes.map((i) => `og/${i.archivo}.png`).join(", "), "y logo.png")
