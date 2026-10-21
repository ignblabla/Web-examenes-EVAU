---
name: PEvAU Resueltos
description: Exámenes reales de la PEvAU de Andalucía resueltos paso a paso, compuestos como el cuadernillo oficial.
colors:
  paper: "#F6F7F5"
  paper-2: "#FFFFFF"
  fill: "#E7ECF1"
  ink: "#14171C"
  ink-2: "#454C56"
  ink-3: "#5F6670"
  rule: "#C5CBD2"
  on-acc: "#FFFFFF"
  warn: "#8A5A00"
  alarm: "#B3261E"
  paper-night: "#111418"
  paper-2-night: "#181C21"
  fill-night: "#1F252C"
  ink-night: "#E6E9ED"
  ink-2-night: "#B3BAC4"
  ink-3-night: "#959DA8"
  rule-night: "#39414B"
  on-acc-night: "#0B0D10"
  warn-night: "#E6B450"
  alarm-night: "#FF8A80"
  acento-fisica: "#2447C8"
  acento-fisica-oscuro: "#93A8FF"
  acento-matematicas-ccss: "#0B7A55"
  acento-matematicas-ccss-oscuro: "#4FD1A0"
typography:
  display:
    fontFamily: "'Archivo Variable', 'Archivo', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.125rem, 1.6rem + 2.4vw, 3rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 68"
  display-portada:
    fontFamily: "'Archivo Variable', 'Archivo', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.75rem, 1.7rem + 5.2vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 68"
  headline:
    fontFamily: "'Archivo Variable', 'Archivo', 'Arial Narrow', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "0.03em"
    fontVariation: "'wdth' 78"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', 'Arial Narrow', sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 650
    lineHeight: 1.25
    fontVariation: "'wdth' 88"
  body:
    fontFamily: "'Source Serif 4 Variable', 'Source Serif 4', Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.62
  caps:
    fontFamily: "'Archivo Variable', 'Archivo', 'Arial Narrow', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 78"
  label:
    fontFamily: "'Archivo Variable', 'Archivo', 'Arial Narrow', sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.1em"
    fontVariation: "'wdth' 78"
  numero:
    fontFamily: "'Archivo Variable', 'Archivo', 'Arial Narrow', sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.01em"
    fontFeature: "'tnum' 1"
    fontVariation: "'wdth' 78"
rounded:
  none: "0"
spacing:
  s-1: "0.25rem"
  s-2: "0.5rem"
  s-3: "0.75rem"
  s-4: "1rem"
  s-5: "1.5rem"
  s-6: "2rem"
  s-7: "3rem"
  s-8: "4rem"
  s-9: "6rem"
  gutter: "1rem"
  gutter-escritorio: "2rem"
components:
  boton:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.caps}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  boton-hover:
    backgroundColor: "{colors.fill}"
  boton-tinta:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.caps}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  boton-tinta-hover:
    backgroundColor: "{colors.ink-2}"
  boton-acento:
    backgroundColor: "{colors.acento-fisica}"
    textColor: "{colors.on-acc}"
    typography: "{typography.caps}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  boton-acento-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  etiqueta:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    padding: "0.28em 0.5em 0.24em"
  etiqueta-tinta:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  etiqueta-acento:
    backgroundColor: "{colors.acento-fisica}"
    textColor: "{colors.on-acc}"
    rounded: "{rounded.none}"
  campo-formulario:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "8px 12px 12px"
  fila-asignatura-icono:
    backgroundColor: "{colors.acento-fisica}"
    textColor: "{colors.on-acc}"
    rounded: "{rounded.none}"
    size: "56px"
  fila-asignatura-icono-pronto:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    size: "40px"
  ejercicio:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
  solucion-cerrada:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.caps}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
    height: "44px"
  solucion-abierta:
    backgroundColor: "{colors.acento-fisica}"
    textColor: "{colors.on-acc}"
  resultado:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px 16px"
  nota:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  error-tipico:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  cronometro:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.numero}"
    rounded: "{rounded.none}"
  salto-activo:
    backgroundColor: "{colors.acento-fisica}"
    textColor: "{colors.on-acc}"
    size: "44px"
  indice-activo:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  segmento-activo:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    height: "44px"
