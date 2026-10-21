// Filtros de la página de asignatura: todo en el cliente, sobre data-atributos.
// Dos vistas: exámenes completos o ejercicios sueltos por tema. Marcar un bloque
// temático pasa a la vista de ejercicios, que es lo que busca quien quiere
// practicar un tema concreto. El estado se refleja en la URL
// (?ver=ejercicios&anio=2024&convocatoria=ordinaria&bloque=algebra) para poder compartirlo.
type Vista = 'examenes' | 'ejercicios';

export function initFiltros() {
  const form = document.querySelector<HTMLFormElement>('[data-filtros]');
  if (!form) return;
  const listas: Record<Vista, HTMLElement | null> = {
    examenes: document.querySelector('[data-lista]'),
    ejercicios: document.querySelector('[data-lista-ej]'),
  };
  const vacio = document.querySelector<HTMLElement>('[data-vacio]');
  const vacioTitulo = document.querySelector<HTMLElement>('[data-vacio-titulo]');
  const vacioTxt = document.querySelector<HTMLElement>('[data-vacio-txt]');
  const cuenta = document.querySelector<HTMLElement>('[data-cuenta]');
  const radio = (name: string, value: string) =>
    form.querySelectorAll<HTMLInputElement>(`input[name=${name}]`).forEach((r) => (r.checked = r.value === value));

  const leer = () => {
    const fd = new FormData(form);
    return {
      ver: (String(fd.get('ver') ?? 'examenes') as Vista),
      anio: String(fd.get('anio') ?? ''),
      convocatoria: String(fd.get('convocatoria') ?? ''),
      bloques: fd.getAll('bloque').map(String),
    };
  };

  const aplicar = () => {
    const f = leer();
    const lista = listas[f.ver];
    (Object.keys(listas) as Vista[]).forEach((v) => { if (listas[v]) listas[v]!.hidden = v !== f.ver; });

    let visibles = 0;
    lista?.querySelectorAll<HTMLElement>(f.ver === 'examenes' ? '.fe' : '.fj').forEach((el) => {
      const okBase =
        (!f.anio || el.dataset.anio === f.anio) &&
        (!f.convocatoria || el.dataset.convocatoria === f.convocatoria);
      // Un examen debe incluir todos los bloques marcados; un ejercicio, ser de alguno de ellos.
      const okBloque = f.ver === 'examenes'
        ? f.bloques.every((b) => (el.dataset.bloques ?? '').split(' ').includes(b))
        : !f.bloques.length || f.bloques.includes(el.dataset.tema ?? '');
      el.hidden = !(okBase && okBloque);
      if (!el.hidden) visibles++;
    });
    lista?.querySelectorAll<HTMLElement>('[data-anio-grupo]').forEach((g) => {
      g.hidden = !g.querySelector('.fe:not([hidden]), .fj:not([hidden])');
    });

    if (vacio) vacio.hidden = visibles > 0;
    const nombre = f.ver === 'examenes' ? ['examen', 'exámenes'] : ['ejercicio', 'ejercicios'];
    if (cuenta) cuenta.textContent = `${visibles} ${visibles === 1 ? nombre[0] : nombre[1]}`;
    if (vacioTitulo) vacioTitulo.textContent = `Ningún ${nombre[0]} con estos filtros`;
    if (vacioTxt) vacioTxt.textContent = f.ver === 'examenes'
      ? 'Prueba con otro año o quita algún bloque temático. Los exámenes con resolución en preparación también cuentan.'
      : 'Todavía no hay ejercicios resueltos de este tema con esos filtros. Prueba con otro año o con todas las convocatorias.';

    const q = new URLSearchParams();
    if (f.ver === 'ejercicios') q.set('ver', 'ejercicios');
    if (f.anio) q.set('anio', f.anio);
    if (f.convocatoria) q.set('convocatoria', f.convocatoria);
    f.bloques.forEach((b) => q.append('bloque', b));
    history.replaceState(null, '', q.size ? `?${q}` : location.pathname);
  };

  // Estado inicial desde la URL
  const p = new URLSearchParams(location.search);
  const sel = form.elements.namedItem('anio') as HTMLSelectElement | null;
  if (sel && p.get('anio')) sel.value = p.get('anio')!;
  if (p.get('convocatoria')) radio('convocatoria', p.get('convocatoria')!);
  const bl = p.getAll('bloque');
  form.querySelectorAll<HTMLInputElement>('input[name=bloque]').forEach((c) => (c.checked = bl.includes(c.value)));
  radio('ver', p.get('ver') === 'ejercicios' || bl.length ? 'ejercicios' : 'examenes');

  form.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.name === 'bloque' && t.checked) radio('ver', 'ejercicios');
    aplicar();
  });
  form.addEventListener('submit', (e) => e.preventDefault());
  form.addEventListener('reset', () => setTimeout(aplicar));
  document.querySelector('[data-limpiar]')?.addEventListener('click', () => form.reset());
  aplicar();
}
