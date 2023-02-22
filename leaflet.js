let MAP;
let INIT_POS;
let LAST_POS_ID = -1;
let CIRCLES = [];
let MARKERS = [];
// Ponemos coordenadas de base par evitar fallos
let POSITION = [40.4165000, -3.7025600]; // Funciona con promesas, por lo que puede tardar en cargar
let RADIUS = 500;
let ZOOM = 10;


// Generacion del mapa
function initializeMap() {
    // Init varibles
    image_url = "https://cdn-icons-png.flaticon.com/512/188/188463.png";
    MAP = L.map('map').setView(POSITION, ZOOM);

    // Establecemos el mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(MAP);

    // Imagen de pos usuario
    icono = L.icon({iconUrl: image_url, iconSize: [32, 32]});
    INIT_POS = L.marker(POSITION, {icon: icono}).addTo(MAP);

    // Para interactuar con el mapa, con diferentes eventos
    // Click de raton o pantalla movil
    MAP.on('click', onMapClickCircle);
    // En caso de realizar zoom actualizamos su valor
    MAP.on('zoomend', onMapZoomUpdate);
}

// GEOLOCALIZACION
function getPosition() {
   if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            (position) => {
                // Añadiimos la nueva poscion
                POSITION[0] = position.coords.latitude
                POSITION[1] = position.coords.longitude;
                // Cambiamos pos en el mapa
                MAP.setView(POSITION, ZOOM);
                // Dibujamos el icono del usuario
                INIT_POS.setLatLng(POSITION);
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
    if (CIRCLES.length > 0) {
        // Para localizar el marcador y circulo colisionados
        let id = 0;
        // Recorremos las posiciones marcadas
        for (destino of CIRCLES) {
            console.log(destino);
            if (destino.getBounds().contains(POSITION)) {
                // Asignamos el id para saber cual es el utlimo visitado
                LAST_POS_ID = id;
                console.log(LAST_POS_ID);
                // Mostrar Mensaje finalizacion

                console.log("BRRRRRR");
                window.navigator.vibrate([200, 100, 300]);
            }
            id++;
        }
    }
}

// EVENTOS
// Captura de evento: click
function onMapClickCircle(e) {
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
    //console.log(CIRCLES)
}

// Captura de evento: zoom
function onMapZoomUpdate(e) {
    // Asignar el nuevo valor
    ZOOM = MAP.getZoom();
    //console.log("zoom", ZOOM);
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
function deleteLastMarker() {
    // Eliminacion de circulo
    if (CIRCLES.length > 0 && MARKERS.length > 0){
        CIRCLES.pop().remove();
        MARKERS.pop().remove();
        //console.log(CIRCLES);
    }
}

// Para borrar todos los marcadores existentes
function deleteAllMarkers() {
    let len = CIRCLES.length
    // Borrar todos los marcadores existentes
    while (len > 0) {
        // Llamamos a la funcion que borra el ultimo marcador
        deleteLastMarker();
        len--;
    }
}

// Para borrar el marcador visitado
function deleteVisitedMarker() {
    // En caso de que un marcador haya sido localizado
    if (LAST_POS_ID >= 0) {
        // Pasamos el marcador al final de la lista 
        let last_circle = CIRCLES.splice(LAST_POS_ID, 1)[0];
        let last_marker = MARKERS.splice(LAST_POS_ID, 1)[0];
        CIRCLES.push(last_circle);
        MARKERS.push(last_marker);
        // Llamamos a la funcion que borra el ultimo elemento
        deleteLastMarker();
        // Para no borrar el ultimo id borrado devolvemosel valor a nulo
        LAST_POS_ID = -1;
    } else {
        console.log("No has visitado ningun marcador");
    }
}

// MAIN
initializeMap();
getPosition();
