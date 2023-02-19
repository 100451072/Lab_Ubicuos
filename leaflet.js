let CIRCLE = [];
let MARKER = [];
// Ponemos coordenadas de base par evitar fallos
let POSITION = [40.4165000, -3.7025600];
getPosition();
let RADIUS = 500;

// Generacion del mapa
(function initialize() {
    // Init varibles
    getPosition();
    console.log(POSITION);
    map = L.map('map').setView(POSITION, 10);
    console.log("FUera");
    console.log(POSITION);

    // Establecemos el mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Para interactuar con el mapa, con diferentes eventos
    // map.once() ==> Para ejecutar una vez
    map.on('click', onMapClickCircle);
    //map.on('keydown', onMapKeyDown)
    // Establecer la localizacion del mapa 
    //map.locate({setView: true, maxZoom: 8});    
})()


// GEOLOCALIZACION
function getPosition() {
   if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Si POSITION tiene un valor lo vaciamos
                if (POSITION.length !== 0) {
                    POSITION = [];
                }
                // Añadiimos la nueva poscion
                POSITION.push(position.coords.latitude, position.coords.longitude);
                console.log("Dentro");
                console.log(POSITION);
            },
            (error) => {
                console.log("No se pudo obtener la localizacion del usuario");
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
    }).addTo(map))
    // Y un marcador
    MARKER.push(L.marker(e.latlng).addTo(map)
        .bindPopup('Destino')
        .openPopup())
    console.log(CIRCLE)
}

// Solo poner marcador --> No utilizada
function onMapClickMarker(e) {
    // Pop-up para mostrar info en el mapa
    marker = L.marker(e.latlng).addTo(map)
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
