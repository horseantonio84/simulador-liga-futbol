import { listaEquipos } from "../shared/data.js";

const miTbody = document.getElementById("equipos-tabla");
const miUL = document.getElementById("equipos-lista");

document.addEventListener("DOMContentLoaded", () => {
  let equiposPrimera = listaEquipos.filter((equipo) => equipo.division === 1);
  pintarEquiposTabla(equiposPrimera);
  pintarEquiposLista(equiposPrimera);
});


function pintarEquiposTabla(arrayEquipos) {
  if (!Array.isArray(arrayEquipos)) {
    throw new Error(`Los equipos que estás intentando ver no son válidos: {arrayEquipos}`);
  }

  arrayEquipos.forEach((equipo, indice) => {
    const miTr = document.createElement("tr");

    const miTdPos = document.createElement("td");
    const miTdEquipo = document.createElement("td");
    const miTdPuntos = document.createElement("td");
    const miTdPJ = document.createElement("td");
    const miTdPG = document.createElement("td");
    const miTdPE = document.createElement("td");
    const miTdPP = document.createElement("td");
    const miTdGF = document.createElement("td");
    const miTdGC = document.createElement("td");
    const miTdDG = document.createElement("td");

    miTdPos.textContent = indice + 1; // Posición (1, 2, 3...)
    miTdEquipo.textContent = equipo.nombre;
    miTdPuntos.textContent = equipo.puntos;
    miTdPJ.textContent = equipo.pj;
    miTdPG.textContent = equipo.pg;
    miTdPE.textContent = equipo.pe;
    miTdPP.textContent = equipo.pp;
    miTdGF.textContent = equipo.gf;
    miTdGC.textContent = equipo.gc;
    miTdDG.textContent = equipo.diferenciaGoles;

    miTr.append(miTdPos, miTdEquipo, miTdPuntos, miTdPJ, miTdPG, miTdPE, miTdPP, miTdGF, miTdGC, miTdDG);
    miTbody.append(miTr);

    console.log(miTbody);
  });
}


function pintarEquiposLista(arrayEquipos) {
  if (!Array.isArray(arrayEquipos)) {
    throw new Error(`Los equipos que estás intentando ver no son válidos: ${arrayEquipos}`);
  }

  const miLista = document.getElementById("equipos-lista");
  miLista.textContent = "";

  arrayEquipos.forEach((equipo, indice) => {
    const miLi = document.createElement("li");
    const miSpanNombre = document.createElement("span");
    const miSpanPuntos = document.createElement("span");

    miLi.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    miSpanPuntos.classList.add("badge", "bg-secondary");

    miSpanNombre.textContent = equipo.nombre;
    miSpanPuntos.textContent = equipo.puntos + " pts";

    miLi.append(miSpanNombre, miSpanPuntos);
    miLista.append(miLi);
  });
}
