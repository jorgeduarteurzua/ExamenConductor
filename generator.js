// Generador de preguntas por plantillas paramétricas.
// Cada plantilla produce preguntas con respuesta correcta garantizada por código,
// con su campo "dificultad". Se usan para complementar el banco curado y llegar a 500.
//
// Determinista: usa una semilla simple para que, a igualdad de parámetros,
// las preguntas generadas sean estables (útil para pruebas y para no duplicar ids).

(function () {
  "use strict";

  // Mezcla las opciones de una pregunta devolviendo el índice correcto actualizado.
  function mezclarOpciones(opciones, correctaIdx, rnd) {
    const idx = opciones.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return {
      opciones: idx.map((i) => opciones[i]),
      correcta: idx.indexOf(correctaIdx),
    };
  }

  // PRNG determinista (mulberry32)
  function crearRnd(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Genera distractores numéricos cercanos a "correcto", en el mismo formato.
  function distractoresNum(correcto, paso, formato) {
    const vals = new Set([correcto]);
    const candidatos = [correcto - paso, correcto + paso, correcto + 2 * paso, correcto - 2 * paso];
    const out = [];
    for (const c of candidatos) {
      if (c > 0 && !vals.has(c) && out.length < 3) { vals.add(c); out.push(c); }
    }
    while (out.length < 3) { out.push(correcto + (out.length + 3) * paso); }
    return out.map(formato);
  }

  // ---- Plantillas ----
  // Cada plantilla recibe (i, rnd) y devuelve una pregunta sin id.

  // 1. Señal de límite de velocidad con distintos valores
  function tplLimite(valor, dificultad) {
    const correcto = `Límite máximo de ${valor} km/h`;
    const opciones = [
      correcto,
      `Velocidad mínima de ${valor} km/h`,
      `Ruta número ${valor}`,
      `${valor} metros hasta el próximo cruce`,
    ];
    return {
      tema: "Señales",
      texto: "¿Qué significa la señal de la imagen?",
      _opc: opciones, _ok: 0,
      dificultad,
      imagen: { tipo: "svg", nombre: "limite", valor: String(valor) },
    };
  }

  // 2. Exceso de velocidad respecto a un límite señalizado
  function tplExceso(limite, actual, dificultad) {
    const excede = actual > limite;
    const correcto = excede
      ? "Comete una infracción por exceso de velocidad"
      : "Circula dentro del límite permitido";
    const opciones = [
      correcto,
      excede ? "Circula dentro del límite permitido" : "Comete una infracción por exceso de velocidad",
      "La señal no aplica a su vehículo",
      "Debe detenerse de inmediato",
    ];
    return {
      tema: "Normas",
      texto: `La señal indica un máximo de ${limite} km/h y usted circula a ${actual} km/h. Entonces:`,
      _opc: opciones, _ok: 0,
      dificultad,
      imagen: { tipo: "svg", nombre: "limite", valor: String(limite) },
    };
  }

  // 3. Distancia de frenado aproximada según velocidad (crece ~con el cuadrado)
  function tplFrenado(velocidad, dificultad) {
    // Aproximación didáctica: a 50 km/h ~25 m; escala con el cuadrado de la velocidad.
    const dist = Math.round(25 * Math.pow(velocidad / 50, 2) / 5) * 5;
    const opciones = [String(dist) + " metros", ...distractoresNum(dist, 15, (v) => v + " metros")];
    return {
      tema: "Conducción segura",
      texto: `En pavimento bueno y seco, la distancia aproximada para detenerse a ${velocidad} km/h es de alrededor de:`,
      _opc: opciones, _ok: 0,
      dificultad,
      imagen: { tipo: "svg", nombre: "frenado" },
    };
  }

  // 4. Prioridad en cruce (quién pasa)
  function tplPrioridad(dificultad) {
    const correcto = "El vehículo que viene por la derecha";
    const opciones = [correcto, "El vehículo que viene por la izquierda", "El vehículo más grande", "El vehículo más veloz"];
    return {
      tema: "Normas",
      texto: "En un cruce sin señalización ni semáforo, entre dos vehículos tiene preferencia:",
      _opc: opciones, _ok: 0,
      dificultad,
    };
  }

  // 5. Significado de señales conocidas (banco de pares)
  const SENALES = [
    { nombre: "pare", correcto: "Detención obligatoria (PARE)", malas: ["Ceda el paso", "Prohibido estacionar", "Velocidad mínima"] },
    { nombre: "ceda", correcto: "Ceda el paso", malas: ["Detención obligatoria", "No entrar", "Vía preferente"] },
    { nombre: "noAdelantar", correcto: "Prohibido adelantar", malas: ["Prohibido estacionar", "Velocidad máxima", "Doble sentido"] },
    { nombre: "prohibido", correcto: "Indica una prohibición", malas: ["Indica una obligación", "Es informativa", "Da preferencia"] },
    { nombre: "advertencia", correcto: "Advierte un peligro; conduzca con precaución", malas: ["Es una prohibición", "Indica un servicio", "Da preferencia de paso"] },
    { nombre: "peatonal", correcto: "Zona o cruce de peatones", malas: ["Prohibido el paso de peatones", "Zona de estacionamiento", "Fin de zona urbana"] },
  ];
  function tplSenal(sel, dificultad) {
    const opciones = [sel.correcto, ...sel.malas];
    return {
      tema: "Señales",
      texto: "¿Qué significa la señal de la imagen?",
      _opc: opciones, _ok: 0,
      dificultad,
      imagen: { tipo: "svg", nombre: sel.nombre },
    };
  }

  // 6. Números de emergencia
  const EMERGENCIAS = [
    { ent: "Carabineros", num: "133", malas: ["131", "132", "134"] },
    { ent: "Bomberos", num: "132", malas: ["131", "133", "135"] },
    { ent: "SAMU (ambulancia)", num: "131", malas: ["132", "133", "130"] },
  ];
  function tplEmergencia(e, dificultad) {
    const opciones = [e.num, ...e.malas];
    return {
      tema: "Emergencias",
      texto: `En Chile, el número de ${e.ent} es:`,
      _opc: opciones, _ok: 0,
      dificultad,
    };
  }

  // 7. Verdadero concepto de conducción segura (pares concepto/acción)
  const SEGURA = [
    { t: "En carretera, la distancia (en metros) con el vehículo de adelante debería ser equivalente a:", ok: "Lo que marca el velocímetro en km/h (la mitad en ciudad)", malas: ["1 metro fijo", "El número de autos que ves", "No es necesaria"] },
    { t: "En lluvia o pavimento mojado usted debe:", ok: "Reducir la velocidad y aumentar la distancia", malas: ["Mantener la velocidad", "Frenar fuerte en curvas", "Apagar las luces"] },
    { t: "Al bajar una pendiente larga, para cuidar los frenos conviene:", ok: "Usar el freno motor (marcha baja)", malas: ["Ir en punto muerto", "Frenar sin parar", "Apagar el motor"] },
    { t: "Ante somnolencia al conducir, lo correcto es:", ok: "Detenerse en lugar seguro y descansar", malas: ["Subir la música y seguir", "Acelerar para llegar antes", "Beber alcohol"] },
    { t: "La conducción a la defensiva consiste en:", ok: "Anticiparse a los errores de otros y evitar riesgos", malas: ["Conducir agresivo", "Ir al límite de velocidad", "Confiar en los demás"] },
    { t: "El punto ciego es:", ok: "Una zona que no se ve directamente ni por los espejos", malas: ["El centro del parabrisas", "La zona de los faros", "El tablero"] },
    { t: "Antes de abrir la puerta del auto hacia la calle debe:", ok: "Verificar que no vengan ciclistas ni vehículos", malas: ["Abrir rápido", "Tocar la bocina", "Encender luces altas"] },
    { t: "En neblina densa conviene usar:", ok: "Luces bajas o antiniebla y reducir la velocidad", malas: ["Luces altas", "Ninguna luz", "Solo las balizas"] },
  ];
  function tplSegura(s, dificultad) {
    return {
      tema: "Conducción segura",
      texto: s.t,
      _opc: [s.ok, ...s.malas], _ok: 0,
      dificultad,
    };
  }

  // 8. Normas variadas (pares)
  const NORMAS = [
    { t: "El cinturón de seguridad es obligatorio para:", ok: "Todos los ocupantes del vehículo", malas: ["Solo el conductor", "Solo adelante", "Solo en carretera"] },
    { t: "Adelantar se realiza, por regla general, por el lado:", ok: "Izquierdo", malas: ["Derecho", "Cualquiera", "La berma"] },
    { t: "El uso del celular en la mano al conducir está:", ok: "Prohibido", malas: ["Permitido en ciudad", "Permitido lento", "Permitido para textos"] },
    { t: "Frente a un vehículo de emergencia con sirena debe:", ok: "Cederle el paso y orillarse si es posible", malas: ["Acelerar", "Detenerse en el centro", "Ignorarlo"] },
    { t: "La velocidad máxima urbana general en Chile es:", ok: "50 km/h", malas: ["40 km/h", "60 km/h", "80 km/h"] },
    { t: "En una rotonda tiene preferencia:", ok: "Quien ya circula dentro de ella", malas: ["Quien va a entrar", "El más grande", "El más rápido"] },
  ];
  function tplNorma(n, dificultad) {
    return {
      tema: "Normas",
      texto: n.t,
      _opc: [n.ok, ...n.malas], _ok: 0,
      dificultad,
    };
  }

  // Preguntas conceptuales FÁCILES adicionales (enunciados únicos)
  const FACILES = [
    { t: "¿De qué color es la luz del semáforo que ordena detenerse?", ok: "Roja", malas: ["Verde", "Amarilla", "Azul"] },
    { t: "¿De qué color es la luz del semáforo que permite avanzar?", ok: "Verde", malas: ["Roja", "Amarilla", "Naranja"] },
    { t: "¿Para qué sirve el cinturón de seguridad?", ok: "Proteger a los ocupantes en caso de choque o frenada", malas: ["Para la comodidad", "Como adorno", "Para la radio"] },
    { t: "¿Qué forma tiene la señal PARE?", ok: "Octágono (ocho lados)", malas: ["Triángulo", "Círculo", "Cuadrado"] },
    { t: "¿Qué forma tiene la señal CEDA EL PASO?", ok: "Triángulo invertido", malas: ["Círculo", "Octágono", "Rombo"] },
    { t: "¿Dónde deben viajar los niños pequeños?", ok: "En el asiento trasero con sistema de retención", malas: ["En el asiento delantero", "En brazos", "De pie"] },
    { t: "¿Está permitido conducir usando el celular en la mano?", ok: "No, está prohibido", malas: ["Sí, siempre", "Sí, en ciudad", "Sí, despacio"] },
    { t: "¿Qué debe hacer al ver una luz amarilla en el semáforo?", ok: "Detenerse si puede hacerlo con seguridad", malas: ["Acelerar al máximo", "Tocar la bocina", "Retroceder"] },
    { t: "¿Quién debe usar cinturón de seguridad en el vehículo?", ok: "Todos los ocupantes", malas: ["Solo el conductor", "Solo adelante", "Nadie"] },
    { t: "¿Qué color identifica a las señales de advertencia o peligro?", ok: "Amarillo", malas: ["Azul", "Verde", "Blanco"] },
    { t: "Antes de bajar del auto hacia la calle, ¿qué debe hacer?", ok: "Mirar que no vengan vehículos ni ciclistas", malas: ["Abrir rápido", "Tocar la bocina", "Nada"] },
    { t: "¿Qué significa una señal con fondo azul y una 'P'?", ok: "Estacionamiento permitido", malas: ["Prohibido estacionar", "Peaje", "Pare"] },
    { t: "¿Qué debe hacer un peatón con semáforo peatonal en rojo?", ok: "No cruzar", malas: ["Cruzar rápido", "Correr", "Cruzar igual"] },
    { t: "¿Qué luces se usan de noche en ciudad?", ok: "Luces bajas (de cruce)", malas: ["Luces altas siempre", "Ninguna", "Solo las balizas"] },
    { t: "¿Qué debe hacer frente a un paso de peatones con gente cruzando?", ok: "Detenerse y cederles el paso", malas: ["Acelerar", "Tocar la bocina", "Pasar entre ellos"] },
    { t: "¿Es obligatorio portar la licencia de conducir vigente?", ok: "Sí", malas: ["No", "Solo de noche", "Solo en carretera"] },
    { t: "¿Qué indica una línea continua en el centro de la calzada?", ok: "Prohibido adelantar o cruzarla", malas: ["Se puede adelantar", "Es decorativa", "Se puede estacionar"] },
    { t: "¿Qué debe hacer si viene una ambulancia con sirena?", ok: "Cederle el paso", malas: ["Acelerar", "Detenerse en el centro", "Ignorarla"] },
    { t: "¿Beber alcohol antes de conducir es seguro?", ok: "No, disminuye los reflejos", malas: ["Sí, en poca cantidad", "Sí, mejora el ánimo", "Sí, de día"] },
    { t: "¿Cuál es la velocidad máxima urbana general en Chile?", ok: "50 km/h", malas: ["30 km/h", "70 km/h", "90 km/h"] },
  ];
  function tplFacil(f) {
    return { tema: "Conceptos básicos", texto: f.t, _opc: [f.ok, ...f.malas], _ok: 0, dificultad: "facil" };
  }

  // Preguntas DIFÍCILES adicionales (matices, situaciones y legales; enunciados únicos)
  const DIFICILES = [
    { t: "La alcoholemia que configura 'conducir en estado de ebriedad' es igual o superior a:", ok: "0,8 g/L", malas: ["0,3 g/L", "0,5 g/L", "0,2 g/L"] },
    { t: "El rango de 'conducción bajo la influencia del alcohol' va de:", ok: "0,3 a 0,79 g/L", malas: ["0,0 a 0,2 g/L", "0,8 a 1,0 g/L", "más de 1,0 g/L"] },
    { t: "Negarse al examen de alcoholemia solicitado por la autoridad:", ok: "Constituye una infracción sancionable", malas: ["No tiene consecuencias", "Es un derecho", "Solo aplica de noche"] },
    { t: "La distancia total de detención del vehículo se compone de:", ok: "Distancia de reacción más distancia de frenado", malas: ["Solo la de frenado", "Solo la de reacción", "La velocidad del viento"] },
    { t: "Al duplicar la velocidad, la distancia de frenado aproximadamente:", ok: "Se cuadruplica", malas: ["Se duplica", "No cambia", "Disminuye"] },
    { t: "En un cruce de igual categoría, si otro vehículo llega a su derecha al mismo tiempo:", ok: "Usted debe cederle el paso", malas: ["Usted tiene preferencia", "Pasa el más grande", "Pasan juntos"] },
    { t: "Al bajar una cuesta prolongada, para no recalentar los frenos conviene:", ok: "Usar freno motor con una marcha baja", malas: ["Ir en punto muerto", "Frenar continuamente", "Apagar el motor"] },
    { t: "Si pierde adherencia por una capa de agua (aquaplaning), lo correcto es:", ok: "Soltar el acelerador, mantener firme el volante y no frenar bruscamente", malas: ["Frenar fuerte", "Girar de golpe", "Acelerar"] },
    { t: "Darse a la fuga tras un accidente con lesionados:", ok: "Es una infracción grave con consecuencias legales", malas: ["No es falta", "Es correcto si hay apuro", "Solo si hay daños menores"] },
    { t: "Un conductor que sale de un estacionamiento hacia la vía:", ok: "Debe ceder el paso a vehículos y peatones que circulan", malas: ["Tiene preferencia", "Puede salir tocando bocina", "Debe acelerar"] },
    { t: "La carga que sobresale del vehículo:", ok: "Debe ir asegurada y debidamente señalizada", malas: ["Puede ir suelta", "No importa", "Solo se señaliza de noche"] },
    { t: "Al enfrentar un 'ceda el paso' sin vehículos en la vía preferente, usted:", ok: "Puede continuar sin detenerse, cediendo si fuese necesario", malas: ["Debe detenerse siempre", "Debe retroceder", "Debe tocar bocina"] },
    { t: "Para ingresar a una autopista por la pista de aceleración debe:", ok: "Adaptar su velocidad al flujo y ceder a quienes circulan", malas: ["Detenerse al final", "Entrar sin mirar", "Ir muy lento"] },
    { t: "Si acumula infracciones graves o gravísimas, puede ocurrir que:", ok: "Se suspenda o cancele su licencia", malas: ["Reciba un premio", "No pase nada", "Le den un descuento"] },
    { t: "El café o una ducha fría tras beber alcohol:", ok: "No reducen la alcoholemia; solo el tiempo lo hace", malas: ["Eliminan el alcohol", "Permiten conducir seguro", "Aumentan reflejos"] },
    { t: "Al estacionar en una pendiente cuesta abajo, las ruedas delanteras deben quedar:", ok: "Giradas hacia la cuneta, con freno de mano puesto", malas: ["Hacia el centro de la calle", "Rectas", "Hacia arriba"] },
    { t: "Usar manos libres para hablar por teléfono al conducir:", ok: "Sigue siendo una distracción; lo seguro es evitarlo", malas: ["Es 100% seguro", "Mejora la atención", "Es obligatorio"] },
    { t: "Está prohibido adelantar, entre otros lugares, en:", ok: "Curvas, puentes, cruces y zonas con línea continua", malas: ["Rectas despejadas", "Autopistas", "En ningún lugar"] },
  ];
  function tplDificil(d) {
    return { tema: "Normas", texto: d.t, _opc: [d.ok, ...d.malas], _ok: 0, dificultad: "dificil" };
  }

  // Construye el conjunto completo de "recetas" de preguntas (sin mezclar aún).
  function recetas() {
    const out = [];

    // Conceptuales fáciles y difíciles (enunciados únicos adicionales)
    FACILES.forEach((f) => out.push(tplFacil(f)));
    DIFICILES.forEach((d) => out.push(tplDificil(d)));

    // Límites de velocidad (varios valores) -> fácil/media
    [30, 40, 50, 60, 70, 80, 90, 100, 110, 120].forEach((v, k) => {
      out.push(tplLimite(v, k < 4 ? "facil" : "media"));
    });

    // Exceso de velocidad -> media/difícil
    const paresExceso = [[50, 70], [60, 60], [100, 90], [40, 55], [120, 130], [60, 80], [50, 45], [80, 100]];
    paresExceso.forEach((p, k) => out.push(tplExceso(p[0], p[1], k % 3 === 0 ? "dificil" : "media")));

    // Distancia de frenado -> difícil (requiere razonar)
    [30, 40, 50, 60, 70, 80, 90, 100, 110, 120].forEach((v) => out.push(tplFrenado(v, "dificil")));

    // Prioridad -> media (varias instancias con contexto distinto no aporta, 1 base)
    out.push(tplPrioridad("media"));

    // Señales conocidas -> fácil (muy repetible, aporta volumen con imágenes)
    SENALES.forEach((s) => out.push(tplSenal(s, "facil")));

    // Emergencias -> fácil
    EMERGENCIAS.forEach((e) => out.push(tplEmergencia(e, "facil")));

    // Conducción segura y normas -> media
    SEGURA.forEach((s) => out.push(tplSegura(s, "media")));
    NORMAS.forEach((n) => out.push(tplNorma(n, "media")));

    return out;
  }

  // Genera "cantidad" preguntas con ids a partir de idInicial.
  // Rellena repitiendo plantillas con variación de orden de opciones (mezcla),
  // de modo que no haya dos preguntas idénticas consecutivas.
  function generar(cantidad, idInicial) {
    const base = recetas();
    const preguntas = [];
    let id = idInicial;

    // Primera pasada: todas las recetas una vez.
    // Siguientes pasadas: se repiten con distinta mezcla de opciones.
    let pasada = 0;
    while (preguntas.length < cantidad) {
      for (let b = 0; b < base.length && preguntas.length < cantidad; b++) {
        const receta = base[b];
        const rnd = crearRnd(id * 2654435761 + pasada * 40503 + b);
        const mez = mezclarOpciones(receta._opc, receta._ok, rnd);
        preguntas.push({
          id: id++,
          tema: receta.tema,
          texto: receta.texto,
          opciones: mez.opciones,
          correcta: mez.correcta,
          dificultad: receta.dificultad,
          imagen: receta.imagen || null,
          _generada: true,
        });
      }
      pasada++;
      if (pasada > 100) break; // salvaguarda
    }
    return preguntas.slice(0, cantidad);
  }

  const GENERATOR = { generar, recetas };

  if (typeof window !== "undefined") {
    window.GENERATOR = GENERATOR;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = GENERATOR;
  }
})();
