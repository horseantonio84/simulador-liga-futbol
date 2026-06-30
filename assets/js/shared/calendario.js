import { listaEquipos } from "../shared/data.js";

// Mock de prueba: 3 jornadas con 2 partidos cada una (ajusta cuando conectemos el generador real)
const equiposPrimera = listaEquipos.filter((equipo) => equipo.division === 1);

const calendarioMock = [
  // Jornada 1
  [
    { local: equiposPrimera[0], visitante: equiposPrimera[1], golesLocal: null, golesVisitante: null },
    { local: equiposPrimera[2], visitante: equiposPrimera[3], golesLocal: null, golesVisitante: null },
  ],
  // Jornada 2
  [
    { local: equiposPrimera[1], visitante: equiposPrimera[2], golesLocal: 2, golesVisitante: 1 },
    { local: equiposPrimera[3], visitante: equiposPrimera[0], golesLocal: 0, golesVisitante: 0 },
  ],
  // Jornada 3
  [
    { local: equiposPrimera[0], visitante: equiposPrimera[2], golesLocal: null, golesVisitante: null },
    { local: equiposPrimera[1], visitante: equiposPrimera[3], golesLocal: null, golesVisitante: null },
  ],
];

const miSelector = document.getElementById("selector-jornada");
const miListaPartidos = document.getElementById("lista-partidos");
const miJornadaNumero = document.querySelector(".jornada-numero");
const miEstadoJornada = document.querySelector(".estado-jornada");

document.addEventListener("DOMContentLoaded", () => {
  rellenarSelector();
  pintarJornada(0); // Jornada 1 por defecto
});

miSelector.addEventListener("change", () => {
  const indiceJornada = Number(miSelector.value);
  pintarJornada(indiceJornada);
});

function rellenarSelector() {
  miSelector.textContent = "";

  calendarioMock.forEach((jornada, indice) => {
    const miOption = document.createElement("option");
    miOption.value = indice;
    miOption.textContent = `Jornada ${indice + 1}`;
    miSelector.append(miOption);
  });
}

function pintarJornada(indiceJornada) {
  if (typeof indiceJornada !== "number") {
    throw new Error(`El índice de jornada no es válido: ${indiceJornada}`);
  }

  const jornada = calendarioMock[indiceJornada];

  miJornadaNumero.textContent = indiceJornada + 1;
  miListaPartidos.textContent = "";

  const todosJugados = jornada.every((partido) => partido.golesLocal !== null);
  miEstadoJornada.innerHTML = ""; // limpiar antes de reconstruir con createElement

  const miIcono = document.createElement("i");
  const miTextoEstado = document.createTextNode(
    todosJugados ? " Jornada finalizada" : " Pendiente de disputa"
  );
  miIcono.classList.add("bi", todosJugados ? "bi-check-circle-fill" : "bi-hourglass-split");
  miEstadoJornada.append(miIcono, miTextoEstado);

  jornada.forEach((partido) => {
    miListaPartidos.append(crearTarjetaPartido(partido));
  });
}

function crearTarjetaPartido(partido) {
  const miDivCard = document.createElement("div");
  miDivCard.classList.add("partido-card", "d-flex", "align-items-center", "justify-content-between", "p-3");

  // --- Equipo local ---
  const miDivLocal = document.createElement("div");
  miDivLocal.classList.add("d-flex", "align-items-center", "gap-2", "equipo-local");

  const miImgLocal = document.createElement("img");
  miImgLocal.src = partido.local.logo;
  miImgLocal.alt = partido.local.nombre;
  miImgLocal.width = 36;
  miImgLocal.height = 36;

  const miSpanLocal = document.createElement("span");
  miSpanLocal.classList.add("fw-bold");
  miSpanLocal.textContent = partido.local.nombre;

  miDivLocal.append(miImgLocal, miSpanLocal);

  // --- Resultado ---
  const miDivResultado = document.createElement("div");
  miDivResultado.classList.add("resultado-partido", "fw-bold");

  const jugado = partido.golesLocal !== null;
  miDivResultado.textContent = jugado
    ? `${partido.golesLocal} : ${partido.golesVisitante}`
    : "- : -";

  // --- Equipo visitante ---
  const miDivVisitante = document.createElement("div");
  miDivVisitante.classList.add("d-flex", "align-items-center", "gap-2", "equipo-visitante");

  const miSpanVisitante = document.createElement("span");
  miSpanVisitante.classList.add("fw-bold");
  miSpanVisitante.textContent = partido.visitante.nombre;

  const miImgVisitante = document.createElement("img");
  miImgVisitante.src = partido.visitante.logo;
  miImgVisitante.alt = partido.visitante.nombre;
  miImgVisitante.width = 36;
  miImgVisitante.height = 36;

  miDivVisitante.append(miSpanVisitante, miImgVisitante);

  miDivCard.append(miDivLocal, miDivResultado, miDivVisitante);

  return miDivCard;
}
