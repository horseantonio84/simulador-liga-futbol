class Equipo {
    constructor(id, nombre, logo,colorPrincipal,colorSecundario,division) {
        this.id = id;
        this.nombre = nombre;
        this.logo = `assets/img/equipos/${logo}`;
        this.colorPrincipal = colorPrincipal; // Ej: "#ff0000"
        this.colorSecundario = colorSecundario; // Ej: "#ffffff"
        this.division = division;
        
        // Estadísticas de liga
        this.puntos = 0;
        this.pj = 0;
        this.pg = 0;
        this.pe = 0;
        this.pp = 0;
        this.gf = 0;
        this.gc = 0;
        
        // Gestión y Estado
        this.jugadores = [];    // Array para guardar sus jugadores
        this.presupuesto = 500000;
        this.esUsuario = false;
        this.historialResultados = [];         // Historial de resultados
    }

    get diferenciaGoles() {
        return this.gf - this.gc;
    }
}

class Jugador{
    constructor(id,nombre,posicion,rating){
        this.id = id;//Ejemplo J001 
        this.nombre = nombre;
        this.posicion = posicion;// "Portero", "Defensa", "Medio", "Delantero"
        this.rating = rating; // Un número del 1 al 100

        // Estadísticas
        this.goles = 0;
        this.asistencias = 0;
        this.tarjetasAmarillas = 0;
        this.tarjetasRojas = 0;

        // Estado
        this.equipoId = null;
        this.libre = true;
        this.lesionado = false;
        this.sancionado = false;
    }
}

const listaEquipos = [
    new Equipo("E001", "Asturians", "ASTURIANS.png", "#00A8FF", "#FF8C00",2),
    new Equipo("E002", "Atletico Elite", "ATLETICO_ELITE.png", "#D4AF37", "#000000",2),
    new Equipo("E003", "Berracos", "BERRACOS_FC.png", "#8B4513", "#C0C0C0",1),
    new Equipo("E004", "Cerebro SD", "CEREBRO_SD.png", "#E60000", "#000000",1),
    new Equipo("E005", "Cuajados FC", "CUAJADOS_FC.png", "#2ECC71", "#FFFFFF",1),
    new Equipo("E006", "Fabada FC", "FABADA_FC.png", "#C0392B", "#F39C12",1),
    new Equipo("E007", "Fayuelos", "FAYUELOS_FC.png", "#2980B9", "#FFD700",2),
    new Equipo("E008", "Fuerza Salvaje", "FUERZA_SALVAJE.png", "#D35400", "#000000",1),
    new Equipo("E009", "Hectotito FC", "HECTOTITO_FC.png", "#5D4037", "#8BC34A",2),
    new Equipo("E010", "Inafuma y Beben", "INAFUMA_Y_BEBEN.png", "#F1C40F", "#8E44AD",2),
    new Equipo("E011", "Fondo Sur", "INDEPENDIENTE_DEL_FONDO_SUR.png", "#000000", "#FFFFFF",2),
    new Equipo("E012", "Lacteos", "LACTEOS_FC.png", "#3498DB", "#FFFFFF",2),
    new Equipo("E013", "Legio Victrix", "LEGIO_VICTRIX_FC.png", "#990000", "#D4AF37",1),
    new Equipo("E014", "Los Capybaras", "LOS_CAPYBARAS.png", "#A0522D", "#27AE60",1),
    new Equipo("E015", "Mieres Ultras", "MIERES_ULTRAS.png", "#2C3E50", "#9B59B6",1),
    new Equipo("E016", "Mondongo FC", "MONDONGO_FC.png", "#2980B9", "#F1C40F",1),
    new Equipo("E017", "Pingones", "PINGONES_FC.png", "#E74C3C", "#000000",1),
    new Equipo("E018", "Prepuclub", "PREPUCLUB.png", "#27AE60", "#F1C40F",2),
    new Equipo("E019", "Racing Langreano", "RACING_LANGREANO.png", "#E74C3C", "#FFFFFF",2),
    new Equipo("E020", "Real Bichon", "REAL_BICHON.png", "#1E3799", "#F8C291",2),
    new Equipo("E021", "Sotanita FC", "SOTANITA_FC.png", "#000000", "#DAA520",2),
    new Equipo("E022", "UD Nalon", "UD_NALON.png", "#0056b3", "#FFFFFF",1),
    new Equipo("E023", "Uttepapautte", "UTTEPAPAUTTE.png", "#B33939", "#FFFFFF",2),
    new Equipo("E024", "Veljkoneta FC", "VELJKONETA_FC.png", "#009432", "#FFFFFF",1)
];

export {listaEquipos}