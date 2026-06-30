import { Partido, Jornada } from "./data.js";

function generarCalendarioLigaRegular(equipos) {
  if (!Array.isArray(equipos)) {
    throw new Error(`Los equipos que estás intentando usar no son válidos: ${equipos}`);
  }

  let lista = [...equipos];
  const esImpar = lista.length % 2 !== 0;
  if (esImpar) lista.push(null); // equipo fantasma = descanso esa jornada

  const n = lista.length;
  const jornadasIda = [];

  for (let j = 0; j < n - 1; j++) {
    const partidosJornada = [];

    for (let i = 0; i < n / 2; i++) {
      const equipoA = lista[i];
      const equipoB = lista[n - 1 - i];

      if (equipoA && equipoB) {
        // Alternamos quién juega en casa según la jornada, para repartir partidos de local/visitante
        const local = j % 2 === 0 ? equipoA : equipoB;
        const visitante = j % 2 === 0 ? equipoB : equipoA;
        partidosJornada.push(new Partido(local, visitante));
      }
    }

    jornadasIda.push(new Jornada(j + 1, partidosJornada));

    // Rotación del círculo: el primer equipo se queda fijo, el resto rota
    const ultimo = lista.pop();
    lista.splice(1, 0, ultimo);
  }

  // La vuelta repite los mismos emparejamientos invirtiendo local/visitante
  const jornadasVuelta = jornadasIda.map((jornadaIda) => {
    const partidosVuelta = jornadaIda.partidos.map(
      (partido) => new Partido(partido.equipoVisitante, partido.equipoLocal)
    );
    return new Jornada(jornadaIda.numero + jornadasIda.length, partidosVuelta);
  });

  return [...jornadasIda, ...jornadasVuelta];
}

export { generarCalendarioLigaRegular };
