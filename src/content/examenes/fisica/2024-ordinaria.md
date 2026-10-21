---
asignatura: fisica
anio: 2024
convocatoria: ordinaria
titulo: "PEvAU Física 2024 – Convocatoria ordinaria"
duracion: 90
pdf_oficial: "/pdfs/fisica-2024-ordinaria.pdf"
bloques: [campo-gravitatorio, electromagnetismo, ondas, optica, fisica-moderna]
responder: "Un ejercicio de cada bloque"
---

::bloque{id="A" titulo="Campo gravitatorio" instruccion="Responda a uno de los dos ejercicios."}

:::::ejercicio{id="A1" puntos="2,5" tema="campo-gravitatorio"}
Un satélite de 500 kg describe una órbita circular a 600 km de altura sobre la superficie terrestre.

*Datos:* $G = 6{,}67\cdot10^{-11}\ \text{N m}^2\,\text{kg}^{-2}$; $M_T = 5{,}97\cdot10^{24}\ \text{kg}$; $R_T = 6370\ \text{km}$.

::::apartado{letra="a" puntos="1,25"}
Calcule la velocidad orbital del satélite y su periodo de revolución.

::solucion

En una órbita circular, la fuerza gravitatoria es la que hace de fuerza centrípeta. El radio de la órbita se mide **desde el centro de la Tierra**:

$$
r = R_T + h = 6{,}37\cdot10^{6} + 6{,}0\cdot10^{5} = 6{,}97\cdot10^{6}\ \text{m}
$$

Igualando ambas fuerzas:

$$
G\,\frac{M_T\, m}{r^2} = m\,\frac{v^2}{r}
\quad\Longrightarrow\quad
v = \sqrt{\frac{G M_T}{r}} = \sqrt{\frac{6{,}67\cdot10^{-11}\cdot 5{,}97\cdot10^{24}}{6{,}97\cdot10^{6}}} = 7{,}56\cdot10^{3}\ \text{m/s}
$$

El periodo es el tiempo que tarda en recorrer la circunferencia completa, $T = 2\pi r / v$:

$$
T = \frac{2\pi \cdot 6{,}97\cdot10^{6}}{7{,}56\cdot10^{3}} = 5{,}79\cdot10^{3}\ \text{s} \approx 96{,}5\ \text{min}
$$

:::resultado
$v \approx 7{,}56\ \text{km/s}$  ·  $T \approx 5{,}79\cdot10^{3}\ \text{s}$ (unos 97 minutos)
:::

:::error
Usar $h = 600\ \text{km}$ como radio de la órbita. La ley de gravitación mide la distancia entre centros, así que siempre $r = R_T + h$. Y pasa los kilómetros a metros antes de operar.
:::
::::

::::apartado{letra="b" puntos="1,25"}
Determine la energía que hay que comunicar al satélite para trasladarlo a otra órbita circular situada a 1200 km de altura.

::solucion

La energía mecánica de un satélite en órbita circular es la mitad de su energía potencial:

$$
E_m = E_c + E_p = \tfrac{1}{2} m v^2 - G\frac{M_T m}{r} = -\,G\frac{M_T\, m}{2r}
$$

Con el producto

$$
G M_T m = 6{,}67\cdot10^{-11}\cdot5{,}97\cdot10^{24}\cdot500 = 1{,}99\cdot10^{17}\ \text{J m}
$$

| Órbita | $r$ (m) | $E_m$ (J) |
|---|---|---|
| Inicial, $h = 600$ km | $6{,}97\cdot10^{6}$ | $-1{,}428\cdot10^{10}$ |
| Final, $h = 1200$ km | $7{,}57\cdot10^{6}$ | $-1{,}315\cdot10^{10}$ |

La energía que hay que aportar es la diferencia:

$$
\Delta E = E_{m,2} - E_{m,1} = -1{,}315\cdot10^{10} - (-1{,}428\cdot10^{10}) = 1{,}13\cdot10^{9}\ \text{J}
$$

:::truco
Antes de restar, comprueba el signo: al subir de órbita la energía mecánica aumenta (se hace *menos negativa*), así que $\Delta E$ tiene que salir positiva.
:::

:::resultado
$\Delta E \approx 1{,}13\cdot10^{9}\ \text{J}$
:::
::::
:::::

