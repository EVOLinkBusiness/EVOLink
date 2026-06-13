import { assertEquals } from "jsr:@std/assert";
import { formToClient, type IntakeForm, validateForm } from "./form.ts";

const minimal: IntakeForm = {
  business_name: "Mudanzas Roy",
  niche: "mudanzas",
  service_area: "Madrid",
  phone: "600123456",
  has_website: false,
  has_maps_listing: false,
};

Deno.test("validateForm: formulario mínimo válido => sin errores", () => {
  assertEquals(validateForm(minimal), []);
});

Deno.test("validateForm: falta un obligatorio => error que lo nombra", () => {
  const f = { ...minimal, business_name: "" };
  const errors = validateForm(f);
  assertEquals(errors.some((e) => e.includes("business_name")), true);
});

Deno.test("validateForm: has_website sin URL => error", () => {
  const f: IntakeForm = { ...minimal, has_website: true };
  const errors = validateForm(f);
  assertEquals(errors.some((e) => e.includes("website_url")), true);
});

Deno.test("validateForm: has_maps_listing sin URL ni captura no es obligatorio", () => {
  // El anexo §3 permite "URL o captura"; la captura llega aparte, así que la URL no es obligatoria.
  const f: IntakeForm = { ...minimal, has_maps_listing: true };
  assertEquals(validateForm(f), []);
});

Deno.test("validateForm: reviews_avg fuera de 1-5 => error", () => {
  const f: IntakeForm = { ...minimal, reviews_avg: 7 };
  const errors = validateForm(f);
  assertEquals(errors.some((e) => e.includes("reviews_avg")), true);
});

Deno.test("formToClient: mapea obligatorios a columnas de clients", () => {
  const c = formToClient({
    ...minimal,
    has_website: true,
    website_url: "https://ejemplo.es",
    email: "hola@ejemplo.es",
  });
  assertEquals(c.name, "Mudanzas Roy");
  assertEquals(c.category, "mudanzas");
  assertEquals(c.city, "Madrid");
  assertEquals(c.website_url, "https://ejemplo.es");
  assertEquals((c.contact as Record<string, unknown>).phone, "600123456");
  assertEquals((c.contact as Record<string, unknown>).email, "hola@ejemplo.es");
  assertEquals(c.source, "manual");
});

Deno.test("formToClient: sin web => website_url null aunque venga URL", () => {
  const c = formToClient({ ...minimal, has_website: false, website_url: "https://x.es" });
  assertEquals(c.website_url, null);
});

Deno.test("formToClient: con ficha Maps + datos => presence_data.gbp poblado", () => {
  const c = formToClient({
    ...minimal,
    has_maps_listing: true,
    hours: "L-V 9-18",
    photos_count: 8,
    maps_category: "Empresa de mudanzas",
    reviews_count: 42,
    reviews_avg: 4.6,
    social_urls: ["https://facebook.com/x", "https://instagram.com/x"],
  });
  const p = c.presence_data;
  assertEquals(p.gbp?.has_hours, true);
  assertEquals(p.gbp?.photos_count, 8);
  assertEquals(p.gbp?.has_category, true);
  assertEquals(p.gbp?.has_phone, true);
  assertEquals(p.reviews?.count, 42);
  assertEquals(p.reviews?.avg_rating, 4.6);
  assertEquals(p.social?.profiles_count, 2);
});

Deno.test("formToClient: sin ficha Maps => presence_data sin gbp (será 'sin ficha')", () => {
  const c = formToClient(minimal);
  assertEquals(c.presence_data.gbp, undefined);
  assertEquals(c.presence_data.reviews, undefined);
});
