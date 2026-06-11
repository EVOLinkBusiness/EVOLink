import { assertAlmostEquals, assertEquals } from "jsr:@std/assert";
import { computeScoring, scoreGbp, scoreNap, scoreReviews } from "./rubric.ts";

Deno.test("scoreGbp: perfil completo = 100", () => {
  assertEquals(
    scoreGbp({
      has_hours: true,
      photos_count: 5,
      has_category: true,
      has_description: true,
      has_phone: true,
    }),
    100,
  );
});

Deno.test("scoreGbp: sin datos => null (datos insuficientes)", () => {
  assertEquals(scoreGbp(undefined), null);
});

Deno.test("scoreGbp: 2 de 5 señales = 40", () => {
  assertEquals(scoreGbp({ has_hours: true, has_phone: true }), 40);
});

Deno.test("scoreReviews: muchas reseñas, nota alta, recientes => alto", () => {
  const s = scoreReviews({ count: 60, avg_rating: 4.8, last_review_months_ago: 1 });
  assertEquals(s !== null && s >= 90, true);
});

Deno.test("scoreReviews: sin datos => null", () => {
  assertEquals(scoreReviews(undefined), null);
});

Deno.test("scoreNap: 3 de 4 listados coherentes = 75", () => {
  assertEquals(scoreNap({ consistent_listings: 3, total_listings: 4 }), 75);
});

Deno.test("computeScoring: dimensión faltante se excluye y renormaliza", () => {
  // Solo gbp (peso .20) y reviews (peso .20) presentes, ambos = 100
  const r = computeScoring({
    gbp: {
      has_hours: true,
      photos_count: 5,
      has_category: true,
      has_description: true,
      has_phone: true,
    },
    reviews: { count: 60, avg_rating: 5, last_review_months_ago: 1 },
  });
  assertEquals(r.subscores.nap, null);
  assertEquals(r.insufficient.includes("nap"), true);
  // renormalizado: (100*.2 + 100*.2) / (.2+.2) = 100, no 40
  assertAlmostEquals(r.overall!, 100, 1);
});

Deno.test("computeScoring: sin ningún dato => overall null", () => {
  const r = computeScoring({});
  assertEquals(r.overall, null);
  assertEquals(r.insufficient.length, 7);
});
