// Código QR en SVG generado en el build, sin dependencias ni JavaScript en el navegador.
// Implementa lo justo de la norma ISO/IEC 18004 para las URL de la web: modo byte, nivel de
// corrección M y versiones 1 a 10 (hasta 213 bytes). Basado en el algoritmo de qrcodegen
// de Project Nayuki (MIT).

// Por versión (1-10), nivel M: códigos de corrección por bloque y número de bloques.
const ECC_POR_BLOQUE = [10, 16, 26, 18, 24, 16, 18, 22, 22, 26]
const BLOQUES = [1, 1, 1, 2, 2, 4, 4, 4, 5, 5]
const NIVEL_M = 0 // Bits del nivel en la información de formato (L=1, M=0, Q=3, H=2).

// Módulos disponibles para datos y corrección en una versión.
function modulosDeDatos(version: number) {
  let n = (16 * version + 128) * version + 64
  if (version >= 2) {
    const alineaciones = Math.floor(version / 7) + 2
    n -= (25 * alineaciones - 10) * alineaciones - 55
    if (version >= 7) n -= 36
  }
  return n
}

const codigosDeDatos = (v: number) =>
  Math.floor(modulosDeDatos(v) / 8) - ECC_POR_BLOQUE[v - 1] * BLOQUES[v - 1]

// Aritmética en GF(256) con el polinomio x^8 + x^4 + x^3 + x^2 + 1.
function multiplicar(x: number, y: number) {
  let z = 0
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d)
    z ^= ((y >>> i) & 1) * x
  }
  return z & 0xff
}

function divisorReedSolomon(grado: number) {
  const resultado = new Array<number>(grado).fill(0)
  resultado[grado - 1] = 1
  let raiz = 1
  for (let i = 0; i < grado; i++) {
    for (let j = 0; j < grado; j++) {
      resultado[j] = multiplicar(resultado[j], raiz)
      if (j + 1 < grado) resultado[j] ^= resultado[j + 1]
    }
    raiz = multiplicar(raiz, 0x02)
  }
  return resultado
}

function restoReedSolomon(datos: number[], divisor: number[]) {
  const resultado = divisor.map(() => 0)
  for (const b of datos) {
    const factor = b ^ (resultado.shift() as number)
    resultado.push(0)
    divisor.forEach((d, i) => (resultado[i] ^= multiplicar(d, factor)))
  }
  return resultado
}

// Datos codificados en bytes (modo byte, terminador y relleno 0xEC 0x11).
function codificar(bytes: Uint8Array, version: number) {
  const bits: number[] = []
  const anadir = (valor: number, longitud: number) => {
    for (let i = longitud - 1; i >= 0; i--) bits.push((valor >>> i) & 1)
  }
  anadir(0b0100, 4)
  anadir(bytes.length, version <= 9 ? 8 : 16)
  for (const b of bytes) anadir(b, 8)
  const capacidad = codigosDeDatos(version) * 8
  anadir(0, Math.min(4, capacidad - bits.length))
  anadir(0, (8 - (bits.length % 8)) % 8)
  for (let relleno = 0xec; bits.length < capacidad; relleno ^= 0xec ^ 0x11) anadir(relleno, 8)
  const datos: number[] = []
  for (let i = 0; i < bits.length; i += 8)
    datos.push(bits.slice(i, i + 8).reduce((acc, bit) => (acc << 1) | bit, 0))
  return datos
}

// Divide en bloques, añade la corrección de errores de cada uno y los entrelaza.
function conCorreccion(datos: number[], version: number) {
  const numBloques = BLOQUES[version - 1]
  const eccPorBloque = ECC_POR_BLOQUE[version - 1]
  const totales = Math.floor(modulosDeDatos(version) / 8)
  const cortos = numBloques - (totales % numBloques)
  const largoCorto = Math.floor(totales / numBloques)
  const divisor = divisorReedSolomon(eccPorBloque)
  const bloques: number[][] = []
  for (let i = 0, k = 0; i < numBloques; i++) {
    const trozo = datos.slice(k, k + largoCorto - eccPorBloque + (i < cortos ? 0 : 1))
    k += trozo.length
    const ecc = restoReedSolomon(trozo, divisor)
    if (i < cortos) trozo.push(0)
    bloques.push([...trozo, ...ecc])
  }
  const resultado: number[] = []
  for (let i = 0; i < bloques[0].length; i++)
    bloques.forEach((bloque, j) => {
      if (i !== largoCorto - eccPorBloque || j >= cortos) resultado.push(bloque[i])
    })
  return resultado
}