:::::ejercicio{id="A2" puntos="2,5" tema="campo-gravitatorio"}
Un planeta tiene un radio igual a 0,53 veces el terrestre y una masa 0,11 veces la de la Tierra.

*Dato:* $g_0 = 9{,}8\ \text{m s}^{-2}$; $R_T = 6370\ \text{km}$.

::::apartado{letra="a" puntos="1,25"}
Calcule la aceleración de la gravedad en la superficie del planeta.

::solucion

En la superficie de cualquier planeta $g = G M / R^2$. Dividiendo entre la expresión terrestre se cancela $G$:

$$
\frac{g_P}{g_0} = \frac{M_P}{M_T}\left(\frac{R_T}{R_P}\right)^{2} = \frac{0{,}11}{0{,}53^{2}} = 0{,}392
\quad\Longrightarrow\quad
g_P = 0{,}392\cdot 9{,}8 = 3{,}84\ \text{m s}^{-2}
$$

:::resultado
$g_P \approx 3{,}84\ \text{m s}^{-2}$
:::
::::

::::apartado{letra="b" puntos="1,25"}
Obtenga la velocidad de escape desde la superficie del planeta.

::solucion

La velocidad de escape anula la energía mecánica: $\tfrac12 m v_e^2 - G M m / R = 0$, de donde $v_e = \sqrt{2GM/R} = \sqrt{2 g_P R_P}$.

$$
v_e = \sqrt{2\cdot 3{,}84\cdot 0{,}53\cdot 6{,}37\cdot10^{6}} = 5{,}09\cdot10^{3}\ \text{m/s}
$$

:::resultado
$v_e \approx 5{,}09\ \text{km/s}$
:::
::::
:::::

::bloque{id="B" titulo="Campo electromagnético" instruccion="Responda a uno de los dos ejercicios."}

:::::ejercicio{id="B1" puntos="2,5" tema="electromagnetismo"}
Un protón, inicialmente en reposo, se acelera mediante una diferencia de potencial de 2000 V y entra perpendicularmente en un campo magnético uniforme de 0,2 T dirigido hacia dentro del papel.

*Datos:* $m_p = 1{,}67\cdot10^{-27}\ \text{kg}$; $e = 1{,}6\cdot10^{-19}\ \text{C}$.

::::apartado{letra="a" puntos="1,25"}
Calcule la velocidad con la que el protón entra en el campo magnético.

::solucion

El trabajo eléctrico se convierte íntegramente en energía cinética:

$$
q\,\Delta V = \tfrac12 m v^2
\quad\Longrightarrow\quad
v = \sqrt{\frac{2 q \Delta V}{m}} = \sqrt{\frac{2\cdot1{,}6\cdot10^{-19}\cdot 2000}{1{,}67\cdot10^{-27}}} = 6{,}19\cdot10^{5}\ \text{m/s}
$$

:::resultado
$v \approx 6{,}19\cdot10^{5}\ \text{m/s}$
:::
::::

::::apartado{letra="b" puntos="1,25"}
Determine el radio de la trayectoria y el periodo del movimiento. Dibuje la trayectoria indicando el sentido de la fuerza.

::solucion

La fuerza de Lorentz, $\vec F = q\,\vec v\times\vec B$, es perpendicular a la velocidad y actúa como fuerza centrípeta:

$$
q v B = m\frac{v^2}{r}
\quad\Longrightarrow\quad
r = \frac{m v}{q B} = \frac{1{,}67\cdot10^{-27}\cdot 6{,}19\cdot10^{5}}{1{,}6\cdot10^{-19}\cdot 0{,}2} = 3{,}23\cdot10^{-2}\ \text{m}
$$

$$
T = \frac{2\pi r}{v} = \frac{2\pi m}{q B} = 3{,}28\cdot10^{-7}\ \text{s}
$$

