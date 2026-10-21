// Convierte las directivas del formato de examen en el marcado del cuadernillo.
//
//   ::bloque{id="A" titulo="Campo gravitatorio" instruccion="Responda a uno de los dos ejercicios."}
//   :::::ejercicio{id="A1" puntos="2,5" tema="campo-gravitatorio"}
//   Enunciado común…
//   ::::apartado{letra="a" puntos="1,25"}
//   Enunciado del apartado…
//   ::solucion
//   Desarrollo con $…$ y $$…$$
//   :::resultado / :::truco / :::error / :::nota / :::figura{pie="…"}
//   ::::
//   :::::
//
// Todo lo que va después de `::solucion` dentro de un apartado (o de un ejercicio
// sin apartados) es la solución, y queda tapada por defecto en un <details>.

const CALLOUTS = { truco: 'Truco', error: 'Ojo, error típico', nota: 'Nota' };

const hEl = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const hTxt = (value) => ({ type: 'text', value });
const node = (hName, hProperties, children = [], hChildren) => ({
  type: 'pevau',
  data: hChildren ? { hName, hProperties, hChildren } : { hName, hProperties },
  children,
});
const para = (className, text) => ({
  type: 'paragraph',
  data: { hProperties: { className: [className] } },
  children: [{ type: 'text', value: text }],
});

const chevron = () =>
  hEl('svg', { className: ['sol__chev'], viewBox: '0 0 16 16', width: 16, height: 16, ariaHidden: 'true' }, [
    hEl('path', { d: 'M3.5 6l4.5 4.5L12.5 6', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'square' }),
  ]);

const isSol = (n) => n.type === 'leafDirective' && n.name === 'solucion';

// El <summary> va como nodo hoja con hChildren (hast directo); el cuerpo conserva
// sus hijos mdast para que KaTeX y el resto de plugins los procesen.
function solucionNode(coord, etiqueta, children) {
  const summary = node('summary', { className: ['sol__toggle'] }, [], [
    hEl('span', { className: ['casilla'], ariaHidden: 'true' }),
    hEl('span', { className: ['sol__ver'] }, [hTxt('Ver solución')]),
    hEl('span', { className: ['sol__ocultar'] }, [hTxt('Ocultar solución')]),
    hEl('span', { className: ['sr-only'] }, [hTxt(` ${etiqueta}`)]),
    hEl('span', { className: ['sol__coord'], ariaHidden: 'true' }, [hTxt(coord)]),
    chevron(),
  ]);
  return node('details', { className: ['sol'], dataCoord: coord }, [summary, node('div', { className: ['sol__body'] }, children)]);
}

function splitSol(children) {
  const i = children.findIndex(isSol);
  return i === -1 ? [children, null] : [children.slice(0, i), children.slice(i + 1)];
}

function transformBlocks(children) {
  return children.map((n) => {
    if (n.type !== 'containerDirective') return n;
    const kids = transformBlocks(n.children || []);
    if (n.name in CALLOUTS) {
      return node('aside', { className: ['callout', `callout--${n.name}`] }, [para('callout__label', CALLOUTS[n.name]), ...kids]);
    }
    if (n.name === 'resultado') {
      return node('div', { className: ['resultado'] }, [para('resultado__label', 'Resultado'), ...kids]);
    }
    if (n.name === 'figura') {
      const pie = n.attributes?.pie;
      return node('figure', { className: ['figura'] }, [
        node('div', { className: ['figura__lamina'] }, kids),
        ...(pie ? [{ type: 'pevau', data: { hName: 'figcaption', hChildren: [hTxt(pie)] }, children: [] }] : []),
      ]);
    }
    return n;
  });
}

function apartado(n, ejId) {
  const letra = n.attributes?.letra ?? '?';
  const pts = n.attributes?.puntos;
  const coord = `${ejId}·${letra}`;
  const [enun, sol] = splitSol(n.children || []);
  return node('section', { className: ['ap'], id: `ej-${ejId}-${letra}`, dataCoord: coord }, [
    node('div', { className: ['ap__fila'] }, [
      // La casilla del margen repite la del índice: el papel también registra lo que ya has mirado.
      node('span', { className: ['ap__letra'] }, [], [
        hEl('span', { className: ['casilla'], dataCasilla: coord, ariaHidden: 'true' }),
        hTxt(`${letra})`),
      ]),
      node('div', { className: ['ap__enun'] }, transformBlocks(enun)),
      ...(pts ? [{ type: 'pevau', data: { hName: 'span', hProperties: { className: ['marca'] }, hChildren: [hTxt(pts)] }, children: [] }] : []),
    ]),
    ...(sol ? [solucionNode(coord, `del apartado ${letra}) del ejercicio ${ejId}`, transformBlocks(sol))] : []),
  ]);
}

function ejercicio(n) {
  const id = n.attributes?.id ?? '';
  const pts = n.attributes?.puntos;
  const kids = n.children || [];
  const firstAp = kids.findIndex((k) => k.type === 'containerDirective' && k.name === 'apartado');
  const head = firstAp === -1 ? kids : kids.slice(0, firstAp);
  const aps = firstAp === -1 ? [] : kids.slice(firstAp);
  const [enun, sol] = splitSol(head);

  return node('article', { className: ['ej'], id: `ej-${id}`, dataCoord: id, dataTema: n.attributes?.tema ?? '' }, [
    {
      type: 'pevau',
      data: {
        hName: 'header',
        hProperties: { className: ['ej__cab'] },
        hChildren: [
          hEl('h3', { className: ['ej__num'] }, [hEl('span', { className: ['sr-only'] }, [hTxt('Ejercicio ')]), hTxt(id)]),
          ...(pts ? [hEl('span', { className: ['marca', 'marca--total'] }, [hTxt(`${pts} puntos`)])] : []),
        ],
      },
      children: [],
    },
    node('div', { className: ['ej__enun'] }, transformBlocks(enun)),
    ...aps.filter((k) => k.type === 'containerDirective' && k.name === 'apartado').map((k) => apartado(k, id)),
    ...(sol ? [solucionNode(id, `del ejercicio ${id}`, transformBlocks(sol))] : []),
  ]);
}

export default function remarkPevau() {
  return (tree) => {
    const out = [];
    let current = null;
    for (const n of tree.children) {
      if (n.type === 'leafDirective' && n.name === 'bloque') {
        const { id = '', titulo = '', instruccion } = n.attributes || {};
        current = node('section', { className: ['bloque'], id: `bloque-${id}`, dataBloque: id }, [
          {
            type: 'pevau',
            data: {
              hName: 'header',
              hProperties: { className: ['bloque__cab'] },
              hChildren: [
                hEl('h2', { className: ['bloque__h'] }, [
                  hEl('span', { className: ['bloque__id'] }, [hTxt(`Bloque ${id}`)]),
                  hEl('span', { className: ['bloque__tit'] }, [hTxt(titulo)]),
                ]),
                ...(instruccion ? [hEl('p', { className: ['bloque__instr'] }, [hTxt(instruccion)])] : []),
              ],
            },
            children: [],
          },
        ]);
        out.push(current);
        continue;
      }
      const t = n.type === 'containerDirective' && n.name === 'ejercicio' ? ejercicio(n) : transformBlocks([n])[0];
      (current ? current.children : out).push(t);
    }
    tree.children = out;
  };
}
