# Práctica Examen Clase B · Chile 🚗

App web para practicar el examen teórico de conducir **Clase B** de Chile, con las mismas reglas oficiales.

## Reglas del examen

| Regla | Valor |
|-------|-------|
| Preguntas por intento | 35 |
| Preguntas con doble puntuación | 3 (valen 2 puntos c/u) |
| Puntaje máximo | 38 puntos |
| Puntaje mínimo para aprobar | 33 puntos |
| Tiempo máximo | 45 minutos |

> El puntaje máximo sale de: 32 preguntas × 1 punto + 3 preguntas × 2 puntos = **38**.

## Cómo usarla

1. Abre el archivo `index.html` haciendo doble clic (se abre en tu navegador).
   - No necesita servidor ni instalación: es HTML, CSS y JavaScript puro.
2. Elige la **dificultad** (Fácil, Media, Difícil o Mixto) y pulsa **Comenzar examen**.
3. Responde navegando con **Anterior / Siguiente** o usando el panel lateral de preguntas.
   - Las preguntas con **×2** (doble puntuación) aparecen marcadas en naranja.
4. Pulsa **Terminar y corregir** cuando acabes (o espera a que se agote el tiempo).
5. Revisa tu puntaje, si aprobaste y usa **Revisar respuestas** para ver los aciertos y errores.

## Características

- ⏱ Temporizador de 45 minutos con aviso en el último minuto y corrección automática al llegar a cero.
- 🏦 Banco de **500 preguntas** que cubren todos los capítulos del Libro del Conductor: señales, normas, velocidad, alcohol, **drogas y estupefacientes**, **medicamentos**, **enfermedades y salud**, **fatiga y sueño**, **factores humanos (visión de túnel, estrés)**, conducción segura/defensiva, **conducción nocturna y con mal clima (niebla, nieve, hielo, aquaplaning)**, **cruces ferroviarios**, mecánica y frenado, documentación e infracciones, convivencia vial, emergencias y primeros auxilios.
- 🎚 **Niveles de dificultad**: Fácil, Media, Difícil o Mixto. Cada pregunta tiene su nivel y el examen se arma según el que elijas.
- 🖼 Preguntas **con imagen**: señales de tránsito e ilustraciones dibujadas con SVG (sin depender de archivos ni de internet).
- 🔀 Las 35 preguntas se eligen al azar del banco en cada intento (sin repetir enunciados), y las opciones se barajan.
- ⭐ 3 preguntas al azar reciben doble puntuación en cada intento.
- 📊 Resultado con puntaje ponderado, aprobado/reprobado, correctas, incorrectas y sin responder.
- 🔎 Revisión detallada con la respuesta correcta y la que marcaste (incluye la imagen).
- 📈 **Historial de intentos y estadísticas**: guarda cada examen en tu navegador y muestra tu progreso, en qué **temas** y **dificultades** fallas más.
- 📱 Diseño responsivo (funciona en móvil y escritorio).

## Archivos

- `index.html` — estructura de la app (pantallas de inicio, examen y resultados).
- `styles.css` — estilos.
- `questions.js` — banco de **200 preguntas curadas** (escritas una a una). **Puedes agregar más preguntas aquí.**
- `generator.js` — generador de preguntas por plantillas que completa el banco hasta **500**.
- `signs.js` — generador de señales e ilustraciones en SVG para las preguntas con imagen.
- `stats.js` — historial de intentos y estadísticas (guardado en el navegador con localStorage).
- `app.js` — lógica (temporizador, navegación, puntaje, dificultad, revisión, imágenes, estadísticas).
- `verify.js` — script de verificación de la lógica de negocio y del banco (opcional, requiere Node).

## ¿De dónde salen las 500 preguntas?

El banco se arma combinando dos fuentes:

1. **200 preguntas curadas** en `questions.js`, escritas una a una y cada una con su dificultad.
2. **Preguntas generadas** por `generator.js` a partir de plantillas paramétricas (señales con distintos valores, exceso de velocidad, distancia de frenado, prioridad en cruces, números de emergencia, conceptos de conducción segura y normas). Cada plantilla produce preguntas con la **respuesta correcta garantizada por código**, y el orden de las opciones se baraja.

Al iniciar, la app combina ambas fuentes hasta llegar a 500 y filtra por la dificultad elegida. Dentro de un mismo examen nunca se repite un enunciado.

### Dificultad

