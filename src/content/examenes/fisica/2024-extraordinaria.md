---
asignatura: fisica
anio: 2024
convocatoria: extraordinaria
titulo: "PEvAU Física 2024 – Convocatoria extraordinaria"
duracion: 90
pdf_oficial: "/pdfs/fisica-2024-extraordinaria.pdf"
bloques: [campo-gravitatorio, electromagnetismo, optica, fisica-moderna]
responder: "Un ejercicio de cada bloque"
---

::bloque{id="A" titulo="Campo gravitatorio" instruccion="Responda al ejercicio."}

:::::ejercicio{id="A1" puntos="2,5" tema="campo-gravitatorio"}
Dos masas puntuales de 3 kg y 5 kg están fijas y separadas 2 m.

*Dato:* $G = 6{,}67\cdot10^{-11}\ \text{N m}^2\,\text{kg}^{-2}$.

::::apartado{letra="a" puntos="1,25"}
Calcule el campo gravitatorio en el punto medio del segmento que las une.

::solucion

Cada masa atrae hacia sí misma; en el punto medio ($r = 1$ m) los dos campos tienen sentidos opuestos:

$$
g_1 = G\frac{3}{1^2} = 2{,}00\cdot10^{-10}\ \text{N/kg}
\qquad
g_2 = G\frac{5}{1^2} = 3{,}34\cdot10^{-10}\ \text{N/kg}
$$

$$
g = g_2 - g_1 = 1{,}33\cdot10^{-10}\ \text{N/kg},\ \text{dirigido hacia la masa de 5 kg}
$$

:::resultado
$g \approx 1{,}33\cdot10^{-10}\ \text{N/kg}$ hacia la masa de 5 kg
:::
::::

::::apartado{letra="b" puntos="1,25"}
Determine el trabajo necesario para llevar una masa de 1 kg desde ese punto hasta el infinito.

::solucion

$$
V = -G\frac{3}{1} - G\frac{5}{1} = -5{,}34\cdot10^{-10}\ \text{J/kg}
\qquad
W_{\text{ext}} = m\,(V_\infty - V) = 5{,}34\cdot10^{-10}\ \text{J}
$$

:::resultado
$W \approx 5{,}34\cdot10^{-10}\ \text{J}$ (lo aporta un agente externo)
:::
::::
:::::

::bloque{id="B" titulo="Campo electromagnético" instruccion="Responda al ejercicio."}

:::::ejercicio{id="B1" puntos="2,5" tema="electromagnetismo"}
Dos hilos conductores rectilíneos, largos y paralelos, separados 10 cm, transportan corrientes de 5 A y 10 A en el mismo sentido.

*Dato:* $\mu_0 = 4\pi\cdot10^{-7}\ \text{T m A}^{-1}$.

::::apartado{letra="a" puntos="1,25"}
Calcule el campo magnético en el punto medio entre ambos hilos.

::solucion

$$
B = \frac{\mu_0 I}{2\pi d}:\qquad B_1 = \frac{2\cdot10^{-7}\cdot5}{0{,}05} = 2\cdot10^{-5}\ \text{T}
\qquad
B_2 = \frac{2\cdot10^{-7}\cdot10}{0{,}05} = 4\cdot10^{-5}\ \text{T}
$$

Con corrientes del mismo sentido, en la zona entre los hilos los campos son opuestos: $B = 2\cdot10^{-5}\ \text{T}$, en el sentido del que crea el hilo de 10 A.

:::resultado
$B = 2\cdot10^{-5}\ \text{T}$
:::
::::

::::apartado{letra="b" puntos="1,25"}
Determine la fuerza por unidad de longitud entre los hilos e indique si es atractiva o repulsiva.

::solucion

$$
\frac{F}{L} = \frac{\mu_0 I_1 I_2}{2\pi d} = \frac{2\cdot10^{-7}\cdot 5\cdot 10}{0{,}1} = 1\cdot10^{-4}\ \text{N/m}
$$

Corrientes del mismo sentido se **atraen**.

:::resultado
$F/L = 10^{-4}\ \text{N/m}$, atractiva
:::
::::
:::::

::bloque{id="C" titulo="Vibraciones y ondas" instruccion="Responda al ejercicio."}

:::::ejercicio{id="C1" puntos="2,5" tema="optica"}
Un rayo de luz pasa del agua ($n = 1{,}33$) al aire ($n = 1$).

::::apartado{letra="a" puntos="1,25"}
Calcule el ángulo límite.

::solucion

$$
n_1\,\operatorname{sen} L = n_2\,\operatorname{sen} 90^\circ
\quad\Longrightarrow\quad
\operatorname{sen} L = \frac{1}{1{,}33} = 0{,}752
\quad\Longrightarrow\quad
L = 48{,}8^\circ
$$

:::resultado
$L \approx 48{,}8^\circ$
:::
::::

::::apartado{letra="b" puntos="1,25"}
Determine el ángulo de refracción si el rayo incide con $30^\circ$.

::solucion

$$
1{,}33\cdot\operatorname{sen}30^\circ = \operatorname{sen} r
\quad\Longrightarrow\quad
\operatorname{sen} r = 0{,}665
\quad\Longrightarrow\quad
r = 41{,}7^\circ
$$

:::resultado
$r \approx 41{,}7^\circ$
:::
::::
:::::

::bloque{id="D" titulo="Física relativista, cuántica, nuclear y de partículas" instruccion="Responda al ejercicio."}

:::::ejercicio{id="D1" puntos="2,5" tema="fisica-moderna"}
Un electrón se mueve a $1{,}5\cdot10^{6}\ \text{m/s}$.

*Datos:* $h = 6{,}63\cdot10^{-34}\ \text{J s}$; $m_e = 9{,}11\cdot10^{-31}\ \text{kg}$.

::::apartado{letra="a" puntos="1,25"}
Calcule su longitud de onda de De Broglie.

::solucion

$$
\lambda = \frac{h}{m v} = \frac{6{,}63\cdot10^{-34}}{9{,}11\cdot10^{-31}\cdot1{,}5\cdot10^{6}} = 4{,}85\cdot10^{-10}\ \text{m}
$$

:::resultado
$\lambda \approx 4{,}85\cdot10^{-10}\ \text{m}$
:::
::::

::::apartado{letra="b" puntos="1,25"}
Compárela con la de un balón de 0,45 kg que se mueve a 20 m/s y comente el resultado.

::solucion

$$
\lambda_{\text{balón}} = \frac{6{,}63\cdot10^{-34}}{0{,}45\cdot20} = 7{,}37\cdot10^{-35}\ \text{m}
$$

La del electrón es del orden de las distancias interatómicas, por eso se observa difracción de electrones en cristales. La del balón es tan pequeña que su comportamiento ondulatorio es indetectable.

:::resultado
$\lambda_{\text{balón}} \approx 7{,}4\cdot10^{-35}\ \text{m}$, 25 órdenes de magnitud menor
:::
::::
:::::
