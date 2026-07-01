import { listaEquipos } from "./data.js";
import { mostrarModalEquipo } from "./modalEquipo.js";

const miGrid = document.getElementById("equipos-grid");
const filtrosDivision = document.querySelectorAll('input[name="filtro-division"]');

document.addEventListener("DOMContentLoaded", () => {
  pintarEquipos(listaEquipos);
});

// Delegación de eventos: un único listener para todas las cards generadas dinámicamente
miGrid.addEventListener("click", (evento) => {
  const miCard = evento.target.closest(".equipo-carta");
  if (!miCard || !miGrid.contains(miCard)) return;

  const equipo = listaEquipos.find((equipo) => equipo.id === miCard.dataset.id);
  if (!equipo) return;

  mostrarModalEquipo(equipo);
});

filtrosDivision.forEach((input) => {
  input.addEventListener("change", () => manejarCambioFiltro(input));
});

function manejarCambioFiltro(input) {
  if (input.id === "filtro-primera") {
    pintarEquipos(listaEquipos.filter((equipo) => equipo.division === 1));
  } else if (input.id === "filtro-segunda") {
    pintarEquipos(listaEquipos.filter((equipo) => equipo.division === 2));
  } else {
    pintarEquipos(listaEquipos);
  }
}

function pintarEquipos(arrayEquipos) {
  if (!Array.isArray(arrayEquipos)) {
    throw new Error(`Los equipos que estás intentando ver no son válidos: ${arrayEquipos}`);
  }

  miGrid.textContent = "";

  if (arrayEquipos.length === 0) {
    miGrid.append(crearMensajeVacio());
    return;
  }

  arrayEquipos.forEach((equipo) => miGrid.append(crearColumnaEquipo(equipo)));
}

function crearColumnaEquipo(equipo) {
  const miCol = document.createElement("div");
  miCol.classList.add("col-6", "col-md-4", "col-lg-3");

  const miCard = document.createElement("div");
  miCard.classList.add("equipo-carta");
  miCard.dataset.id = equipo.id;

  const miDivision = document.createElement("span");
  miDivision.classList.add("badge", "rounded-pill", "equipo-carta-division");
  miDivision.textContent = equipo.division === 1 ? "1ª DIV" : "2ª DIV";

  const miFormacion = document.createElement("span");
  miFormacion.classList.add("badge", "rounded-pill", "equipo-carta-formacion");
  miFormacion.textContent = equipo.formacion;

  const miBanda = document.createElement("div");
  miBanda.classList.add("equipo-carta-banda");
  miBanda.style.background = `linear-gradient(90deg, ${equipo.colorPrincipal}, ${equipo.colorSecundario})`;

  const miEscudo = document.createElement("img");
  miEscudo.src = equipo.logo;
  miEscudo.alt = `Logo_${equipo.nombre}`;
  miEscudo.classList.add("equipo-carta-escudo");

  const miNombre = document.createElement("div");
  miNombre.classList.add("equipo-carta-nombre");
  miNombre.textContent = equipo.nombre;

  miBanda.append(miEscudo);
  miCard.append(miDivision, miFormacion, miBanda, miNombre);
  miCol.append(miCard);
  return miCol;
}

function crearMensajeVacio() {
  const miP = document.createElement("p");
  miP.classList.add("text-center", "my-5");
  miP.textContent = "No hay equipos en esta división.";
  return miP;
}
