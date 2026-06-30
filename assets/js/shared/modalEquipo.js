// Módulo reutilizable: rellena y muestra el modal de detalle de un Equipo.
// Pensado para usarse desde cualquier página (clasificación, calendario, etc.)
// El HTML del modal (#modal-equipo) debe existir ya en la página que lo use.

let modalBootstrap = null;

const ETIQUETAS_POSICION = {
  Portero: "Porteros",
  Defensa: "Defensas",
  Medio: "Medios",
  Delantero: "Delanteros",
};

function mostrarModalEquipo(equipo) {
  if (!equipo) {
    throw new Error(`El equipo que estás intentando mostrar no es válido: ${equipo}`);
  }

  const miModalEl = document.getElementById("modal-equipo");
  if (!miModalEl) {
    throw new Error("No se encontró el elemento #modal-equipo en esta página.");
  }

  pintarCabeceraEquipo(miModalEl, equipo);
  pintarEstadisticasEquipo(miModalEl, equipo);
  pintarHistorialEquipo(miModalEl, equipo);
  pintarPlantillaEquipo(miModalEl, equipo);

  // Reutilizamos la misma instancia del modal en vez de crear una nueva cada vez
  if (!modalBootstrap) {
    modalBootstrap = new bootstrap.Modal(miModalEl);
  }
  modalBootstrap.show();
}

function pintarCabeceraEquipo(miModalEl, equipo) {
  miModalEl.querySelector(".modal-equipo-nombre").textContent = equipo.nombre;
  const miLogo = miModalEl.querySelector(".modal-equipo-logo");
  miLogo.src = equipo.logo;
  miLogo.alt = `Logo_${equipo.nombre}`;
}

function pintarEstadisticasEquipo(miModalEl, equipo) {
  miModalEl.querySelector(".modal-equipo-pj").textContent = equipo.pj;
  miModalEl.querySelector(".modal-equipo-puntos").textContent = equipo.puntos;
  miModalEl.querySelector(".modal-equipo-pg").textContent = equipo.pg;
  miModalEl.querySelector(".modal-equipo-pe").textContent = equipo.pe;
  miModalEl.querySelector(".modal-equipo-pp").textContent = equipo.pp;
  miModalEl.querySelector(".modal-equipo-gf").textContent = equipo.gf;
  miModalEl.querySelector(".modal-equipo-gc").textContent = equipo.gc;
  miModalEl.querySelector(".modal-equipo-dg").textContent = equipo.diferenciaGoles;
}

function pintarHistorialEquipo(miModalEl, equipo) {
  const miLista = miModalEl.querySelector(".modal-equipo-historial");
  miLista.textContent = "";

  if (equipo.historialResultados.length === 0) {
    miLista.append(crearMensajeVacio("Sin partidos jugados"));
    return;
  }

  equipo.historialResultados.forEach((resultado) => {
    const miLi = document.createElement("li");
    miLi.classList.add("list-group-item");
    miLi.textContent = resultado;
    miLista.append(miLi);
  });
}

function pintarPlantillaEquipo(miModalEl, equipo) {
  const miContenedor = miModalEl.querySelector(".modal-equipo-plantilla");
  miContenedor.textContent = "";

  if (equipo.jugadores.length === 0) {
    miContenedor.append(crearMensajeVacio("Sin jugadores en la plantilla"));
    return;
  }

  const grupos = equipo.jugadoresPorPosicion;

  Object.keys(ETIQUETAS_POSICION).forEach((posicion) => {
    const jugadoresPosicion = grupos[posicion];
    if (!jugadoresPosicion || jugadoresPosicion.length === 0) return;

    miContenedor.append(crearTablaJugadores(ETIQUETAS_POSICION[posicion], jugadoresPosicion));
  });
}

function crearMensajeVacio(texto) {
  const miP = document.createElement("p");
  miP.classList.add("text-center", "my-4");
  miP.textContent = texto;
  return miP;
}

function crearTablaJugadores(tituloGrupo, jugadores) {
  const miWrapper = document.createElement("div");
  miWrapper.classList.add("mb-3");

  const miTitulo = document.createElement("h6");
  miTitulo.classList.add("text-uppercase","small", "mb-2");
  miTitulo.textContent = tituloGrupo;

  const miTabla = document.createElement("table");
  miTabla.classList.add("table", "table-sm", "table-hover", "align-middle");

  const miThead = document.createElement("thead");

  const miTrCabecera = document.createElement("tr");
  ["Jugador", "OVR", "PJ", "G", "A", "TA", "TR"].forEach((texto, indice) => {
    const miTh = document.createElement("th");
    if (indice > 0) miTh.classList.add("text-center");
    miTh.textContent = texto;
    miTrCabecera.append(miTh);
  });
  miThead.append(miTrCabecera);

  const miTbody = document.createElement("tbody");
  jugadores.forEach((jugador) => miTbody.append(crearFilaJugador(jugador)));

  miTabla.append(miThead, miTbody);
  miWrapper.append(miTitulo, miTabla);
  return miWrapper;
}

function crearFilaJugador(jugador) {
  const miTr = document.createElement("tr");

  const celdas = [
    jugador.nombre,
    jugador.rating,
    0, // PJ del jugador: pendiente de añadir a la clase Jugador
    jugador.goles,
    jugador.asistencias,
    jugador.tarjetasAmarillas,
    jugador.tarjetasRojas,
  ];

  celdas.forEach((valor, indice) => {
    const miTd = document.createElement("td");
    if (indice > 0) miTd.classList.add("text-center");
    miTd.textContent = valor;
    miTr.append(miTd);
  });

  return miTr;
}

export { mostrarModalEquipo };
