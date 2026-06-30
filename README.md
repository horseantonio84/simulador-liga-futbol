# ⚽ Liga 'L Quesin

Aplicación web para gestionar y visualizar la clasificación de la **Liga 'L Quesin**, una liga de fútbol ficticia ambientada en Asturias, con dos divisiones y 24 equipos. Construida con HTML, CSS y JavaScript (módulos ES6) sobre Bootstrap 5.

## Estado actual

Proyecto en fase inicial. Por ahora está implementada la página de **Clasificación** de 1ª División, que pinta la tabla de equipos (tanto en formato tabla para escritorio como en lista para móvil) a partir de los datos definidos en `data.js`.

## Características

- **Modelo de datos en JS** (`assets/js/shared/data.js`): clases `Equipo` y `Jugador` con sus estadísticas (puntos, partidos jugados/ganados/empatados/perdidos, goles a favor/en contra, diferencia de goles, presupuesto, jugadores, historial de resultados, etc.).
- **24 equipos** repartidos en 1ª y 2ª división, cada uno con escudo, colores y división asignada.
- **Página de clasificación** (`clasificacion.html` + `assets/js/primera_division/clasificacion.js`): filtra los equipos de 1ª división y renderiza dinámicamente la tabla/lista de clasificación.
- **Interfaz responsive** con Bootstrap 5 y Bootstrap Icons: navbar, buscador, menú de estadísticas (goleadores, asistentes, tarjetas) y footer con redes sociales.

## Estructura del proyecto

```
LIGA_QUESIN/
├── clasificacion.html              # Página de clasificación de 1ª División
└── assets/
    ├── css/
    │   └── styles.css              # Estilos propios del proyecto
    ├── js/
    │   ├── shared/
    │   │   └── data.js             # Clases Equipo y Jugador + listado de equipos
    │   └── primera_division/
    │       └── clasificacion.js    # Lógica para pintar la tabla de clasificación
    └── img/
        ├── equipos/                # Escudos de los 24 equipos
        └── logos/                  # Logos de la liga
```

## Uso

Al ser una aplicación estática (HTML/CSS/JS con módulos ES), puede servirse con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8000
```

y abrir `http://localhost:8000/clasificacion.html` en el navegador. (No se puede abrir directamente con `file://` porque `clasificacion.js` usa `import`/`export` de módulos ES6, que los navegadores bloquean en local sin servidor).

## Tecnologías

- HTML5 / CSS3
- JavaScript (ES6, módulos nativos, sin frameworks)
- [Bootstrap 5](https://getbootstrap.com/) y [Bootstrap Icons](https://icons.getbootstrap.com/) vía CDN

## Próximos pasos

- Calendario de partidos.
- Estadísticas: máximos goleadores, asistentes, tarjetas.
- Clasificación de 2ª División.
- Gestión de plantillas, fichajes y presupuesto por equipo.

## Autor

Desarrollado por [horseantonio84](https://github.com/horseantonio84).
