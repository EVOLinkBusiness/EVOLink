// Datos manuales de presencia digital (spec §6). Todo opcional:
// campo ausente => dimensión "datos insuficientes" (null), nunca 0 falso.
export interface PresenceData {
  gbp?: {
    has_hours?: boolean;
    photos_count?: number;
    has_category?: boolean;
    has_description?: boolean;
    has_phone?: boolean;
  };
  reviews?: {
    count?: number;
    avg_rating?: number; // 1-5
    last_review_months_ago?: number;
  };
  maps_visibility?: {
    position?: number; // posición percibida 1..N vs competidores
  };
  opportunity?: {
    search_volume?: "low" | "medium" | "high"; // volumen estimado del sector
    competitors_with_web?: number;
  };
  nap?: {
    consistent_listings?: number;
    total_listings?: number;
  };
  social?: {
    profiles_count?: number;
    active?: boolean;
    has_contact_link?: boolean;
  };
  local_seo?: {
    appears_for_keywords?: number;
    keywords_checked?: number;
  };
}

export type DimensionKey =
  | "gbp" | "reviews" | "maps_visibility" | "opportunity"
  | "nap" | "social" | "local_seo";

// Pesos v1 (spec §6) — constantes en código, ajustables vía CHANGELOG del bloque
export const WEIGHTS: Record<DimensionKey, number> = {
  gbp: 0.20,
  reviews: 0.20,
  maps_visibility: 0.15,
  opportunity: 0.25,
  nap: 0.10,
  social: 0.05,
  local_seo: 0.05,
};

// null = datos insuficientes (se excluye del peso y se renormaliza)
export type Subscores = Record<DimensionKey, number | null>;

export interface ScoringResult {
  subscores: Subscores;
  overall: number | null; // null si TODAS las dimensiones son insuficientes
  insufficient: DimensionKey[];
}