:::figura{pie="Con la velocidad hacia la derecha y el campo entrando en el papel, la fuerza sobre el protón apunta hacia arriba: describe media circunferencia en sentido antihorario."}
<svg viewBox="0 0 360 220" role="img" aria-label="Trayectoria semicircular del protón en el campo magnético">
  <g class="fig-campo">
    <g><circle cx="190" cy="40" r="7"/><path d="M185 35l10 10M195 35l-10 10"/></g>
    <g><circle cx="250" cy="40" r="7"/><path d="M245 35l10 10M255 35l-10 10"/></g>
    <g><circle cx="310" cy="40" r="7"/><path d="M305 35l10 10M315 35l-10 10"/></g>
    <g><circle cx="250" cy="110" r="7"/><path d="M245 105l10 10M255 105l-10 10"/></g>
    <g><circle cx="310" cy="110" r="7"/><path d="M305 105l10 10M315 105l-10 10"/></g>
    <g><circle cx="190" cy="180" r="7"/><path d="M185 175l10 10M195 175l-10 10"/></g>
    <g><circle cx="250" cy="180" r="7"/><path d="M245 175l10 10M255 175l-10 10"/></g>
    <g><circle cx="310" cy="180" r="7"/><path d="M305 175l10 10M315 175l-10 10"/></g>
  </g>
  <line class="fig-borde" x1="150" y1="12" x2="150" y2="208"/>
  <path class="fig-tray" d="M24 180 H150 A70 70 0 0 0 150 40 H60"/>
  <path class="fig-flecha" d="M86 174 l12 6 -12 6"/>
  <circle class="fig-punto" cx="220" cy="110" r="4"/>
  <path class="fig-vector" d="M220 110 H176"/><path class="fig-flecha" d="M182 104 l-8 6 8 6"/>
  <text x="196" y="100" class="fig-txt">F</text>
  <text x="96" y="200" class="fig-txt">v</text>
  <text x="290" y="208" class="fig-txt">B ⊗</text>
  <text x="224" y="78" class="fig-txt fig-txt--acc">r = 3,23 cm</text>
</svg>
:::

:::resultado
$r \approx 3{,}23\ \text{cm}$  ·  $T \approx 3{,}28\cdot10^{-7}\ \text{s}$
:::

:::nota
El periodo no depende de la velocidad: protones más rápidos describen circunferencias mayores, pero todos tardan lo mismo en dar una vuelta. Es el principio del ciclotrón.
:::
::::
:::::

:::::ejercicio{id="B2" puntos="2,5" tema="electromagnetismo"}
Una espira cuadrada de 10 cm de lado y resistencia $0{,}5\ \Omega$ se encuentra en un campo magnético perpendicular a su plano cuyo módulo varía con el tiempo según $B(t) = 0{,}2 + 0{,}05\,t^{2}$ (SI).

::::apartado{letra="a" puntos="1,25"}
Obtenga la expresión del flujo magnético y de la fuerza electromotriz inducida.

::solucion

Con $S = (0{,}10)^2 = 1{,}0\cdot10^{-2}\ \text{m}^2$ y el campo perpendicular a la espira:

$$
\Phi(t) = B(t)\,S = 2\cdot10^{-3} + 5\cdot10^{-4}\,t^{2}\ \ \text{Wb}
$$

Por la ley de Faraday-Lenz:

$$
\varepsilon(t) = -\frac{d\Phi}{dt} = -1{,}0\cdot10^{-3}\,t\ \ \text{V}
$$

:::resultado
$\Phi(t) = 2\cdot10^{-3} + 5\cdot10^{-4}t^2\ \text{Wb}$  ·  $\varepsilon(t) = -10^{-3}\,t\ \text{V}$
:::
::::

::::apartado{letra="b" puntos="1,25"}
Calcule la intensidad que recorre la espira en $t = 2\ \text{s}$ e indique razonadamente su sentido.

::solucion

$$
|\varepsilon(2)| = 2{,}0\cdot10^{-3}\ \text{V}
\qquad
I = \frac{|\varepsilon|}{R} = \frac{2{,}0\cdot10^{-3}}{0{,}5} = 4{,}0\cdot10^{-3}\ \text{A}
$$

El flujo entrante aumenta, así que la corriente inducida crea un campo que se opone a ese aumento: un campo saliente. Si el campo exterior entra en el papel, la corriente circula en **sentido antihorario**.

:::resultado
$I = 4\ \text{mA}$, sentido antihorario
:::
::::
:::::

::bloque{id="C" titulo="Vibraciones y ondas" instruccion="Responda a uno de los dos ejercicios."}

:::::ejercicio{id="C1" puntos="2,5" tema="ondas"}
Por una cuerda se propaga una onda cuya ecuación, en unidades del SI, es $y(x,t) = 0{,}02\,\operatorname{sen}(4\pi t - \pi x)$.

::::apartado{letra="a" puntos="1,25"}
Determine la amplitud, la frecuencia, la longitud de onda, la velocidad de propagación y el sentido en que se propaga.

