import { listaEquipos } from "../shared/data.js";
import { generarCalendarioLigaRegular } from "../shared/generadorCalendario.js";

const equiposPrimera = listaEquipos.filter((equipo) => equipo.division === 1);
const calendario = generarCalendarioLigaRegular(equiposPrimera); // Array de objetos Jornada

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

  calendario.forEach((jornada, indice) => {
    const miOption = document.createElement("option");
    miOption.value = indice;
    miOption.textContent = `Jornada ${jornada.numero}`;
    miSelector.append(miOption);
  });
}

function pintarJornada(indiceJornada) {
  if (typeof indiceJornada !== "number") {
    throw new Error(`El índice de jornada no es válido: ${indiceJornada}`);
  }

  const jornada = calendario[indiceJornada];

  miJornadaNumero.textContent = jornada.numero;
  miListaPartidos.textContent = "";
  miEstadoJornada.textContent = "";

  const miIcono = document.createElement("i");
  const miTextoEstado = document.createTextNode(
    jornada.finalizada ? " Jornada finalizada" : " Pendiente de disputa"
  );
  miIcono.classList.add("bi", jornada.finalizada ? "bi-check-circle-fill" : "bi-hourglass-split");
  miEstadoJornada.append(miIcono, miTextoEstado);

  jornada.partidos.forEach((partido) => {
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
  miImgLocal.src = partido.equipoLocal.logo;
  miImgLocal.alt = partido.equipoLocal.nombre;
  miImgLocal.width = 36;
  miImgLocal.height = 36;

  const miSpanLocal = document.createElement("span");
  miSpanLocal.classList.add("fw-bold");
  miSpanLocal.textContent = partido.equipoLocal.nombre;

  miDivLocal.append(miImgLocal, miSpanLocal);

  // --- Resultado ---
  const miDivResultado = document.createElement("div");
  miDivResultado.classList.add("resultado-partido", "fw-bold");
  miDivResultado.textContent = partido.jugado
    ? `${partido.golesLocal} : ${partido.golesVisitante}`
    : "- : -";

  // --- Equipo visitante ---
  const miDivVisitante = document.createElement("div");
  miDivVisitante.classList.add("d-flex", "align-items-center", "gap-2", "equipo-visitante");

  const miSpanVisitante = document.createElement("span");
  miSpanVisitante.classList.add("fw-bold");
  miSpanVisitante.textContent = partido.equipoVisitante.nombre;

  const miImgVisitante = document.createElement("img");
  miImgVisitante.src = partido.equipoVisitante.logo;
  miImgVisitante.alt = partido.equipoVisitante.nombre;
  miImgVisitante.width = 36;
  miImgVisitante.height = 36;

  miDivVisitante.append(miSpanVisitante, miImgVisitante);

  miDivCard.append(miDivLocal, miDivResultado, miDivVisitante);

  return miDivCard;
}
