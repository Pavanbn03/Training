import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#00bdff', '#4d39ce', '#088eff'];
function randomInt(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
function randomColors(colors){
  return colors[Math.floor(Math.random()*colors.length)];
}
// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
})

// Particles
function Particles(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians=Math.random()*Math.PI*2;;
    this.velocity=0.05;
    this.distanceFromCenter=randomInt(50,120);
    this.lastMouse={
      x:x,
      y:y
    }

  this.update=()=> {
    const lastPoint={
      x:this.x,
      y:this.y
    }
    this.lastMouse.x+=(mouse.x-this.lastMouse.x)*0.09;
    this.lastMouse.y+=(mouse.y-this.lastMouse.y)*0.09;
    this.radians+=this.velocity;
    this.x=this.lastMouse.x+Math.cos(this.radians)*this.distanceFromCenter;
    this.y=this.lastMouse.y+Math.sin(this.radians)*this.distanceFromCenter;
    this.draw(lastPoint);
  }
  this.draw=(lastPoint)=> {
    // c.beginPath();
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = this.color;
    // c.fill();
    // c.closePath();

    c.beginPath();
    c.strokeStyle=this.color;
    c.lineWidth=this.radius;
    c.moveTo(lastPoint.x,lastPoint.y);
    c.lineTo(this.x,this.y);
    c.stroke();
    c.closePath();
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    const radi = (Math.random()*2)+1;
    const color=randomColors(colors)
    particles.push( new Particles(canvas.width/2,canvas.height/2,radi,color));
  }

}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle="rgba(255,255,255,0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  particles.forEach(particle => {
    particle.update();
  })
}

init();
animate();