::solucion

Comparando con la forma general $y = A\,\operatorname{sen}(\omega t - kx)$:

| Magnitud | Expresión | Valor |
|---|---|---|
| Amplitud | $A$ | $0{,}02\ \text{m}$ |
| Frecuencia | $f = \omega/2\pi = 4\pi/2\pi$ | $2\ \text{Hz}$ |
| Longitud de onda | $\lambda = 2\pi/k = 2\pi/\pi$ | $2\ \text{m}$ |
| Velocidad | $v = \lambda f$ | $4\ \text{m/s}$ |

El signo negativo entre $\omega t$ y $kx$ indica que la onda avanza en el **sentido positivo del eje X**.

:::resultado
$A = 0{,}02$ m · $f = 2$ Hz · $\lambda = 2$ m · $v = 4$ m/s, hacia $+x$
:::
::::

::::apartado{letra="b" puntos="1,25"}
Calcule la velocidad máxima de oscilación de un punto de la cuerda y la diferencia de fase entre dos puntos separados 0,5 m.

::solucion

$$
v_{\max} = A\,\omega = 0{,}02\cdot 4\pi = 0{,}251\ \text{m/s}
\qquad
\Delta\varphi = k\,\Delta x = \pi\cdot 0{,}5 = \frac{\pi}{2}\ \text{rad}
$$

:::error
Confundir la velocidad de propagación de la onda (4 m/s, constante) con la velocidad de oscilación de cada punto de la cuerda, que varía con el tiempo y como máximo vale $A\omega$.
:::

:::resultado
$v_{\max} \approx 0{,}25\ \text{m/s}$ · $\Delta\varphi = \pi/2\ \text{rad}$ (puntos en cuadratura)
:::
::::
:::::

:::::ejercicio{id="C2" puntos="2,5" tema="optica"}
Un objeto de 2 cm de altura se coloca a 30 cm delante de una lente convergente de 20 cm de distancia focal.

::::apartado{letra="a" puntos="1,25"}
Calcule la posición y el tamaño de la imagen.

::solucion

Con el criterio de signos DIN, $s = -30$ cm y $f' = +20$ cm. La ecuación de las lentes delgadas da:

