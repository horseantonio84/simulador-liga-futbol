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
    miListaPartidos.append(crearColumnaPartido(partido));
  });
}

function crearColumnaPartido(partido) {
  const miCol = document.createElement("div");
  miCol.classList.add("col-12", "col-lg-6");

  miCol.append(crearCardPartido(partido));

  return miCol;
}

function crearCardPartido(partido) {
  const miCard = document.createElement("div");
  miCard.classList.add("card", "h-100");

  const miCardBody = document.createElement("div");
  miCardBody.classList.add("card-body", "p-3");

  const miFila = document.createElement("div");
  miFila.classList.add("d-flex", "align-items-center", "justify-content-between");

  // --- Equipo local ---
  const miDivLocal = document.createElement("div");
  miDivLocal.classList.add("equipo-local", "d-flex", "flex-column", "align-items-center", "gap-2", "flex-fill");

  const miImgLocal = document.createElement("img");
  miImgLocal.src = partido.equipoLocal.logo;
  miImgLocal.alt = partido.equipoLocal.nombre;
  miImgLocal.classList.add("img-equipo-card", "flex-shrink-0");

  const miSpanLocal = document.createElement("span");
  miSpanLocal.title = partido.equipoLocal.nombre;
  miSpanLocal.classList.add("fw-bold", "text-center", "text-truncate", "w-100");
  miSpanLocal.textContent = partido.equipoLocal.nombre;

  miDivLocal.append(miImgLocal, miSpanLocal);

  // --- Resultado ---
  const miDivResultado = document.createElement("div");
  miDivResultado.classList.add("resultado-partido-card", "fw-bold", "flex-shrink-0", "px-2");
  miDivResultado.textContent = partido.jugado
    ? `${partido.golesLocal} : ${partido.golesVisitante}`
    : "- : -";

  // --- Equipo visitante ---
  const miDivVisitante = document.createElement("div");
  miDivVisitante.classList.add("equipo-visitante", "d-flex", "flex-column", "align-items-center", "gap-2", "flex-fill");

  const miImgVisitante = document.createElement("img");
  miImgVisitante.src = partido.equipoVisitante.logo;
  miImgVisitante.alt = partido.equipoVisitante.nombre;
  miImgVisitante.classList.add("img-equipo-card", "flex-shrink-0");

  const miSpanVisitante = document.createElement("span");
  miSpanVisitante.title = partido.equipoVisitante.nombre;
  miSpanVisitante.classList.add("fw-bold", "text-center", "text-truncate", "w-100");
  miSpanVisitante.textContent = partido.equipoVisitante.nombre;

  miDivVisitante.append(miImgVisitante, miSpanVisitante);

  miFila.append(miDivLocal, miDivResultado, miDivVisitante);

  // --- Estado del partido ---
  const miDivEstado = document.createElement("div");
  miDivEstado.classList.add("estado-partido","text-center", "small", "border-top", "pt-2", "mt-3");
  miDivEstado.textContent = partido.jugado ? "Finalizado" : "Pendiente de disputa";

  miCardBody.append(miFila, miDivEstado);
  miCard.append(miCardBody);

  return miCard;
}
