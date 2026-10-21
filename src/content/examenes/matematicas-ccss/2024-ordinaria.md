---
asignatura: matematicas-ccss
anio: 2024
convocatoria: ordinaria
titulo: "PEvAU Matemáticas CCSS II 2024 – Convocatoria ordinaria"
duracion: 90
pdf_oficial: "/pdfs/matematicas-ccss-2024-ordinaria.pdf"
bloques: [algebra, analisis, probabilidad-estadistica]
responder: "Un ejercicio de cada bloque"
---

::bloque{id="A" titulo="Álgebra" instruccion="Responda al ejercicio."}

:::::ejercicio{id="A1" puntos="2,5" tema="algebra"}
Se consideran las matrices

$$
A = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}
\qquad
B = \begin{pmatrix} 2 & 0 \\ 1 & 1 \end{pmatrix}
$$

::::apartado{letra="a" puntos="1"}
Calcule $A\cdot B - 2I$.

::solucion

$$
A B = \begin{pmatrix} 1\cdot2 + 2\cdot1 & 1\cdot0 + 2\cdot1 \\ 0\cdot2 + 1\cdot1 & 0\cdot0+1\cdot1 \end{pmatrix} = \begin{pmatrix} 4 & 2 \\ 1 & 1 \end{pmatrix}
\qquad
A B - 2I = \begin{pmatrix} 2 & 2 \\ 1 & -1 \end{pmatrix}
$$

:::resultado
$$
AB - 2I = \begin{pmatrix} 2 & 2 \\ 1 & -1 \end{pmatrix}
$$
:::
::::

::::apartado{letra="b" puntos="1,5"}
Resuelva la ecuación matricial $A X = B$.

::solucion

Como $|A| = 1 \neq 0$, $A$ es invertible y $X = A^{-1}B$:

$$
A^{-1} = \begin{pmatrix} 1 & -2 \\ 0 & 1 \end{pmatrix}
\qquad
X = \begin{pmatrix} 1 & -2 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} 2 & 0 \\ 1 & 1 \end{pmatrix} = \begin{pmatrix} 0 & -2 \\ 1 & 1 \end{pmatrix}
$$

:::error
Escribir $X = B A^{-1}$. El producto de matrices no es conmutativo: si $A$ multiplica por la izquierda, $A^{-1}$ también tiene que ir por la izquierda.
:::

:::resultado
$$
X = \begin{pmatrix} 0 & -2 \\ 1 & 1 \end{pmatrix}
$$
:::
::::
:::::

::bloque{id="B" titulo="Análisis" instruccion="Responda al ejercicio."}

:::::ejercicio{id="B1" puntos="2,5" tema="analisis"}
Sea la función $f(x) = x^{3} - 3x^{2} + 2$.

::::apartado{letra="a" puntos="1,5"}
Determine sus extremos relativos.

::solucion

$$
f'(x) = 3x^2 - 6x = 3x(x-2) = 0 \iff x = 0 \ \text{o}\ x = 2
\qquad
f''(x) = 6x - 6
$$

$f''(0) = -6 < 0$: **máximo** en $(0,\,2)$. $f''(2) = 6 > 0$: **mínimo** en $(2,\,-2)$.

:::resultado
Máximo relativo $(0, 2)$ · mínimo relativo $(2, -2)$
:::
::::

::::apartado{letra="b" puntos="1"}
Halle la ecuación de la recta tangente a la gráfica en $x = 1$.

::solucion

$f(1) = 0$ y $f'(1) = -3$, así que $y - 0 = -3(x - 1)$.

:::resultado
$y = -3x + 3$
:::
::::
:::::

::bloque{id="C" titulo="Probabilidad y Estadística" instruccion="Responda al ejercicio."}

:::::ejercicio{id="C1" puntos="2,5" tema="probabilidad-estadistica"}
Sean $A$ y $B$ dos sucesos con $P(A) = 0{,}4$, $P(B) = 0{,}5$ y $P(A\cap B) = 0{,}15$.

::::apartado{letra="a" puntos="1,25"}
Calcule $P(A \cup B)$ y $P(A \mid B)$.

::solucion

$$
P(A\cup B) = 0{,}4 + 0{,}5 - 0{,}15 = 0{,}75
\qquad
P(A\mid B) = \frac{P(A\cap B)}{P(B)} = \frac{0{,}15}{0{,}5} = 0{,}3
$$

:::resultado
$P(A\cup B) = 0{,}75$ · $P(A\mid B) = 0{,}3$
:::
::::

::::apartado{letra="b" puntos="1,25"}
¿Son $A$ y $B$ independientes? Razone la respuesta.

::solucion

Son independientes si $P(A\cap B) = P(A)\,P(B)$. Como $0{,}4\cdot0{,}5 = 0{,}2 \neq 0{,}15$, **no son independientes**.

:::truco
También vale comparar $P(A\mid B) = 0{,}3$ con $P(A) = 0{,}4$: si saber que ocurre $B$ cambia la probabilidad de $A$, no hay independencia.
:::
::::
:::::
