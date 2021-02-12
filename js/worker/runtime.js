const canvas = document.querySelector("canvas")


const ctx = canvas.getContext("2d")


function rectangle(e){
    console.log(e.data)
    ctx.fillStyle=e.data[2]
    ctx.fillRect(e.data[0],e.data[1],10,10);
}

for (let k=0; k<10; k++){
    let worker = new Worker("worker.js")
    worker.postMessage("init")
    worker.onmessage = rectangle;
}



