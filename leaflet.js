let MAP;
let IMAGE;
let CIRCLES = [];
let MARKERS = [];
// Ponemos coordenadas de base par evitar fallos
let POSITION = [40.4165000, -3.7025600]; // Funciona con promesas, por lo que puede tardar en cargar
let RADIUS = 500;
ZOOM = 10;


// Generacion del mapa
function initializeMap() {
    // Init varibles
    image_url = "https://cdn-icons-png.flaticon.com/512/188/188463.png";
    MAP = L.map('map').setView(POSITION, ZOOM);

    // Establecemos el mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(MAP);

    // Imagen de usuario
    IMAGE = L.imageOverlay(image_url, [POSITION, [POSITION[0]-0.07, POSITION[1]+0.07]]).addTo(MAP);

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
                console.log("you are here", POSITION);
                // Cambiamos pos en el mapa
                MAP.setView(POSITION, ZOOM);
                // Dibujamos el icono del usuario
                IMAGE.setBounds([POSITION, [POSITION[0]-0.07, POSITION[1]+0.07]]);
                // Checkeamos si hemos llegado al destino
                cheackearDestino();
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

// CHECKEAR LLEGADA
function cheackearDestino() {
    if (CIRCLES.length !== 0) {
        // Recorremos las posiciones marcadas
        for (destino of CIRCLES) {
            console.log(destino);
            if (destino.getBounds().contains(POSITION)) {
                console.log("BRRRRRR");
                window.navigator.vibrate([200, 100, 300]);
            }
            else {
                console.log("NOT brrr");
            }
        }
    }
}

// EVENTOS
// Captura de evento: click
function onMapClickCircle(e) {
    // radio aleatorio
    // let random = Math.floor(Math.random() * 100) + 1;
    // Creacion de circulo
    CIRCLES.push(L.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: RADIUS
    }).addTo(MAP))
    // Y un marcador
    MARKERS.push(L.marker(e.latlng).addTo(MAP)
        .bindPopup('Destino')
        .openPopup())
    console.log(CIRCLES)
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
    if (CIRCLES.length !== 0 && MARKERS.length !== 0){
        CIRCLES.pop().remove();
        MARKERS.pop().remove();
        console.log(CIRCLES);
    }
}

// MAIN
initializeMap();
getPosition();
