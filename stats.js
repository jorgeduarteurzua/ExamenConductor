// Persistencia de intentos y estadísticas (historial de práctica).
// Guarda en localStorage del navegador. Las funciones de AGREGACIÓN son puras
// (reciben el historial como parámetro) para poder probarlas sin navegador.

(function () {
  "use strict";

  const STORAGE_KEY = "examenClaseB.historial.v1";
  const MAX_INTENTOS = 100; // límite para no crecer indefinidamente

  // ---- Persistencia ----
  function leerHistorial() {
    try {
      const raw = (typeof localStorage !== "undefined") ? localStorage.getItem(STORAGE_KEY) : null;
      if (!raw) return [];
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  }

  function guardarIntento(intento) {
    const historial = leerHistorial();
    historial.unshift(intento); // más reciente primero
    const recortado = historial.slice(0, MAX_INTENTOS);
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recortado));
      }
    } catch (e) { /* almacenamiento no disponible */ }
    return recortado;
  }

  function borrarHistorial() {
    try {
      if (typeof localStorage !== "undefined") localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
  }

  // Construye el objeto "intento" a partir de las preguntas del examen y las respuestas.
  // preguntas: [{ id, tema, dificultad, correcta, doble }]
  // respuestas: [indice|null]
  function crearIntento(preguntas, respuestas, resultado) {
    const detalle = preguntas.map((q, i) => {
      const r = respuestas[i];
      let estado = "blanco";
      if (r !== null && r !== undefined) estado = (r === q.correcta) ? "correcta" : "incorrecta";
      return { id: q.id, tema: q.tema, dificultad: q.dificultad || "media", doble: !!q.doble, estado };
    });
    return {
      fecha: new Date().toISOString(),
      dificultad: resultado.dificultad || "mixto",
      puntaje: resultado.puntaje,
      puntajeMaximo: resultado.puntajeMaximo,
      aprobado: !!resultado.aprobado,
      correctas: resultado.correctas,
      incorrectas: resultado.incorrectas,
      enBlanco: resultado.enBlanco,
      tiempoUsado: resultado.tiempoUsado,
      detalle,
    };
  }

  // ---- Agregación (funciones puras) ----

  // Resumen general del historial completo.
  function resumen(historial) {
    const total = historial.length;
    const aprobados = historial.filter((h) => h.aprobado).length;
    const sumaPuntaje = historial.reduce((s, h) => s + (h.puntaje || 0), 0);
    const mejor = historial.reduce((m, h) => Math.max(m, h.puntaje || 0), 0);
    return {
      totalIntentos: total,
      aprobados,
      reprobados: total - aprobados,
      tasaAprobacion: total ? Math.round((aprobados / total) * 100) : 0,
      promedioPuntaje: total ? Math.round((sumaPuntaje / total) * 10) / 10 : 0,
      mejorPuntaje: mejor,
    };
  }

  // Desempeño agregado por tema: correctas / total y % de acierto.
  function porTema(historial) {
    const mapa = {};
    historial.forEach((h) => {
      (h.detalle || []).forEach((d) => {
        if (!mapa[d.tema]) mapa[d.tema] = { tema: d.tema, total: 0, correctas: 0, incorrectas: 0, blanco: 0 };
        mapa[d.tema].total++;
        if (d.estado === "correcta") mapa[d.tema].correctas++;
        else if (d.estado === "incorrecta") mapa[d.tema].incorrectas++;
        else mapa[d.tema].blanco++;
      });
    });
    const arr = Object.values(mapa).map((t) => ({
      ...t,
      aciertoPct: t.total ? Math.round((t.correctas / t.total) * 100) : 0,
    }));
    // Ordenar de peor a mejor acierto (los temas con más fallas primero)
    arr.sort((a, b) => a.aciertoPct - b.aciertoPct || b.total - a.total);
    return arr;
  }

  // Desempeño agregado por dificultad.
  function porDificultad(historial) {
    const orden = ["facil", "media", "dificil"];
    const mapa = {};
    historial.forEach((h) => {
      (h.detalle || []).forEach((d) => {
        const k = d.dificultad || "media";
        if (!mapa[k]) mapa[k] = { dificultad: k, total: 0, correctas: 0, incorrectas: 0, blanco: 0 };
        mapa[k].total++;
        if (d.estado === "correcta") mapa[k].correctas++;
        else if (d.estado === "incorrecta") mapa[k].incorrectas++;
        else mapa[k].blanco++;
      });
    });
    return orden
      .filter((k) => mapa[k])
      .map((k) => ({ ...mapa[k], aciertoPct: mapa[k].total ? Math.round((mapa[k].correctas / mapa[k].total) * 100) : 0 }));
  }

  const STATS = {
    STORAGE_KEY,
    leerHistorial,
    guardarIntento,
    borrarHistorial,
    crearIntento,
    resumen,
    porTema,
    porDificultad,
  };

  if (typeof window !== "undefined") window.STATS = STATS;
  if (typeof module !== "undefined" && module.exports) module.exports = STATS;
})();
