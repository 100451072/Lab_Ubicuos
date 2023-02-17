let CIRCLE = [];

(function initialize() {
    // Init varibles
    map = L.map('map').setView([51.505, -0.09], 0);

    // Establecemos el mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Para interactuar con el mapa, con diferentes eventos
    // map.once() ==> Para ejecutar una vez
    map.on('click', onMapClickCircle);
    map.on('keydown', onMapKeyDown)
    // Establecer la localizacion del mapa 
    map.locate({setView: true, maxZoom: 8});    
})()

// Captura de evento: click
function onMapClickCircle(e) {
    // Creacion de circulo
    console.log(CIRCLE)
    CIRCLE.push(L.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000
    }).addTo(map))
}

function onMapClickMarker(e) {
    // Pop-up para mostrar info en el mapa
    marker = L.marker(e.latlng).addTo(map)
        .bindPopup('Destino')
        .openPopup();
}

function onMapKeyDown(e) {
    if (event.key === "q") {
        // Eliminacion de circulo
        CIRCLE.pop().remove();
        console.log(CIRCLE);
    }
}
