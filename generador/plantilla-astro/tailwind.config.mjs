/** @type {import('tailwindcss').Config} */
// Los colores y fuentes mapean a CSS vars de marca (definidas en src/styles/marca.css,
// generado por el ensamblador desde marca.json). Asi una misma clase (bg-primario)
// produce la marca de cada cliente sin tocar el catalogo.
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}"],
  theme: {
    extend: {
      colors: {
        primario: "var(--color-primario)",
        "primario-contraste": "var(--color-primario-contraste)",
        secundario: "var(--color-secundario)",
        acento: "var(--color-acento)",
        fondo: "var(--color-fondo)",
        superficie: "var(--color-superficie)",
        texto: "var(--color-texto)",
        "texto-suave": "var(--color-texto-suave)",
        borde: "var(--color-borde)",
      },
      fontFamily: {
        titulares: "var(--font-titulares)",
        cuerpo: "var(--font-cuerpo)",
      },
      maxWidth: {
        contenido: "1200px",
      },
    },
  },
  plugins: [],
};
