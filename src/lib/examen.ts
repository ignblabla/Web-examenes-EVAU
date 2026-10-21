// Comportamiento de la página de examen: cronómetro, soluciones, índice,
// "dónde lo dejaste" e impresión. Sin dependencias.

const guardar = (k: string, v: unknown, s: Storage = localStorage) => { try { s.setItem(k, JSON.stringify(v)); } catch {} };
const leer = <T>(k: string, def: T, s: Storage = localStorage): T => {
  try { const v = s.getItem(k); return v ? (JSON.parse(v) as T) : def; } catch { return def; }
};
const $$ = <T extends Element>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

function anunciar(txt: string) {
  const el = document.querySelector('[data-anuncio]');
  if (el) { el.textContent = ''; requestAnimationFrame(() => (el.textContent = txt)); }
}

// ---------------------------------------------------------------------------
// Cronómetro
// ---------------------------------------------------------------------------
function initCronometro(id: string) {
  const root = document.querySelector<HTMLElement>('[data-crono]');
  if (!root) return;
  const total = Number(root.dataset.duracion) * 60_000;
  const tiempo = root.querySelector<HTMLElement>('[data-crono-tiempo]')!;
  const estado = root.querySelector<HTMLElement>('[data-crono-estado]')!;
  const txt = root.querySelector<HTMLElement>('[data-crono-txt]')!;
  const barra = root.querySelector<HTMLElement>('[data-crono-barra]')!;
  const reiniciar = root.querySelector<HTMLButtonElement>('[data-crono-accion="reiniciar"]')!;
  const minis = $$<HTMLElement>('[data-crono-mini]');
  const clave = `crono:${id}`;

  type S = { acumulado: number; inicio: number | null };
  let s: S = leer<S>(clave, { acumulado: 0, inicio: null }, sessionStorage);
  let tick: number | undefined;
  const avisados = new Set<number>();

  const transcurrido = () => s.acumulado + (s.inicio ? Date.now() - s.inicio : 0);
  const fmt = (ms: number) => {
    const t = Math.max(0, Math.ceil(ms / 1000));
    const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), sg = t % 60;
    const mm = String(h * 60 + m).padStart(2, '0');
    return `${mm}:${String(sg).padStart(2, '0')}`;
  };

  const pintar = () => {
    const resta = total - transcurrido();
    const corriendo = s.inicio !== null;
    const empezado = transcurrido() > 0;
    const aviso = resta <= 0 ? 'fin' : resta <= 10 * 60_000 ? 'poco' : '';
    const lectura = resta <= 0 ? '00:00' : fmt(resta);

    tiempo.textContent = lectura;
    root.dataset.estado = corriendo ? 'corriendo' : empezado ? 'pausado' : 'parado';
    root.dataset.aviso = aviso;
    barra.style.width = `${Math.min(100, (transcurrido() / total) * 100)}%`;
    txt.textContent = corriendo ? 'Pausar' : empezado ? 'Seguir' : 'Empezar';
    reiniciar.hidden = !empezado;
    estado.textContent =
      resta <= 0 ? 'Tiempo agotado · suelta el boli'
      : corriendo ? (aviso === 'poco' ? 'Quedan menos de 10 minutos' : 'En marcha')
      : empezado ? 'En pausa' : `Sin empezar · ${total / 60_000} minutos`;

    minis.forEach((m) => {
      m.hidden = !empezado;
      m.textContent = lectura;
      m.dataset.aviso = aviso;
    });

    // Avisos para lectores de pantalla solo en hitos, no cada segundo.
    if (corriendo) {
      for (const min of [30, 10, 5]) {
        if (resta <= min * 60_000 && resta > (min - 1) * 60_000 && !avisados.has(min)) {
          avisados.add(min); anunciar(`Quedan ${min} minutos`);
        }
      }
    }
    if (resta <= 0 && corriendo) {
      s = { acumulado: total, inicio: null };
      guardar(clave, s, sessionStorage);
      parar();
      anunciar('Tiempo agotado');
      pintar();
    }
  };

  const arrancar = () => { clearInterval(tick); tick = window.setInterval(pintar, 250); };
  const parar = () => clearInterval(tick);

  root.querySelector('[data-crono-accion="alternar"]')!.addEventListener('click', () => {
    if (transcurrido() >= total) s = { acumulado: 0, inicio: null };
    if (s.inicio) { s = { acumulado: transcurrido(), inicio: null }; parar(); anunciar('Cronómetro en pausa'); }
    else { s = { ...s, inicio: Date.now() }; arrancar(); anunciar('Cronómetro en marcha'); }
    guardar(clave, s, sessionStorage);
    pintar();
  });
  reiniciar.addEventListener('click', () => {
    s = { acumulado: 0, inicio: null }; avisados.clear(); parar();
    guardar(clave, s, sessionStorage); pintar(); anunciar('Cronómetro reiniciado');
  });

  if (s.inicio) arrancar();
  pintar();
}

