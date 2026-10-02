// Generador de señales de tránsito e ilustraciones como SVG inline.
// No depende de archivos externos ni de internet.
// Uso: SIGNS["pare"]() devuelve un string SVG.
// En las preguntas se referencia con imagen: { tipo: "svg", nombre: "pare" }
// o imagen con texto dinámico: { tipo: "svg", nombre: "limite", valor: "100" }

(function () {
  "use strict";

  function wrap(inner, titulo) {
    return (
      `<svg viewBox="0 0 200 200" role="img" aria-label="${titulo || "señal de tránsito"}" ` +
      `xmlns="http://www.w3.org/2000/svg">${inner}</svg>`
    );
  }

  // Señal reglamentaria de límite de velocidad (círculo rojo, número negro)
  function limiteVelocidad(valor) {
    const num = valor != null ? String(valor) : "60";
    return wrap(
      `<rect width="200" height="200" fill="#f1f5f9"/>` +
      `<circle cx="100" cy="100" r="80" fill="#ffffff" stroke="#d32f2f" stroke-width="16"/>` +
      `<text x="100" y="100" font-family="Arial, sans-serif" font-size="${num.length > 2 ? 62 : 74}" ` +
      `font-weight="700" fill="#111" text-anchor="middle" dominant-baseline="central">${num}</text>`,
      "Límite de velocidad " + num
    );
  }

  // Señal PARE (octágono rojo)
  function pare() {
    const pts = octagono(100, 100, 88);
    return wrap(
      `<rect width="200" height="200" fill="#f1f5f9"/>` +
      `<polygon points="${pts}" fill="#d32f2f" stroke="#ffffff" stroke-width="8"/>` +
      `<text x="100" y="100" font-family="Arial, sans-serif" font-size="46" font-weight="700" ` +
      `fill="#ffffff" text-anchor="middle" dominant-baseline="central">PARE</text>`,
      "Señal PARE"
    );
  }

  // Señal CEDA EL PASO (triángulo invertido, borde rojo)
  function ceda() {
    return wrap(
      `<rect width="200" height="200" fill="#f1f5f9"/>` +
      `<polygon points="20,45 180,45 100,180" fill="#ffffff" stroke="#d32f2f" stroke-width="16"/>`,
      "Señal Ceda el paso"
    );
  }

  // Señal NO ADELANTAR (dos autos, rojo y negro, círculo rojo)
  function noAdelantar() {
    return wrap(
      `<rect width="200" height="200" fill="#f1f5f9"/>` +
      `<circle cx="100" cy="100" r="80" fill="#ffffff" stroke="#d32f2f" stroke-width="14"/>` +
      `<rect x="62" y="70" width="28" height="52" rx="6" fill="#d32f2f"/>` +
      `<rect x="110" y="70" width="28" height="52" rx="6" fill="#111"/>`,
      "Señal No adelantar"
    );
  }

  // Señal de prohibido (círculo rojo con barra diagonal)
  function prohibido() {
    return wrap(
      `<rect width="200" height="200" fill="#f1f5f9"/>` +
      `<circle cx="100" cy="100" r="80" fill="#ffffff" stroke="#d32f2f" stroke-width="16"/>` +
      `<line x1="44" y1="44" x2="156" y2="156" stroke="#d32f2f" stroke-width="16"/>`,
      "Señal de prohibición"
    );
  }

  // Señal de advertencia genérica (rombo/triángulo amarillo con signo !)
  function advertencia() {
    return wrap(
      `<rect width="200" height="200" fill="#f1f5f9"/>` +
      `<polygon points="100,24 176,170 24,170" fill="#ffd600" stroke="#111" stroke-width="8" stroke-linejoin="round"/>` +
      `<text x="100" y="118" font-family="Arial, sans-serif" font-size="86" font-weight="800" ` +
      `fill="#111" text-anchor="middle" dominant-baseline="central">!</text>`,
      "Señal de advertencia"
    );
  }

  // Cruce peatonal (señal informativa azul con peatón)
  function peatonal() {
    return wrap(
      `<rect width="200" height="200" fill="#f1f5f9"/>` +
      `<rect x="30" y="20" width="140" height="160" rx="12" fill="#1565c0"/>` +
      `<circle cx="100" cy="62" r="14" fill="#fff"/>` +
      `<path d="M100 76 L100 128 M100 90 L78 110 M100 90 L122 110 M100 128 L82 165 M100 128 L120 165" ` +
      `stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>`,
      "Señal cruce peatonal"
    );
  }

  // Ilustración de distancia de frenado (auto + línea con flechas)
  function frenado() {
    return wrap(
      `<rect width="200" height="200" fill="#1e293b"/>` +
      `<rect x="24" y="150" width="152" height="10" fill="#475569"/>` +
      `<rect x="30" y="104" width="70" height="34" rx="8" fill="#e11d48"/>` +
      `<rect x="44" y="92" width="40" height="22" rx="6" fill="#e11d48"/>` +
      `<circle cx="48" cy="142" r="12" fill="#111" stroke="#94a3b8" stroke-width="3"/>` +
      `<circle cx="88" cy="142" r="12" fill="#111" stroke="#94a3b8" stroke-width="3"/>` +
      `<line x1="110" y1="120" x2="170" y2="120" stroke="#38bdf8" stroke-width="5"/>` +
      `<polygon points="170,120 160,114 160,126" fill="#38bdf8"/>` +
      `<text x="140" y="106" font-family="Arial, sans-serif" font-size="16" fill="#e2e8f0" ` +
      `text-anchor="middle">frenado</text>`,
      "Distancia de frenado"
    );
  }

  function octagono(cx, cy, r) {
    const pts = [];
    for (let i = 0; i < 8; i++) {
      const ang = (Math.PI / 4) * i + Math.PI / 8;
      pts.push(`${(cx + r * Math.cos(ang)).toFixed(1)},${(cy + r * Math.sin(ang)).toFixed(1)}`);
    }
    return pts.join(" ");
  }

  const SIGNS = {
    limite: limiteVelocidad,
    pare: pare,
    ceda: ceda,
    noAdelantar: noAdelantar,
    prohibido: prohibido,
    advertencia: advertencia,
    peatonal: peatonal,
    frenado: frenado,
  };

  // Devuelve el string SVG para una definición de imagen de pregunta.
  function renderImagen(imagen) {
    if (!imagen || imagen.tipo !== "svg") return "";
    const fn = SIGNS[imagen.nombre];
    if (!fn) return "";
    return fn(imagen.valor);
  }

  if (typeof window !== "undefined") {
    window.SIGNS = SIGNS;
    window.renderImagen = renderImagen;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { SIGNS, renderImagen };
  }
})();
