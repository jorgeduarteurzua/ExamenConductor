// Lógica del simulador de examen Clase B (Chile)
// Reglas: 35 preguntas, 3 con doble puntuación (2 pts), máx 38 pts,
// aprueba con 33 pts, tiempo máximo 45 minutos.

(function () {
  "use strict";

  // ---- Configuración del examen ----
  const CONFIG = {
    totalPreguntas: 35,
    preguntasDobles: 3,
    puntajeAprobacion: 33,
    puntajeMaximo: 38,
    tiempoSegundos: 45 * 60, // 45 minutos
  };

  // Tamaño objetivo del banco total (curadas + generadas)
  const TOTAL_BANCO = 500;

  // ---- Estado ----
  const state = {
    preguntas: [],      // preguntas del intento actual (35)
    respuestas: [],     // índice seleccionado por pregunta, o null
    actual: 0,          // índice de la pregunta actual
    tiempoRestante: CONFIG.tiempoSegundos,
    timerId: null,
    finalizado: false,
    dificultad: "mixto", // facil | media | dificil | mixto
  };

  // Banco completo cacheado (se arma una vez)
  let BANCO_COMPLETO = null;

  // Construye el banco total combinando las preguntas curadas (QUESTION_BANK)
  // con preguntas generadas por plantillas hasta alcanzar TOTAL_BANCO.
  function obtenerBancoCompleto() {
    if (BANCO_COMPLETO) return BANCO_COMPLETO;
    const curadas = (window.QUESTION_BANK || []).map((q) => ({
      id: q.id,
      tema: q.tema,
      texto: q.texto,
      opciones: q.opciones,
      correcta: q.correcta,
      imagen: q.imagen || null,
      dificultad: q.dificultad || "media",
    }));

    let generadas = [];
    const faltan = TOTAL_BANCO - curadas.length;
    if (faltan > 0 && window.GENERATOR && typeof window.GENERATOR.generar === "function") {
      const idInicial = curadas.reduce((m, q) => Math.max(m, q.id), 0) + 1;
      generadas = window.GENERATOR.generar(faltan, idInicial);
    }

    BANCO_COMPLETO = curadas.concat(generadas);
    return BANCO_COMPLETO;
  }

  // Devuelve las preguntas que corresponden a la dificultad elegida.
  function bancoPorDificultad(dif) {
    const banco = obtenerBancoCompleto();
    if (dif === "mixto") return banco;
    return banco.filter((q) => q.dificultad === dif);
  }

  // ---- Utilidades ----
  function $(id) { return document.getElementById(id); }

  function barajar(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function formatoTiempo(seg) {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  // Renderiza la imagen de una pregunta.
  // Soporta: { tipo: "svg", nombre, valor } (señales dibujadas) y
  //          { tipo: "url", src, alt } (archivo local o enlace).
  function renderImagenPregunta(imagen) {
    if (!imagen) return "";
    if (imagen.tipo === "svg" && typeof window.renderImagen === "function") {
      return window.renderImagen(imagen);
    }
    if (imagen.tipo === "url" && imagen.src) {
      const alt = (imagen.alt || "Imagen de la pregunta").replace(/"/g, "&quot;");
      return `<img src="${imagen.src}" alt="${alt}" loading="lazy" />`;
    }
    return "";
  }

  function mostrarPantalla(id) {
    ["screen-start", "screen-exam", "screen-result", "screen-stats"].forEach((pid) => {
      $(pid).classList.toggle("hidden", pid !== id);
    });
  }

  // ---- Inicio del examen ----
  function iniciarExamen() {
    const banco = bancoPorDificultad(state.dificultad);
    if (banco.length < CONFIG.totalPreguntas) {
      alert(
        "No hay suficientes preguntas para la dificultad seleccionada (" +
        banco.length + " disponibles). Prueba con 'Mixto'."
      );
      return;
    }

    // Seleccionar preguntas al azar evitando enunciados duplicados en un mismo examen
    const mezclado = barajar(banco);
    const seleccion = [];
    const vistos = new Set();
    for (const q of mezclado) {
      if (seleccion.length >= CONFIG.totalPreguntas) break;
      const clave = q.texto + "|" + (q.imagen ? JSON.stringify(q.imagen) : "");
      if (vistos.has(clave)) continue;
      vistos.add(clave);
      seleccion.push(q);
    }
    // Si por deduplicación faltaran, completar con las restantes
    if (seleccion.length < CONFIG.totalPreguntas) {
      for (const q of mezclado) {
        if (seleccion.length >= CONFIG.totalPreguntas) break;
        if (!seleccion.includes(q)) seleccion.push(q);
      }
    }

    state.preguntas = seleccion.map((q) => {
      // Barajar opciones manteniendo la referencia a la correcta
      const indices = barajar(q.opciones.map((_, i) => i));
      const opcionesBarajadas = indices.map((i) => q.opciones[i]);
      const nuevaCorrecta = indices.indexOf(q.correcta);
      return {
        id: q.id,
        tema: q.tema,
        texto: q.texto,
        imagen: q.imagen || null, // definición opcional de imagen
        dificultad: q.dificultad || "media",
        opciones: opcionesBarajadas,
        correcta: nuevaCorrecta,
        doble: false, // se asigna abajo
      };
    });

    // Asignar doble puntuación a 3 preguntas al azar
    const posiciones = barajar(
      state.preguntas.map((_, i) => i)
    ).slice(0, CONFIG.preguntasDobles);
    posiciones.forEach((p) => { state.preguntas[p].doble = true; });

    state.respuestas = new Array(CONFIG.totalPreguntas).fill(null);
    state.actual = 0;
    state.tiempoRestante = CONFIG.tiempoSegundos;
    state.finalizado = false;

    construirGrid();
    renderPregunta();
    mostrarPantalla("screen-exam");
    $("timer").classList.remove("hidden");
    iniciarTemporizador();
  }

  // ---- Temporizador ----
  function iniciarTemporizador() {
    actualizarTimer();
    state.timerId = setInterval(() => {
      state.tiempoRestante--;
      actualizarTimer();
      if (state.tiempoRestante <= 0) {
        clearInterval(state.timerId);
        finalizarExamen(true);
      }
    }, 1000);
  }

  function actualizarTimer() {
    const el = $("timer");
    el.textContent = formatoTiempo(state.tiempoRestante);
    el.classList.toggle("danger", state.tiempoRestante <= 60);
  }

  // ---- Render de la pregunta actual ----
  function renderPregunta() {
    const q = state.preguntas[state.actual];
    const n = state.actual + 1;

    $("q-counter").textContent = `Pregunta ${n} de ${CONFIG.totalPreguntas}`;

    const tag = $("q-tag");
    const nivelNombre = { facil: "Fácil", media: "Media", dificil: "Difícil" };
    if (q.doble) {
      tag.textContent = "Doble puntuación ×2";
      tag.classList.add("double");
    } else {
      tag.textContent = q.tema + " · " + (nivelNombre[q.dificultad] || "Media");
      tag.classList.remove("double");
    }

    $("progress-fill").style.width =
      (n / CONFIG.totalPreguntas) * 100 + "%";

    // Imagen opcional de la pregunta
    const imgCont = $("q-image");
    if (q.imagen) {
      imgCont.innerHTML = renderImagenPregunta(q.imagen);
      imgCont.classList.remove("hidden");
    } else {
      imgCont.innerHTML = "";
      imgCont.classList.add("hidden");
    }

    $("q-text").textContent = q.texto;

    const cont = $("q-options");
    cont.innerHTML = "";
    const letras = ["A", "B", "C", "D", "E", "F"];
    q.opciones.forEach((texto, i) => {
      const div = document.createElement("button");
      div.type = "button";
      div.className = "option" + (state.respuestas[state.actual] === i ? " selected" : "");
      div.innerHTML =
        `<span class="mark">${letras[i]}</span><span>${texto}</span>`;
      div.addEventListener("click", () => seleccionar(i));
      cont.appendChild(div);
    });

    $("btn-prev").disabled = state.actual === 0;
    $("btn-next").disabled = state.actual === CONFIG.totalPreguntas - 1;

    actualizarGrid();
  }

  function seleccionar(i) {
    state.respuestas[state.actual] = i;
    renderPregunta();
  }

  // ---- Grid lateral ----
  function construirGrid() {
    const grid = $("question-grid");
    grid.innerHTML = "";
    state.preguntas.forEach((q, i) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "grid-cell" + (q.doble ? " double" : "");
      cell.textContent = i + 1;
      cell.addEventListener("click", () => {
        state.actual = i;
        renderPregunta();
      });
      grid.appendChild(cell);
    });
  }

  function actualizarGrid() {
    const cells = $("question-grid").children;
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      c.classList.toggle("answered", state.respuestas[i] !== null);
      c.classList.toggle("current", i === state.actual);
    }
  }

  // ---- Navegación ----
  function anterior() {
    if (state.actual > 0) { state.actual--; renderPregunta(); }
  }
  function siguiente() {
    if (state.actual < CONFIG.totalPreguntas - 1) { state.actual++; renderPregunta(); }
  }

  // ---- Finalizar y corregir ----
  function finalizarExamen(porTiempo) {
    if (state.finalizado) return;

    if (!porTiempo) {
      const sinResponder = state.respuestas.filter((r) => r === null).length;
      let msg = "¿Terminar el examen y ver tus resultados?";
      if (sinResponder > 0) {
        msg = `Tienes ${sinResponder} pregunta(s) sin responder.\n` + msg;
      }
      if (!confirm(msg)) return;
    }

    state.finalizado = true;
    clearInterval(state.timerId);
    $("timer").classList.add("hidden");

    const resultado = calcularResultado();

    // Guardar el intento en el historial (localStorage)
    if (window.STATS) {
      try {
        const intento = window.STATS.crearIntento(state.preguntas, state.respuestas, resultado);
        window.STATS.guardarIntento(intento);
      } catch (e) { /* si falla el guardado, no interrumpir el resultado */ }
    }

    renderResultado(resultado, porTiempo);
    mostrarPantalla("screen-result");
  }

  // ---- Cálculo de puntaje (ponderado) ----
  function calcularResultado() {
    let puntaje = 0;
    let correctas = 0;
    let incorrectas = 0;
    let enBlanco = 0;

    state.preguntas.forEach((q, i) => {
      const r = state.respuestas[i];
      const valor = q.doble ? 2 : 1;
      if (r === null) {
        enBlanco++;
      } else if (r === q.correcta) {
        correctas++;
        puntaje += valor;
      } else {
        incorrectas++;
      }
    });

    const aprobado = puntaje >= CONFIG.puntajeAprobacion;
    const tiempoUsado = CONFIG.tiempoSegundos - state.tiempoRestante;

    return {
      puntaje, correctas, incorrectas, enBlanco, aprobado, tiempoUsado,
      puntajeMaximo: CONFIG.puntajeMaximo,
      dificultad: state.dificultad,
    };
  }

  // ---- Render de resultados ----
  function renderResultado(r, porTiempo) {
    const badge = $("result-badge");
    const title = $("result-title");

    badge.className = "result-badge " + (r.aprobado ? "pass" : "fail");
    badge.textContent = r.aprobado ? "✓" : "✗";

    title.className = r.aprobado ? "pass" : "fail";
    title.textContent = r.aprobado ? "¡Aprobado!" : "Reprobado";

    $("result-score").textContent =
      `${r.puntaje} / ${CONFIG.puntajeMaximo} puntos ` +
      `(mínimo para aprobar: ${CONFIG.puntajeAprobacion})`;

    $("stat-correct").textContent = r.correctas;
    $("stat-wrong").textContent = r.incorrectas;
    $("stat-blank").textContent = r.enBlanco;
    $("stat-time").textContent = formatoTiempo(r.tiempoUsado) +
      (porTiempo ? " ⏱" : "");

    // Reiniciar revisión
    $("review").classList.add("hidden");
    $("review").innerHTML = "";
    $("btn-review").textContent = "Revisar respuestas";
  }

  // ---- Revisión de respuestas ----
  function toggleRevision() {
    const review = $("review");
    if (!review.classList.contains("hidden")) {
      review.classList.add("hidden");
      $("btn-review").textContent = "Revisar respuestas";
      return;
    }

    if (review.innerHTML === "") construirRevision();
    review.classList.remove("hidden");
    $("btn-review").textContent = "Ocultar revisión";
    review.scrollIntoView({ behavior: "smooth" });
  }

  function construirRevision() {
    const review = $("review");
    const letras = ["A", "B", "C", "D", "E", "F"];

    state.preguntas.forEach((q, i) => {
      const r = state.respuestas[i];
      const item = document.createElement("div");

      let estado = "blank";
      if (r !== null) estado = r === q.correcta ? "correct" : "incorrect";
      item.className = "review-item " + estado;

      if (q.imagen) {
        const img = document.createElement("div");
        img.className = "review-img";
        img.innerHTML = renderImagenPregunta(q.imagen);
        item.appendChild(img);
      }

      const titulo = document.createElement("p");
      titulo.className = "review-q";
      titulo.innerHTML =
        `<span class="num">${i + 1}.</span>${q.texto}` +
        (q.doble ? `<span class="x2">×2</span>` : "");
      item.appendChild(titulo);

      q.opciones.forEach((texto, j) => {
        const op = document.createElement("div");
        op.className = "review-opt";
        let prefijo = letras[j] + ". ";
        if (j === q.correcta) {
          op.classList.add("right");
          prefijo = "✓ " + prefijo;
        } else if (j === r && r !== q.correcta) {
          op.classList.add("wrong");
          prefijo = "✗ " + prefijo;
        }
        op.textContent = prefijo + texto;
        item.appendChild(op);
      });

      if (r === null) {
        const nota = document.createElement("div");
        nota.className = "review-opt";
        nota.textContent = "Sin responder";
        item.appendChild(nota);
      }

      review.appendChild(item);
    });
  }

  // ---- Estadísticas e historial ----
  function abrirEstadisticas() {
    renderEstadisticas();
    mostrarPantalla("screen-stats");
  }

  function clasePct(pct) {
    if (pct < 50) return "low";
    if (pct < 75) return "mid";
    return "high";
  }

  function barra(label, correctas, total, pct) {
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML =
      `<span class="bar-label">${label}</span>` +
      `<div class="bar-track"><div class="bar-fill ${clasePct(pct)}" style="width:${pct}%"></div></div>` +
      `<span class="bar-meta"><b>${pct}%</b> · ${correctas}/${total}</span>`;
    return row;
  }

  function renderEstadisticas() {
    const S = window.STATS;
    if (!S) return;
    const historial = S.leerHistorial();

    const vacio = historial.length === 0;
    $("stats-empty").classList.toggle("hidden", !vacio);
    $("stats-content").classList.toggle("hidden", vacio);
    if (vacio) return;

    // Resumen general
    const r = S.resumen(historial);
    const summary = $("stats-summary");
    summary.innerHTML = "";
    const tarjetas = [
      [r.totalIntentos, "Intentos"],
      [r.aprobados + "/" + r.totalIntentos, "Aprobados"],
      [r.tasaAprobacion + "%", "Tasa aprob."],
      [r.promedioPuntaje, "Puntaje prom."],
      [r.mejorPuntaje, "Mejor puntaje"],
    ];
    tarjetas.forEach(([val, lbl]) => {
      const d = document.createElement("div");
      d.className = "stat";
      d.innerHTML = `<span>${val}</span><small>${lbl}</small>`;
      summary.appendChild(d);
    });

    // Por tema (peor a mejor)
    const contTema = $("stats-por-tema");
    contTema.innerHTML = "";
    S.porTema(historial).forEach((t) => {
      contTema.appendChild(barra(t.tema, t.correctas, t.total, t.aciertoPct));
    });

    // Por dificultad
    const contDif = $("stats-por-dif");
    contDif.innerHTML = "";
    const nombres = { facil: "Fácil", media: "Media", dificil: "Difícil" };
    S.porDificultad(historial).forEach((d) => {
      contDif.appendChild(barra(nombres[d.dificultad] || d.dificultad, d.correctas, d.total, d.aciertoPct));
    });

    // Historial de intentos
    renderHistorial(historial);
  }

  function renderHistorial(historial) {
    const cont = $("stats-historial");
    cont.innerHTML = "";
    const nombresDif = { facil: "Fácil", media: "Media", dificil: "Difícil", mixto: "Mixto" };

    historial.forEach((h) => {
      const item = document.createElement("div");
      item.className = "hist-item " + (h.aprobado ? "pass" : "fail");

      const fecha = new Date(h.fecha);
      const fechaStr = isNaN(fecha) ? "" :
        fecha.toLocaleDateString("es-CL") + " " +
        fecha.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });

      item.innerHTML =
        `<div class="hist-main">` +
          `<span class="hist-badge ${h.aprobado ? "pass" : "fail"}">${h.aprobado ? "Aprobado" : "Reprobado"}</span>` +
          `<span class="hist-score">${h.puntaje}/${h.puntajeMaximo}</span>` +
          `<span class="hist-dif">${nombresDif[h.dificultad] || h.dificultad}</span>` +
        `</div>` +
        `<div class="hist-sub">${fechaStr} · ${h.correctas} correctas, ${h.incorrectas} incorrectas, ${h.enBlanco} en blanco · ${formatoTiempo(h.tiempoUsado)}</div>`;
      cont.appendChild(item);
    });
  }

  function borrarEstadisticas() {
    if (!window.STATS) return;
    if (!confirm("¿Borrar todo el historial de intentos? Esta acción no se puede deshacer.")) return;
    window.STATS.borrarHistorial();
    renderEstadisticas();
  }

  // ---- Selector de dificultad ----
  function configurarSelectorDificultad() {
    const botones = document.querySelectorAll(".dif-btn");
    botones.forEach((b) => {
      b.addEventListener("click", () => {
        botones.forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        state.dificultad = b.getAttribute("data-dif");
        actualizarHintDificultad();
      });
    });
    actualizarHintDificultad();
  }

  function actualizarHintDificultad() {
    const hint = document.querySelector(".hint");
    if (!hint) return;
    const disponibles = bancoPorDificultad(state.dificultad).length;
    const nombres = { facil: "Fácil", media: "Media", dificil: "Difícil", mixto: "Mixto" };
    hint.textContent =
      `Dificultad ${nombres[state.dificultad]}: ${disponibles} preguntas disponibles. ` +
      `Se eligen ${CONFIG.totalPreguntas} al azar en cada intento.`;
  }

  // ---- Enlazar eventos ----
  function init() {
    $("btn-start").addEventListener("click", iniciarExamen);
    $("btn-prev").addEventListener("click", anterior);
    $("btn-next").addEventListener("click", siguiente);
    $("btn-finish").addEventListener("click", () => finalizarExamen(false));
    $("btn-review").addEventListener("click", toggleRevision);
    $("btn-retry").addEventListener("click", () => {
      mostrarPantalla("screen-start");
    });
    $("btn-stats-start").addEventListener("click", abrirEstadisticas);
    $("btn-stats-result").addEventListener("click", abrirEstadisticas);
    $("btn-stats-back").addEventListener("click", () => mostrarPantalla("screen-start"));
    $("btn-stats-clear").addEventListener("click", borrarEstadisticas);
    configurarSelectorDificultad();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Exponer funciones puras para pruebas (Node)
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { CONFIG, barajar, formatoTiempo };
  }
})();
