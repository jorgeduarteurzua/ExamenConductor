// Script de verificación (Node). Valida la lógica de negocio del examen
// y la integridad del banco completo (curadas + generadas = 500).
// Ejecutar: node verify.js
const { QUESTION_BANK } = require("./questions.js");
const { SIGNS } = require("./signs.js");
const GENERATOR = require("./generator.js");

const CONFIG = {
  totalPreguntas: 35,
  preguntasDobles: 3,
  puntajeAprobacion: 33,
  puntajeMaximo: 38,
  totalBanco: 500,
};
const DIFICULTADES = ["facil", "media", "dificil"];

let fallos = 0;
function check(nombre, cond) {
  const ok = !!cond;
  if (!ok) fallos++;
  console.log(`${ok ? "PASS" : "FAIL"} - ${nombre}`);
}

// Construye el banco completo igual que app.js (curadas + generadas).
function construirBanco() {
  const curadas = QUESTION_BANK.map((q) => ({
    id: q.id, tema: q.tema, texto: q.texto, opciones: q.opciones,
    correcta: q.correcta, imagen: q.imagen || null, dificultad: q.dificultad || "media",
  }));
  let generadas = [];
  const faltan = CONFIG.totalBanco - curadas.length;
  if (faltan > 0) {
    const idInicial = curadas.reduce((m, q) => Math.max(m, q.id), 0) + 1;
    generadas = GENERATOR.generar(faltan, idInicial);
  }
  return curadas.concat(generadas);
}

const BANCO = construirBanco();

// ---- Validaciones de integridad ----
check(`Banco completo alcanza ${CONFIG.totalBanco} preguntas (actual: ${BANCO.length})`,
  BANCO.length === CONFIG.totalBanco);

let bienFormadas = true;
BANCO.forEach((q) => {
  if (
    typeof q.texto !== "string" || !Array.isArray(q.opciones) ||
    q.opciones.length < 2 || typeof q.correcta !== "number" ||
    q.correcta < 0 || q.correcta >= q.opciones.length
  ) { bienFormadas = false; console.log("   Pregunta mal formada id:", q.id); }
});
check("Todas las preguntas tienen formato válido y respuesta correcta en rango", bienFormadas);

const ids = new Set(BANCO.map((q) => q.id));
check("IDs de preguntas únicos en todo el banco", ids.size === BANCO.length);

let difsOk = true;
BANCO.forEach((q) => { if (!DIFICULTADES.includes(q.dificultad)) { difsOk = false; console.log("   Dificultad inválida id:", q.id, q.dificultad); } });
check("Todas las preguntas tienen una dificultad válida (facil/media/dificil)", difsOk);

let imagenesOk = true, conImagen = 0;
BANCO.forEach((q) => {
  if (!q.imagen) return;
  conImagen++;
  if (q.imagen.tipo === "svg" && typeof SIGNS[q.imagen.nombre] !== "function") {
    imagenesOk = false; console.log("   Imagen svg desconocida id:", q.id, "->", q.imagen.nombre);
  }
});
check(`Todas las imágenes svg referencian una señal válida (${conImagen} preguntas con imagen)`, imagenesOk);

// Conteo por dificultad y verificación de que hay suficientes para armar un examen
const porDif = { facil: 0, media: 0, dificil: 0 };
BANCO.forEach((q) => porDif[q.dificultad]++);
console.log(`   Distribución -> fácil: ${porDif.facil}, media: ${porDif.media}, difícil: ${porDif.dificil}`);
DIFICULTADES.forEach((d) => {
  check(`Hay al menos ${CONFIG.totalPreguntas} preguntas de dificultad '${d}' (${porDif[d]})`,
    porDif[d] >= CONFIG.totalPreguntas);
});

// Enunciados ÚNICOS por dificultad: deben alcanzar para un examen sin repetir.
const unicos = { facil: new Set(), media: new Set(), dificil: new Set() };
BANCO.forEach((q) => {
  const clave = q.texto + "|" + (q.imagen ? JSON.stringify(q.imagen) : "");
  unicos[q.dificultad].add(clave);
});
console.log(`   Enunciados únicos -> fácil: ${unicos.facil.size}, media: ${unicos.media.size}, difícil: ${unicos.dificil.size}`);
DIFICULTADES.forEach((d) => {
  check(`Hay al menos ${CONFIG.totalPreguntas} enunciados ÚNICOS de dificultad '${d}' (${unicos[d].size})`,
    unicos[d].size >= CONFIG.totalPreguntas);
});

// ---- Lógica de puntaje ponderado (idéntica a app.js) ----
function calcular(preguntas, respuestas) {
  let puntaje = 0, correctas = 0, incorrectas = 0, enBlanco = 0;
  preguntas.forEach((q, i) => {
    const r = respuestas[i];
    const valor = q.doble ? 2 : 1;
    if (r === null) enBlanco++;
    else if (r === q.correcta) { correctas++; puntaje += valor; }
    else incorrectas++;
  });
  return { puntaje, correctas, incorrectas, enBlanco };
}

const normales = CONFIG.totalPreguntas - CONFIG.preguntasDobles;
const maxCalculado = normales * 1 + CONFIG.preguntasDobles * 2;
check(`Puntaje máximo coherente (${normales}×1 + ${CONFIG.preguntasDobles}×2 = ${maxCalculado})`,
  maxCalculado === CONFIG.puntajeMaximo);
check(`Puntaje de aprobación (${CONFIG.puntajeAprobacion}) <= máximo (${CONFIG.puntajeMaximo})`,
  CONFIG.puntajeAprobacion <= CONFIG.puntajeMaximo);

const examen = [];
for (let i = 0; i < CONFIG.totalPreguntas; i++) examen.push({ correcta: 0, doble: i < CONFIG.preguntasDobles });

const todasOk = calcular(examen, examen.map(() => 0));
check(`Todas correctas => ${CONFIG.puntajeMaximo} puntos`, todasOk.puntaje === CONFIG.puntajeMaximo);
check("Todas correctas => aprobado", todasOk.puntaje >= CONFIG.puntajeAprobacion);

const rB = calcular(examen, examen.map((q) => (q.doble ? 1 : 0)));
check("Fallar las 3 dobles => 32 puntos", rB.puntaje === 32);
check("Fallar las 3 dobles => reprobado", rB.puntaje < CONFIG.puntajeAprobacion);

const rC = calcular(examen, examen.map((q, i) => (!q.doble && i >= CONFIG.preguntasDobles && i < CONFIG.preguntasDobles + 5) ? 1 : 0));
check("Fallar 5 normales => 33 puntos", rC.puntaje === 33);
check("Fallar 5 normales => aprobado (justo en el mínimo)", rC.puntaje >= CONFIG.puntajeAprobacion);

const rD = calcular(examen, examen.map(() => null));
check("Todas en blanco => 0 puntos y 35 sin responder", rD.puntaje === 0 && rD.enBlanco === 35);

// ---- Validar que las preguntas GENERADAS tienen la respuesta correcta coherente ----
// (La opción marcada como correcta debe existir y el texto no debe estar vacío.)
let generadasOk = true;
BANCO.filter((q) => q._generada).forEach((q) => {
  if (!q.opciones[q.correcta] || q.opciones[q.correcta].length === 0) {
    generadasOk = false; console.log("   Generada sin opción correcta válida id:", q.id);
  }
});
check("Las preguntas generadas tienen una opción correcta válida", generadasOk);

console.log(`\n${fallos === 0 ? "✅ TODO OK" : "❌ " + fallos + " fallo(s)"}`);
process.exit(fallos === 0 ? 0 : 1);
