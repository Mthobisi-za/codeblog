function makeMap(poly) {
    var map = L.map('map').setView([-5.48322, 24.676997], 1);
    L.tileLayer('https://api.maptiler.com/maps/osm-standard/{z}/{x}/{y}.jpg?key=CSZaF4WdItjxtTgZLuRa', {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        crossOrigin: true
    }).addTo(map);


    // create an orange rectangle
    L.rectangle(poly, { color: "#ff7800", weight: 10 }).addTo(map);
    // map.fitBounds(polygon.getBounds());
}
async function start() {
    var poly = []
    var cordUser = await axios.get('/stats/user');
    cordUser.data.forEach(element => {
        var changed = JSON.parse(element.data)
        var tempArg = [
            [
                [changed.lat, changed.lon]
            ]
        ]
        poly.push(tempArg);
    });
    makeMap(poly)
}
start();