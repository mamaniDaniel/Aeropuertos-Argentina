//mi programa va a mostrar todos los aeropuertos de argentina

var mymap;
//subi el archivo CSV a mi repositorio de github.
var CSV_DOWNLOAD_LINK = "https://raw.githubusercontent.com/mamaniDaniel/Aeropuertos-Argentina/master/airports.csv";

window.onload = function() {
    mapConfig();
    parsearCSV();
};

/*CONFIGURANDO Y MOSTRANDO EL MAPA*/
function mapConfig() {
    mymap = L.map('mapa').setView([-40.231486, -66.197284], 4);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoicGljeGlzIiwiYSI6ImNqdm15ZHVwcjE2aTgzenBoZHk2aWw5MHkifQ.m2E53E6wQk1DXr9FhJB9Eg'
    }).addTo(mymap);

}

//post: devuelvo en un array todos los datos del csv
//llama a la funciones dentro del callback
function parsearCSV() {
    Papa.parse(CSV_DOWNLOAD_LINK, {
        complete: function(results) {
            let aeropuertosArg = filtrarDatos(results);
            crearMarcadores(aeropuertosArg);
        },
        download: true,
    }, )
}

//pre: recibe un array de aeropuertos
//post:devuelve un array de aeropuertos filtrados por Argentina
function filtrarDatos(results) {
    let aeropuertosArg = new Array();
    data = results.data;
    //filtro los aeropuertos que son de ARG y si son aeropuertos grandes o medianos
    for (let index = 0; index < data.length; index++) {
        if (data[index][8] === 'AR' && (data[index][2] === 'medium_airport' || data[index][2] === 'large_airport')) {
            aeropuertosArg.push(data[index]);
        }
    }
    return aeropuertosArg;
}

//pre:recibe un array de aeropuertos
//post:crea y muestra marcadores con los aeropuertos
function crearMarcadores(aeropuertosArg) {
    console.log(aeropuertosArg);
    var marker;
    for (let index = 0; index < aeropuertosArg.length; index++) {
        marker = L.marker([aeropuertosArg[index][4], aeropuertosArg[index][5]]).addTo(mymap);
        marker.bindPopup(`<h3>${aeropuertosArg[index][3]}</h1> <p>${aeropuertosArg[index][10]}</p>`);
    }
}