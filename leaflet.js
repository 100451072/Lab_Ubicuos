function initialize() {
    map = L.map('map').setView([51.505, -0.09], 0);
    // Establecemos el mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // Pop-up para mostrar info en el mapa
    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('Inemuri')
        .openPopup();
    
    // Pasamos la funcion onMapClick, para ser ejecutada en el evento "click"
    map.on('click', onMapClick);
    // Establecer la localizacion del mapa 
    map.locate({setView: true, maxZoom: 8});    
}

// Captura de evento: click
function onMapClick(e) {
    // Creacion de circulo
    var circle = L.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10000
    }).addTo(map)
}

// MAIN
initialize();