$$
\frac{1}{s'} - \frac{1}{s} = \frac{1}{f'}
\quad\Longrightarrow\quad
\frac{1}{s'} = \frac{1}{20} + \frac{1}{-30} = \frac{1}{60}
\quad\Longrightarrow\quad
s' = 60\ \text{cm}
$$

$$
\beta = \frac{y'}{y} = \frac{s'}{s} = \frac{60}{-30} = -2
\quad\Longrightarrow\quad
y' = -4\ \text{cm}
$$

:::resultado
$s' = +60$ cm (detrás de la lente) · $y' = -4$ cm
:::
::::

::::apartado{letra="b" puntos="1,25"}
Realice el trazado de rayos y explique la naturaleza de la imagen.

::solucion

:::figura{pie="Trazado con los tres rayos principales: el paralelo al eje se refracta pasando por F′, el que pasa por el centro óptico no se desvía y el que pasa por F sale paralelo."}
<svg viewBox="0 0 520 220" role="img" aria-label="Trazado de rayos en una lente convergente con el objeto a 30 cm y la imagen a 60 cm">
  <line class="fig-eje" x1="10" y1="110" x2="510" y2="110"/>
  <path class="fig-lente" d="M200 22 V198 M192 30 l8 -8 8 8 M192 190 l8 8 8 -8"/>
  <circle class="fig-punto" cx="120" cy="110" r="3"/><text class="fig-txt" x="112" y="130">F</text>
  <circle class="fig-punto" cx="280" cy="110" r="3"/><text class="fig-txt" x="274" y="130">F′</text>
  <path class="fig-objeto" d="M80 110 V86"/><path class="fig-flecha-obj" d="M75 92 l5 -8 5 8"/>
  <text class="fig-txt" x="58" y="82">y</text>
  <path class="fig-rayo" d="M80 86 H200 L440 158"/>
  <path class="fig-rayo" d="M80 86 L440 158"/>
  <path class="fig-rayo" d="M80 86 L200 158 H440"/>
  <path class="fig-imagen" d="M440 110 V158"/><path class="fig-flecha-img" d="M435 152 l5 8 5 -8"/>
  <text class="fig-txt fig-txt--acc" x="450" y="152">y′</text>
  <text class="fig-txt" x="70" y="205">s = −30 cm</text>
  <text class="fig-txt fig-txt--acc" x="400" y="205">s′ = +60 cm</text>
</svg>
:::

La imagen es **real** (se forma por la intersección de los propios rayos y se puede recoger en una pantalla), **invertida** ($\beta < 0$) y **de mayor tamaño** ($|\beta| = 2$). Es lo que ocurre siempre que el objeto está entre $2F$ y $F$.

:::truco
Para comprobar el trazado basta con dos rayos: el paralelo y el central. El tercero sirve para verificar que los tres se cortan en el mismo punto.
:::
::::
:::::

::bloque{id="D" titulo="Física relativista, cuántica, nuclear y de partículas" instruccion="Responda a uno de los dos ejercicios."}

:::::ejercicio{id="D1" puntos="2,5" tema="fisica-moderna"}
El trabajo de extracción del sodio es 2,28 eV. Se ilumina una lámina de sodio con luz de 400 nm.

*Datos:* $h = 6{,}63\cdot10^{-34}\ \text{J s}$; $c = 3\cdot10^{8}\ \text{m/s}$; $e = 1{,}6\cdot10^{-19}\ \text{C}$.

::::apartado{letra="a" puntos="1,25"}
Calcule la energía cinética máxima de los electrones emitidos.

::solucion

$$
E_{\text{fotón}} = \frac{h c}{\lambda} = \frac{6{,}63\cdot10^{-34}\cdot 3\cdot10^{8}}{4\cdot10^{-7}} = 4{,}97\cdot10^{-19}\ \text{J}
$$

$$
W_0 = 2{,}28\cdot 1{,}6\cdot10^{-19} = 3{,}65\cdot10^{-19}\ \text{J}
$$

Por la ecuación de Einstein del efecto fotoeléctrico:

$$
E_{c,\max} = E_{\text{fotón}} - W_0 = 4{,}97\cdot10^{-19} - 3{,}65\cdot10^{-19} = 1{,}32\cdot10^{-19}\ \text{J}
$$

:::resultado
$E_{c,\max} \approx 1{,}32\cdot10^{-19}\ \text{J}\ \ (0{,}83\ \text{eV})$
:::
::::

::::apartado{letra="b" puntos="1,25"}
Determine la frecuencia umbral del sodio y el potencial de frenado.

::solucion

$$
f_0 = \frac{W_0}{h} = \frac{3{,}65\cdot10^{-19}}{6{,}63\cdot10^{-34}} = 5{,}50\cdot10^{14}\ \text{Hz}
\qquad
V_f = \frac{E_{c,\max}}{e} = \frac{1{,}32\cdot10^{-19}}{1{,}6\cdot10^{-19}} = 0{,}83\ \text{V}
$$

:::resultado
$f_0 \approx 5{,}50\cdot10^{14}\ \text{Hz}$ · $V_f \approx 0{,}83\ \text{V}$
:::
::::
:::::

:::::ejercicio{id="D2" puntos="2,5" tema="fisica-moderna"}
El periodo de semidesintegración del carbono-14 es de 5730 años.

::::apartado{letra="a" puntos="1,25"}
Calcule la constante de desintegración en $\text{s}^{-1}$.

::solucion

$$
\lambda = \frac{\ln 2}{T_{1/2}} = \frac{0{,}693}{5730\cdot 3{,}156\cdot10^{7}\ \text{s}} = 3{,}83\cdot10^{-12}\ \text{s}^{-1}
$$

:::resultado
$\lambda \approx 3{,}83\cdot10^{-12}\ \text{s}^{-1}$
:::
::::

::::apartado{letra="b" puntos="1,25"}
Un resto de madera conserva el 25 % de la actividad de una muestra actual. Estime su antigüedad.

::solucion

$$
\frac{A}{A_0} = \left(\tfrac{1}{2}\right)^{t/T_{1/2}} = 0{,}25 = \left(\tfrac12\right)^{2}
\quad\Longrightarrow\quad
t = 2\,T_{1/2} = 11\,460\ \text{años}
$$

:::truco
Si el porcentaje es una potencia de un medio (50 %, 25 %, 12,5 %…), cuenta periodos de semidesintegración y te ahorras los logaritmos.
:::

:::resultado
$t \approx 1{,}15\cdot10^{4}$ años
:::
::::
:::::
