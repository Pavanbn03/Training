const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: 100,
  y: 100,
};

const colors = ["#2185C5", "#7ECEFD", "#582A72", "#FF7F66"];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColors(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}
// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

function getDistance(x1, y1, x2, y2) {
  let distanceX = x2 - x1;
  let distanceY = y2 - y1;
  return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}
/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x,
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

// Objects
function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.opacity = 0.2;
  this.mass = 1;
  this.velocity = {
    x: Math.random() - 0.5,
    y: Math.random() - 0.5,
  };

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.save();
    c.globalAlpha = this.opacity;
    c.fillStyle = this.color;
    c.fill();
    c.restore();
    c.closePath();
  };

  this.update = (particles) => {
    this.draw();

    for (let i = 0; i < particles.length; i++) {
      if (this == particles[i]) continue;
      if (
        getDistance(this.x, this.y, particles[i].x, particles[i].y) -
          this.radius * 2 <
        0
      ) {
        resolveCollision(this, particles[i]);
      }
    }
    if (
      getDistance(this.x, this.y, mouse.x, mouse.y) < 80 &&
      this.opacity < 2
    ) {
      this.opacity += 0.2;
    } else if (this.opacity > 0) {
      this.opacity -= 0.05;
      this.opacity = Math.max(0, this.opacity);
    }
    if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  };
}

// Implementation
let particles;

function init() {
  particles = [];
  for (let i = 0; i < 200; i++) {
    const radius = 15;
    let x = randomInt(radius, canvas.width - radius);
    let y = randomInt(radius, canvas.height - radius);

    const color = randomColors(colors);
    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (
          getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 <
          0
        ) {
          x = randomInt(radius, canvas.width - radius);
          y = randomInt(radius, canvas.height - radius);
          j = -1;
        }
      }
    }

    particles.push(new Particle(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update(particles);
  });
}

init();
animate();
