export class Carre {

    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.ctx.lineWidth=2;
        this.x=0;
        this.y=0;
        this.size=20;
        this.color='rgb(255,0,0)'
    }

    setParam(time, f){
        var e=f(time);
        this.setPosRender(e.pop(),e.pop());
    }


    setPos(x, y){
        this.x=x;
        this.y=y;
    }
    setPosRender(x, y){
        this.clear();
        this.x=x;
        this.y=y;
        this.draw();
    }

    clear(){
        this.ctx.clearRect(this.x,this.y,this.size,this.size);
    }

    draw(){
        this.ctx.fillStyle=this.color;
        this.ctx.fillRect(this.x,this.y,this.size,this.size);
    }
}

export class Register{
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.data = [];
    }

    register(c){
        this.data.push(c);
    }

    update(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let e of this.data){
            e.draw();
        }
    }


}