---

# Design System: PEvAU Resueltos

> "PEvAU Resueltos" es un nombre provisional. Los recuentos de cobertura y los enunciados del repositorio son datos de ejemplo.

## Overview

**Creative North Star: "El cuadernillo oficial"**

La web habla el idioma visual del propio papel de la PEvAU: casillas de formulario, recuadro de instrucciones con trazo discontinuo, columna de puntuación, bandas de bloque. Practicar aquí tiene que parecerse al día del examen. Sobre papel frío impreso, tinta negra, filetes de formulario grises y un solo acento por asignatura, que vive únicamente en el marco: bandas, filetes y casillas rellenas. Todo lo demás es tinta.

El sistema tiene dos voces. El marco (cabeceras, rótulos, botones, números, puntuaciones) se compone en Archivo condensada y en versalitas; la lectura (enunciados, soluciones, KaTeX) va en Source Serif 4, en una columna acromática de medida contenida. La densidad es la de un documento oficial: filas de índice, rejillas de campos, filetes que se solapan como en una plantilla impresa. No hay tarjetas redondeadas, píldoras pastel ni ilustración: el sistema rechaza el lenguaje por defecto de las plataformas educativas.

El estado se registra con un signo, no con un color: la casilla vacía, tachada (vista), rellena (hecho) o discontinua (pendiente). El único gesto de movimiento con carácter es destapar la solución, como quien retira la hoja que la tapa.

**Key Characteristics:**
- Esquina viva en todo; bordes de formulario de 1,5px en tinta.
- Un acento por asignatura, inyectado desde la config, confinado al marco.
- Tintas cerradas: papel, tres niveles de tinta, filete, relleno, acento y dos estados funcionales.
- Marco condensado en versalitas, lectura en serif.
- Estado por marca (casilla), nunca solo por tono.
- Plano por defecto: la sombra queda para lo que flota.

## Colors

Paleta de imprenta cerrada: papel frío, tinta casi negra en tres niveles, filete gris y un acento por asignatura; no se inventan tonos intermedios fuera de esta lista. Cada color tiene su pareja de modo oscuro (sufijo `-night` en los tokens; en CSS, los mismos nombres `--paper`, `--ink`… redefinidos bajo `prefers-color-scheme: dark` y `[data-theme='dark']`).

### Primary
- **Acento de asignatura** (`--acc`, resuelto desde `--acc-l` / `--acc-d`): el color propio de cada asignatura, definido en `src/config/asignaturas.ts` (Física: Azul Tinta de Sello; Matemáticas CCSS: Verde Registro). Se inyecta en cualquier subárbol con `estiloAcento()` y `data-acento`. Aparece solo en: la banda superior de 6px, el filete de sección (3px) y el de bloque (6px), el número de ejercicio, el año en el título del examen, la convocatoria en la fila de examen, la casilla del icono de asignatura, el botón Empezar, la solución abierta, el salto activo y el anillo de foco. Sin asignatura, el acento es la propia tinta.
- **Texto sobre acento** (`--on-acc`): blanco en claro, tinta de noche en oscuro.

### Neutral
- **Papel** (`--paper`): fondo de página y de las cajas de ejercicio.
- **Hoja elevada** (`--paper-2`): lo que se superpone o se rellena a mano: menús, solapa, campos de entrada, recuadro de resultado, lámina de figura.
- **Relleno** (`--fill`): hover de filas y botones, cabeceras de tabla, pista de la barra del cronómetro.
- **Tinta** (`--ink`): texto principal, filetes de formulario (`--rule-ink`), estados activos invertidos.
- **Tinta secundaria** (`--ink-2`, 8,1:1 sobre papel): descripciones, trazo discontinuo de instrucciones y notas.
- **Tinta de metadatos** (`--ink-3`, 5,6:1 sobre papel): rótulos de campo, migas, cuentas.
- **Filete fino** (`--rule`): separadores interiores, bordes de etiqueta, filas "próximamente".

