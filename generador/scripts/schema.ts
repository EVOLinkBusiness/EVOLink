// generador/scripts/schema.ts
// Tipos y validadores deterministas del Generador. Sin dependencias externas:
// la validacion es a mano para no introducir runtime de schema (YAGNI).
// CATALOG_CONTRACT es la fuente de verdad de que componentes/variantes/props
// existen; debe mantenerse sincronizado con catalogo/_contract.ts.

export interface Marca {
  cliente_id?: string;
  nombre_negocio: string;
  colores: {
    primario: string;
    secundario?: string;
    acento?: string;
    fondo?: string;
    texto?: string;
  };
  tipografia?: {
    titulares?: string;
    cuerpo?: string;
    google_fonts?: string[];
  };
  logo?: { tipo: "wordmark" | "icon" | "none"; texto?: string; svg_path?: string };
  tono?: string;
}

export interface Seccion {
  componente: string;
  variante: string;
  props: Record<string, unknown>;
}

export interface Pagina {
  ruta: string;
  titulo: string;
  descripcion: string;
  secciones: Seccion[];
}

export interface NavItem {
  label: string;
  ruta: string;
}

export interface Contacto {
  email?: string;
  telefono?: string;
  direccion?: string;
  form_action?: string;
}

export interface PlanPagina {
  cliente_id?: string;
  tipo: "one-page" | "multipage";
  paginas: Pagina[];
  navegacion?: NavItem[];
  contacto?: Contacto;
}

// componente -> variantes validas + props requeridas (claves no vacias).
export const CATALOG_CONTRACT: Record<string, { variantes: string[]; required: string[] }> = {
  Header: { variantes: ["A", "B"], required: ["nav"] },
  Hero: { variantes: ["A", "B", "C"], required: ["titulo", "subtitulo", "cta_label", "cta_ruta"] },
  Services: { variantes: ["A", "B"], required: ["titulo", "items"] },
  Testimonials: { variantes: ["A", "B"], required: ["items"] },
  Gallery: { variantes: ["A", "B"], required: ["imagenes"] },
  Cta: { variantes: ["A", "B"], required: ["titulo", "cta_label", "cta_ruta"] },
  ContactForm: { variantes: ["A", "B"], required: ["email", "form_action"] },
  Footer: { variantes: ["A", "B"], required: ["nav", "contacto", "nombre_negocio"] },
};

export type ValidationResult = { ok: true } | { ok: false; errors: string[] };

const HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function isHex(v: unknown): boolean {
  return typeof v === "string" && HEX.test(v);
}

function isEmpty(v: unknown): boolean {
  return v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
}

export function validateMarca(input: unknown): ValidationResult {
  const errors: string[] = [];
  if (!input || typeof input !== "object") return { ok: false, errors: ["marca no es un objeto"] };
  const m = input as Partial<Marca>;
  if (!m.nombre_negocio || typeof m.nombre_negocio !== "string") errors.push("falta nombre_negocio");
  if (!m.colores || typeof m.colores !== "object") {
    errors.push("falta el objeto colores");
  } else if (!isHex(m.colores.primario)) {
    errors.push("colores.primario debe ser un hex valido (#rgb o #rrggbb)");
  }
  return errors.length ? { ok: false, errors } : { ok: true };
}

export function validatePlanPagina(input: unknown): ValidationResult {
  const errors: string[] = [];
  if (!input || typeof input !== "object") return { ok: false, errors: ["plan no es un objeto"] };
  const p = input as Partial<PlanPagina>;
  if (p.tipo !== "one-page" && p.tipo !== "multipage") errors.push("tipo debe ser one-page o multipage");
  if (!Array.isArray(p.paginas) || p.paginas.length === 0) {
    errors.push("paginas debe ser un array no vacio");
    return { ok: false, errors };
  }
  p.paginas.forEach((pag, i) => {
    if (!pag || typeof pag !== "object") {
      errors.push(`pagina[${i}] no es un objeto`);
      return;
    }
    if (!pag.ruta) errors.push(`pagina[${i}] sin ruta`);
    if (!pag.titulo) errors.push(`pagina[${i}] sin titulo`);
    if (!Array.isArray(pag.secciones) || pag.secciones.length === 0) {
      errors.push(`pagina[${i}] sin secciones`);
      return;
    }
    pag.secciones.forEach((sec, j) => {
      const loc = `pagina[${i}].seccion[${j}]`;
      const contract = CATALOG_CONTRACT[sec?.componente as string];
      if (!contract) {
        errors.push(`${loc}: componente desconocido '${sec?.componente}'`);
        return;
      }
      if (!contract.variantes.includes(sec.variante)) {
        errors.push(`${loc}: variante '${sec.variante}' no existe para ${sec.componente}`);
      }
      const props = (sec.props ?? {}) as Record<string, unknown>;
      for (const key of contract.required) {
        if (isEmpty(props[key])) {
          errors.push(`${loc}: falta prop requerida '${key}' para ${sec.componente}`);
        }
      }
    });
  });
  return errors.length ? { ok: false, errors } : { ok: true };
}
