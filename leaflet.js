let MAP;
let CIRCLE = [];
let MARKER = [];
// Ponemos coordenadas de base par evitar fallos
let POSITION = [40.4165000, -3.7025600]; // Funciona con promesas, por lo que puede tardar en cargar
let RADIUS = 500;
ZOOM = 10;


// Generacion del mapa
function initializeMap() {
    // Init varibles
    MAP = L.map('map').setView(POSITION, ZOOM);

    // Establecemos el mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(MAP);

    // Para interactuar con el mapa, con diferentes eventos
    MAP.on('click', onMapClickCircle);
}

// GEOLOCALIZACION
function getPosition() {
   if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                // Añadiimos la nueva poscion
                POSITION[0] = position.coords.latitude
                POSITION[1] = position.coords.longitude;
                MAP.setView(POSITION, ZOOM);
            },
            (error) => {
                console.log("No se pudo obtener la localizacion del usuario");
            },
            {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 30000
            }
        )
    }
    else {
        console.log("No tiene la extension gealocation instalada");
    }
}


// EVENTOS
// Captura de evento: click
function onMapClickCircle(e) {
    // radio aleatorio
    // let random = Math.floor(Math.random() * 100) + 1;
    // Creacion de circulo
    CIRCLE.push(L.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: RADIUS
    }).addTo(MAP))
    // Y un marcador
    MARKER.push(L.marker(e.latlng).addTo(MAP)
        .bindPopup('Destino')
        .openPopup())
    console.log(CIRCLE)
}

// Solo poner marcador --> No utilizada
function onMapClickMarker(e) {
    // Pop-up para mostrar info en el mapa
    marker = L.marker(e.latlng).addTo(MAP)
        .bindPopup('Destino')
        .openPopup();
}

// BOTONES
// Para definir el radio del circulo
function radiusDefine() {
    event.preventDefault();
    let valor = document.getElementById("radius").value;
    valor = parseInt(valor);

    // Comprbar si el valor es valido
    if (isNaN(valor)) {
        alert("Introduce un valor valido");
    }
    else {
        RADIUS = valor;
    }
}

// Para borra localizaciones asingadas
function onMapKeyDown() {
    // Eliminacion de circulo
    if (CIRCLE.length !== 0 && MARKER.length !== 0){
        CIRCLE.pop().remove();
        MARKER.pop().remove();
        console.log(CIRCLE);
    }
}

// MAIN
initializeMap();
getPosition();