### Estados funcionales
- **Aviso** (`--warn`): cronómetro con poco tiempo.
- **Alarma** (`--alarm`): cronómetro agotado y recuadro de error típico.

Son independientes de la asignatura y nunca sustituyen al acento.

### Named Rules
**The Locked Inks Rule.** Solo existen los tokens de `tokens.css`. Un color nuevo es una decisión de sistema, no un ajuste local; nada de tintes derivados a ojo.

**The Frame-Only Accent Rule.** El acento vive en el marco (bandas, filetes, casillas rellenas, números de ejercicio). La columna de lectura es acromática: ningún párrafo, fondo de sección ni enunciado se tiñe de acento.

**The Ink-Until-Published Rule.** Una asignatura que todavía no está disponible se dibuja en tinta: su icono va en `--ink-2` sobre un recuadro de filete, sin acento. El color llega cuando se publica.

## Typography

**Display Font:** Archivo Variable (con Archivo, Arial Narrow)
**Body Font:** Source Serif 4 Variable (con Source Serif 4, Georgia)
**Label/Mono Font:** Archivo con cifras tabulares (`--f-num`)

**Character:** Una sola familia de marco, condensada y en versalitas, que jerarquiza por escala y anchura; frente a ella, una serif de lectura con tamaño óptico que acompaña bien a KaTeX.

### Hierarchy
- **Display** (800, `--t-2xl` 34→48px, interlineado 0,96, anchura 68%, versalitas): título de página (examen, asignatura, búsqueda, años en la lista). En portada sube a `--t-3xl` con tope de 4,5rem.
- **Headline** (800, `--t-lg`–`--t-xl` 22–28px, anchura 78%, versalitas): cabecera de sección, "Bloque A", nombre de asignatura en la fila, títulos de estado vacío.
- **Title** (650, `--t-md` 19px, anchura 88%): título de examen en la fila, valor de campo de formulario, resultados de búsqueda. Sin versalitas.
- **Body** (400, `--t-base` 17px en móvil / 18px en escritorio, interlineado 1,62): enunciados y soluciones, medida máxima `--measure` (68ch).
- **Caps** (650, `--t-sm` 14px, tracking 0,08em, versalitas): botones, navegación, interruptor de solución, cuentas.
- **Label** (650, `--t-2xs` 11px, tracking 0,1–0,14em, versalitas): rótulo de casilla de formulario, título de instrucciones, rótulo de nota y resultado, encabezados del pie.
- **Número** (800, 40px / 48px en escritorio, cifras tabulares): la hora del cronómetro. Toda cifra que se compare (puntos, años, minutos) usa `.num`.

### Named Rules
**The One Frame Family Rule.** El marco se compone siempre en Archivo; la jerarquía se marca con tamaño, peso y anchura (`--stretch-frame` 78%, `--stretch-display` 68%), no con otra familia.

**The Units Keep Their Case Rule.** Las cabeceras de tabla no van en versalitas porque llevan magnitudes y unidades: m no es M ni r es R. Tampoco se pasa a mayúsculas nada que contenga símbolos físicos o matemáticos.

## Layout

Móvil primero. Contenedor `.wrap` de 76rem máximo con margen lateral `--gutter` (1rem; 2rem desde 48rem). Ritmo de espaciado en base 4 (`--s-1` a `--s-9`). Puntos de corte observados: 48rem (rejillas de 2 a 4 campos, navegación visible, filas de examen en tres columnas) y 64rem (índice lateral del examen en columna de 14,5rem, cuerpo de 52rem máximo, desaparece la tira de saltos).

