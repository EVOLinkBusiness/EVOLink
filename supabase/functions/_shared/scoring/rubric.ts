import {
  type DimensionKey,
  type PresenceData,
  type ScoringResult,
  type Subscores,
  WEIGHTS,
} from "./types.ts";

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function scoreGbp(d: PresenceData["gbp"]): number | null {
  if (!d || Object.keys(d).length === 0) return null;
  const signals = [
    d.has_hours === true,
    (d.photos_count ?? 0) >= 3,
    d.has_category === true,
    d.has_description === true,
    d.has_phone === true,
  ];
  return clamp((signals.filter(Boolean).length / signals.length) * 100);
}

export function scoreReviews(d: PresenceData["reviews"]): number | null {
  if (!d || d.count === undefined) return null;
  const volume = Math.min(d.count, 50) / 50 * 50; // hasta 50 pts
  const rating = d.avg_rating ? ((d.avg_rating - 1) / 4) * 30 : 0; // hasta 30 pts
  const months = d.last_review_months_ago;
  const recency = months === undefined ? 0 : months <= 3 ? 20 : months <= 12 ? 10 : 0;
  return clamp(volume + rating + recency);
}

export function scoreMaps(d: PresenceData["maps_visibility"]): number | null {
  if (!d || d.position === undefined) return null;
  return clamp(100 - (d.position - 1) * 15); // pos 1=100, 2=85, ... 7+=0
}

export function scoreOpportunity(d: PresenceData["opportunity"]): number | null {
  // Negocio SIN web: a mayor volumen de búsqueda del sector, mayor pérdida => menor score
  if (!d || d.search_volume === undefined) return null;
  const base = { low: 60, medium: 30, high: 10 }[d.search_volume];
  const pressure = Math.min(d.competitors_with_web ?? 0, 5) * 2; // competencia con web agrava
  return clamp(base - pressure);
}

export function scoreNap(d: PresenceData["nap"]): number | null {
  if (!d || !d.total_listings) return null;
  return clamp(((d.consistent_listings ?? 0) / d.total_listings) * 100);
}

export function scoreSocial(d: PresenceData["social"]): number | null {
  if (!d || d.profiles_count === undefined) return null;
  let s = d.profiles_count > 0 ? 40 : 0;
  if (d.active) s += 40;
  if (d.has_contact_link) s += 20;
  return clamp(s);
}

export function scoreLocalSeo(d: PresenceData["local_seo"]): number | null {
  if (!d || !d.keywords_checked) return null;
  return clamp(((d.appears_for_keywords ?? 0) / d.keywords_checked) * 100);
}

const SCORERS: Record<DimensionKey, (p: PresenceData) => number | null> = {
  gbp: (p) => scoreGbp(p.gbp),
  reviews: (p) => scoreReviews(p.reviews),
  maps_visibility: (p) => scoreMaps(p.maps_visibility),
  opportunity: (p) => scoreOpportunity(p.opportunity),
  nap: (p) => scoreNap(p.nap),
  social: (p) => scoreSocial(p.social),
  local_seo: (p) => scoreLocalSeo(p.local_seo),
};

export function computeScoring(presence: PresenceData): ScoringResult {
  const subscores = {} as Subscores;
  const insufficient: DimensionKey[] = [];
  let weighted = 0;
  let totalWeight = 0;

  for (const key of Object.keys(SCORERS) as DimensionKey[]) {
    const s = SCORERS[key](presence);
    subscores[key] = s;
    if (s === null) {
      insufficient.push(key);
    } else {
      weighted += s * WEIGHTS[key];
      totalWeight += WEIGHTS[key];
    }
  }
  return {
    subscores,
    overall: totalWeight > 0 ? clamp(weighted / totalWeight) : null,
    insufficient,
  };
}
