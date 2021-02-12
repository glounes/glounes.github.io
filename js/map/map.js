export function initMap(data) {
    var markers = [];
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([lat, lon], 11);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);
    // Nous parcourons la liste des villes
    for (ville of data) {
        var marker = L.marker([ville.lat, ville.lon]).addTo(macarte);
        // Nous ajoutons la popup. A noter que son contenu (ici la variable ville) peut être du HTML
        marker.bindPopup(ville.display_name);
        markers.push(marker);
    }
    var group = new L.featureGroup(markers); // Nous créons le groupe des marqueurs pour adapter le zoom
    macarte.fitBounds(group.getBounds().pad(0.5)); // Nous demandons à ce que tous les marqueurs soient visibles, et ajoutons un padding (pad(0.5)) pour que les marqueurs ne soient pas coupés
}