Las listas son filas de índice separadas por filete, no rejillas de tarjetas: la fila de asignatura escala igual con 2 que con 15. Los campos de formulario forman una rejilla cuyos filetes se solapan (margen -1px) como en una plantilla impresa. El ejercicio usa tres columnas fijas: letra (`--col-num`), enunciado y puntuación (`--col-marca`). Las fórmulas largas desplazan su propio contenedor, nunca la página. Objetivo táctil mínimo 2,75rem (44px).

**Impresión** (`imprimir.css`): tinta pura sobre blanco, acento a negro, sin cabecera, pie ni controles. "Sin soluciones" deja huecos rayados para responder; "Con soluciones" imprime cada solución tras un filete con el rótulo "Solución".

## Elevation & Depth

Sistema plano. La profundidad se transmite con filetes (1px fino, 1,5px de formulario, 3px de sección, 6px de banda) y con el paso de `--paper` a `--paper-2`, no con sombras.

### Shadow Vocabulary
- **Flotante** (`--shadow-float`: `0 10px 24px -12px rgb(20 23 28 / 0.35), 0 2px 6px -2px rgb(20 23 28 / 0.12)`; más densa en oscuro): menú móvil, menú de impresión y solapa "Seguir donde lo dejaste".

### Named Rules
**The Only-What-Floats Rule.** Solo lleva sombra lo que flota sobre el documento. Una caja que forma parte del papel (ejercicio, resultado, campo) se distingue con filete, nunca con sombra.

## Shapes

Esquina viva en todo (`--r-0`): botones, campos, desplegables, etiquetas, iconos de asignatura y casillas. El lenguaje de formas sale del impreso: recuadro de trazo continuo para lo que se rellena, discontinuo para instrucciones y notas, doble filete para el resultado final, casilla cuadrada para el estado. Los iconos se dibujan a mano en la misma retícula: 24×24, trazo 1,5, terminaciones y uniones rectas (`stroke-linecap: square`, `stroke-linejoin: miter`).

### Named Rules
**The Square Corner Rule.** Ningún componente redondea esquinas. Un `border-radius` mayor que 0 rompe el mundo.

**The Mark Not Hue Rule.** El estado se registra con la casilla: vacía (sin mirar), tachada con aspa (vista), rellena (hecho), discontinua (pendiente). El color puede acompañar, nunca ser la única señal.

## Components

### Botones
- **Shape:** esquina viva, borde de formulario de 1,5px en tinta, altura mínima 44px (52px en la variante grande).
- **Primario de página:** `.btn` sobre papel con texto en versalitas condensadas (caps).
- **Tinta** (`.btn--tinta`): fondo tinta, texto papel; la acción principal fuera del examen.
- **Acento** (`.btn--acc`): fondo y borde de acento; reservado para Empezar en el cronómetro. Al pasar por encima se vuelve tinta.
- **Sutil** (`.btn--sutil`): borde de filete fino, para acciones secundarias (Destapar todas, Quitar filtros, Reiniciar).
- **Hover / Focus / Active:** relleno `--fill` (120ms lineal); foco de 2px en acento con 2px de separación (en tinta sobre superficies de acento); al pulsar baja 1px. Deshabilitado al 45% de opacidad.

### Etiqueta (chip)
Casillas de formulario, no píldoras.
- **Style:** borde fino de filete, versalitas de 12px con tracking 0,06em, tinta secundaria, sin radio.
- **Variantes:** `--tinta` (borde y texto en tinta; enlaces a ejercicios relacionados, que se invierten a tinta al pasar), `--acc` (relleno de acento). La variante "Próximamente" lleva una casilla discontinua delante.