function posicionesAlineacion(version: number, lado: number) {
  if (version === 1) return []
  const n = Math.floor(version / 7) + 2
  const paso = Math.floor((version * 8 + n * 3 + 5) / (n * 4 - 4)) * 2
  const posiciones = [6]
  for (let p = lado - 7; posiciones.length < n; p -= paso) posiciones.splice(1, 0, p)
  return posiciones
}

const MASCARAS: ((x: number, y: number) => boolean)[] = [
  (x, y) => (x + y) % 2 === 0,
  (_, y) => y % 2 === 0,
  (x) => x % 3 === 0,
  (x, y) => (x + y) % 3 === 0,
  (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
  (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
  (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
  (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
]

// Matriz de módulos (true = oscuro) del código QR de un texto.
export function matrizQr(texto: string): boolean[][] {
  const bytes = new TextEncoder().encode(texto)
  let version = 1
  const necesarios = (v: number) => Math.ceil((4 + (v <= 9 ? 8 : 16) + bytes.length * 8) / 8)
  while (codigosDeDatos(version) < necesarios(version)) {
    version++
    if (version > 10) throw new Error(`Texto demasiado largo para el QR: ${texto}`)
  }
  const lado = version * 4 + 17
  const modulos = Array.from({ length: lado }, () => new Array<boolean>(lado).fill(false))
  const funcion = Array.from({ length: lado }, () => new Array<boolean>(lado).fill(false))
  const fijar = (x: number, y: number, oscuro: boolean) => {
    modulos[y][x] = oscuro
    funcion[y][x] = true
  }

  // Patrones de temporización, localización y alineación.
  for (let i = 0; i < lado; i++) {
    fijar(6, i, i % 2 === 0)
    fijar(i, 6, i % 2 === 0)
  }
  for (const [cx, cy] of [
    [3, 3],
    [lado - 4, 3],
    [3, lado - 4],
  ])
    for (let dy = -4; dy <= 4; dy++)
      for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx
        const y = cy + dy
        const distancia = Math.max(Math.abs(dx), Math.abs(dy))
        if (x >= 0 && x < lado && y >= 0 && y < lado) fijar(x, y, distancia !== 2 && distancia !== 4)
      }
  const alineacion = posicionesAlineacion(version, lado)
  const na = alineacion.length
  alineacion.forEach((cx, i) =>
    alineacion.forEach((cy, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === na - 1) || (i === na - 1 && j === 0)) return
      for (let dy = -2; dy <= 2; dy++)
        for (let dx = -2; dx <= 2; dx++)
          fijar(cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1)
    }),
  )

  const formato = (mascara: number) => {
    const datos = (NIVEL_M << 3) | mascara
    let resto = datos
    for (let i = 0; i < 10; i++) resto = (resto << 1) ^ ((resto >>> 9) * 0x537)
    const bits = ((datos << 10) | resto) ^ 0x5412
    const bit = (i: number) => ((bits >>> i) & 1) !== 0
    for (let i = 0; i <= 5; i++) fijar(8, i, bit(i))
    fijar(8, 7, bit(6))
    fijar(8, 8, bit(7))
    fijar(7, 8, bit(8))
    for (let i = 9; i < 15; i++) fijar(14 - i, 8, bit(i))
    for (let i = 0; i < 8; i++) fijar(lado - 1 - i, 8, bit(i))
    for (let i = 8; i < 15; i++) fijar(8, lado - 15 + i, bit(i))
    fijar(8, lado - 8, true)
  }
  formato(0) // Reserva las zonas de formato; se reescriben al elegir la máscara.

  if (version >= 7) {
    let resto = version
    for (let i = 0; i < 12; i++) resto = (resto << 1) ^ ((resto >>> 11) * 0x1f25)
    const bits = (version << 12) | resto
    for (let i = 0; i < 18; i++) {
      const oscuro = ((bits >>> i) & 1) !== 0
      const a = lado - 11 + (i % 3)
      const b = Math.floor(i / 3)
      fijar(a, b, oscuro)
      fijar(b, a, oscuro)
    }
  }

  // Datos en zigzag, de dos en dos columnas desde la esquina inferior derecha.
  const codigos = conCorreccion(codificar(bytes, version), version)
  let i = 0
  for (let derecha = lado - 1; derecha >= 1; derecha -= 2) {
    if (derecha === 6) derecha = 5
    for (let vertical = 0; vertical < lado; vertical++)
      for (let j = 0; j < 2; j++) {
        const x = derecha - j
        const subiendo = ((derecha + 1) & 2) === 0
        const y = subiendo ? lado - 1 - vertical : vertical
        if (!funcion[y][x] && i < codigos.length * 8) {
          modulos[y][x] = ((codigos[i >>> 3] >>> (7 - (i & 7))) & 1) !== 0
          i++
        }
      }
  }

  // Se elige la máscara con menos penalización (rachas, bloques 2×2 y equilibrio).
  const aplicar = (mascara: number) => {
    for (let y = 0; y < lado; y++)
      for (let x = 0; x < lado; x++)
        if (!funcion[y][x] && MASCARAS[mascara](x, y)) modulos[y][x] = !modulos[y][x]
  }
  const penalizacion = () => {
    let total = 0
    let oscuros = 0
    for (let a = 0; a < lado; a++) {
      let rachaFila = 1
      let rachaColumna = 1
      for (let b = 1; b <= lado; b++) {
        if (b < lado && modulos[a][b] === modulos[a][b - 1]) rachaFila++
        else {
          if (rachaFila >= 5) total += rachaFila - 2
          rachaFila = 1
        }
        if (b < lado && modulos[b][a] === modulos[b - 1][a]) rachaColumna++
        else {
          if (rachaColumna >= 5) total += rachaColumna - 2
          rachaColumna = 1
        }
      }
    }
    for (let y = 0; y < lado; y++)
      for (let x = 0; x < lado; x++) {
        if (modulos[y][x]) oscuros++
        if (
          x < lado - 1 &&
          y < lado - 1 &&
          modulos[y][x] === modulos[y][x + 1] &&
          modulos[y][x] === modulos[y + 1][x] &&
          modulos[y][x] === modulos[y + 1][x + 1]
        )
          total += 3
      }
    const k = Math.ceil(Math.abs(oscuros * 20 - lado * lado * 10) / (lado * lado)) - 1
    return total + k * 10
  }
  let mejor = 0
  let menor = Infinity
  for (let m = 0; m < 8; m++) {
    aplicar(m)
    formato(m)
    const p = penalizacion()
    if (p < menor) {
      menor = p
      mejor = m
    }
    aplicar(m)
  }
  aplicar(mejor)
  formato(mejor)
  return modulos
}

// SVG del QR: un solo path con las rachas horizontales de módulos oscuros y margen de 4.
export function svgQr(texto: string, etiqueta = `Código QR de ${texto}`) {
  const matriz = matrizQr(texto)
  const margen = 4
  const lado = matriz.length + margen * 2
  let d = ""
  matriz.forEach((fila, y) => {
    for (let x = 0; x < fila.length; x++) {
      if (!fila[x]) continue
      let largo = 1
      while (fila[x + largo]) largo++
      d += `M${x + margen} ${y + margen}h${largo}v1h-${largo}z`
      x += largo - 1
    }
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lado} ${lado}" role="img" aria-label="${etiqueta}" shape-rendering="crispEdges"><path fill="#fff" d="M0 0h${lado}v${lado}H0z"/><path fill="#000" d="${d}"/></svg>`
}
