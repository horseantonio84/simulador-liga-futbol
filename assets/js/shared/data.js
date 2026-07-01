class Equipo {
    constructor(id, nombre, logo, colorPrincipal, colorSecundario, division, formacion = "4-3-3") {
        this.id = id;
        this.nombre = nombre;
        this.logo = `assets/img/equipos/${logo}`;
        this.colorPrincipal = colorPrincipal; // Ej: "#ff0000"
        this.colorSecundario = colorSecundario; // Ej: "#ffffff"
        this.division = division;
        this.formacion = formacion; // Ej: "4-3-3", "4-4-2", "3-5-2"...

        // Estadísticas de liga
        this.puntos = 0;
        this.pj = 0;
        this.pg = 0;
        this.pe = 0;
        this.pp = 0;
        this.gf = 0;
        this.gc = 0;

        // Gestión y Estado
        this.jugadores = []; // Array para guardar sus jugadores
        this.presupuesto = 500000;
        this.esUsuario = false;
        this.historialResultados = []; // Historial de resultados
    }

    get diferenciaGoles() {
        return this.gf - this.gc;
    }

    get jugadoresPorPosicion() {
        // Agrupa this.jugadores en un objeto { Portero: [...], Defensa: [...], Medio: [...], Delantero: [...] }
        return this.jugadores.reduce((grupos, jugador) => {
            if (!grupos[jugador.posicion]) grupos[jugador.posicion] = [];
            grupos[jugador.posicion].push(jugador);
            return grupos;
        }, {});
    }

    // Ficha a un jugador: lo añade a la plantilla y deja el jugador
    // enlazado a este equipo (equipoId, libre = false).
    // Devuelve "this" para poder encadenar varias llamadas seguidas.
    ficharJugador(jugador) {
        jugador.equipoId = this.id;
        jugador.libre = false;
        this.jugadores.push(jugador);
        return this;
    }

    // Atajo para fichar a varios jugadores de golpe (ver listaEquipos más abajo).
    ficharJugadores(jugadores) {
        jugadores.forEach((jugador) => this.ficharJugador(jugador));
        return this;
    }
}

class Jugador {
    constructor(id, nombre, posicion, rating, esCapitan = false) {
        this.id = id; // Ejemplo J001
        this.nombre = nombre;
        this.posicion = posicion; // "Portero", "Defensa", "Medio", "Delantero"
        this.rating = rating; // Un número del 1 al 100
        this.esCapitan = esCapitan;

        // Estadísticas
        this.goles = 0;
        this.asistencias = 0;
        this.tarjetasAmarillas = 0;
        this.tarjetasRojas = 0;

        // Estado (se actualiza solo al ficharlo con Equipo.ficharJugador)
        this.equipoId = null;
        this.libre = true;
        this.lesionado = false;
        this.sancionado = false;
    }
}

class Partido {
    constructor(equipoLocal, equipoVisitante) {
        this.equipoLocal = equipoLocal;
        this.equipoVisitante = equipoVisitante;
        this.golesLocal = null;
        this.golesVisitante = null;
    }

    get jugado() {
        return this.golesLocal !== null && this.golesVisitante !== null;
    }
}

class Jornada {
    constructor(numero, partidos = []) {
        this.numero = numero;
        this.partidos = partidos; // Array de objetos Partido
    }

    get finalizada() {
        return this.partidos.every((partido) => partido.jugado);
    }
}