### Tarjeta de asignatura (`FilaAsignatura`)
Una fila de índice, no una tarjeta.
- **Disponible:** casilla de icono cuadrada rellena de acento (56px; 72px en escritorio) con el icono en `--on-acc`; nombre en headline versalitas; descripción en serif `--ink-2`; datos (Resueltos, Años) como rótulo + valor; flecha de acento que avanza 4px al pasar. Filete de tinta inferior, filete de formulario superior en la primera. Toda la fila es el enlace; el foco rodea la fila entera.
- **Próximamente:** fila compacta con filete discontinuo, icono de 40px en tinta sobre recuadro de filete (sin acento), nombre corto en `--ink-2` y etiqueta "Próximamente".

### Tarjeta de examen (`FilaExamen`)
Una fila de registro: convocatoria | título y bloques | datos.
- **Convocatoria:** versalitas de 12px en acento (año en `--ink-3`; asignatura en tinta cuando se muestra en búsqueda).
- **Título:** title, sin versalitas; toda la fila es el enlace.
- **Bloques temáticos:** una línea de versalitas de 12px en `--ink-2` separada por " · ", sin recuadros.
- **Datos:** casilla de estado (rellena = resuelto, discontinua = en preparación), duración en cifras tabulares, enlace al PDF oficial con objetivo de 44px.
- **En preparación:** título y estado en `--ink-2`, sin hover ni enlace.
- En escritorio pasa a tres columnas (9rem | flexible | 15rem).

### Ejercicio suelto (`FilaEjercicio`)
Fila de la vista "Ejercicios por tema": coordenada | tema y convocatoria | enunciado | datos.
- **Coordenada:** A1, C2… en headline condensada de acento (28px en escritorio), igual que en el examen.
- **Título:** "Óptica · Ordinaria 2024" en title; toda la fila enlaza al ejercicio dentro de su examen (`#ej-C2`), donde la solución sigue tapada.
- **Enunciado:** primeras ~180 letras del enunciado común en serif de 14px `--ink-2`.
- **Datos:** número de apartados, puntuación y "Ir al ejercicio" en versalitas de 12px.
- Solo aparecen ejercicios de exámenes resueltos; se agrupan por año con la misma cabecera de año que los exámenes.

### Formulario de carátula
La firma del mundo. Rejilla de campos de 2 columnas (4 con `.form--4` desde 48rem) dentro de un borde de 1,5px; cada campo lleva rótulo label en `--ink-3` y valor title. Los filetes interiores se solapan. Se usa en la cabecera del examen y en los datos de asignatura.

### Recuadro de instrucciones
Trazo discontinuo de 1px en `--ink-2`, título label en tinta, lista numerada con marcador condensado. Contiene el aviso del modo práctica con su casilla.

### Ejercicio con solución desplegable
- **Bloque:** filete superior de acento de 6px, "Bloque A" en headline versalitas, título temático en `--ink-2` e instrucción en cursiva `--ink-3`.
- **Ejercicio:** caja de borde de formulario en tinta sobre papel. Cabecera con número en acento (headline) y casilla de puntuación total a la derecha ("2,5 puntos").
- **Apartado:** fila de tres columnas: casilla + letra, enunciado en serif, puntuación en cifras tabulares. Apartados separados por filete fino.
- **Solución:** `<details>` tapada por defecto, con borde de formulario. El interruptor (44px de alto) muestra casilla, "Ver solución" / "Ocultar solución", coordenada (A1·b) en `--ink-3` y chevrón. Al abrir: borde y cabecera en acento con texto `--on-acc`, filete de acento sobre el cuerpo, la casilla se tacha y el chevrón gira 180°. El cuerpo se destapa de arriba abajo (clip-path, `--dur-3` 360ms, `--ease-out`); con movimiento reducido aparece sin animar. En móvil ocupa todo el ancho del ejercicio.

### Recuadro de resultado
Caja de borde de formulario en tinta sobre `--paper-2` con un segundo filete interior a 3px (doble filete de casilla oficial). Rótulo "Resultado" en label de acento; contenido en 19px semibold. Desplaza su propio contenido si la fórmula no cabe.

