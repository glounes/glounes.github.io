const button = document.getElementById("button")
const text = document.getElementById("fname")
const list = document.querySelector('ul');
button.onclick=() => localStorage.setItem("data",text.value)


let database
let database2

window.onload = () => {
    text.value = localStorage.getItem("data");

    //db
    let request = window.indexedDB.open('bgf25',4)
    request.onupgradeneeded = (e) => {
        let db = e.target.result;
        let ob =db.createObjectStore('data', {autoIncrement: true})
        ob.createIndex('title','title',{unique : false})
        ob.createIndex('value','value',{unique : false})
    }
    request.onsuccess = ()  => database = request.result


    let request2 = window.indexedDB.open('calendrier2',4)
    request2.onupgradeneeded = (e) => {
        let db = e.target.result;
        let ob =db.createObjectStore('data', {autoIncrement: true})
        ob.createIndex('categorie','categorie',{unique : false})
        ob.createIndex('date','date',{unique : false})
        ob.createIndex('info','info',{unique : false})
    }
    request2.onsuccess = ()  => database2 = request.result;

    if ('serviceWorker' in navigator)
    {
        window.addEventListener('load',() => navigator.serviceWorker.register('./sw.js'))
    }

}



function displayData(){
    while (list.firstChild)
        list.removeChild(list.lastChild);
    database.transaction('data').objectStore('data').openCursor().onsuccess =
        (e)=>{
        let table = document.createElement("table")
            list.append(table)
            let cur = e.target.result;
            if (cur){
                let l0 = document.createElement("tr")
                let l = document.createElement("th")
                l0.append(l)
                let l2 = document.createElement("ph")
                l0.append(l2)
                table.append(l0)
                l.textContent = cur.value.title;
                l2.textContent = cur.value.value;
                cur.continue()
            }

        }
}

function displayData2(){
    while (list.firstChild)
        list.removeChild(list.lastChild);
    database2.transaction('data').objectStore('data').openCursor().onsuccess =
        (e)=>{
            let table = document.createElement("table")
            list.append(table)
            let cur = e.target.result;
            if (cur){
                let l0 = document.createElement("tr")
                let l = document.createElement("th")
                l0.append(l)
                let l2 = document.createElement("ph")
                l0.append(l2)
                table.append(l0)
                l.textContent = cur.value.categorie;
                l2.textContent = cur.value.info;
                cur.continue()
            }

        }
}


const addData = document.getElementById("addData")
addData.onclick = ()=>{
    let trans = database.transaction(['data'],'readwrite')
    let objectStore = trans.objectStore('data')
    let data = {title: Math.random(), value: Math.random()}
    objectStore.add(data)
    displayData()
}

const addData2 = document.getElementById("addData2")
addData2.onclick = ()=> {
    let myRequest = new Request('https://vbarreaud.github.io/JS_TP_5/INFO2_G1_TP1.ics');
    fetch(myRequest)
        .then(function (response) {
            return response.text()
        }).then(
        text => {
            const jcal = ICAL.parse(text);
            var calender = new ICAL.Component(jcal);
            var vent = calender.getAllSubcomponents('vevent')
            for (var e of vent) {
                console.log(e)
                let trans = database2.transaction(['data'], 'readwrite')
                let objectStore = trans.objectStore('data')
                let data = {
                    categorie: e.getFirstPropertyValue("summary"),
                    date: e.getFirstPropertyValue('dtstart'),
                    info: e.getFirstPropertyValue('description')
                }
                objectStore.add(data)

            }
            displayData2();

        }
    )
}
