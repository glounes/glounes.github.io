self.addEventListener('install',(event) =>
event.waitUntil(caches.open("v1".then(
    (cache)=> cache.add('https://vbarreaud.github.io/JS_TP_5/INFO2_G1_TP1.ics')
))))

self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request).catch(()=>{
            return fetch(event.request).then((response)=>{
                return caches.open("v1").then((cache) => {cache.put(event.request, response.clone()); return response});
            })
        })
    )

})

