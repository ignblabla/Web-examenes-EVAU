// Alterna claro/oscuro. Sin preferencia guardada manda el sistema.
export function initTema() {
  const root = document.documentElement;
  const media = matchMedia('(prefers-color-scheme: dark)');
  const actual = () => (root.dataset.theme as 'light' | 'dark' | undefined) ?? (media.matches ? 'dark' : 'light');

  const pintar = () => {
    const t = actual();
    document.querySelectorAll<HTMLButtonElement>('[data-tema-toggle]').forEach((b) => {
      b.setAttribute('aria-pressed', String(t === 'dark'));
      b.setAttribute('aria-label', t === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    });
  };

  document.querySelectorAll<HTMLButtonElement>('[data-tema-toggle]').forEach((b) =>
    b.addEventListener('click', () => {
      const t = actual() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = t;
      try { localStorage.setItem('tema', t); } catch {}
      pintar();
    }),
  );
  media.addEventListener('change', pintar);
  pintar();
}