### Notas: nota, truco, error típico
Recuadros sin relleno, con rótulo label + icono de trazo en máscara.
- **Nota:** trazo discontinuo de 1px en `--ink-2`, texto `--ink-2`.
- **Truco:** trazo continuo de 1px en tinta.
- **Ojo, error típico:** borde continuo de 1,5px en `--alarm`, rótulo en `--alarm`, texto en tinta.

### Figura
Lámina sobre `--paper-2` con papel milimetrado tenue y filete fino de tinta; pie precedido de "Figura ·" en label. En los diagramas, lo dado va en tinta y lo que se calcula (imagen, trayectoria) en acento.

### Cronómetro
Vive en el campo "Hora" de la carátula, a ancho completo. Rótulo "Hora · Simulacro de examen", cifra en número tabular (40px / 48px), estado en versalitas `--ink-3`, botón Empezar en acento (pasa a tinta mientras corre) y Reiniciar sutil. Bajo el campo, una regla de 4px avanza en acento; con poco tiempo, cifra y regla en `--warn`; agotado, en `--alarm`. Al hacer scroll, una copia mínima aparece en la tira de saltos y en el índice. Al imprimir se convierte en un campo "inicio ____:____".

### Índice de ejercicios
- **Escritorio (≥64rem):** columna pegajosa con cabecera "Índice" sobre filete de formulario; bloques (letra en 800 + título en `--ink-2`), ejercicios con una casilla por apartado que se tacha al ver su solución; leyenda de casillas al pie. El elemento actual se invierte a tinta.
- **Móvil:** tira de saltos pegada arriba, con casillas cuadradas de 44px por bloque (activa en acento), selector "Ir a" por ejercicio y apartado, y mini cronómetro.

### Filtros
Bajo un filete de acento de 3px.
- **Ver:** segmentos "Exámenes completos | Ejercicios por tema". Marcar un bloque temático pasa a la vista de ejercicios. En exámenes, los bloques marcados se combinan con Y (el examen los incluye todos); en ejercicios, con O (el ejercicio es de alguno). La vista y los filtros viajan en la URL (`?ver=ejercicios&bloque=algebra`).
- **Año:** desplegable de esquina viva, borde de formulario, fondo `--paper-2`, chevrón propio.
- **Convocatoria:** segmentos contiguos con filetes solapados; el elegido se invierte a tinta.
- **Bloque temático:** interruptores de casilla con borde fino; marcado, borde doble y casilla rellenos en acento.
- **Pie:** cuenta viva en versalitas (`role="status"`, "7 exámenes" / "2 ejercicios") y "Quitar filtros" sutil. Sin resultados, recuadro discontinuo con botón tinta y un texto distinto para cada vista.
- La búsqueda usa el mismo lenguaje: campo de 52px con borde de formulario y casillas de asignatura que se invierten a tinta.

### Cabecera y navegación (`Cabecera`)
- **Banda:** 6px de acento sobre todo (tinta sin asignatura).
- **Barra:** papel con filete inferior de formulario, 52px de alto. Marca "PEvAU" invertida en tinta + "Resueltos" en versalitas.
- **Enlaces:** versalitas de 14px, 44px de alto; página actual con filete inferior interior de 3px en acento; hover en `--fill`.
- **Móvil (<48rem):** buscar, cambio de tema y menú en panel `--paper-2` con borde de formulario y sombra flotante; se cierra al pulsar fuera o con Escape.
- **Migas:** línea de cabecera del documento en versalitas de 12px `--ink-3`, separadas por "/".

### Pie (`Pie`)
Filete superior de formulario, tres columnas en escritorio (2fr 1fr 1fr): proyecto y autoría, asignaturas disponibles, enlaces del proyecto. Encabezados en label tinta, enlaces en `--ink-2`. Nota legal al final, en 12px `--ink-3` tras un filete fino, que declara el contenido de ejemplo y la independencia del proyecto.

### Asignaturas: cómo añadir una nueva
Añadir una asignatura no toca ningún componente.

