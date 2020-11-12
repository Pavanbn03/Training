var canvas = document.querySelector("canvas");
var width=window.innerWidth/2;
var height=window.innerHeight/2;
canvas.width=width;
canvas.height=height;
canvas.innerHTML="Hello";
var c =canvas.getContext("2d");
// c.font = "bold 16px Arial";
// c.fillText("Growing Bubbles On Mousemove",width/2,height/2);
// c.font = 'bold 18px Arial';
// c.textAlign = 'center';
// c. textBaseline = 'middle';
// c.fillStyle = 'red'; 
// c.fillText('Hello World!', width/2, height/2); 
items=["#2C3E50","#E74C3C","#ECF0F1","#3498DB","#2980B9"]
minRadius=2;
maxRadius=40;
distance=50;
var Mouse={
    x:undefined,
    y:undefined
}

addEventListener("mousemove",(e)=>{
    Mouse.x=e.x;
    Mouse.y=e.y;
});

window.addEventListener("resize",()=>{
     canvas.width=window.innerWidth;
     canvas.height=window.innerHeight/2;
     width=window.innerWidth;
     height=window.innerHeight;
     initi();
});
// window.onresize = function(){ location.reload(); }

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
function Circle(x,y,dx,dy,radius,random){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius=radius;
    this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.strokeStyle="white";
        c.stroke();
        c.fill();
        c.fillStyle=random;
        
    }
    this.update=function(){
        if(this.x+this.radius>width || this.x-this.radius<0){
            this.dx=-this.dx;
        }
        if(this.y+this.radius>height || this.y-this.radius<0){
            this.dy=-this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;
        this.draw();
        if(Mouse.x-this.x<distance && Mouse.x-this.x>-distance &&
            Mouse.y-this.y<distance && Mouse.y-this.y>-distance){
            if(this.radius<maxRadius)    
                this.radius+=1;
        }
        else if(this.radius>this.minRadius){
           this.radius-=1;
        }
    }
}

var circleArray=[];
function initi(){

    circleArray=[];
    for(let i=0;i<10;i++){
        var r=Math.random()*3+1;
        var x=Math.random()*(width-r*2)+r*2;
        var y=Math.random()*(height-r*2)+r*2;
        var dx=(Math.random()-0.5)*2;
        var dy=(Math.random()-0.5)*2;
        var random = items[Math.floor(Math.random()*items.length)]
        circleArray.push(new Circle(x,y,dx,dy,r,random));
        
    }
}

function animate(){
    requestAnimationFrame(animate);
    // c.fillStyle="rgba(255,255,255,0.05)";//this 2 lines add trace effects
    // c.fillRect(0, 0, width, height);
    c.clearRect(0,0,width,height);
    for(let i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
    }

initi(); 
animate();

  

    