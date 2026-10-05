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

  // ====== SEÑALES ADICIONALES ======

  // Base de señal reglamentaria circular (círculo blanco, borde rojo).
  function circuloReglamentario(inner, titulo) {
    return wrap(
      `<rect width="200" height="200" fill="#f1f5f9"/>` +
      `<circle cx="100" cy="100" r="80" fill="#ffffff" stroke="#d32f2f" stroke-width="14"/>` +
      inner,
      titulo
    );
  }

  // Base de señal de advertencia (rombo amarillo, borde negro) - estándar chileno.
  function romboAdvertencia(inner, titulo) {
    return wrap(
      `<rect width="200" height="200" fill="#f1f5f9"/>` +
      `<polygon points="100,16 184,100 100,184 16,100" fill="#ffd600" stroke="#111" stroke-width="7" stroke-linejoin="round"/>` +
      inner,
      titulo
    );
  }

  // Base de señal informativa (rectángulo azul).
  function rectInformativa(inner, titulo) {
    return wrap(
      `<rect width="200" height="200" fill="#f1f5f9"/>` +
      `<rect x="28" y="28" width="144" height="144" rx="12" fill="#1565c0"/>` +
      inner,
      titulo
    );
  }

  // NO ENTRAR / sentido prohibido (círculo rojo con barra blanca horizontal)
  function noEntrar() {
    return wrap(
      `<rect width="200" height="200" fill="#f1f5f9"/>` +
      `<circle cx="100" cy="100" r="80" fill="#d32f2f"/>` +
      `<rect x="52" y="88" width="96" height="24" rx="3" fill="#ffffff"/>`,
      "Señal No entrar"
    );
  }

  // Prohibido estacionar (círculo rojo, barra diagonal, letra E tachada)
  function noEstacionar() {
    return circuloReglamentario(
      `<line x1="48" y1="48" x2="152" y2="152" stroke="#d32f2f" stroke-width="14"/>` +
      `<text x="100" y="100" font-family="Arial, sans-serif" font-size="72" font-weight="700" ` +
      `fill="#111" text-anchor="middle" dominant-baseline="central">E</text>`,
      "Señal No estacionar"
    );
  }

  // Prohibido virar a la izquierda (flecha a la izquierda tachada)
  function noVirarIzq() {
    return circuloReglamentario(
      `<path d="M120 70 L80 70 L80 50 L52 85 L80 120 L80 100 L120 100 Z" fill="#111"/>` +
      `<line x1="48" y1="48" x2="152" y2="152" stroke="#d32f2f" stroke-width="14"/>`,
      "Señal No virar a la izquierda"
    );
  }

  // Prohibido el paso de peatones (peatón tachado)
  function noPeatones() {
    return circuloReglamentario(
      `<circle cx="100" cy="66" r="12" fill="#111"/>` +
      `<path d="M100 80 L100 128 M100 92 L80 110 M100 92 L120 110 M100 128 L84 162 M100 128 L118 162" ` +
      `stroke="#111" stroke-width="8" fill="none" stroke-linecap="round"/>` +
      `<line x1="48" y1="48" x2="152" y2="152" stroke="#d32f2f" stroke-width="14"/>`,
      "Señal Prohibido el paso de peatones"
    );
  }

  // Advertencia: curva pronunciada a la derecha
  function curvaDerecha() {
    return romboAdvertencia(
      `<path d="M85 150 L85 95 Q85 70 112 70 L120 70" stroke="#111" stroke-width="12" fill="none" stroke-linecap="round"/>` +
      `<polygon points="112,52 140,70 112,88" fill="#111"/>`,
      "Señal Curva a la derecha"
    );
  }

  // Advertencia: niños / zona escolar (dos figuras)
  function ninos() {
    return romboAdvertencia(
      `<circle cx="84" cy="72" r="9" fill="#111"/>` +
      `<path d="M84 82 L84 118 M84 92 L72 104 M84 92 L96 104 M84 118 L74 148 M84 118 L94 148" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/>` +
      `<circle cx="116" cy="78" r="8" fill="#111"/>` +
      `<path d="M116 87 L116 118 M116 96 L106 106 M116 96 L126 106 M116 118 L108 145 M116 118 L124 145" stroke="#111" stroke-width="6" fill="none" stroke-linecap="round"/>`,
      "Señal Niños / zona escolar"
    );
  }

  // Advertencia: animales en el camino (silueta simplificada de vacuno)
  function animales() {
    return romboAdvertencia(
      `<path d="M60 118 L60 96 Q60 86 72 86 L120 86 Q134 86 138 74 L142 78 Q140 92 128 96 L128 118 L120 118 L120 100 L84 100 L84 118 Z" fill="#111"/>` +
      `<path d="M138 74 Q146 70 150 76" stroke="#111" stroke-width="5" fill="none"/>`,
      "Señal Animales en el camino"
    );
  }

  // Advertencia: badén / resalto (lomo de toro)
  function baden() {
    return romboAdvertencia(
      `<rect x="56" y="118" width="88" height="8" fill="#111"/>` +
      `<path d="M72 118 Q100 86 128 118 Z" fill="#111"/>`,
      "Señal Badén o resalto"
    );
  }

  // Advertencia: semáforo adelante
  function semaforoAdelante() {
    return romboAdvertencia(
      `<rect x="86" y="58" width="28" height="70" rx="6" fill="#111"/>` +
      `<circle cx="100" cy="72" r="6" fill="#d32f2f"/>` +
      `<circle cx="100" cy="92" r="6" fill="#ffd600"/>` +
      `<circle cx="100" cy="112" r="6" fill="#16a34a"/>`,
      "Señal Semáforo adelante"
    );
  }

  // Advertencia: intersección / cruce (cruz)
  function cruce() {
    return romboAdvertencia(
      `<rect x="92" y="58" width="16" height="84" fill="#111"/>` +
      `<rect x="58" y="92" width="84" height="16" fill="#111"/>`,
      "Señal Cruce / intersección"
    );
  }

  // Informativa: hospital (cruz blanca sobre azul)
  function hospital() {
    return rectInformativa(
      `<rect x="88" y="56" width="24" height="88" fill="#fff"/>` +
      `<rect x="56" y="88" width="88" height="24" fill="#fff"/>`,
      "Señal Hospital"
    );
  }

  // Informativa: estacionamiento permitido (P blanca sobre azul)
  function estacionamiento() {
    return rectInformativa(
      `<text x="100" y="104" font-family="Arial, sans-serif" font-size="104" font-weight="700" ` +
      `fill="#fff" text-anchor="middle" dominant-baseline="central">P</text>`,
      "Señal Estacionamiento"
    );
  }

  // Obligación: sentido obligatorio (flecha blanca sobre círculo azul)
  function sentidoObligatorio() {
    return wrap(
      `<rect width="200" height="200" fill="#f1f5f9"/>` +
      `<circle cx="100" cy="100" r="80" fill="#1565c0"/>` +
      `<path d="M100 54 L128 100 L112 100 L112 146 L88 146 L88 100 L72 100 Z" fill="#fff"/>`,
      "Señal Sentido obligatorio (siga derecho)"
    );
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
    // nuevas
    noEntrar: noEntrar,
    noEstacionar: noEstacionar,
    noVirarIzq: noVirarIzq,
    noPeatones: noPeatones,
    curvaDerecha: curvaDerecha,
    ninos: ninos,
    animales: animales,
    baden: baden,
    semaforoAdelante: semaforoAdelante,
    cruce: cruce,
    hospital: hospital,
    estacionamiento: estacionamiento,
    sentidoObligatorio: sentidoObligatorio,
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
