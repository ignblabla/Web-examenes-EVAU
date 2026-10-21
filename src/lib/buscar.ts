// Búsqueda en el cliente sobre el índice JSON que la página incrusta al compilar.
interface Registro { url: string; asig: string; asigNombre: string; anio: number; conv: string; coord: string; tema: string; texto: string }

const normalizar = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const escapar = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

function resaltar(texto: string, terminos: string[]) {
  if (!terminos.length) return escapar(texto);
  const norm = normalizar(texto);
  const marcas: [number, number][] = [];
  terminos.forEach((t) => {
    let i = norm.indexOf(t);
    while (i !== -1) { marcas.push([i, i + t.length]); i = norm.indexOf(t, i + t.length); }
  });
  marcas.sort((a, b) => a[0] - b[0]);
  let out = '', pos = 0;
  for (const [a, b] of marcas) {
    if (a < pos) continue;
    out += escapar(texto.slice(pos, a)) + '<mark>' + escapar(texto.slice(a, b)) + '</mark>';
    pos = b;
  }
  return out + escapar(texto.slice(pos));
}

export function initBuscar() {
  const datos = JSON.parse(document.getElementById('indice-busqueda')!.textContent!) as { registros: Registro[]; estilos: Record<string, string> };
  const form = document.querySelector<HTMLFormElement>('[data-buscar]')!;
  const lista = document.querySelector<HTMLOListElement>('[data-resultados]')!;
  const cuenta = document.querySelector<HTMLElement>('[data-cuenta]')!;
  const vacio = document.querySelector<HTMLElement>('[data-vacio]')!;
  const input = form.querySelector<HTMLInputElement>('input[name=q]')!;
  const indice = datos.registros.map((r) => ({ r, hay: normalizar(`${r.asigNombre} ${r.anio} ${r.conv} ${r.coord} ${r.tema} ${r.texto}`) }));

  const buscar = () => {
    const fd = new FormData(form);
    const q = String(fd.get('q') ?? '').trim();
    const asig = String(fd.get('asig') ?? '');
    const terminos = normalizar(q).split(/\s+/).filter(Boolean);
    const res = indice.filter(({ r, hay }) => (!asig || r.asig === asig) && terminos.every((t) => hay.includes(t)));

    lista.innerHTML = res.map(({ r }) => `
      <li class="res" data-acento style="${datos.estilos[r.asig] ?? ''}">
        <span class="res__coord">${escapar(r.coord)}</span>
        <div>
          <h2 class="res__tit"><a href="${r.url}">Ejercicio ${escapar(r.coord)} · ${escapar(r.asigNombre)} ${r.anio}</a></h2>
          <p class="res__meta">${escapar(r.conv)} · ${resaltar(r.tema, terminos)}</p>
          <p class="res__txt">${resaltar(r.texto.length > 220 ? r.texto.slice(0, 220) + '…' : r.texto, terminos)}</p>
        </div>
      </li>`).join('');
    vacio.hidden = res.length > 0;
    cuenta.textContent = q || asig
      ? `${res.length} ${res.length === 1 ? 'ejercicio' : 'ejercicios'}`
      : `${res.length} ejercicios resueltos`;

    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (asig) p.set('asig', asig);
    history.replaceState(null, '', p.size ? `?${p}` : location.pathname);
  };

  const p = new URLSearchParams(location.search);
  input.value = p.get('q') ?? '';
  const a = p.get('asig');
  if (a) form.querySelectorAll<HTMLInputElement>('input[name=asig]').forEach((r) => (r.checked = r.value === a));

  form.addEventListener('input', buscar);
  form.addEventListener('submit', (e) => { e.preventDefault(); buscar(); });
  buscar();
}
