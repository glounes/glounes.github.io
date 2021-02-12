onmessage = function(e){
    console.log("init")
    setInterval(message,1000);
    let color = "#"+Math.floor(Math.random()*16777215).toString(16)
    function message() {
        postMessage([Math.round(1000*Math.random()),Math.round(1000*Math.random()),color])
            }
}