Cada pregunta tiene el campo `dificultad`: `"facil"`, `"media"` o `"dificil"`. En las curadas se asigna automáticamente (ver el final de `questions.js`); en las generadas la define cada plantilla. El selector de la pantalla de inicio permite elegir **Fácil**, **Media**, **Difícil** o **Mixto** (todas).

## Historial y estadísticas

Cada vez que terminas un examen, el intento se guarda automáticamente en tu navegador (con `localStorage`, en el equipo; no se envía a ningún servidor). Pulsa **📊 Ver estadísticas e historial** (en el inicio o al final de un examen) para ver:

- **Resumen general**: número de intentos, aprobados, tasa de aprobación, puntaje promedio y mejor puntaje.
- **Aciertos por tema**: barras con tu porcentaje de acierto en cada tema, ordenadas **de peor a mejor** para que veas rápido dónde fallas más (rojo < 50%, amarillo 50-74%, verde ≥ 75%).
- **Aciertos por dificultad**: tu rendimiento en Fácil, Media y Difícil.
- **Historial de intentos**: lista de todos tus exámenes con fecha, puntaje, dificultad y detalle de correctas/incorrectas/en blanco.

Puedes borrar todo el historial con el botón **Borrar historial**. Los datos quedan solo en ese navegador: si usas otro equipo o borras los datos del sitio, el historial se reinicia.

## Agregar o editar preguntas

Edita `questions.js` y añade objetos a `QUESTION_BANK` con este formato:

```js
{
  id: 201,
  tema: "Normas",
  texto: "Tu pregunta aquí",
  opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
  correcta: 0,            // índice (0 = primera opción) de la respuesta correcta
  dificultad: "media"     // opcional: "facil" | "media" | "dificil" (por defecto "media")
}
```

El total del banco (500) se mantiene automáticamente: el generador rellena con menos preguntas si agregas más curadas. Para cambiar el total, ajusta `TOTAL_BANCO` en `app.js` (y `totalBanco` en `verify.js`).

### Preguntas con imagen

Agrega el campo opcional `imagen`. Hay dos formas:

**1. Señal dibujada (SVG, recomendado, sin archivos):**

```js
{
  id: 122, tema: "Señales",
  texto: "¿Qué significa esta señal?",
  opciones: ["Límite 80 km/h", "Ruta 80", "Peso 80 t", "Distancia 80 m"],
  correcta: 0,
  imagen: { tipo: "svg", nombre: "limite", valor: "80" }
}
```

Señales disponibles (campo `nombre`): `limite` (usa `valor` para el número), `pare`, `ceda`, `noAdelantar`, `prohibido`, `advertencia`, `peatonal`, `frenado`. Puedes agregar nuevas señales en `signs.js`.

**2. Imagen desde un archivo o enlace:**

```js
imagen: { tipo: "url", src: "img/mi-foto.jpg", alt: "Descripción de la imagen" }
```

Si usas `tipo: "url"` con un archivo local, crea una carpeta `img/` junto a `index.html` y pon ahí la imagen.

## Verificar la lógica (opcional)

Si tienes [Node.js](https://nodejs.org) instalado:

```bash
node verify.js
```

Comprueba que el banco llega a 500 preguntas, que los IDs son únicos, que las dificultades e imágenes son válidas, que hay suficientes enunciados únicos por nivel para armar un examen, y que la lógica de puntaje (38 máx, 33 para aprobar, 3 dobles) es correcta.

## Fuente y aviso

Las preguntas fueron **redactadas para este proyecto** con fines de estudio (200 curadas y el resto generadas por plantillas propias), cubriendo las mismas áreas de conocimiento del examen teórico oficial Clase B de Chile: señales y demarcaciones, normas del tránsito, factores de riesgo (alcohol, drogas, fatiga, velocidad), conducción segura y defensiva, vehículo y mantención, documentación, convivencia vial y emergencias/primeros auxilios.

Estos temas se basan en el material público de la **CONASET** (Comisión Nacional de Seguridad de Tránsito), en particular el *Libro del Nuevo Conductor* / *Libro para la Conducción en Chile*:

- CONASET — Manuales: https://www.conaset.cl/manuales/

> No se copiaron preguntas de sitios comerciales de pago. Estas preguntas **no sustituyen al material oficial**. Consulta siempre la normativa vigente y el material de tu municipalidad para el examen real, ya que las cifras y normas pueden actualizarse.
