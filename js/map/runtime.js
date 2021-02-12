import {getInfo} from "./routine.js";
import {initMap} from "./map.js";
import {loadData} from "./loadData.js";

let f=(data) => {console.log(data)};
getInfo("Morlaix").then((response)=>console.log(response))
document.getElementById("upload").onclick=onClick;
function onClick(){
    var i=0;
    var mapdata = [];
    loadData((data)=>{
        for (let d of data){
            getInfo(d).then((response)=> {i = i+1;
                mapdata.push(response);
                if (i === data.length){
                    initMap(mapdata);
                }});}

    })
}
