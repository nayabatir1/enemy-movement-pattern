/** @type {HTMLCanvasElement} */
const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

const CANVAS_WIDTH = (canvas1.width = 500);
const CANVAS_HEIGHT = (canvas1.height = 400);

canvas2.height = CANVAS_HEIGHT;
canvas2.width = CANVAS_WIDTH;

const numberOfEnemies1 = 20;
const enemiesArr1 = [];
let gameFrame1 = 0;

const numberOfEnemies2 = 1;
const enemiesArr2 = [];
let gameFrame2 = 0;

class Enemy1 {
  constructor() {
    this.image = new Image();
    this.image.src = "./images/enemy1.png";
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3) + 1;
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 7;
  }

  update() {
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;

    if (this.x + this.width < 0) this.x = canvas1.width;

    if (gameFrame1 % this.flapSpeed === 0) this.frame++;
    if (this.frame > 4) this.frame = 0;

    this.draw();
  }

  draw() {
    ctx1.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Enemy2 {
  constructor() {
    this.image = new Image();
    this.image.src = "./images/enemy3.png";
    this.spriteWidth = 212;
    this.spriteHeight = 171;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = CANVAS_WIDTH / 2 - this.width / 2;
    this.y = 0;
    this.flapSpeed = Math.random() * 3 + 1;
    this.frame = 0;
    this.frameRate = Math.floor(Math.random() * 30 + 15);
  }

  update() {
    if (this.frame % this.frameRate === 0) {
      this.x += (CANVAS_WIDTH / 2 - this.width / 2) * Math.sin(this.frame);
      this.y++;
    }

    this.draw();
  }

  draw() {
    ctx2.drawImage(
      this.image,
      (this.frame++ % 6) * this.flapSpeed,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies1; i++) {
  enemiesArr1.push(new Enemy1());
}

for (let i = 0; i < numberOfEnemies2; i++) {
  enemiesArr2.push(new Enemy2());
}

function animate() {
  ctx1.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArr1.forEach((enemy) => {
    enemy.update();
  });
  enemiesArr2.forEach((enemy) => {
    enemy.update();
  });
  gameFrame1++;
  requestAnimationFrame(animate);
}

animate();
