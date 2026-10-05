// Banco de preguntas para el examen de conducir Clase B (Chile)
// Formato de cada pregunta:
//   id:       número único
//   tema:     categoría (Señales, Normas, Alcohol, Conducción segura, etc.)
//   texto:    enunciado de la pregunta
//   opciones: array de alternativas
//   correcta: índice (0-based) de la opción correcta
//   imagen:   (opcional) ilustración de la pregunta. Dos tipos:
//             { tipo: "svg", nombre: "limite", valor: "100" }  -> señal dibujada
//             { tipo: "url", src: "img/foto.jpg", alt: "..." }  -> archivo o enlace
//
// La ponderación de "doble puntuación" (3 preguntas) se asigna al azar en app.js.

const QUESTION_BANK = [
  // ===== SEÑALES =====
  {
    id: 1, tema: "Señales",
    texto: "¿Qué indica una señal triangular con el borde rojo y fondo blanco?",
    opciones: ["Prohibición", "Advertencia de peligro", "Información de servicio", "Obligación"],
    correcta: 1
  },
  {
    id: 2, tema: "Señales",
    texto: "Una señal octagonal (ocho lados) de color rojo significa:",
    opciones: ["Ceda el paso", "Pare / Detención obligatoria", "Prohibido adelantar", "Zona de escolares"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "pare" }
  },
  {
    id: 3, tema: "Señales",
    texto: "¿Qué significa una señal circular con fondo rojo y una línea diagonal?",
    opciones: ["Obligación de girar", "Advertencia de curva", "Prohibición", "Vía preferencial"],
    correcta: 2,
    imagen: { tipo: "svg", nombre: "prohibido" }
  },
  {
    id: 4, tema: "Señales",
    texto: "La señal que se muestra corresponde a:",
    opciones: ["Pare", "Ceda el paso", "Prohibido adelantar", "Fin de restricción"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "ceda" }
  },
  {
    id: 5, tema: "Señales",
    texto: "¿Qué significa la señal de la imagen?",
    opciones: ["Velocidad mínima 60", "Límite máximo de 60 km/h", "Distancia de 60 metros", "Peso máximo 60 toneladas"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "limite", valor: "60" }
  },
  {
    id: 6, tema: "Señales",
    texto: "La señal de la imagen indica que está prohibido:",
    opciones: ["Estacionar", "Adelantar a otro vehículo", "Tocar la bocina", "Girar a la derecha"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "noAdelantar" }
  },
  {
    id: 7, tema: "Señales",
    texto: "¿Qué tipo de señal es la de la imagen?",
    opciones: ["Reglamentaria de prohibición", "De advertencia de peligro", "Informativa de servicio", "De obligación"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "advertencia" }
  },
  {
    id: 8, tema: "Señales",
    texto: "La señal azul con la figura de un peatón de la imagen indica:",
    opciones: ["Prohibido el paso de peatones", "Cruce o zona de peatones", "Fin de zona urbana", "Estacionamiento"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "peatonal" }
  },
  {
    id: 9, tema: "Señales",
    texto: "La señal 'CEDA EL PASO' tiene forma de:",
    opciones: ["Triángulo invertido", "Círculo", "Rombo", "Rectángulo"],
    correcta: 0
  },
  {
    id: 10, tema: "Señales",
    texto: "Una línea continua en el centro de la calzada indica que:",
    opciones: ["Se permite adelantar con precaución", "Está prohibido adelantar o cruzarla", "Es solo decorativa", "Se puede estacionar sobre ella"],
    correcta: 1
  },
  {
    id: 11, tema: "Señales",
    texto: "¿Qué color de señales corresponde a información y servicios en la vía?",
    opciones: ["Rojo", "Amarillo", "Azul", "Negro"],
    correcta: 2
  },
  {
    id: 12, tema: "Señales",
    texto: "El color amarillo en las señales de tránsito se asocia principalmente a:",
    opciones: ["Prohibición", "Advertencia / prevención", "Información turística", "Obligación"],
    correcta: 1
  },
  {
    id: 13, tema: "Señales",
    texto: "Una señal rectangular azul con una 'P' blanca indica:",
    opciones: ["Prohibido estacionar", "Estacionamiento permitido", "Peaje", "Parada prohibida"],
    correcta: 1
  },
  {
    id: 14, tema: "Señales",
    texto: "Las señales reglamentarias (prohibición/obligación) generalmente son de forma:",
    opciones: ["Triangular", "Circular", "Rectangular horizontal", "Octagonal siempre"],
    correcta: 1
  },
  {
    id: 15, tema: "Señales",
    texto: "Una señal que indica 'NO ENTRAR' / sentido contrario es:",
    opciones: ["Círculo rojo con una barra blanca horizontal", "Triángulo amarillo", "Cuadrado verde", "Rombo naranjo"],
    correcta: 0
  },
  {
    id: 16, tema: "Señales",
    texto: "Un semáforo con luz verde intermitente o próxima a cambiar indica que debe:",
    opciones: ["Acelerar al máximo", "Prepararse para detenerse, el cambio es inminente", "Ignorarlo", "Retroceder"],
    correcta: 1
  },
  {
    id: 17, tema: "Señales",
    texto: "Las marcas (demarcaciones) pintadas en el pavimento sirven para:",
    opciones: ["Decorar la vía", "Ordenar y guiar el tránsito", "Indicar la marca del asfalto", "Nada en particular"],
    correcta: 1
  },
  {
    id: 18, tema: "Señales",
    texto: "Una señal triangular con la figura de niños indica:",
    opciones: ["Zona de juegos prohibida", "Proximidad de escuela / cruce de escolares", "Fin de zona escolar", "Prohibido el paso de niños"],
    correcta: 1
  },
  {
    id: 19, tema: "Señales",
    texto: "Las líneas segmentadas (discontinuas) en la calzada indican que:",
    opciones: ["Está prohibido cambiar de pista", "Se permite adelantar o cambiar de pista con precaución", "Es una zona de no circular", "Hay que detenerse"],
    correcta: 1
  },
  {
    id: 20, tema: "Señales",
    texto: "¿Qué debe hacer ante un semáforo con luz roja?",
    opciones: ["Avanzar con precaución", "Detenerse completamente antes de la línea de detención", "Doblar siempre a la derecha", "Tocar la bocina"],
    correcta: 1
  },

  // ===== NORMAS Y VELOCIDAD =====
  {
    id: 21, tema: "Normas",
    texto: "¿Cuál es la velocidad máxima en zona urbana, salvo señalización distinta?",
    opciones: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
    correcta: 1
  },
  {
    id: 22, tema: "Normas",
    texto: "¿Cuál es la velocidad máxima en carretera para vehículos livianos?",
    opciones: ["100 km/h", "110 km/h", "120 km/h", "140 km/h"],
    correcta: 2
  },
  {
    id: 23, tema: "Normas",
    texto: "En zonas rurales (caminos), la velocidad máxima para vehículos livianos suele ser:",
    opciones: ["80 km/h", "100 km/h", "120 km/h", "60 km/h"],
    correcta: 1
  },
  {
    id: 24, tema: "Normas",
    texto: "En una intersección sin señalización ni semáforo, ¿quién tiene preferencia?",
    opciones: ["El vehículo que viene por la derecha", "El vehículo más grande", "El que va más rápido", "El que viene por la izquierda"],
    correcta: 0
  },
  {
    id: 25, tema: "Normas",
    texto: "Según la Ley de Tránsito, el uso del cinturón en los asientos traseros es obligatorio:",
    opciones: ["Nunca es obligatorio atrás", "Solo en vehículos fabricados el año 2002 o posterior", "Solo en viajes por carretera", "Solo para los niños"],
    correcta: 1
  },
  {
    id: 26, tema: "Normas",
    texto: "En vehículos particulares, los niños deben viajar en un Sistema de Retención Infantil hasta cumplir:",
    opciones: ["3 años", "5 años", "8 años (o si miden 135 cm o menos y pesan 33 kg o menos)", "12 años siempre"],
    correcta: 2
  },
  {
    id: 201, tema: "Normas",
    texto: "El Sistema de Retención Infantil en vehículos particulares debe instalarse:",
    opciones: ["En el asiento delantero", "En el asiento trasero", "En el maletero", "En cualquier lugar"],
    correcta: 1,
    dificultad: "media"
  },
  {
    id: 27, tema: "Normas",
    texto: "Antes de realizar un cambio de pista debe:",
    opciones: ["Tocar la bocina", "Señalizar con la luz direccional y revisar espejos y punto ciego", "Encender las luces altas", "Acelerar rápidamente"],
    correcta: 1
  },
  {
    id: 28, tema: "Normas",
    texto: "¿Está permitido estacionar frente a un grifo (hidrante) de incendios?",
    opciones: ["Sí, si es por poco tiempo", "Sí, de noche", "No, está prohibido", "Solo con luces de emergencia"],
    correcta: 2
  },
  {
    id: 29, tema: "Normas",
    texto: "Cuando se aproxima un vehículo de emergencia con sirena y luces, usted debe:",
    opciones: ["Acelerar para no estorbar", "Detenerse en el centro de la vía", "Cederle el paso y orillarse a la derecha si es posible", "Seguir normalmente"],
    correcta: 2
  },
  {
    id: 30, tema: "Normas",
    texto: "Adelantar a otro vehículo se hace, por regla general, por el lado:",
    opciones: ["Derecho", "Izquierdo", "Por cualquiera", "Por la berma"],
    correcta: 1
  },
  {
    id: 31, tema: "Normas",
    texto: "¿Qué documento NO es obligatorio portar al conducir?",
    opciones: ["Licencia de conducir vigente", "Permiso de circulación", "Revisión técnica al día", "El manual del propietario del vehículo"],
    correcta: 3
  },
  {
    id: 32, tema: "Normas",
    texto: "Las luces bajas (de cruce) se usan principalmente para:",
    opciones: ["Deslumbrar a otros", "Conducir de noche en ciudad y en túneles", "Ahorrar batería", "Solo cuando llueve"],
    correcta: 1
  },
  {
    id: 33, tema: "Normas",
    texto: "El uso de luces altas en ciudad con tránsito está:",
    opciones: ["Recomendado siempre", "Desaconsejado/prohibido porque encandila a otros", "Permitido en cualquier caso", "Obligatorio de noche"],
    correcta: 1
  },
  {
    id: 34, tema: "Normas",
    texto: "Si un semáforo está apagado o intermitente en amarillo, usted debe:",
    opciones: ["Pasar sin reducir", "Avanzar con precaución respetando la preferencia", "Detenerse indefinidamente", "Acelerar"],
    correcta: 1
  },
  {
    id: 35, tema: "Normas",
    texto: "El límite de velocidad en zonas próximas a escuelas suele ser:",
    opciones: ["Reducido (menor al general), según señalización", "El mismo que en carretera", "Sin límite", "80 km/h"],
    correcta: 0
  },
  {
    id: 36, tema: "Normas",
    texto: "¿Qué hacer ante un cruce ferroviario con las barreras bajando?",
    opciones: ["Pasar rápido antes de que bajen", "Detenerse y esperar a que suban", "Rodear las barreras", "Tocar la bocina y avanzar"],
    correcta: 1
  },
  {
    id: 37, tema: "Normas",
    texto: "El uso del teléfono celular en la mano mientras se conduce está:",
    opciones: ["Permitido en ciudad", "Prohibido", "Permitido a baja velocidad", "Permitido para mensajes"],
    correcta: 1
  },
  {
    id: 38, tema: "Normas",
    texto: "¿Está permitido conducir usando audífonos en ambos oídos?",
    opciones: ["Sí, siempre", "No, porque reduce la percepción del entorno", "Solo en carretera", "Solo de día"],
    correcta: 1
  },
  {
    id: 39, tema: "Normas",
    texto: "En una rotonda (glorieta), la preferencia la tiene:",
    opciones: ["El que va a entrar", "El que ya circula dentro de la rotonda", "El vehículo más grande", "No hay reglas"],
    correcta: 1
  },
  {
    id: 40, tema: "Normas",
    texto: "¿Dónde está prohibido estacionar?",
    opciones: ["En zonas demarcadas para ello", "Sobre la vereda, pasos peatonales y esquinas", "En estacionamientos públicos", "En tu domicilio"],
    correcta: 1
  },
  {
    id: 41, tema: "Normas",
    texto: "La revisión técnica de un vehículo sirve para:",
    opciones: ["Pagar un impuesto", "Verificar que el vehículo está en condiciones seguras de circular", "Cambiar la patente", "Renovar la licencia"],
    correcta: 1
  },
  {
    id: 42, tema: "Normas",
    texto: "¿Quién tiene siempre prioridad de paso en un cruce peatonal?",
    opciones: ["El vehículo", "El peatón", "El ciclista", "El que llegó primero"],
    correcta: 1
  },
  {
    id: 43, tema: "Normas",
    texto: "Al girar en una esquina, el conductor debe ceder el paso a:",
    opciones: ["Nadie", "Los peatones que cruzan la vía a la que ingresa", "Solo a otros autos", "Solo a buses"],
    correcta: 1
  },
  {
    id: 44, tema: "Normas",
    texto: "La luz direccional (intermitente) debe usarse:",
    opciones: ["Solo de noche", "Antes de girar o cambiar de pista, con anticipación", "Después de girar", "Nunca"],
    correcta: 1
  },
  {
    id: 45, tema: "Normas",
    texto: "¿Está permitido transportar más pasajeros que los asientos del vehículo?",
    opciones: ["Sí", "No, cada ocupante debe tener su asiento y cinturón", "Solo niños", "Solo distancias cortas"],
    correcta: 1
  },

  // ===== ALCOHOL Y DROGAS =====
  {
    id: 46, tema: "Alcohol",
    texto: "Se considera 'conducir en estado de ebriedad' con una alcoholemia igual o superior a:",
    opciones: ["0,3 g/L", "0,5 g/L", "0,8 g/L", "1,0 g/L"],
    correcta: 2
  },
  {
    id: 47, tema: "Alcohol",
    texto: "El rango de 'conducción bajo la influencia del alcohol' es:",
    opciones: ["0,0 a 0,2 g/L", "0,3 a 0,79 g/L", "0,8 a 1,0 g/L", "Más de 1,0 g/L"],
    correcta: 1
  },
  {
    id: 48, tema: "Alcohol",
    texto: "El consumo de alcohol al conducir principalmente:",
    opciones: ["Mejora los reflejos", "Disminuye los reflejos y la capacidad de reacción", "No tiene efecto", "Mejora la visión"],
    correcta: 1
  },
  {
    id: 49, tema: "Alcohol",
    texto: "Si tomó medicamentos que producen somnolencia, lo recomendable es:",
    opciones: ["Conducir igual", "No conducir y revisar las advertencias del medicamento", "Conducir más rápido", "Tomar café y conducir"],
    correcta: 1
  },
  {
    id: 50, tema: "Alcohol",
    texto: "Negarse a realizarse el examen de alcoholemia cuando lo solicita la autoridad:",
    opciones: ["No tiene consecuencias", "Constituye una infracción sancionable", "Es un derecho sin costo", "Solo aplica de noche"],
    correcta: 1
  },

  // ===== CONDUCCIÓN SEGURA =====
  {
    id: 51, tema: "Conducción segura",
    texto: "Ante un semáforo en luz amarilla, usted debe:",
    opciones: ["Acelerar para pasar rápido", "Detenerse si puede hacerlo con seguridad", "Tocar la bocina y continuar", "Encender emergencias y pasar"],
    correcta: 1
  },
  {
    id: 52, tema: "Conducción segura",
    texto: "En carretera, una regla práctica para la distancia con el vehículo de adelante es mantener, en metros, un valor equivalente a:",
    opciones: ["La mitad de los autos que ves", "Lo que marca el velocímetro en km/h (y la mitad en ciudad)", "Siempre 5 metros", "No es necesaria si vas lento"],
    correcta: 1
  },
  {
    id: 53, tema: "Conducción segura",
    texto: "Si su vehículo comienza a derrapar (patinar), lo correcto es:",
    opciones: ["Frenar bruscamente", "Girar el volante en sentido contrario", "Soltar el acelerador y dirigir el volante hacia donde quiere ir", "Acelerar al máximo"],
    correcta: 2
  },
  {
    id: 54, tema: "Conducción segura",
    texto: "El 'punto ciego' es:",
    opciones: ["Una zona que no se ve directamente ni por los espejos", "El centro del parabrisas", "La zona iluminada por los faros", "El tablero"],
    correcta: 0
  },
  {
    id: 55, tema: "Conducción segura",
    texto: "En lluvia o pavimento mojado, usted debe:",
    opciones: ["Mantener la misma velocidad", "Reducir la velocidad y aumentar la distancia de seguimiento", "Frenar fuerte en curvas", "Apagar las luces"],
    correcta: 1
  },
  {
    id: 56, tema: "Conducción segura",
    texto: "Antes de descender de un vehículo estacionado junto a la acera, debe:",
    opciones: ["Abrir la puerta rápido", "Verificar que no vengan vehículos o ciclistas antes de abrir", "Tocar la bocina", "Encender luces altas"],
    correcta: 1
  },
  {
    id: 57, tema: "Conducción segura",
    texto: "Los neumáticos en mal estado o lisos:",
    opciones: ["Mejoran el agarre", "No influyen en la frenada", "Aumentan la distancia de frenado y el riesgo de aquaplaning", "Solo importan en verano"],
    correcta: 2
  },
  {
    id: 58, tema: "Conducción segura",
    texto: "Al acercarse a un paso peatonal con peatones esperando, debe:",
    opciones: ["Acelerar", "Detenerse y cederles el paso", "Tocar la bocina", "Pasar entre ellos"],
    correcta: 1
  },
  {
    id: 59, tema: "Conducción segura",
    texto: "La fatiga y el sueño al conducir:",
    opciones: ["No afectan si vas despacio", "Reducen los reflejos y aumentan el riesgo de accidente", "Mejoran la concentración", "Solo afectan en carretera"],
    correcta: 1
  },
  {
    id: 60, tema: "Conducción segura",
    texto: "La principal causa evitable de accidentes graves está asociada a:",
    opciones: ["El color del vehículo", "Velocidad excesiva, alcohol y distracción", "Conducir con ventanas abiertas", "Usar cinturón"],
    correcta: 1
  },
  {
    id: 61, tema: "Conducción segura",
    texto: "Al conducir en neblina densa, lo correcto es:",
    opciones: ["Usar luces altas", "Reducir la velocidad y usar luces bajas o antiniebla", "Acelerar para salir pronto", "Apagar todas las luces"],
    correcta: 1
  },
  {
    id: 62, tema: "Conducción segura",
    texto: "Para subir una pendiente pronunciada con el vehículo, conviene:",
    opciones: ["Usar una marcha alta", "Usar una marcha baja para tener más fuerza", "Apagar el motor", "Ir en punto muerto"],
    correcta: 1
  },
  {
    id: 63, tema: "Conducción segura",
    texto: "Al bajar una pendiente larga, para no sobrecalentar los frenos conviene:",
    opciones: ["Ir en punto muerto", "Usar el freno motor (marcha baja)", "Frenar constantemente", "Apagar el motor"],
    correcta: 1
  },
  {
    id: 64, tema: "Conducción segura",
    texto: "El 'aquaplaning' (hidroplaneo) ocurre cuando:",
    opciones: ["El motor se recalienta", "Los neumáticos pierden contacto con el pavimento por una capa de agua", "Se acaba el combustible", "Se descarga la batería"],
    correcta: 1
  },
  {
    id: 65, tema: "Conducción segura",
    texto: "A mayor velocidad, la distancia necesaria para detener el vehículo:",
    opciones: ["Disminuye", "Aumenta", "Se mantiene igual", "No depende de la velocidad"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "frenado" }
  },
  {
    id: 66, tema: "Conducción segura",
    texto: "Conduciendo a 100 km/h en pavimento bueno y seco, la distancia aproximada para detenerse es de alrededor de:",
    opciones: ["20 metros", "40 metros", "80 metros", "150 metros"],
    correcta: 2,
    imagen: { tipo: "svg", nombre: "limite", valor: "100" }
  },
  {
    id: 67, tema: "Conducción segura",
    texto: "Si a 50 km/h se necesitan unos 25 metros para detenerse, al duplicar la velocidad a 100 km/h la distancia aproximada será de:",
    opciones: ["50 metros", "80 metros", "25 metros", "No cambia"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "frenado" }
  },
  {
    id: 68, tema: "Conducción segura",
    texto: "La distancia total de detención incluye:",
    opciones: ["Solo la distancia de frenado", "La distancia de reacción más la de frenado", "Solo la distancia de reacción", "La velocidad del viento"],
    correcta: 1
  },
  {
    id: 69, tema: "Conducción segura",
    texto: "El tiempo de reacción del conductor aumenta cuando:",
    opciones: ["Está descansado", "Está cansado, distraído o bajo efectos del alcohol", "Conduce de día", "Usa el cinturón"],
    correcta: 1
  },
  {
    id: 70, tema: "Conducción segura",
    texto: "Al circular detrás de una motocicleta, usted debe:",
    opciones: ["Seguirla muy de cerca", "Mantener mayor distancia porque son más vulnerables", "Tocar la bocina", "Adelantar sin señalizar"],
    correcta: 1
  },
  {
    id: 71, tema: "Conducción segura",
    texto: "Si se le revienta un neumático en movimiento, debe:",
    opciones: ["Frenar bruscamente", "Sujetar firme el volante, soltar el acelerador y frenar suavemente", "Girar de golpe", "Acelerar"],
    correcta: 1
  },
  {
    id: 72, tema: "Conducción segura",
    texto: "Al adelantar a un ciclista, debe:",
    opciones: ["Pasar muy cerca", "Dejar una distancia lateral segura (al menos 1,5 m)", "Tocar la bocina y pasar pegado", "No adelantar nunca"],
    correcta: 1
  },
  {
    id: 73, tema: "Conducción segura",
    texto: "Para conducir de noche con seguridad conviene:",
    opciones: ["Aumentar la velocidad", "Reducir la velocidad y usar correctamente las luces", "Usar siempre luces altas", "Conducir sin luces"],
    correcta: 1
  },
  {
    id: 74, tema: "Conducción segura",
    texto: "Si se aproxima un vehículo de frente con las luces altas y lo encandila, debe:",
    opciones: ["Encender también las altas", "Mirar hacia el borde derecho de su pista y reducir la velocidad", "Cerrar los ojos", "Acelerar"],
    correcta: 1
  },
  {
    id: 75, tema: "Conducción segura",
    texto: "El uso correcto del apoyacabezas ayuda a:",
    opciones: ["Dormir mejor", "Reducir lesiones cervicales en caso de impacto", "Nada", "Mejorar el audio"],
    correcta: 1
  },

  // ===== MECÁNICA BÁSICA Y VEHÍCULO =====
  {
    id: 76, tema: "Mecánica básica",
    texto: "La luz de advertencia roja del aceite encendida en el tablero indica:",
    opciones: ["Que todo está bien", "Posible falta o baja presión de aceite; detenerse y revisar", "Que hay que acelerar", "Falta de combustible"],
    correcta: 1
  },
  {
    id: 77, tema: "Mecánica básica",
    texto: "La presión incorrecta de los neumáticos puede causar:",
    opciones: ["Mejor rendimiento", "Mayor desgaste, mal frenado y mayor consumo", "Nada", "Más velocidad"],
    correcta: 1
  },
  {
    id: 78, tema: "Mecánica básica",
    texto: "El líquido de frenos debe:",
    opciones: ["Ignorarse", "Mantenerse en el nivel adecuado para un frenado seguro", "Cambiarse por agua", "Vaciarse en verano"],
    correcta: 1
  },
  {
    id: 79, tema: "Mecánica básica",
    texto: "Si el motor se recalienta (temperatura alta), debe:",
    opciones: ["Seguir conduciendo rápido", "Detenerse en lugar seguro y dejar enfriar el motor", "Abrir el radiador caliente de inmediato", "Acelerar"],
    correcta: 1
  },
  {
    id: 80, tema: "Mecánica básica",
    texto: "Las luces de freno (traseras) se encienden cuando:",
    opciones: ["Enciende la radio", "Presiona el pedal de freno", "Gira el volante", "Toca la bocina"],
    correcta: 1
  },
  {
    id: 81, tema: "Mecánica básica",
    texto: "El cinturón de seguridad cumple su función principalmente:",
    opciones: ["Como adorno", "Reteniendo al ocupante en caso de frenada o choque", "Para la comodidad", "Para el aire acondicionado"],
    correcta: 1
  },
  {
    id: 82, tema: "Mecánica básica",
    texto: "El triángulo reflectante del vehículo sirve para:",
    opciones: ["Decorar", "Señalizar el vehículo detenido en la vía por emergencia", "Reemplazar la rueda", "Limpiar el parabrisas"],
    correcta: 1
  },
  {
    id: 83, tema: "Mecánica básica",
    texto: "Las luces de emergencia (balizas) se usan para:",
    opciones: ["Adelantar", "Advertir a otros que el vehículo está detenido o con problemas", "Ir más rápido", "Estacionar donde sea"],
    correcta: 1
  },
  {
    id: 84, tema: "Mecánica básica",
    texto: "El sistema ABS en los frenos ayuda a:",
    opciones: ["Frenar más fuerte siempre", "Evitar el bloqueo de las ruedas y mantener el control al frenar", "Aumentar la velocidad", "Ahorrar combustible"],
    correcta: 1
  },
  {
    id: 85, tema: "Mecánica básica",
    texto: "Antes de un viaje largo, conviene revisar:",
    opciones: ["Solo la radio", "Neumáticos, luces, frenos, niveles de aceite y agua", "Nada", "Solo el combustible"],
    correcta: 1
  },

  // ===== DOCUMENTACIÓN Y SANCIONES =====
  {
    id: 86, tema: "Documentación",
    texto: "La licencia Clase B autoriza a conducir principalmente:",
    opciones: ["Camiones de carga", "Vehículos motorizados particulares (autos y camionetas livianas)", "Buses interurbanos", "Motocicletas"],
    correcta: 1
  },
  {
    id: 87, tema: "Documentación",
    texto: "Conducir sin licencia vigente es:",
    opciones: ["Permitido con copia", "Una infracción que puede ser grave o gravísima", "Legal de día", "Sin consecuencias"],
    correcta: 1
  },
  {
    id: 88, tema: "Documentación",
    texto: "El permiso de circulación acredita:",
    opciones: ["La propiedad del vehículo", "El pago anual que permite circular con el vehículo", "El estado mecánico", "El seguro de vida"],
    correcta: 1
  },
  {
    id: 89, tema: "Documentación",
    texto: "El Seguro Obligatorio de Accidentes Personales (SOAP) cubre:",
    opciones: ["Daños a la carrocería", "Lesiones o muerte de personas en accidentes de tránsito", "El robo del vehículo", "Multas"],
    correcta: 1
  },
  {
    id: 90, tema: "Documentación",
    texto: "Las infracciones de tránsito se clasifican principalmente en:",
    opciones: ["Buenas y malas", "Leves, graves y gravísimas", "Grandes y chicas", "No existen categorías"],
    correcta: 1
  },
  {
    id: 91, tema: "Documentación",
    texto: "Conducir en estado de ebriedad causando lesiones graves puede implicar:",
    opciones: ["Solo una advertencia", "Suspensión o cancelación de la licencia y sanciones penales", "Nada", "Un descuento"],
    correcta: 1
  },
  {
    id: 92, tema: "Documentación",
    texto: "Si cambia de domicilio, respecto a su licencia o registro, lo correcto es:",
    opciones: ["No hacer nada", "Mantener los datos actualizados ante la autoridad", "Botar la licencia", "Pedir una nueva patente"],
    correcta: 1
  },

  // ===== PEATONES, CICLISTAS Y CONVIVENCIA =====
  {
    id: 93, tema: "Convivencia vial",
    texto: "Respecto a los ciclistas, el conductor de un auto debe:",
    opciones: ["Ignorarlos", "Respetarlos como usuarios de la vía y darles espacio seguro", "Tocarles la bocina", "Adelantarlos pegado"],
    correcta: 1
  },
  {
    id: 94, tema: "Convivencia vial",
    texto: "En una ciclovía, los vehículos motorizados:",
    opciones: ["Pueden circular libremente", "No deben circular ni estacionar", "Pueden estacionar", "Tienen preferencia"],
    correcta: 1
  },
  {
    id: 95, tema: "Convivencia vial",
    texto: "Un peatón con bastón blanco o perro guía indica que:",
    opciones: ["Va de paseo", "Es una persona con discapacidad visual; tiene prioridad y protección especial", "Está perdido", "No debe cruzar"],
    correcta: 1
  },
  {
    id: 96, tema: "Convivencia vial",
    texto: "Al pasar junto a un paradero con un bus detenido, debe:",
    opciones: ["Acelerar", "Reducir la velocidad y estar atento a peatones que cruzan", "Tocar la bocina", "Adelantar sin mirar"],
    correcta: 1
  },
  {
    id: 97, tema: "Convivencia vial",
    texto: "Los adultos mayores y niños como peatones requieren:",
    opciones: ["Menos atención", "Mayor precaución porque pueden moverse de forma impredecible", "Que se les apure", "Nada especial"],
    correcta: 1
  },
  {
    id: 98, tema: "Convivencia vial",
    texto: "Al cruzar un paso peatonal con semáforo en verde para los autos pero con peatones aún cruzando, debe:",
    opciones: ["Avanzar igual", "Esperar a que terminen de cruzar", "Tocar la bocina", "Pasar entre ellos"],
    correcta: 1
  },

  // ===== PRIMEROS AUXILIOS Y EMERGENCIAS =====
  {
    id: 99, tema: "Emergencias",
    texto: "Ante un accidente de tránsito, lo primero que debe hacer es:",
    opciones: ["Huir del lugar", "Detenerse, señalizar la zona y llamar a emergencias", "Seguir manejando", "Discutir con el otro conductor"],
    correcta: 1
  },
  {
    id: 100, tema: "Emergencias",
    texto: "Si hay heridos en un accidente, usted debe:",
    opciones: ["Moverlos de inmediato siempre", "Evitar moverlos salvo peligro inminente y pedir ayuda médica", "Darles agua", "Ignorarlos"],
    correcta: 1
  },
  {
    id: 101, tema: "Emergencias",
    texto: "El número de emergencias de Carabineros en Chile es:",
    opciones: ["131", "132", "133", "134"],
    correcta: 2
  },
  {
    id: 102, tema: "Emergencias",
    texto: "El número del SAMU (ambulancia) en Chile es:",
    opciones: ["131", "132", "133", "130"],
    correcta: 0
  },
  {
    id: 103, tema: "Emergencias",
    texto: "El número de Bomberos en Chile es:",
    opciones: ["131", "132", "133", "135"],
    correcta: 1
  },
  {
    id: 104, tema: "Emergencias",
    texto: "Si su vehículo se queda detenido en la carretera, debe:",
    opciones: ["Dejarlo en la pista", "Orillarlo, encender las balizas y poner el triángulo reflectante", "Bajarse y caminar por la calzada", "Esperar dentro sin señalizar"],
    correcta: 1
  },
  {
    id: 105, tema: "Emergencias",
    texto: "En caso de incendio del vehículo, lo correcto es:",
    opciones: ["Abrir el capó de inmediato", "Detenerse, alejarse del vehículo y llamar a bomberos", "Seguir conduciendo", "Echar más combustible"],
    correcta: 1
  },

  // ===== MÁS SEÑALES Y NORMAS (variedad) =====
  {
    id: 106, tema: "Señales",
    texto: "¿Qué significa la señal de la imagen?",
    opciones: ["Velocidad mínima 100", "Límite máximo de 100 km/h", "Ruta 100", "100 metros hasta el peaje"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "limite", valor: "100" }
  },
  {
    id: 107, tema: "Señales",
    texto: "La señal de la imagen significa que debe:",
    opciones: ["Avanzar sin detenerse", "Detenerse completamente y luego avanzar si es seguro", "Girar a la izquierda", "Reducir a 20 km/h"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "pare" }
  },
  {
    id: 108, tema: "Señales",
    texto: "Ante la señal de la imagen, usted debe ceder el paso a:",
    opciones: ["Nadie", "Los vehículos que circulan por la vía preferente", "Solo peatones", "Solo buses"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "ceda" }
  },
  {
    id: 109, tema: "Normas",
    texto: "¿A qué distancia aproximada de una esquina/cruce está prohibido estacionar?",
    opciones: ["No hay restricción", "Dentro de la zona cercana a la esquina según la ley", "A 1 metro", "Solo de noche"],
    correcta: 1
  },
  {
    id: 110, tema: "Normas",
    texto: "Al enfrentar un ceda el paso, si no viene nadie por la vía preferente, usted:",
    opciones: ["Debe detenerse obligatoriamente", "Puede continuar sin detenerse, cediendo si fuera necesario", "Debe retroceder", "Debe tocar la bocina"],
    correcta: 1
  },
  {
    id: 111, tema: "Normas",
    texto: "La velocidad debe reducirse especialmente en:",
    opciones: ["Autopistas despejadas", "Zonas escolares, cruces, curvas y con mala visibilidad", "Rectas largas", "Bajadas"],
    correcta: 1
  },
  {
    id: 112, tema: "Conducción segura",
    texto: "Conducir con exceso de confianza o agresividad (volante):",
    opciones: ["Es más seguro", "Aumenta el riesgo de accidentes", "Mejora el tránsito", "No influye"],
    correcta: 1
  },
  {
    id: 113, tema: "Conducción segura",
    texto: "La posición correcta de las manos en el volante se asemeja a:",
    opciones: ["Una sola mano", "Las posiciones '9 y 3' o '10 y 2' del reloj", "Las manos abajo", "Sin tomar el volante"],
    correcta: 1
  },
  {
    id: 114, tema: "Conducción segura",
    texto: "Antes de retroceder (marcha atrás) con el vehículo, debe:",
    opciones: ["Acelerar fuerte", "Mirar hacia atrás y verificar que no haya personas u obstáculos", "Cerrar los ojos", "Tocar la bocina y retroceder"],
    correcta: 1
  },
  {
    id: 115, tema: "Normas",
    texto: "La berma de una carretera está destinada principalmente a:",
    opciones: ["Adelantar por ella", "Detenciones de emergencia, no para circular normalmente", "Estacionar siempre", "Correr carreras"],
    correcta: 1
  },
  {
    id: 116, tema: "Normas",
    texto: "Tocar la bocina está justificado principalmente para:",
    opciones: ["Saludar", "Advertir un peligro o evitar un accidente", "Apurar a otros por molestia", "Celebrar"],
    correcta: 1
  },
  {
    id: 117, tema: "Conducción segura",
    texto: "Mantener la vista 'lejos' (anticipar) mientras conduce permite:",
    opciones: ["Distraerse", "Anticipar situaciones y reaccionar a tiempo", "Ir más rápido sin riesgo", "Nada"],
    correcta: 1
  },
  {
    id: 118, tema: "Señales",
    texto: "La señal de la imagen (triángulo amarillo con '!') advierte:",
    opciones: ["Una prohibición", "Un peligro no especificado; conduzca con precaución", "Información turística", "Zona de estacionamiento"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "advertencia" }
  },
  {
    id: 119, tema: "Normas",
    texto: "En caso de duda sobre quién tiene la preferencia en un cruce, lo más seguro es:",
    opciones: ["Pasar rápido", "Ceder el paso y conducir a la defensiva", "Tocar la bocina y avanzar", "Cerrar los ojos"],
    correcta: 1
  },
  {
    id: 120, tema: "Conducción segura",
    texto: "La conducción a la defensiva consiste en:",
    opciones: ["Conducir agresivamente", "Anticiparse a los errores de otros y evitar riesgos", "Ir siempre al límite de velocidad", "Depender solo de los demás"],
    correcta: 1
  },

  // ===== AMPLIACIÓN: temas del Libro del Nuevo Conductor (CONASET) =====

  // --- Vehículo, frenado y mantención ---
  {
    id: 121, tema: "Mecánica básica",
    texto: "Si al frenar el vehículo se desvía hacia un lado, lo más probable es que:",
    opciones: ["Sea normal", "Haya un problema en los frenos o neumáticos; consulte al mecánico", "Falte combustible", "Deba acelerar"],
    correcta: 1
  },
  {
    id: 122, tema: "Mecánica básica",
    texto: "Un buen dibujo (labrado) en los neumáticos es importante porque:",
    opciones: ["Es más bonito", "Mejora el agarre y evacúa el agua, reduciendo el riesgo de aquaplaning", "Da más velocidad", "No sirve de nada"],
    correcta: 1
  },
  {
    id: 123, tema: "Mecánica básica",
    texto: "El agua del limpiaparabrisas y las plumillas en buen estado sirven para:",
    opciones: ["Decorar", "Mantener buena visibilidad en lluvia o suciedad", "Enfriar el motor", "Ahorrar combustible"],
    correcta: 1
  },
  {
    id: 124, tema: "Mecánica básica",
    texto: "Si una luz del vehículo (foco) está quemada, usted debe:",
    opciones: ["Seguir usándolo así", "Repararla cuanto antes, pues es un riesgo e infracción", "Taparla con cinta", "Usar las altas siempre"],
    correcta: 1
  },
  {
    id: 125, tema: "Mecánica básica",
    texto: "El uso del freno de mano (estacionamiento) es necesario al:",
    opciones: ["Conducir en carretera", "Estacionar, especialmente en pendientes", "Adelantar", "Encender el motor en movimiento"],
    correcta: 1
  },
  {
    id: 126, tema: "Conducción segura",
    texto: "A igualdad de condiciones, al duplicar la velocidad la distancia de frenado:",
    opciones: ["Se duplica", "Aumenta aproximadamente al cuádruple", "No cambia", "Disminuye"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "frenado" }
  },
  {
    id: 127, tema: "Conducción segura",
    texto: "La distancia de reacción es la que recorre el vehículo:",
    opciones: ["Mientras frena", "Desde que el conductor percibe el peligro hasta que acciona el freno", "Al estacionar", "En retroceso"],
    correcta: 1
  },
  {
    id: 128, tema: "Conducción segura",
    texto: "Factores que aumentan la distancia total de detención son:",
    opciones: ["Buen clima y descanso", "Alta velocidad, pavimento mojado, neumáticos gastados y fatiga", "Usar cinturón", "Conducir de día"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "frenado" }
  },

  // --- Alcohol, drogas, fatiga, salud ---
  {
    id: 129, tema: "Alcohol",
    texto: "El café o una ducha fría después de beber alcohol:",
    opciones: ["Eliminan el alcohol de la sangre", "No reducen la alcoholemia; solo el tiempo la disminuye", "Permiten conducir seguro", "Aumentan los reflejos"],
    correcta: 1
  },
  {
    id: 130, tema: "Alcohol",
    texto: "El consumo de drogas ilícitas al conducir:",
    opciones: ["Está permitido", "Está prohibido y altera la capacidad de conducir", "Mejora la atención", "Solo afecta de noche"],
    correcta: 1
  },
  {
    id: 131, tema: "Conducción segura",
    texto: "La principal recomendación ante la somnolencia al conducir es:",
    opciones: ["Subir la música y seguir", "Detenerse en un lugar seguro y descansar", "Abrir la ventana y acelerar", "Conducir más rápido para llegar antes"],
    correcta: 1
  },
  {
    id: 132, tema: "Conducción segura",
    texto: "Conducir enojado o muy estresado:",
    opciones: ["Mejora los reflejos", "Afecta el juicio y aumenta conductas de riesgo", "No influye", "Es recomendable"],
    correcta: 1
  },
  {
    id: 133, tema: "Conducción segura",
    texto: "Para una buena visión al conducir de noche conviene:",
    opciones: ["Usar lentes de sol", "Mantener limpio el parabrisas y no encandilar a otros", "Apagar el tablero", "Mirar directo a las luces que vienen"],
    correcta: 1
  },

  // --- Normas, velocidad y prioridad ---
  {
    id: 134, tema: "Normas",
    texto: "En una vía de doble sentido sin separador, usted debe circular:",
    opciones: ["Por el centro", "Por el costado derecho de su pista", "Por la izquierda", "Donde quiera"],
    correcta: 1
  },
  {
    id: 135, tema: "Normas",
    texto: "La luz verde del semáforo significa:",
    opciones: ["Avanzar siempre sin mirar", "Puede avanzar si la vía está despejada y es seguro", "Detenerse", "Tocar la bocina"],
    correcta: 1
  },
  {
    id: 136, tema: "Normas",
    texto: "Está prohibido adelantar:",
    opciones: ["En rectas despejadas", "En curvas, cruces, puentes y donde haya línea continua", "En autopistas", "Nunca está prohibido"],
    correcta: 1
  },
  {
    id: 137, tema: "Normas",
    texto: "Al circular por una pista exclusiva de buses (vía solo bus), un auto particular:",
    opciones: ["Puede usarla libremente", "No debe circular por ella salvo autorización", "Debe acelerar", "Tiene preferencia"],
    correcta: 1
  },
  {
    id: 138, tema: "Normas",
    texto: "La velocidad máxima puede ser menor a la general cuando:",
    opciones: ["Hay poco tránsito", "La señalización, el clima o la vía lo exijan", "Es de día", "El auto es nuevo"],
    correcta: 1
  },
  {
    id: 139, tema: "Normas",
    texto: "¿Qué significa una línea de color amarillo en el borde o centro de la calzada?",
    opciones: ["Zona de juegos", "Separación o restricción del tránsito (según su tipo)", "Nada", "Zona de estacionamiento gratuito"],
    correcta: 1
  },
  {
    id: 140, tema: "Normas",
    texto: "Si dos vehículos llegan a la vez a una intersección de igual categoría:",
    opciones: ["Pasa el más grande", "Cede quien tenga al otro por su derecha", "Pasa el más rápido", "Pasan juntos"],
    correcta: 1
  },
  {
    id: 141, tema: "Normas",
    texto: "El conductor que sale de un estacionamiento o propiedad a la vía:",
    opciones: ["Tiene preferencia", "Debe ceder el paso a los vehículos y peatones que circulan", "Puede tocar la bocina y salir", "Debe acelerar"],
    correcta: 1
  },
  {
    id: 142, tema: "Normas",
    texto: "Transportar carga que sobresale o mal asegurada:",
    opciones: ["Está permitido", "Es peligroso e infracción; debe ir asegurada y señalizada", "No importa", "Solo de día"],
    correcta: 1
  },
  {
    id: 143, tema: "Normas",
    texto: "El uso de la bocina en zonas de hospitales o escuelas:",
    opciones: ["Es libre", "Debe evitarse salvo emergencia", "Es obligatorio", "Está recomendado"],
    correcta: 1
  },

  // --- Señales adicionales (con imagen) ---
  {
    id: 144, tema: "Señales",
    texto: "¿Qué significa la señal de la imagen?",
    opciones: ["Velocidad mínima 50", "Límite máximo de 50 km/h", "Ruta 50", "50 metros al peaje"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "limite", valor: "50" }
  },
  {
    id: 145, tema: "Señales",
    texto: "La señal de la imagen (círculo rojo con barra) indica de forma general:",
    opciones: ["Una obligación", "Una prohibición", "Información", "Preferencia de paso"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "prohibido" }
  },
  {
    id: 146, tema: "Señales",
    texto: "Ante la señal de la imagen usted debe:",
    opciones: ["Mantener la velocidad", "Extremar la precaución por un peligro próximo", "Acelerar", "Estacionar"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "advertencia" }
  },
  {
    id: 147, tema: "Señales",
    texto: "La señal de la imagen advierte principalmente la presencia de:",
    opciones: ["Un peaje", "Peatones / cruce de peatones", "Un hospital", "Una bomba de bencina"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "peatonal" }
  },
  {
    id: 148, tema: "Señales",
    texto: "Si la señal de la imagen está presente, adelantar está:",
    opciones: ["Permitido", "Prohibido", "Obligatorio", "Recomendado"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "noAdelantar" }
  },
  {
    id: 149, tema: "Señales",
    texto: "Las señales de obligación (fondo azul) indican:",
    opciones: ["Lo que está prohibido", "Una acción que el conductor debe realizar", "Un peligro", "Un servicio"],
    correcta: 1
  },
  {
    id: 150, tema: "Señales",
    texto: "Un semáforo peatonal en rojo para el peatón significa que este:",
    opciones: ["Puede cruzar", "No debe cruzar", "Debe correr", "Tiene preferencia"],
    correcta: 1
  },

  // --- Convivencia vial y usuarios vulnerables ---
  {
    id: 151, tema: "Convivencia vial",
    texto: "Los usuarios más vulnerables de la vía son:",
    opciones: ["Los camiones", "Peatones, ciclistas y motociclistas", "Los autos nuevos", "Los buses"],
    correcta: 1
  },
  {
    id: 152, tema: "Convivencia vial",
    texto: "Al abrir la puerta del auto en la calle, el riesgo principal es:",
    opciones: ["Rayar la pintura", "Golpear a ciclistas o motos que circulan por el costado", "Gastar la bisagra", "Ninguno"],
    correcta: 1
  },
  {
    id: 153, tema: "Convivencia vial",
    texto: "Cuando un peatón comienza a cruzar por un paso habilitado, el conductor debe:",
    opciones: ["Apurarlo con la bocina", "Detenerse y permitir el cruce", "Pasar rápido", "Acercarse mucho"],
    correcta: 1
  },
  {
    id: 154, tema: "Convivencia vial",
    texto: "Frente a un vehículo escolar detenido con niños subiendo o bajando, debe:",
    opciones: ["Adelantar rápido", "Reducir la velocidad y extremar precaución", "Tocar la bocina", "Seguir igual"],
    correcta: 1
  },
  {
    id: 155, tema: "Convivencia vial",
    texto: "El respeto y la cortesía en el tránsito (manejo cooperativo):",
    opciones: ["Hacen perder tiempo", "Reducen conflictos y accidentes", "No sirven", "Son obligatorios solo para peatones"],
    correcta: 1
  },

  // --- Emergencias y primeros auxilios ---
  {
    id: 156, tema: "Emergencias",
    texto: "El número único de emergencias en Chile (SAMU/urgencia) desde celular es, entre otros:",
    opciones: ["131 (SAMU) o 133 (Carabineros)", "Cualquier número", "No existe", "Solo 112"],
    correcta: 0
  },
  {
    id: 157, tema: "Emergencias",
    texto: "Si presencia un accidente, al llamar a emergencias debe informar:",
    opciones: ["Solo su nombre", "Lugar exacto, número de heridos y tipo de accidente", "La marca de su auto", "Nada"],
    correcta: 1
  },
  {
    id: 158, tema: "Emergencias",
    texto: "Ante una persona inconsciente tras un accidente, lo primero es:",
    opciones: ["Darle agua", "Verificar si respira y pedir ayuda médica, sin moverla innecesariamente", "Sentarla rápido", "Dejarla sola"],
    correcta: 1
  },
  {
    id: 159, tema: "Emergencias",
    texto: "Un botiquín básico en el vehículo es:",
    opciones: ["Innecesario", "Recomendable para atender emergencias menores", "Solo para viajes al extranjero", "Obligatorio en motos únicamente"],
    correcta: 1
  },
  {
    id: 160, tema: "Emergencias",
    texto: "Si debe cambiar un neumático en la carretera, lo más seguro es:",
    opciones: ["Hacerlo en la pista", "Orillarse completamente, señalizar y hacerlo lejos del tránsito", "Pedir que otros frenen", "Hacerlo de noche sin luces"],
    correcta: 1
  },

  // --- Documentación y responsabilidad ---
  {
    id: 161, tema: "Documentación",
    texto: "La licencia de conducir debe renovarse:",
    opciones: ["Nunca", "Según el plazo de vigencia que indica el documento", "Cada mes", "Solo si se pierde"],
    correcta: 1
  },
  {
    id: 162, tema: "Documentación",
    texto: "Conducir con la licencia vencida:",
    opciones: ["Es legal", "Es una infracción", "Está permitido 1 año más", "No tiene importancia"],
    correcta: 1
  },
  {
    id: 163, tema: "Documentación",
    texto: "El conductor es responsable de:",
    opciones: ["Solo de sí mismo", "Conducir de forma segura y respetar a los demás usuarios de la vía", "Nada", "Solo del vehículo"],
    correcta: 1
  },
  {
    id: 164, tema: "Documentación",
    texto: "Acumular infracciones graves o gravísimas puede llevar a:",
    opciones: ["Un premio", "La suspensión o cancelación de la licencia", "Nada", "Un descuento"],
    correcta: 1
  },
  {
    id: 165, tema: "Normas",
    texto: "Un conductor que participa en un accidente y se da a la fuga:",
    opciones: ["No comete falta", "Comete una infracción grave con consecuencias legales", "Hace lo correcto", "Solo si hay daños menores"],
    correcta: 1
  },

  // --- Más conducción segura / defensiva ---
  {
    id: 166, tema: "Conducción segura",
    texto: "Mantener una 'burbuja de seguridad' alrededor del vehículo significa:",
    opciones: ["Ir pegado a otros", "Dejar espacio suficiente a todos lados para reaccionar", "Conducir lento siempre", "No usar espejos"],
    correcta: 1
  },
  {
    id: 167, tema: "Conducción segura",
    texto: "Los espejos retrovisores deben ajustarse:",
    opciones: ["Después de partir", "Antes de iniciar la marcha, para ver bien alrededor", "Nunca", "Solo el interior"],
    correcta: 1
  },
  {
    id: 168, tema: "Conducción segura",
    texto: "Al entrar a una curva, lo correcto es:",
    opciones: ["Acelerar al máximo", "Reducir la velocidad antes de la curva y luego acelerar suavemente", "Frenar fuerte dentro de la curva", "Cerrar los ojos"],
    correcta: 1
  },
  {
    id: 169, tema: "Conducción segura",
    texto: "En un camino de ripio o grava, conviene:",
    opciones: ["Ir rápido", "Reducir la velocidad porque el agarre es menor", "Frenar bruscamente", "Soltar el volante"],
    correcta: 1
  },
  {
    id: 170, tema: "Conducción segura",
    texto: "El cansancio en viajes largos se combate principalmente:",
    opciones: ["Con bebidas energéticas", "Con descansos periódicos cada ciertas horas", "Conduciendo más rápido", "Sin detenerse"],
    correcta: 1
  },
  {
    id: 171, tema: "Conducción segura",
    texto: "La luz direccional debe apagarse:",
    opciones: ["Nunca", "Una vez completada la maniobra de giro o cambio de pista", "Antes de girar", "Al estacionar solamente"],
    correcta: 1
  },
  {
    id: 172, tema: "Conducción segura",
    texto: "Para ingresar a una autopista desde una pista de aceleración, debe:",
    opciones: ["Detenerse al final", "Adaptar la velocidad al flujo y ceder a los que circulan", "Entrar sin mirar", "Ir muy lento"],
    correcta: 1
  },
  {
    id: 173, tema: "Conducción segura",
    texto: "Si debe detenerse por una emergencia en autopista, lo correcto es:",
    opciones: ["Parar en la pista", "Usar la berma/pista de emergencia y señalizar", "Retroceder", "Cruzar a pie"],
    correcta: 1
  },

  // --- Medio ambiente y conducción eficiente ---
  {
    id: 174, tema: "Conducción segura",
    texto: "Una conducción eficiente (menos consumo y contaminación) implica:",
    opciones: ["Acelerar y frenar bruscamente", "Mantener velocidad constante y anticipar las frenadas", "Dejar el motor encendido detenido mucho rato", "Usar marchas bajas siempre"],
    correcta: 1
  },
  {
    id: 175, tema: "Normas",
    texto: "Dejar el motor encendido innecesariamente mientras está detenido:",
    opciones: ["Ahorra combustible", "Contamina y gasta combustible sin necesidad", "Es obligatorio", "Mejora el motor"],
    correcta: 1
  },

  // --- Repaso de velocidades y conceptos clave ---
  {
    id: 176, tema: "Normas",
    texto: "La velocidad máxima general en zona urbana en Chile es de 50 km/h, salvo que:",
    opciones: ["El conductor decida otra", "La señalización indique una velocidad distinta", "Sea de noche", "Haya poco tránsito"],
    correcta: 1
  },
  {
    id: 177, tema: "Normas",
    texto: "La velocidad excesiva o imprudente:",
    opciones: ["Demuestra habilidad", "Reduce el tiempo de reacción y aumenta la gravedad de los choques", "No tiene relación con los accidentes", "Es segura en autos nuevos"],
    correcta: 1
  },
  {
    id: 178, tema: "Conducción segura",
    texto: "Ante un charco o agua acumulada en la pista a cierta velocidad, el riesgo es:",
    opciones: ["Ninguno", "Perder adherencia (aquaplaning) y el control del vehículo", "Ensuciar el auto", "Gastar bencina"],
    correcta: 1
  },
  {
    id: 179, tema: "Conducción segura",
    texto: "Si pierde adherencia por aquaplaning, debe:",
    opciones: ["Frenar fuerte y girar", "Soltar el acelerador, mantener el volante firme y no frenar bruscamente", "Acelerar", "Soltar el volante"],
    correcta: 1
  },
  {
    id: 180, tema: "Conducción segura",
    texto: "Usar el teléfono con 'manos libres' mientras conduce:",
    opciones: ["Es 100% seguro", "Sigue siendo una distracción; lo más seguro es evitarlo", "Mejora la concentración", "Es obligatorio"],
    correcta: 1
  },

  // --- Más señales / interpretación ---
  {
    id: 181, tema: "Señales",
    texto: "La señal de la imagen con el número 60 indica el límite máximo. Circular a 80 km/h sería:",
    opciones: ["Correcto", "Una infracción por exceso de velocidad", "Recomendado", "Obligatorio"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "limite", valor: "60" }
  },
  {
    id: 182, tema: "Señales",
    texto: "Ante la señal PARE de la imagen, aunque no venga nadie, usted debe:",
    opciones: ["Reducir solamente", "Detenerse por completo antes de continuar", "Tocar la bocina", "Acelerar"],
    correcta: 1,
    imagen: { tipo: "svg", nombre: "pare" }
  },
  {
    id: 183, tema: "Señales",
    texto: "Las señales transitorias (por obras en la vía) suelen ser de color:",
    opciones: ["Azul", "Naranjo/amarillo y requieren extrema precaución", "Verde", "Blanco"],
    correcta: 1
  },
  {
    id: 184, tema: "Señales",
    texto: "Una flecha pintada en el pavimento indicando una dirección obliga a:",
    opciones: ["Ignorarla", "Seguir la dirección o maniobra que indica desde esa pista", "Detenerse", "Retroceder"],
    correcta: 1
  },
  {
    id: 185, tema: "Señales",
    texto: "Las luces del semáforo, de arriba hacia abajo, son:",
    opciones: ["Verde, amarillo, rojo", "Rojo, amarillo, verde", "Amarillo, rojo, verde", "Rojo, verde, amarillo"],
    correcta: 1
  },

  // --- Situaciones de manejo ---
  {
    id: 186, tema: "Conducción segura",
    texto: "Si un vehículo lo adelanta, usted debe:",
    opciones: ["Acelerar para impedirlo", "Mantener o reducir su velocidad y permitir la maniobra", "Tocar la bocina", "Cerrarle el paso"],
    correcta: 1
  },
  {
    id: 187, tema: "Conducción segura",
    texto: "Antes de adelantar a otro vehículo debe asegurarse de:",
    opciones: ["Nada en particular", "Tener visibilidad y espacio suficiente, y señalizar", "Ir muy pegado antes", "Apagar las luces"],
    correcta: 1
  },
  {
    id: 188, tema: "Conducción segura",
    texto: "Al circular en caravana o congestión, mantener distancia ayuda a:",
    opciones: ["Avanzar más rápido", "Evitar choques en cadena por frenadas", "Nada", "Gastar menos bencina solamente"],
    correcta: 1
  },
  {
    id: 189, tema: "Normas",
    texto: "El estacionamiento en doble fila:",
    opciones: ["Está permitido", "Está prohibido porque obstruye el tránsito", "Es recomendable", "Solo de día"],
    correcta: 1
  },
  {
    id: 190, tema: "Normas",
    texto: "Al estacionar en una pendiente cuesta abajo, conviene girar las ruedas:",
    opciones: ["Hacia el centro de la calle", "Hacia la cuneta/vereda y poner freno de mano", "No importa", "Hacia arriba"],
    correcta: 1
  },

  // --- Factores humanos ---
  {
    id: 191, tema: "Conducción segura",
    texto: "La visión del conductor se ve afectada negativamente por:",
    opciones: ["Buen descanso", "El alcohol, la fatiga y la falta de luz", "Usar cinturón", "Conducir de día"],
    correcta: 1
  },
  {
    id: 192, tema: "Conducción segura",
    texto: "Mirar constantemente el celular aunque sea unos segundos:",
    opciones: ["Es seguro", "Equivale a conducir 'a ciegas' varios metros; es muy peligroso", "Mejora la ruta", "No distrae"],
    correcta: 1
  },
  {
    id: 193, tema: "Conducción segura",
    texto: "Un conductor responsable, si está muy cansado, debe:",
    opciones: ["Seguir hasta llegar", "Detenerse a descansar o ceder la conducción", "Tomar bebidas energéticas y seguir", "Conducir más rápido"],
    correcta: 1
  },
  {
    id: 194, tema: "Normas",
    texto: "El exceso de confianza en conductores experimentados:",
    opciones: ["Elimina los riesgos", "Puede llevar a descuidos y accidentes", "Es siempre positivo", "No existe"],
    correcta: 1
  },

  // --- Cierre: repaso general ---
  {
    id: 195, tema: "Normas",
    texto: "El cinturón de seguridad debe usarse:",
    opciones: ["Solo en carretera", "Siempre, desde el inicio del viaje y en todos los asientos", "Solo de noche", "Solo el conductor"],
    correcta: 1
  },
  {
    id: 196, tema: "Normas",
    texto: "Respetar las señales y normas de tránsito tiene como fin principal:",
    opciones: ["Recaudar multas", "Proteger la vida y seguridad de todos los usuarios de la vía", "Molestar a los conductores", "Nada"],
    correcta: 1
  },
  {
    id: 197, tema: "Conducción segura",
    texto: "La actitud correcta frente a un conductor agresivo es:",
    opciones: ["Responder con agresividad", "Mantener la calma, no provocar y conducir a la defensiva", "Cerrarle el paso", "Tocar la bocina insistentemente"],
    correcta: 1
  },
  {
    id: 198, tema: "Conducción segura",
    texto: "En zonas de alta concentración de peatones (centro de la ciudad) debe:",
    opciones: ["Aumentar la velocidad", "Conducir más lento y atento a cruces imprevistos", "Tocar la bocina", "Usar luces altas"],
    correcta: 1
  },
  {
    id: 199, tema: "Normas",
    texto: "Antes de iniciar la marcha, el conductor y los pasajeros deben:",
    opciones: ["Encender la radio", "Ponerse el cinturón de seguridad", "Abrir las ventanas", "Nada"],
    correcta: 1
  },
  {
    id: 200, tema: "Conducción segura",
    texto: "El objetivo final de todo conductor seguro es:",
    opciones: ["Llegar primero", "Llegar sano y salvo, sin poner en riesgo a nadie", "Ahorrar tiempo a toda costa", "Demostrar habilidad"],
    correcta: 1
  },

  // ===== SEÑALES DE TRÁNSITO CON IMAGEN ("La imagen corresponde a...") =====
  {
    id: 202, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal:",
    opciones: ["No entrar / acceso prohibido", "Ceda el paso", "Estacionamiento permitido", "Vía preferente"],
    correcta: 0,
    dificultad: "facil",
    imagen: { tipo: "svg", nombre: "noEntrar" }
  },
  {
    id: 203, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal:",
    opciones: ["Zona de estacionamiento", "Prohibido estacionar", "Peaje", "Fin de restricción"],
    correcta: 1,
    dificultad: "facil",
    imagen: { tipo: "svg", nombre: "noEstacionar" }
  },
  {
    id: 204, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal:",
    opciones: ["Viraje obligatorio a la izquierda", "Prohibido virar a la izquierda", "Curva a la izquierda", "Doble sentido"],
    correcta: 1,
    dificultad: "media",
    imagen: { tipo: "svg", nombre: "noVirarIzq" }
  },
  {
    id: 205, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal:",
    opciones: ["Cruce de peatones", "Prohibido el paso de peatones", "Zona de juegos", "Paradero"],
    correcta: 1,
    dificultad: "media",
    imagen: { tipo: "svg", nombre: "noPeatones" }
  },
  {
    id: 206, tema: "Señales",
    texto: "La imagen que se presenta corresponde a una señal de advertencia de:",
    opciones: ["Curva pronunciada a la derecha", "Prohibido girar a la derecha", "Vía sin salida", "Rotonda"],
    correcta: 0,
    dificultad: "media",
    imagen: { tipo: "svg", nombre: "curvaDerecha" }
  },
  {
    id: 207, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal de advertencia:",
    opciones: ["Zona de juegos prohibida", "Niños / proximidad de escuela", "Fin de zona escolar", "Peatones prohibidos"],
    correcta: 1,
    dificultad: "facil",
    imagen: { tipo: "svg", nombre: "ninos" }
  },
  {
    id: 208, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal de advertencia:",
    opciones: ["Granja cercana", "Animales en el camino", "Prohibido el paso de animales", "Zona de pastoreo"],
    correcta: 1,
    dificultad: "media",
    imagen: { tipo: "svg", nombre: "animales" }
  },
  {
    id: 209, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal de advertencia:",
    opciones: ["Badén o resalto (lomo de toro)", "Puente angosto", "Pendiente pronunciada", "Zona de derrumbes"],
    correcta: 0,
    dificultad: "media",
    imagen: { tipo: "svg", nombre: "baden" }
  },
  {
    id: 210, tema: "Señales",
    texto: "La imagen que se presenta advierte que más adelante hay:",
    opciones: ["Un semáforo", "Un peaje", "Una estación de servicio", "Un hospital"],
    correcta: 0,
    dificultad: "facil",
    imagen: { tipo: "svg", nombre: "semaforoAdelante" }
  },
  {
    id: 211, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal de advertencia:",
    opciones: ["Cruce o intersección", "Hospital", "Zona de iglesia", "Fin de camino"],
    correcta: 0,
    dificultad: "media",
    imagen: { tipo: "svg", nombre: "cruce" }
  },
  {
    id: 212, tema: "Señales",
    texto: "La imagen que se presenta (señal informativa) indica la proximidad de:",
    opciones: ["Un hospital o centro asistencial", "Una farmacia", "Un cruce ferroviario", "Una zona de camping"],
    correcta: 0,
    dificultad: "facil",
    imagen: { tipo: "svg", nombre: "hospital" }
  },
  {
    id: 213, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal:",
    opciones: ["Prohibido estacionar", "Estacionamiento permitido", "Parada de buses", "Peaje"],
    correcta: 1,
    dificultad: "facil",
    imagen: { tipo: "svg", nombre: "estacionamiento" }
  },
  {
    id: 214, tema: "Señales",
    texto: "La imagen que se presenta (señal de obligación) indica:",
    opciones: ["Prohibido seguir derecho", "Sentido obligatorio: siga derecho", "Fin de vía", "Ceda el paso"],
    correcta: 1,
    dificultad: "media",
    imagen: { tipo: "svg", nombre: "sentidoObligatorio" }
  },
  {
    id: 215, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal:",
    opciones: ["Ceda el paso", "Pare / detención obligatoria", "No entrar", "Prohibido adelantar"],
    correcta: 1,
    dificultad: "facil",
    imagen: { tipo: "svg", nombre: "pare" }
  },
  {
    id: 216, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal:",
    opciones: ["Pare", "Ceda el paso", "Prohibido estacionar", "Velocidad mínima"],
    correcta: 1,
    dificultad: "facil",
    imagen: { tipo: "svg", nombre: "ceda" }
  },
  {
    id: 217, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal:",
    opciones: ["Prohibido adelantar o rebasar", "Doble sentido de tránsito", "Prohibido estacionar", "Camino resbaladizo"],
    correcta: 0,
    dificultad: "media",
    imagen: { tipo: "svg", nombre: "noAdelantar" }
  },
  {
    id: 218, tema: "Señales",
    texto: "La imagen que se presenta corresponde a una señal que advierte:",
    opciones: ["Un peligro no especificado; conduzca con precaución", "Una prohibición", "Un servicio turístico", "Vía preferente"],
    correcta: 0,
    dificultad: "facil",
    imagen: { tipo: "svg", nombre: "advertencia" }
  },
  {
    id: 219, tema: "Señales",
    texto: "La imagen que se presenta (señal informativa azul) indica:",
    opciones: ["Prohibido el paso de peatones", "Cruce o zona de peatones", "Fin de acera", "Zona de carga"],
    correcta: 1,
    dificultad: "facil",
    imagen: { tipo: "svg", nombre: "peatonal" }
  },
  {
    id: 220, tema: "Señales",
    texto: "La imagen que se presenta corresponde a una señal reglamentaria de:",
    opciones: ["Prohibición (círculo rojo con barra diagonal)", "Advertencia", "Información", "Obligación"],
    correcta: 0,
    dificultad: "media",
    imagen: { tipo: "svg", nombre: "prohibido" }
  },
  {
    id: 221, tema: "Señales",
    texto: "La imagen que se presenta corresponde a la señal:",
    opciones: ["Velocidad mínima de 80 km/h", "Límite máximo de 80 km/h", "Ruta 80", "Distancia de 80 metros"],
    correcta: 1,
    dificultad: "facil",
    imagen: { tipo: "svg", nombre: "limite", valor: "80" }
  },

  // ===== AMPLIACIÓN BASADA EN EL LIBRO DEL CONDUCTOR (CONASET) =====

  // --- Drogas y estupefacientes ---
  {
    id: 222, tema: "Drogas", dificultad: "media",
    texto: "¿Cuál es el principal riesgo de conducir bajo el efecto de drogas?",
    opciones: ["Ninguno si es poca cantidad", "Actúan sobre el cerebro y alteran percepción, atención, coordinación y tiempo de reacción", "Solo afectan de noche", "Mejoran la concentración"],
    correcta: 1
  },
  {
    id: 223, tema: "Drogas", dificultad: "media",
    texto: "La marihuana, respecto a la conducción, principalmente:",
    opciones: ["Mejora los reflejos", "Altera la percepción, aumenta el tiempo de reacción y produce somnolencia", "No tiene efectos", "Es un estimulante seguro"],
    correcta: 1
  },
  {
    id: 224, tema: "Drogas", dificultad: "media",
    texto: "La cocaína es un estimulante que al conducir puede provocar:",
    opciones: ["Conducción más tranquila", "Comportamiento competitivo o agresivo y mayor distracción", "Mejor cálculo de distancias", "Ningún efecto"],
    correcta: 1
  },
  {
    id: 225, tema: "Drogas", dificultad: "facil",
    texto: "Si has consumido cualquier droga, lo correcto es:",
    opciones: ["Conducir con cuidado", "No conducir, ya que todo consumo implica un riesgo", "Esperar 10 minutos y conducir", "Conducir solo distancias cortas"],
    correcta: 1
  },
  {
    id: 226, tema: "Drogas", dificultad: "dificil",
    texto: "Esperar a que 'pasen' los efectos de una droga antes de conducir:",
    opciones: ["Garantiza conducir seguro", "No es garantía de poder conducir de forma segura", "Elimina todo riesgo", "Solo aplica al alcohol"],
    correcta: 1
  },
  {
    id: 227, tema: "Drogas", dificultad: "dificil",
    texto: "El consumo de éxtasis al conducir puede provocar, entre otros efectos:",
    opciones: ["Mejor visión nocturna", "Mayor sensibilidad a la luz, deslumbramientos e ilusiones ópticas", "Mayor coordinación", "Reflejos más rápidos"],
    correcta: 1
  },

  // --- Visión de túnel y capacidad visual ---
  {
    id: 228, tema: "Factores humanos", dificultad: "dificil",
    texto: "El fenómeno de 'visión de túnel' consiste en que:",
    opciones: ["Se ve mejor de noche", "El campo visual se reduce a medida que aumenta la velocidad", "Mejora la visión lateral", "Se agranda el campo visual"],
    correcta: 1
  },
  {
    id: 229, tema: "Factores humanos", dificultad: "dificil",
    texto: "Además de la alta velocidad, la visión de túnel también se presenta por:",
    opciones: ["Buen descanso", "Estrés y consumo de medicamentos o drogas", "Conducir de día", "Usar cinturón"],
    correcta: 1
  },
  {
    id: 230, tema: "Factores humanos", dificultad: "media",
    texto: "Al conducir en la oscuridad, aunque no mires directamente los focos del vehículo que viene de frente:",
    opciones: ["No ocurre nada", "Pueden presentarse efectos de ceguera temporal por reflejos de luz en el ojo", "Mejora tu visión", "Ves mejor los colores"],
    correcta: 1
  },
  {
    id: 231, tema: "Factores humanos", dificultad: "media",
    texto: "En condiciones de niebla u oscuridad, el tránsito que viene en sentido contrario tiende a:",
    opciones: ["Verse más cerca", "Parecer que está más lejos de lo que realmente está", "Verse igual que de día", "Desaparecer"],
    correcta: 1
  },

  // --- Enfermedades en la conducción ---
  {
    id: 232, tema: "Salud y conducción", dificultad: "media",
    texto: "Si una enfermedad o condición puede afectar tu conducción, lo responsable es:",
    opciones: ["Ignorarlo", "Consultar al médico sobre los riesgos y precauciones de conducir", "Conducir solo de día", "Dejar de usar la licencia"],
    correcta: 1
  },
  {
    id: 233, tema: "Salud y conducción", dificultad: "dificil",
    texto: "Según el libro, los grupos de enfermedades con mayor riesgo para la conducción son:",
    opciones: ["Solo resfríos", "Trastornos neurológicos, adicciones y diabetes", "Ninguna enfermedad influye", "Solo problemas de piel"],
    correcta: 1
  },
  {
    id: 234, tema: "Salud y conducción", dificultad: "media",
    texto: "Durante un estornudo de un segundo a 90 km/h, el vehículo recorre sin atención a la vía aproximadamente:",
    opciones: ["5 metros", "25 metros", "1 metro", "50 metros"],
    correcta: 1
  },
  {
    id: 235, tema: "Salud y conducción", dificultad: "facil",
    texto: "Si no te sientes bien de salud antes de conducir, debes:",
    opciones: ["Conducir igual", "No conducir", "Conducir más rápido para llegar antes", "Tomar un café y conducir"],
    correcta: 1
  },

  // --- Medicamentos ---
  {
    id: 236, tema: "Medicamentos", dificultad: "dificil",
    texto: "Según el libro, conducir bajo los efectos de ciertos antihistamínicos equivale a hacerlo con una alcoholemia de:",
    opciones: ["0,0 g/L", "0,5 a 0,8 g/L", "0,1 g/L", "Más de 2,0 g/L"],
    correcta: 1
  },
  {
    id: 237, tema: "Medicamentos", dificultad: "media",
    texto: "Antes de conducir habiendo tomado un medicamento que produce somnolencia, lo recomendable es:",
    opciones: ["Conducir normalmente", "Consultar al médico sobre sus efectos y no conducir si afecta tus capacidades", "Tomar el doble de dosis", "Conducir solo en ciudad"],
    correcta: 1
  },
  {
    id: 238, tema: "Medicamentos", dificultad: "media",
    texto: "Mezclar antihistamínicos con alcohol u otros medicamentos:",
    opciones: ["No tiene riesgo", "Puede producir efectos no deseados y es peligroso", "Mejora el efecto", "Es recomendable"],
    correcta: 1
  },
  {
    id: 239, tema: "Medicamentos", dificultad: "media",
    texto: "Los psicofármacos (ansiolíticos, sedantes, antidepresivos) al conducir:",
    opciones: ["No afectan", "Pueden alterar las capacidades para una conducción segura", "Mejoran los reflejos", "Solo afectan a mayores de edad"],
    correcta: 1
  },

  // --- Cansancio, sueño y fatiga ---
  {
    id: 240, tema: "Fatiga y sueño", dificultad: "media",
    texto: "El cansancio y el sueño al conducir principalmente:",
    opciones: ["Mejoran la atención", "Aumentan el tiempo de reacción y las distracciones", "No influyen de día", "Solo afectan en carretera"],
    correcta: 1
  },
  {
    id: 241, tema: "Fatiga y sueño", dificultad: "media",
    texto: "¿En qué situación favorece más la aparición de somnolencia al volante?",
    opciones: ["Ciudad con mucho tráfico", "Carretera recta, monótona y sin tráfico", "Lluvia intensa", "Zona escolar"],
    correcta: 1
  },
  {
    id: 242, tema: "Fatiga y sueño", dificultad: "facil",
    texto: "¿Es cierto que el sueño al conducir solo aparece de noche?",
    opciones: ["Sí, solo de noche", "No, el sueño puede aparecer también de día por muchas causas", "Solo en invierno", "Solo después de comer"],
    correcta: 1
  },
  {
    id: 243, tema: "Fatiga y sueño", dificultad: "facil",
    texto: "Ante los primeros signos de sueño o fatiga al conducir, lo correcto es:",
    opciones: ["Acelerar para llegar antes", "Detenerse en un lugar seguro y descansar", "Abrir la ventana y seguir", "Beber alcohol"],
    correcta: 1
  },

  // --- Equilibrio emocional y estrés ---
  {
    id: 244, tema: "Factores humanos", dificultad: "media",
    texto: "Un nivel de estrés demasiado alto al conducir puede provocar:",
    opciones: ["Mejor desempeño siempre", "Reacciones impulsivas y reducción del campo de atención", "Más seguridad", "Ningún efecto"],
    correcta: 1
  },
  {
    id: 245, tema: "Factores humanos", dificultad: "media",
    texto: "Una persona con depresión, respecto a la conducción, debería evitar:",
    opciones: ["Conducir siempre", "Conducir de noche, por mucho tiempo o en entornos monótonos", "Usar el cinturón", "Conducir acompañada"],
    correcta: 1
  },

  // --- Conducción en la oscuridad ---
  {
    id: 246, tema: "Conducción segura", dificultad: "media",
    texto: "Si otro vehículo te encandila de frente con sus luces, debes:",
    opciones: ["Mirar directo a sus luces", "Dirigir la mirada al borde derecho de tu pista y reducir la velocidad", "Encender tus luces altas", "Acelerar"],
    correcta: 1
  },
  {
    id: 247, tema: "Conducción segura", dificultad: "media",
    texto: "¿Qué luces se deben usar de noche en los caminos y vías interurbanas (fuera de ciudad)?",
    opciones: ["Luces bajas", "Luces altas, bajándolas al cruzarse con otro vehículo", "Ninguna", "Solo las balizas"],
    correcta: 1
  },
  {
    id: 248, tema: "Mecánica básica", dificultad: "media",
    texto: "Las luces neblineras (antiniebla) deben usarse:",
    opciones: ["Siempre", "Solo cuando la visibilidad está muy reducida por niebla o lluvia intensa, apagándolas al mejorar", "De día", "Para adelantar"],
    correcta: 1
  },

  // --- Condiciones climáticas ---
  {
    id: 249, tema: "Clima", dificultad: "media",
    texto: "¿Por qué conviene no usar luces altas cuando hay niebla o nieve?",
    opciones: ["Gastan batería", "La luz se refleja en las partículas y encandila al propio conductor", "Son ilegales", "No iluminan nada"],
    correcta: 1
  },
  {
    id: 250, tema: "Clima", dificultad: "dificil",
    texto: "Con la calzada cubierta de hielo, la distancia de frenado puede aumentar hasta:",
    opciones: ["El doble", "Hasta 10 veces", "No cambia", "La mitad"],
    correcta: 1
  },
  {
    id: 251, tema: "Clima", dificultad: "media",
    texto: "El 'aquaplaning' (hidroplaneo) se produce cuando:",
    opciones: ["El motor se recalienta", "Una capa de agua se interpone entre los neumáticos y la calzada y el vehículo pierde adherencia", "Se acaba el combustible", "Hace mucho calor"],
    correcta: 1
  },
  {
    id: 252, tema: "Clima", dificultad: "media",
    texto: "La mejor forma de evitar el aquaplaning es:",
    opciones: ["Acelerar", "Moderar la velocidad para que los neumáticos desalojen el agua", "Frenar fuerte", "Inflar menos los neumáticos"],
    correcta: 1
  },
  {
    id: 253, tema: "Clima", dificultad: "facil",
    texto: "Cuando caen las primeras gotas de lluvia (o copos de nieve), la calzada es especialmente peligrosa porque:",
    opciones: ["Se ve mejor", "Se mezclan con polvo y aceite y la vuelven muy resbaladiza", "Mejora el agarre", "No pasa nada"],
    correcta: 1
  },
  {
    id: 254, tema: "Clima", dificultad: "media",
    texto: "Al conducir con nieve o hielo, lo recomendable es:",
    opciones: ["Movimientos bruscos del volante", "Conducir lento y suave, sin frenadas ni giros bruscos, aumentando la distancia", "Frenar y girar a la vez", "Acelerar en las curvas"],
    correcta: 1
  },

  // --- Cruces ferroviarios ---
  {
    id: 255, tema: "Normas", dificultad: "media",
    texto: "En un cruce ferroviario, la preferencia de paso la tiene siempre:",
    opciones: ["El vehículo", "El tren", "El que llegue primero", "El vehículo más grande"],
    correcta: 1
  },
  {
    id: 256, tema: "Normas", dificultad: "dificil",
    texto: "Un tren que circula a 100 km/h necesita para detenerse aproximadamente:",
    opciones: ["50 metros", "Entre 800 y 1.000 metros", "100 metros", "10 metros"],
    correcta: 1
  },
  {
    id: 257, tema: "Normas", dificultad: "media",
    texto: "Antes de cruzar una vía férrea, además de mirar a ambos lados conviene:",
    opciones: ["Subir la música", "Apagar la radio para poder escuchar", "Acelerar al máximo", "Tocar la bocina"],
    correcta: 1
  },
  {
    id: 258, tema: "Normas", dificultad: "dificil",
    texto: "Si tu vehículo se detiene (queda detenido) sobre un cruce ferroviario y no hay tren a la vista, lo primero es:",
    opciones: ["Esperar dentro del auto", "Hacer salir a todas las personas del vehículo", "Revisar el motor con calma", "Llamar por teléfono sin bajarse"],
    correcta: 1
  },
  {
    id: 259, tema: "Normas", dificultad: "media",
    texto: "En un cruce ferroviario, la luz roja (o dos luces rojas intermitentes) indica:",
    opciones: ["Que puedes pasar", "La proximidad de un tren; no debes cruzar", "Fin de la vía férrea", "Zona de estacionamiento"],
    correcta: 1
  },

  // --- Conducción con carga ---
  {
    id: 260, tema: "Conducción segura", dificultad: "dificil",
    texto: "Con una carga pesada en la parte trasera del automóvil, el comportamiento típico es que:",
    opciones: ["El volante se siente más pesado", "El volante se siente más liviano y el vehículo tiende a girar más de lo esperado", "No cambia nada", "Frena mejor"],
    correcta: 1
  },
  {
    id: 261, tema: "Conducción segura", dificultad: "media",
    texto: "Para una conducción más estable, la carga del vehículo debería:",
    opciones: ["Ir toda atrás", "Distribuirse de forma uniforme y bien asegurada", "Ir suelta", "Ir sobre el techo sin sujetar"],
    correcta: 1
  },

  // --- Leyes físicas / energía ---
  {
    id: 262, tema: "Conducción segura", dificultad: "dificil",
    texto: "La fuerza centrífuga que tiende a sacar al vehículo de una curva depende de:",
    opciones: ["El color del auto", "La velocidad y de lo cerrada que sea la curva", "La hora del día", "La marca de los neumáticos"],
    correcta: 1
  },
  {
    id: 263, tema: "Mecánica básica", dificultad: "media",
    texto: "Unos amortiguadores en mal estado pueden provocar:",
    opciones: ["Mejor estabilidad", "Pérdida de estabilidad en curvas y mayor distancia de frenado", "Menor consumo", "Más velocidad"],
    correcta: 1
  },
  {
    id: 264, tema: "Mecánica básica", dificultad: "dificil",
    texto: "Conducir con el portaequipaje (maletero) abierto o con fallas en el escape puede causar:",
    opciones: ["Nada", "Intoxicación por monóxido de carbono (dolor de cabeza, vómitos)", "Más potencia", "Mejor ventilación"],
    correcta: 1
  },

  // --- Infracciones gravísimas (ampliación legal del libro) ---
  {
    id: 265, tema: "Documentación", dificultad: "dificil",
    texto: "¿Cuál de las siguientes es una infracción gravísima según la Ley de Tránsito?",
    opciones: ["Estacionar mal", "Exceder en más de 20 km/h el límite de velocidad máxima", "No usar intermitente", "Tocar la bocina"],
    correcta: 1
  },
  {
    id: 266, tema: "Documentación", dificultad: "media",
    texto: "No detenerse ante una luz roja del semáforo o ante una señal PARE se considera:",
    opciones: ["Una falta leve", "Una infracción gravísima", "Algo sin sanción", "Una recomendación"],
    correcta: 1
  }
];

// ---- Asignación de dificultad a las preguntas curadas ----
// Si una pregunta ya trae "dificultad", se respeta. Si no, se asigna
// automáticamente: por defecto "media", con reglas por tema/id.
(function asignarDificultad() {
  // IDs que consideramos fáciles (conceptos muy básicos y conocidos)
  const facilesIds = new Set([
    2, 9, 20, 25, 42, 51, 101, 102, 103, 185, 195, 199, 46, 21, 22, 12,
  ]);
  // IDs más exigentes (cálculos, matices legales, situaciones específicas)
  const dificilesIds = new Set([
    47, 66, 67, 109, 126, 127, 128, 138, 140, 156, 164, 165, 172, 179,
    190, 194, 8, 7, 110, 141,
  ]);

  QUESTION_BANK.forEach((q) => {
    if (q.dificultad) return;
    if (facilesIds.has(q.id)) q.dificultad = "facil";
    else if (dificilesIds.has(q.id)) q.dificultad = "dificil";
    else q.dificultad = "media";
  });
})();

// Exponer el banco para uso en el navegador
if (typeof window !== "undefined") {
  window.QUESTION_BANK = QUESTION_BANK;
}
// Exponer para entornos tipo Node (verificación)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTION_BANK };
}
