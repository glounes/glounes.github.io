import {Carre,Register} from './monscript.js';
let canvas = document.getElementById("canvas");
function param(time)
{
    var cords=[];
    cords.push(time/5);
    cords.push(800*Math.sin(time % 747+time/((time%100)+1)));

    return cords;}

    var r =  new Register(canvas)
    var timer = 0;
for (let i = 0; i < 10; i++) {
    let c = new Carre(canvas);
    r.register(c);
    c.color ="#"+Math.floor(Math.random()*16777215).toString(16);
    c.setPos(10,Math.round(50*(i+1)+ 50*Math.random()));
    setInterval(function(){
        if (i == 9){
            r.update();
            timer = timer + 1;
        }

        if (timer<(i+1)*10)
            return;
        if (c.x>400)
            return;
        c.setPos(c.x+1,c.y);


    },100);
}



