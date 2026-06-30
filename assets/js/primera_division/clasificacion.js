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

    const miDivEquipo = document.createElement("div");
    miDivEquipo.classList.add("d-flex", "align-items-center", "gap-2");

    const miImg = document.createElement("img");
    const miSpanNombre = document.createElement("span");

    miTdPos.textContent = indice + 1;

    miTdEquipo.classList.add("text-start");
    miSpanNombre.textContent = equipo.nombre.toUpperCase();
    miImg.src = equipo.logo;
    miImg.alt =`Logo_${equipo.nombre}`;
    miImg.height = 40;
    miImg.width = 40;


    miTdPuntos.textContent = equipo.puntos;
    miTdPJ.textContent = equipo.pj;
    miTdPG.textContent = equipo.pg;
    miTdPE.textContent = equipo.pe;
    miTdPP.textContent = equipo.pp;
    miTdGF.textContent = equipo.gf;
    miTdGC.textContent = equipo.gc;
    miTdDG.textContent = equipo.diferenciaGoles;

    miDivEquipo.append(miImg,miSpanNombre);
    miTdEquipo.append(miDivEquipo);
    miTr.append(miTdPos, miTdEquipo, miTdPuntos, miTdPJ, miTdPG, miTdPE, miTdPP, miTdGF, miTdGC, miTdDG);
    miTbody.append(miTr);

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
    const miDivEquipo = document.createElement("div");
    const miImg = document.createElement("img");
    const miSpanNombre = document.createElement("span");
    const miSpanPuntos = document.createElement("span");

    miLi.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    miDivEquipo.classList.add("d-flex", "align-items-center", "gap-2");
    miSpanPuntos.classList.add("badge", "bg-secondary");

    miImg.src = equipo.logo;
    miImg.alt = equipo.nombre;
    miImg.height = 40;
    miImg.width = 40;

    miSpanNombre.textContent = equipo.nombre;
    miSpanPuntos.textContent = equipo.puntos + " pts";

    miDivEquipo.append(miImg, miSpanNombre);
    miLi.append(miDivEquipo, miSpanPuntos);
    miLista.append(miLi);
  });
}

