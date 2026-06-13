import type { PresenceData } from "../scoring/types.ts";

// Contrato estable de entrada del Auditor (anexo 2026-06-12 §3).
// Dos vías lo rellenan: captura de Maps (v1, por visión) o Places API (v2).
// El scoring NUNCA lee la captura: opera siempre sobre el clients derivado de aquí.
export interface IntakeForm {
  // Obligatorios (mínimo para auditar)
  business_name: string;
  niche: string; // actividad/nicho
  service_area: string; // zona de actuación (municipio/s)
  phone: string;
  has_website: boolean;
  website_url?: string | null;
  has_maps_listing: boolean;
  maps_url?: string | null;
  // Opcionales (mejoran la auditoría; extraíbles de la captura de Maps)
  email?: string | null;
  address?: string | null;
  hours?: string | null;
  reviews_count?: number | null;
  reviews_avg?: number | null; // 1-5
  social_urls?: string[] | null;
  maps_category?: string | null;
  photos_count?: number | null;
  business_age?: string | null;
}

const REQUIRED_TEXT: (keyof IntakeForm)[] = ["business_name", "niche", "service_area", "phone"];

// Valida lo que un script puede comprobar: presencia de obligatorios y rangos.
// Campos opcionales vacíos NO bloquean (el anexo §3: la ausencia ya es un hallazgo).
export function validateForm(form: IntakeForm): string[] {
  const errors: string[] = [];
  for (const key of REQUIRED_TEXT) {
    const v = form[key];
    if (typeof v !== "string" || v.trim() === "") {
      errors.push(`Campo obligatorio vacío: ${key}`);
    }
  }
  if (typeof form.has_website !== "boolean") errors.push("Campo obligatorio: has_website (sí/no)");
  if (typeof form.has_maps_listing !== "boolean") {
    errors.push("Campo obligatorio: has_maps_listing (sí/no)");
  }
  if (form.has_website === true && !form.website_url?.trim()) {
    errors.push("Falta website_url: marcaste que tiene web propia");
  }
  if (form.reviews_avg != null && (form.reviews_avg < 1 || form.reviews_avg > 5)) {
    errors.push("reviews_avg fuera de rango (1-5)");
  }
  if (form.reviews_count != null && form.reviews_count < 0) {
    errors.push("reviews_count no puede ser negativo");
  }
  if (form.photos_count != null && form.photos_count < 0) {
    errors.push("photos_count no puede ser negativo");
  }
  return errors;
}

export interface ClientPayload {
  name: string;
  category: string;
  city: string;
  contact: Record<string, unknown>;
  website_url: string | null;
  source: "manual";
  presence_data: PresenceData;
}

// Puente form -> fila de clients. Solo deriva las dimensiones de presence_data
// para las que el formulario aporta señal; el resto quedan ausentes (=> el scoring
// las marca "datos insuficientes", nunca 0 falso).
export function formToClient(form: IntakeForm): ClientPayload {
  const contact: Record<string, unknown> = { phone: form.phone };
  if (form.email?.trim()) contact.email = form.email.trim();
  if (form.address?.trim()) contact.address = form.address.trim();

  const presence_data: PresenceData = {};
  if (form.has_maps_listing) {
    presence_data.gbp = {
      has_hours: !!form.hours?.trim(),
      has_category: !!form.maps_category?.trim(),
      has_phone: !!form.phone?.trim(),
      ...(form.photos_count != null ? { photos_count: form.photos_count } : {}),
    };
    if (form.reviews_count != null) {
      presence_data.reviews = {
        count: form.reviews_count,
        ...(form.reviews_avg != null ? { avg_rating: form.reviews_avg } : {}),
      };
    }
  }
  if (form.social_urls && form.social_urls.length > 0) {
    presence_data.social = { profiles_count: form.social_urls.length };
  }

  return {
    name: form.business_name.trim(),
    category: form.niche.trim(),
    city: form.service_area.trim(),
    contact,
    website_url: form.has_website ? (form.website_url?.trim() ?? null) : null,
    source: "manual",
    presence_data,
  };
}
