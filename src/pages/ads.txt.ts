import type { APIRoute } from "astro"
import { sitio } from "../data/sitio"

// ads.txt: declara a Google como único vendedor autorizado de los anuncios de la web.
// El ID de cuenta es el de editor sin el prefijo "ca-".
export const GET: APIRoute = () => {
  const lineas = sitio.adsense
    ? `google.com, ${sitio.adsense.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`
    : "# AdSense aún no está configurado.\n"
  return new Response(lineas, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}