// ---------------------------------------------------------------------------
// Soluciones: casillas de "visto", destapar todas, último punto de estudio
// ---------------------------------------------------------------------------
function initSoluciones(id: string) {
  const sols = $$<HTMLDetailsElement>('details.sol');
  const claveVisto = `visto:${id}`;
  const claveUltimo = `ultimo:${id}`;
  const vistos = new Set<string>(leer<string[]>(claveVisto, []));
  const btnTodas = document.querySelector<HTMLButtonElement>('[data-todas]');
  const txtTodas = document.querySelector<HTMLElement>('[data-todas-txt]');

  const marcar = (coord: string) => {
    sols.filter((d) => d.dataset.coord === coord).forEach((d) => d.setAttribute('data-visto', ''));
    $$<HTMLElement>(`[data-casilla="${CSS.escape(coord)}"]`).forEach((c) => (c.dataset.estado = 'visto'));
  };
  vistos.forEach(marcar);

  const sincronizarTodas = () => {
    const abiertas = sols.every((d) => d.open);
    btnTodas?.setAttribute('aria-pressed', String(abiertas));
    if (txtTodas) txtTodas.textContent = abiertas ? 'Tapar todas' : 'Destapar todas';
  };

  sols.forEach((d) =>
    d.addEventListener('toggle', () => {
      if (d.open) {
        const c = d.dataset.coord!;
        vistos.add(c); marcar(c);
        guardar(claveVisto, [...vistos]);
        const sec = d.closest<HTMLElement>('[id]');
        if (sec) guardar(claveUltimo, { coord: c, id: sec.id });
      }
      sincronizarTodas();
    }),
  );

  btnTodas?.addEventListener('click', () => {
    const abrir = !sols.every((d) => d.open);
    sols.forEach((d) => (d.open = abrir));
    sincronizarTodas();
  });

  // Solapa "dónde lo dejaste": solo si se vuelve sin un ancla explícita.
  const ultimo = leer<{ coord: string; id: string } | null>(claveUltimo, null);
  const solapa = document.querySelector<HTMLElement>('[data-solapa]');
  if (solapa && ultimo && !location.hash && document.getElementById(ultimo.id)) {
    solapa.querySelector('[data-solapa-coord]')!.textContent = ultimo.coord;
    const ir = solapa.querySelector<HTMLAnchorElement>('[data-solapa-ir]')!;
    ir.href = `#${ultimo.id}`;
    ir.addEventListener('click', () => (solapa.hidden = true));
    solapa.querySelector('[data-solapa-cerrar]')!.addEventListener('click', () => (solapa.hidden = true));
    solapa.hidden = false;
    // Si el estudiante ya se ha puesto a leer por su cuenta, la solapa sobra.
    const y0 = scrollY;
    const alDesplazar = () => {
      if (Math.abs(scrollY - y0) > 600) { solapa.hidden = true; removeEventListener('scroll', alDesplazar); }
    };
    addEventListener('scroll', alDesplazar, { passive: true });
  }
}

// ---------------------------------------------------------------------------
// Índice: posición actual y selector compacto del móvil
// ---------------------------------------------------------------------------
function initIndice() {
  const enlaces = $$<HTMLAnchorElement>('[data-indice]');
  const saltos = $$<HTMLAnchorElement>('[data-salto]');
  const objetivos = $$<HTMLElement>('.bloque, .ej');
  const marcarActual = (el: HTMLElement) => {
    const ej = el.classList.contains('ej') ? el : null;
    const bloque = el.closest<HTMLElement>('.bloque');
    enlaces.forEach((a) => a.setAttribute('aria-current', String(a.dataset.indice === ej?.id || (!ej && a.dataset.indice === bloque?.id))));
    saltos.forEach((a) => a.setAttribute('aria-current', String(`bloque-${a.dataset.salto}` === bloque?.id)));
  };
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) marcarActual(visible.target as HTMLElement);
    },
    { rootMargin: '-20% 0px -65% 0px' },
  );
  objetivos.forEach((o) => io.observe(o));

  const sel = document.querySelector<HTMLSelectElement>('[data-ir]');
  sel?.addEventListener('change', () => {
    const destino = sel.value && document.getElementById(sel.value);
    if (destino) {
      destino.scrollIntoView({ block: 'start' });
      destino.setAttribute('tabindex', '-1');
      destino.focus({ preventScroll: true });
    }
    sel.value = '';
  });
}

// ---------------------------------------------------------------------------
// Imprimir con o sin soluciones
// ---------------------------------------------------------------------------
function initImprimir() {
  const sols = $$<HTMLDetailsElement>('details.sol');
  const menu = document.querySelector<HTMLDetailsElement>('details.imprimir');
  $$<HTMLButtonElement>('[data-imprimir]').forEach((b) =>
    b.addEventListener('click', () => {
      const modo = b.dataset.imprimir as 'con' | 'sin';
      const antes = sols.map((d) => d.open);
      document.documentElement.dataset.imprimir = modo;
      sols.forEach((d) => (d.open = modo === 'con'));
      if (menu) menu.open = false;
      const restaurar = () => {
        sols.forEach((d, i) => (d.open = antes[i]));
        delete document.documentElement.dataset.imprimir;
        removeEventListener('afterprint', restaurar);
      };
      addEventListener('afterprint', restaurar);
      print();
    }),
  );
  document.addEventListener('click', (e) => { if (menu?.open && !menu.contains(e.target as Node)) menu.open = false; });
}

export function initExamen() {
  const id = document.querySelector<HTMLElement>('[data-examen]')?.dataset.examen ?? location.pathname;
  initCronometro(id);
  initSoluciones(id);
  initIndice();
  initImprimir();
}
