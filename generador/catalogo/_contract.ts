// generador/catalogo/_contract.ts
// Contrato de props de cada componente del catalogo. Fuente de verdad del tipado
// (debe mantenerse sincronizado con CATALOG_CONTRACT en scripts/schema.ts: mismos
// nombres de props requeridas). Cada .astro declara su propio `interface Props`
// inline (idioma Astro + evita roturas de ruta al copiarse al sitio del cliente);
// este archivo es la referencia canonica.

export interface NavItem {
  label: string;
  ruta: string;
}

export interface Imagen {
  src: string;
  alt: string;
}

export interface Contacto {
  email?: string;
  telefono?: string;
  direccion?: string;
  form_action?: string;
}

export interface HeaderProps {
  nav: NavItem[];
  cta?: { label: string; ruta: string };
}

export interface HeroProps {
  titulo: string;
  subtitulo: string;
  cta_label: string;
  cta_ruta: string;
  imagen?: Imagen;
}

export interface ServiceItem {
  icono?: string;
  titulo: string;
  texto: string;
}
export interface ServicesProps {
  titulo: string;
  items: ServiceItem[];
}

export interface TestimonialItem {
  nombre: string;
  texto: string;
  rol?: string;
}
export interface TestimonialsProps {
  items: TestimonialItem[];
  titulo?: string;
}

export interface GalleryProps {
  imagenes: Imagen[];
  titulo?: string;
}

export interface CtaProps {
  titulo: string;
  texto?: string;
  cta_label: string;
  cta_ruta: string;
}

export interface ContactFormProps {
  email: string;
  form_action: string;
  telefono?: string;
  direccion?: string;
  titulo?: string;
}

export interface FooterProps {
  nav: NavItem[];
  contacto: Contacto;
  nombre_negocio: string;
}

export interface LayoutProps {
  titulo: string;
  descripcion: string;
  google_fonts?: string[];
}