1. **Config.** Añadir un objeto a `asignaturas` en `src/config/asignaturas.ts` con:
   - `slug` (URL y carpeta de exámenes), `nombre`, `nombreCorto`, `descripcion` (una frase), `area` (`'comunes' | 'ciencias' | 'sociales'`).
   - `acento`: color sobre papel claro. El texto blanco encima debe dar ≥ 4,5:1 y el propio acento ≥ 4,5:1 sobre `--paper`.
   - `acentoOscuro`: versión para modo oscuro. La tinta oscura (`--on-acc` de noche) encima debe dar ≥ 4,5:1.
   - `icono`: un nombre de `IconoAsignatura`.
   - `bloques`: lista de `{ slug, nombre }` con los bloques temáticos.
   - `disponible`: `false` la lista como "Próximamente" (en tinta) y su página muestra el cuadernillo en blanco; `true` cuando tenga exámenes.
2. **Exámenes.** Un `.md` por examen en `src/content/examenes/<slug>/`, con el frontmatter de `src/content.config.ts`: `asignatura` (el slug), `anio`, `convocatoria` (`ordinaria | extraordinaria | junio | julio | septiembre`), `titulo`, `duracion` (minutos, 90 por defecto), `pdf_oficial` (opcional), `bloques` (slugs de bloque), `responder` (opcional, p. ej. "Un ejercicio de cada bloque"), `resuelto` (por defecto `true`; `false` = resolución en preparación). El cuerpo usa las directivas de `src/lib/remark-pevau.mjs`:
   ```
   ::bloque{id="A" titulo="Campo gravitatorio" instruccion="Responda a uno de los dos ejercicios."}
   :::::ejercicio{id="A1" puntos="2,5" tema="campo-gravitatorio"}
   Enunciado común…
   ::::apartado{letra="a" puntos="1,25"}
   Enunciado del apartado…
   ::solucion
   Desarrollo con $…$ y $$…$$
   :::resultado / :::truco / :::error / :::nota / :::figura{pie="…"}
   ::::
   :::::
   ```
   Todo lo que sigue a `::solucion` dentro de un apartado (o de un ejercicio sin apartados) es la solución y queda tapado. `tema` enlaza el ejercicio con "Practica el mismo bloque".
3. **Icono.** Si ninguno sirve, añadir el trazo a `Icono.astro` (retícula 24×24, trazo 1,5, terminaciones rectas, sin relleno salvo un punto) y su nombre al tipo `IconoAsignatura`.

## Do's and Don'ts

### Do:
- **Do** usar solo los tokens de `tokens.css`; cualquier color nuevo entra como token con su pareja oscura.
- **Do** confinar el acento al marco: bandas (6px), filetes de sección (3px), casillas rellenas, números de ejercicio, foco.
- **Do** componer todo el marco en Archivo condensada (78%, títulos 68%) y la lectura en Source Serif 4 a 68ch.
- **Do** marcar el estado con la casilla (vacía, tachada, rellena, discontinua) además de cualquier color.
- **Do** dar a cada control táctil al menos 44px y a las fórmulas largas su propio desplazamiento.
- **Do** dibujar en tinta las asignaturas que aún no están publicadas.
- **Do** usar `.num` (cifras tabulares) en puntuaciones, años, minutos y el cronómetro.

### Don't:
- **Don't** redondear esquinas, usar píldoras, tarjetas pastel ni ilustración decorativa.
- **Don't** teñir de acento la columna de lectura, los fondos de sección ni los enunciados.
- **Don't** poner sombra a lo que forma parte del papel; la sombra es solo para lo que flota.
- **Don't** pasar a versalitas texto con unidades o símbolos (cabeceras de tabla, magnitudes).
- **Don't** encajar en recuadros los bloques temáticos de una fila de examen: van como una línea de versalitas.
- **Don't** añadir elementos de gamificación (puntos, rachas, insignias).
