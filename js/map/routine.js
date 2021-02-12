export function getInfo(query){
        let url = 'http://nominatim.openstreetmap.org/?format=json&addressdetails=1&q='+query+'&format=json&limit=1';
        let myRequest = new Request(url);

        return fetch(myRequest)
            .then(function(response)
            { return response.json(); });
}