// NOTA sobre los ratings (OVR): no venían en los datos originales, así que se han
// generado de forma determinista (mismo nombre = mismo rating siempre) en un rango
// 60-89, con un pequeño extra para los capitanes. Edita el rating de cualquier
// new Jugador(...) si quieres ajustarlo a mano.
const listaEquipos = [
    new Equipo("E001", "Asturians", "ASTURIANS.png", "#00A8FF", "#FF8C00", 2, "4-3-3").ficharJugadores([
        new Jugador("J001", "Antonio Pomares Cava", "Portero", 74),
        new Jugador("J002", "Nelson Fernando Ruffolo", "Delantero", 87, true),
        new Jugador("J003", "Elisabeth Ruffolo Garcia", "Defensa", 85),
        new Jugador("J004", "Sonia Torres Ruffolo", "Defensa", 82),
        new Jugador("J005", "Lorena Ruffolo Pearson", "Medio", 60),
        new Jugador("J006", "Antonio Bonmati Piedecausa", "Delantero", 60),
        new Jugador("J007", "Loren Torres Vidal", "Defensa", 83),
        new Jugador("J008", "David Muiño Rey", "Medio", 71),
        new Jugador("J009", "Jose Manuel Torres Vidal", "Medio", 82),
        new Jugador("J010", "Manuel Mellado Sempere", "Delantero", 71),
        new Jugador("J011", "Antonio Bonmati Jaen", "Medio", 80),
        new Jugador("J012", "Barbara Borres", "Delantero", 76),
        new Jugador("J013", "José Manuel Mas", "Defensa", 82),
        new Jugador("J014", "Tania Parres Baeza", "Defensa", 81),
    ]),
    new Equipo("E002", "Atletico Elite", "ATLETICO_ELITE.png", "#D4AF37", "#000000", 2, "4-4-2").ficharJugadores([
        new Jugador("J015", "Juan José Sánchez Cid", "Portero", 65),
        new Jugador("J016", "Saúl Fernández", "Defensa", 75),
        new Jugador("J017", "Yowel Martínez", "Defensa", 76),
        new Jugador("J018", "Enol Quinientos", "Defensa", 79),
        new Jugador("J019", "Pelayo Sevillano", "Defensa", 83),
        new Jugador("J020", "Fredo", "Defensa", 70),
        new Jugador("J021", "Emilio", "Defensa", 75),
        new Jugador("J022", "Adrián Sampedro Serena", "Medio", 70),
        new Jugador("J023", "Iyan Iglesias", "Medio", 68),
        new Jugador("J024", "Riki Salazar Román", "Medio", 60),
        new Jugador("J025", "Alejandro Artidiello Vázquez", "Delantero", 85, true),
        new Jugador("J026", "Laura García Crespo", "Delantero", 74),
        new Jugador("J027", "Jonathan Bastida", "Delantero", 85),
        new Jugador("J028", "Mamadou Sam", "Delantero", 65),
    ]),
    new Equipo("E003", "Berracos", "BERRACOS_FC.png", "#8B4513", "#C0C0C0", 1, "4-2-3-1").ficharJugadores([
        new Jugador("J029", "Maximiliano Valderrama", "Portero", 61),
        new Jugador("J030", "Álvaro Alonso", "Defensa", 83),
        new Jugador("J031", "Nelson Rodríguez", "Defensa", 62),
        new Jugador("J032", "Pepe López", "Defensa", 80),
        new Jugador("J033", "Víctor Velasco", "Defensa", 66),
        new Jugador("J034", "Arturo Santamaría", "Medio", 70, true),
        new Jugador("J035", "Jairo Monsalve", "Medio", 76),
        new Jugador("J036", "Miguel López", "Medio", 65),
        new Jugador("J037", "David Pérez", "Delantero", 68),
        new Jugador("J038", "Kevin Menéndez", "Delantero", 61),
        new Jugador("J039", "Néider Garcés", "Delantero", 76),
        new Jugador("J040", "Luis González", "Medio", 85),
        new Jugador("J041", "Josete Vallina", "Portero", 83),
        new Jugador("J042", "Piolin", "Delantero", 69),
    ]),
    new Equipo("E004", "Cerebro SD", "CEREBRO_SD.png", "#E60000", "#000000", 1, "3-5-2").ficharJugadores([
        new Jugador("J043", "Silvestre", "Portero", 67),
        new Jugador("J044", "David", "Defensa", 72),
        new Jugador("J045", "Íñigo", "Defensa", 75),
        new Jugador("J046", "Óscar Cervero", "Defensa", 70),
        new Jugador("J047", "Sergio", "Defensa", 71),
        new Jugador("J048", "Yeray", "Defensa", 84),
        new Jugador("J049", "Aitor Gómez", "Medio", 75),
        new Jugador("J050", "Diego García", "Medio", 67, true),
        new Jugador("J051", "Mateo", "Medio", 74),
        new Jugador("J052", "Saúl", "Medio", 74),
        new Jugador("J053", "Tablado", "Medio", 85),
        new Jugador("J054", "Adri", "Delantero", 76),
        new Jugador("J055", "Kasty", "Delantero", 80),
        new Jugador("J056", "Samu", "Delantero", 80),
    ]),
    new Equipo("E005", "Cuajados FC", "CUAJADOS_FC.png", "#2ECC71", "#FFFFFF", 1, "5-3-2").ficharJugadores([
        new Jugador("J057", "Miguel Pereira", "Portero", 73),
        new Jugador("J058", "Federico Rubiera", "Defensa", 73),
        new Jugador("J059", "Lucas Cabueñes", "Defensa", 85),
        new Jugador("J060", "Miguel Vaquero", "Defensa", 66),
        new Jugador("J061", "Pablo Lamuño", "Defensa", 71),
        new Jugador("J062", "Carlos Trapiella", "Medio", 72, true),
        new Jugador("J063", "Íñigo Montoya", "Medio", 74),
        new Jugador("J064", "Lucas Alonso", "Medio", 84),
        new Jugador("J065", "Sergio Díaz", "Medio", 85),
        new Jugador("J066", "Héctor de Castro", "Delantero", 84),
        new Jugador("J067", "Víctor García", "Delantero", 72),
        new Jugador("J068", "Manuel Del Busto", "Medio", 70),
        new Jugador("J069", "Marc Llunel", "Medio", 69),
        new Jugador("J070", "Michael Kaiser", "Delantero", 78),
    ]),
    new Equipo("E006", "Fabada FC", "FABADA_FC.png", "#C0392B", "#F39C12", 1, "3-4-3").ficharJugadores([
        new Jugador("J071", "Teo Vaquero", "Portero", 65),
        new Jugador("J072", "Sergio Tavira", "Defensa", 78),
        new Jugador("J073", "Raúl García", "Defensa", 74),
        new Jugador("J074", "Santos Sánchez", "Defensa", 80),
        new Jugador("J075", "Mario Cavielles", "Medio", 68, true),
        new Jugador("J076", "Edgar Álvarez", "Medio", 74),
        new Jugador("J077", "Pelayo Álvarez", "Medio", 85),
        new Jugador("J078", "Daniel Álvarez", "Delantero", 70),
        new Jugador("J079", "Tomás Demihuevo", "Delantero", 78),
        new Jugador("J080", "Cristian Martín", "Delantero", 70),
        new Jugador("J081", "Juan David", "Defensa", 62),
        new Jugador("J082", "Mael F.", "Medio", 67),
        new Jugador("J083", "Alejandro C.", "Portero", 73),
        new Jugador("J084", "Rubén Cañal", "Delantero", 74),
    ]),
    new Equipo("E007", "Fayuelos", "FAYUELOS_FC.png", "#2980B9", "#FFD700", 2, "4-1-4-1").ficharJugadores([
        new Jugador("J085", "Miguel Fernández Huerta", "Delantero", 67, true),
        new Jugador("J086", "Alberto Ramírez Farfán", "Medio", 79),
        new Jugador("J087", "Daniel Onís Fabián", "Defensa", 61),
        new Jugador("J088", "Javier Gutiérrez Esquinas", "Defensa", 85),
        new Jugador("J089", "Daniel López Fernández", "Delantero", 82),
        new Jugador("J090", "Daniel González Pérez", "Medio", 71),
        new Jugador("J091", "Raúl Fernández España", "Medio", 61),
        new Jugador("J092", "Luis Manuel Solares García", "Medio", 77),
        new Jugador("J093", "Iván García García", "Portero", 70),
        new Jugador("J094", "Rochi", "Portero", 61),
        new Jugador("J095", "Néstor Fernández García", "Defensa", 81),
        new Jugador("J096", "Borja Iglesias Cuesta", "Delantero", 74),
        new Jugador("J097", "Marcos Suárez Peón", "Medio", 79),
        new Jugador("J098", "Roberto Arias Valle", "Defensa", 67),
    ]),
    new Equipo("E008", "Fuerza Salvaje", "FUERZA_SALVAJE.png", "#D35400", "#000000", 1, "4-5-1").ficharJugadores([
        new Jugador("J099", "Daniel Martino", "Portero", 83),
        new Jugador("J100", "Óscar Jara", "Defensa", 80),
        new Jugador("J101", "Alex P.", "Defensa", 64),
        new Jugador("J102", "Kike", "Defensa", 60),
        new Jugador("J103", "Iván", "Defensa", 84),
        new Jugador("J104", "Juanma", "Defensa", 74),
        new Jugador("J105", "Jorge Puente", "Medio", 80, true),
        new Jugador("J106", "Erik", "Medio", 77),
        new Jugador("J107", "Daniel Puente", "Medio", 68),
        new Jugador("J108", "Guillermo", "Medio", 70),
        new Jugador("J109", "Loik", "Delantero", 71),
        new Jugador("J110", "Javi", "Delantero", 80),
        new Jugador("J111", "Abril", "Delantero", 76),
        new Jugador("J112", "Ángel", "Delantero", 83),
    ]),
    new Equipo("E009", "Hectotito FC", "HECTOTITO_FC.png", "#5D4037", "#8BC34A", 2, "4-3-3").ficharJugadores([
        new Jugador("J113", "Héctor Carrio Cortina", "Portero", 73),
        new Jugador("J114", "Loky Watón", "Portero", 78),
        new Jugador("J115", "Daniel Torre García", "Defensa", 68),
        new Jugador("J116", "Yonaiker Tyrone Canton", "Defensa", 62),
        new Jugador("J117", "David Catalá", "Defensa", 60),
        new Jugador("J118", "Benito José José", "Defensa", 71),
        new Jugador("J119", "Paolo Canton", "Medio", 86, true),
        new Jugador("J120", "Enol", "Medio", 60),
        new Jugador("J121", "Pedro Wang", "Medio", 67),
        new Jugador("J122", "Simón GV", "Medio", 63),
        new Jugador("J123", "Francesco Tirone Canton", "Delantero", 78),
        new Jugador("J124", "Jonás Sixto", "Delantero", 62),
        new Jugador("J125", "Iñigo Euskaldun", "Delantero", 81),
        new Jugador("J126", "Trosky Roho", "Delantero", 68),
    ]),
    new Equipo("E010", "Inafuma y Beben", "INAFUMA_Y_BEBEN.png", "#F1C40F", "#8E44AD", 2, "4-4-2").ficharJugadores([
        new Jugador("J127", "Lily Phillips", "Portero", 71),
        new Jugador("J128", "Naruto Uzumaki", "Defensa", 75),
        new Jugador("J129", "Brendan Fraser", "Defensa", 81),
        new Jugador("J130", "Orslok", "Defensa", 80),
        new Jugador("J131", "Liam Lawson", "Defensa", 65),
        new Jugador("J132", "Duncan el Alto", "Defensa", 82),
        new Jugador("J133", "Folagor", "Medio", 66),
        new Jugador("J134", "Toni Cuquerella", "Medio", 77),
        new Jugador("J135", "Rubén Gisbert", "Medio", 78),
        new Jugador("J136", "Fernando Alonso Jr", "Medio", 71),
        new Jugador("J137", "Santiago Abascal", "Delantero", 67, true),
        new Jugador("J138", "Pablo Imesias", "Delantero", 79),
        new Jugador("J139", "Angel David", "Delantero", 79),
        new Jugador("J140", "Gumball Waterson", "Delantero", 85),
    ]),
    new Equipo("E011", "Fondo Sur", "INDEPENDIENTE_DEL_FONDO_SUR.png", "#000000", "#FFFFFF", 2, "4-2-3-1").ficharJugadores([
        new Jugador("J141", "Igor Dito", "Portero", 75),
        new Jugador("J142", "Aitor Tilla", "Portero", 61),
        new Jugador("J143", "Ali-Kate", "Defensa", 82),
        new Jugador("J144", "Rosa Melano", "Defensa", 77),
        new Jugador("J145", "Elba Lazo", "Defensa", 84),
        new Jugador("J146", "Pelayo Fernandez", "Defensa", 65, true),
        new Jugador("J147", "Esteban Dido", "Medio", 64),
        new Jugador("J148", "Debora Melo", "Medio", 70),
        new Jugador("J149", "Yoshi To-ko", "Medio", 64),
        new Jugador("J150", "Tommasi Pote", "Medio", 70),
        new Jugador("J151", "Garbanzo Manolín", "Delantero", 68),
        new Jugador("J152", "Aquiles Bailo", "Delantero", 71),
        new Jugador("J153", "Benito Camelo", "Delantero", 60),
        new Jugador("J154", "Elsa Pito", "Delantero", 77),
    ]),
    new Equipo("E012", "Lacteos", "LACTEOS_FC.png", "#3498DB", "#FFFFFF", 2, "3-5-2").ficharJugadores([
        new Jugador("J155", "Juan Jiménez", "Portero", 62),
        new Jugador("J156", "Adolfo Jiménez Paquez", "Portero", 69),
        new Jugador("J157", "Ramón Santiago García", "Defensa", 62),
        new Jugador("J158", "Candelario Gómez", "Defensa", 66),
        new Jugador("J159", "Marco Chupete", "Medio", 64),
        new Jugador("J160", "Julián Calabazas", "Medio", 79, true),
        new Jugador("J161", "Ernesto Tomate", "Medio", 64),
        new Jugador("J162", "Humberto Gómez", "Medio", 80),
        new Jugador("J163", "Rodolfo Torrentero", "Medio", 77),
        new Jugador("J164", "Guillermo Chen Minh", "Delantero", 74),
        new Jugador("J165", "Rafael Castillo", "Delantero", 68),
        new Jugador("J166", "Irwin Romero", "Delantero", 75),
        new Jugador("J167", "Carabolo Manez", "Delantero", 72),
        new Jugador("J168", "Alfonso Noveno", "Delantero", 69),
    ]),
    new Equipo("E013", "Legio Victrix", "LEGIO_VICTRIX_FC.png", "#990000", "#D4AF37", 1, "5-3-2").ficharJugadores([
        new Jugador("J169", "Mateo Lagar", "Portero", 71),
        new Jugador("J170", "Iñaki Menéndez", "Defensa", 81),
        new Jugador("J171", "Daniel Diéguez", "Defensa", 80),
        new Jugador("J172", "Carlos Cechinni", "Defensa", 85),
        new Jugador("J173", "Rubén Rodil", "Defensa", 70),
        new Jugador("J174", "Iñigo Bernardo", "Defensa", 66),
        new Jugador("J175", "Antonio Orejas", "Medio", 86, true),
        new Jugador("J176", "David García", "Medio", 85),
        new Jugador("J177", "Iñigo Díaz", "Medio", 71),
        new Jugador("J178", "Alfredo Flórez", "Medio", 85),
        new Jugador("J179", "Nicolás Gotusso", "Delantero", 61),
        new Jugador("J180", "Alfredo López", "Delantero", 69),
        new Jugador("J181", "Maria Pedrero", "Delantero", 79),
        new Jugador("J182", "Cecilia Blanco", "Defensa", 75),
    ]),
    new Equipo("E014", "Los Capybaras", "LOS_CAPYBARAS.png", "#A0522D", "#27AE60", 1, "3-4-3").ficharJugadores([
        new Jugador("J183", "Frosmor Lozano", "Portero", 69),
        new Jugador("J184", "Miguel González", "Defensa", 61),
        new Jugador("J185", "Nayara Barbas", "Defensa", 71),
        new Jugador("J186", "Dawelt Lechón", "Defensa", 84),
        new Jugador("J187", "Alonso Morales", "Medio", 77, true),
        new Jugador("J188", "Guillem Med", "Medio", 69),
        new Jugador("J189", "Mireya Rodero", "Medio", 84),
        new Jugador("J190", "Sara Winchester", "Medio", 69),
        new Jugador("J191", "Asur Peón", "Delantero", 77),
        new Jugador("J192", "Lázaro Caso", "Delantero", 65),
        new Jugador("J193", "Nando Nandez", "Delantero", 64),
        new Jugador("J194", "Chabelo Álvarez", "Defensa", 63),
        new Jugador("J195", "Álvaro Morales", "Defensa", 62),
        new Jugador("J196", "Graciano Corrales", "Medio", 85),
    ]),
    new Equipo("E015", "Mieres Ultras", "MIERES_ULTRAS.png", "#2C3E50", "#9B59B6", 1, "4-1-4-1").ficharJugadores([
        new Jugador("J197", "Tomás Feldt", "Portero", 79),
        new Jugador("J198", "Gocker García", "Defensa", 66),
        new Jugador("J199", "Bomber Fernández", "Defensa", 72),
        new Jugador("J200", "Omar Baizán", "Defensa", 62),
        new Jugador("J201", "Destra Hernández", "Defensa", 82),
        new Jugador("J202", "Lucas González", "Defensa", 64),
        new Jugador("J203", "Pelayo Aldecoa", "Medio", 89, true),
        new Jugador("J204", "Sheng Xiong", "Medio", 64),
        new Jugador("J205", "Bryce Withingale", "Medio", 61),
        new Jugador("J206", "Claude Beacons", "Medio", 79),
        new Jugador("J207", "Samuel Guzetti", "Delantero", 67),
        new Jugador("J208", "Sael Martínez", "Delantero", 83),
        new Jugador("J209", "Martin Alvarez", "Delantero", 62),
        new Jugador("J210", "Angel Batista", "Medio", 81),
    ]),
    new Equipo("E016", "Mondongo FC", "MONDONGO_FC.png", "#2980B9", "#F1C40F", 1, "4-5-1").ficharJugadores([
        new Jugador("J211", "Iván Salgado", "Portero", 63),
        new Jugador("J212", "Angel Vicente", "Defensa", 81),
        new Jugador("J213", "Chechu", "Defensa", 64),
        new Jugador("J214", "Rafael Prieto", "Defensa", 70),
        new Jugador("J215", "Diego Menéndez", "Defensa", 62),
        new Jugador("J216", "Dario Silos", "Defensa", 73),
        new Jugador("J217", "Javier Martínez", "Defensa", 77),
        new Jugador("J218", "Lucca Revilla", "Medio", 63),
        new Jugador("J219", "Xuan Jeray", "Medio", 79),
        new Jugador("J220", "Jose Ramos", "Medio", 77, true),
        new Jugador("J221", "Iván Rodríguez", "Medio", 81),
        new Jugador("J222", "Daniel", "Delantero", 65),
        new Jugador("J223", "Pedro Hernández", "Delantero", 67),
        new Jugador("J224", "Silvia Ramos", "Medio", 66),
    ]),
    new Equipo("E017", "Pingones", "PINGONES_FC.png", "#E74C3C", "#000000", 1, "4-3-3").ficharJugadores([
        new Jugador("J225", "Xin Zhou", "Portero", 63),
        new Jugador("J226", "Adrian Real", "Defensa", 83),
        new Jugador("J227", "Fran Suárez", "Defensa", 85),
        new Jugador("J228", "Ander", "Defensa", 68),
        new Jugador("J229", "Maximiliano Fuentes", "Medio", 86, true),
        new Jugador("J230", "Alex F.", "Medio", 66),
        new Jugador("J231", "Alex P.", "Medio", 64),
        new Jugador("J232", "Camilo", "Medio", 77),
        new Jugador("J233", "Justin Szchesnick", "Delantero", 74),
        new Jugador("J234", "Francis", "Delantero", 84),
        new Jugador("J235", "Ivan Lado", "Delantero", 72),
        new Jugador("J236", "Román Fernández Hevia", "Defensa", 69),
        new Jugador("J237", "Pablo Menéndez", "Delantero", 60),
        new Jugador("J238", "Sergio Noval", "Portero", 67),
    ]),
    new Equipo("E018", "Prepuclub", "PREPUCLUB.png", "#27AE60", "#F1C40F", 2, "4-4-2").ficharJugadores([
        new Jugador("J239", "Juan Mantequilla", "Portero", 65),
        new Jugador("J240", "Dani Bisagra", "Defensa", 71),
        new Jugador("J241", "Carlos Muro", "Defensa", 71),
        new Jugador("J242", "Pablo Tackleador", "Defensa", 84),
        new Jugador("J243", "Miguel Pulmón", "Medio", 68),
        new Jugador("J244", "Sergio Cerebro", "Medio", 61),
        new Jugador("J245", "Alex Turbo", "Medio", 74),
        new Jugador("J246", "Eric Gabriel", "Medio", 63),
        new Jugador("J247", "Pepe", "Medio", 64),
        new Jugador("J248", "Javi Killer", "Delantero", 81),
        new Jugador("J249", "Rubén Romperredes", "Delantero", 84),
        new Jugador("J250", "Mario Bala", "Delantero", 80),
        new Jugador("J251", "Javier Suárez", "Delantero", 73, true),
        new Jugador("J252", "Antony", "Delantero", 85),
    ]),
    new Equipo("E019", "Racing Langreano", "RACING_LANGREANO.png", "#E74C3C", "#FFFFFF", 2, "4-2-3-1").ficharJugadores([
        new Jugador("J253", "Ivan Sparrow", "Portero", 74),
        new Jugador("J254", "Alejandro Bayón", "Defensa", 79),
        new Jugador("J255", "Elver Galarga", "Defensa", 83),
        new Jugador("J256", "Irene Montero", "Defensa", 69),
        new Jugador("J257", "Enol Cienfuegos", "Defensa", 62),
        new Jugador("J258", "Roberto", "Defensa", 69),
        new Jugador("J259", "Jorge Abajo", "Medio", 70),
        new Jugador("J260", "Julia Triana", "Medio", 82),
        new Jugador("J261", "Alejandra Tomas", "Medio", 70),
        new Jugador("J262", "Manuel Xaviere", "Medio", 72),
        new Jugador("J263", "Monica IPE", "Medio", 85),
        new Jugador("J264", "Esteban", "Delantero", 84),
        new Jugador("J265", "Hugo Valles", "Delantero", 80, true),
        new Jugador("J266", "Julia Valles", "Delantero", 74),
    ]),
    new Equipo("E020", "Real Bichon", "REAL_BICHON.png", "#1E3799", "#F8C291", 2, "3-5-2").ficharJugadores([
        new Jugador("J267", "Diana", "Portero", 75),
        new Jugador("J268", "Wakko", "Defensa", 71),
        new Jugador("J269", "Keliro", "Defensa", 78),
        new Jugador("J270", "Maurizio", "Defensa", 60),
        new Jugador("J271", "Onguito", "Defensa", 79),
        new Jugador("J272", "Ram", "Medio", 78),
        new Jugador("J273", "María", "Medio", 66),
        new Jugador("J274", "José Ángel", "Medio", 74, true),
        new Jugador("J275", "Karma", "Delantero", 74),
        new Jugador("J276", "Claudio", "Delantero", 65),
        new Jugador("J277", "Andro", "Delantero", 78),
        new Jugador("J278", "Pelayo Ñapas", "Delantero", 64),
        new Jugador("J279", "Derek Dark", "Medio", 65),
        new Jugador("J280", "Mone", "Delantero", 85),
    ]),
    new Equipo("E021", "Sotanita FC", "SOTANITA_FC.png", "#000000", "#DAA520", 2, "5-3-2").ficharJugadores([
        new Jugador("J281", "Ángel ErBlack", "Portero", 67, true),
        new Jugador("J282", "Aurelion", "Portero", 71),
        new Jugador("J283", "Cholo", "Defensa", 69),
        new Jugador("J284", "Itchy", "Defensa", 69),
        new Jugador("J285", "Demon", "Defensa", 75),
        new Jugador("J286", "Mariano", "Defensa", 61),
        new Jugador("J287", "Triunfo", "Defensa", 77),
        new Jugador("J288", "Var", "Defensa", 79),
        new Jugador("J289", "Josema", "Medio", 65),
        new Jugador("J290", "Tibu", "Medio", 64),
        new Jugador("J291", "Pelin", "Delantero", 84),
        new Jugador("J292", "Rafael", "Delantero", 79),
        new Jugador("J293", "Malenia", "Delantero", 75),
        new Jugador("J294", "Nicepool", "Medio", 83),
    ]),
    new Equipo("E022", "UD Nalon", "UD_NALON.png", "#0056b3", "#FFFFFF", 1, "3-4-3").ficharJugadores([
        new Jugador("J295", "Rogelio Flórez", "Portero", 63),
        new Jugador("J296", "Rodrigo Huerta", "Defensa", 85),
        new Jugador("J297", "Enol Bouzas", "Defensa", 70),
        new Jugador("J298", "Mauricio Villa Rodríguez", "Defensa", 80),
        new Jugador("J299", "Saúl Iglesias", "Defensa", 75),
        new Jugador("J300", "Sergio Iglesias", "Defensa", 78),
        new Jugador("J301", "Cristian Montilla", "Medio", 77),
        new Jugador("J302", "Joaquín González", "Medio", 81),
        new Jugador("J303", "Lucas Vega", "Medio", 67),
        new Jugador("J304", "Pedro Díaz", "Medio", 80),
        new Jugador("J305", "Yeray Muñiz", "Medio", 68),
        new Jugador("J306", "Diego Trojaola", "Delantero", 66),
        new Jugador("J307", "Jose Antonio Fernández", "Delantero", 80, true),
        new Jugador("J308", "Tomás Hernández", "Delantero", 67),
    ]),
    new Equipo("E023", "Uttepapautte", "UTTEPAPAUTTE.png", "#B33939", "#FFFFFF", 2, "4-1-4-1").ficharJugadores([
        new Jugador("J309", "Carlos Martínez Soler", "Portero", 81),
        new Jugador("J310", "David López Vega", "Portero", 63),
        new Jugador("J311", "Javier García Blanco", "Defensa", 69),
        new Jugador("J312", "Sergio Fernández Ortiz", "Defensa", 74),
        new Jugador("J313", "Alejandro Pérez Ramos", "Defensa", 76),
        new Jugador("J314", "Raúl Gómez Castro", "Defensa", 83),
        new Jugador("J315", "Pablo Sánchez Gil", "Defensa", 74),
        new Jugador("J316", "Miguel Rodríguez Cano", "Medio", 89, true),
        new Jugador("J317", "Daniel Martín Pardo", "Medio", 60),
        new Jugador("J318", "Álvaro Ruiz Vidal", "Medio", 81),
        new Jugador("J319", "Jorge Díaz Moral", "Medio", 78),
        new Jugador("J320", "Marcos Hernández Sanz", "Delantero", 84),
        new Jugador("J321", "Diego Moreno Cruz", "Delantero", 80),
        new Jugador("J322", "Adrián Muñoz Ibáñez", "Delantero", 71),
    ]),
    new Equipo("E024", "Veljkoneta FC", "VELJKONETA_FC.png", "#009432", "#FFFFFF", 1, "4-5-1").ficharJugadores([
        new Jugador("J323", "Enol Antuña", "Portero", 74),
        new Jugador("J324", "Enrique García", "Portero", 82),
        new Jugador("J325", "Andrés Gómez", "Defensa", 67),
        new Jugador("J326", "Alberto García", "Defensa", 76),
        new Jugador("J327", "Daniel García", "Defensa", 82),
        new Jugador("J328", "Carlos García", "Defensa", 77),
        new Jugador("J329", "Marcos Llorente", "Medio", 64),
        new Jugador("J330", "Dario González", "Medio", 77),
        new Jugador("J331", "Alexandre Pires", "Medio", 75, true),
        new Jugador("J332", "Mateo Díaz", "Medio", 72),
        new Jugador("J333", "Pablo Fernandez", "Medio", 77),
        new Jugador("J334", "Pablo Robledo", "Delantero", 83),
        new Jugador("J335", "Jose Carmelo", "Delantero", 74),
        new Jugador("J336", "Enrique Pérez", "Medio", 83),
    ]),
];

export { listaEquipos, Partido, Jornada };
