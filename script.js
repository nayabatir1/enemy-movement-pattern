/** @type {HTMLCanvasElement} */

const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const canvas3 = document.getElementById("canvas3");
const canvas4 = document.getElementById("canvas4");

const ctx1 = canvas1.getContext("2d");
const ctx2 = canvas2.getContext("2d");
const ctx3 = canvas3.getContext("2d");
const ctx4 = canvas4.getContext("2d");

const CANVAS_HEIGHT =
  (canvas1.height =
  canvas2.height =
  canvas3.height =
  canvas4.height =
    700);

const CANVAS_WIDTH =
  (canvas1.width =
  canvas2.width =
  canvas3.width =
  canvas4.width =
    400);

class Enemy {
  constructor(ctx, width, height, ratio) {
    this.ctx = ctx;
    this.image = new Image();
    this.positionX = 0;
    this.positionY = 0;
    this.width = width;
    this.height = height;
    this.spriteWidth = this.width * ratio;
    this.spriteHeight = this.height * ratio;
    this.canvasX = Math.floor(
      Math.random() * (CANVAS_WIDTH - this.spriteWidth)
    );
    this.canvasY = Math.floor(
      Math.random() * (CANVAS_HEIGHT - this.spriteHeight)
    );
    this.frameRate = Math.floor(Math.random() * (5 - 2) + 2);
    this.frameCount = 1;
    this.frame = 0;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.positionX,
      this.positionY,
      this.width,
      this.height,
      this.canvasX,
      this.canvasY,
      this.spriteWidth,
      this.spriteHeight
    );
  }

  preUpdate() {
    if (this.frame++ % this.frameRate === 0) {
      this.positionX = this.frameCount++ * this.width;
    }
  }
}

class Enemy1 extends Enemy {
  constructor() {
    super(ctx1, 293.5, 154, Math.random() * (0.5 - 0.2) + 0.2);
    this.image.src = "./images/enemy1.png";
    this.totalFrames = 6;
  }

  update() {
    this.preUpdate();

    if (this.frame % this.frameRate === 0) {
      this.canvasX +=
        (Math.random() * (10 - 3) + 3) * (Math.random() * (1 + 1) - 1);

      this.canvasY +=
        (Math.random() * (10 - 3) + 3) * (Math.random() * (1 + 1) - 1);
    }

    if (this.frameCount === this.totalFrames) this.frameCount = 0;

    this.draw();
  }
}

class Enemy2 extends Enemy {
  constructor() {
    super(ctx2, 266, 184, 0.33);
    this.image.src = "./images/enemy2.png";
    this.totalFrames = 6;
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.3;
    this.amplitude = Math.random() * 7;
  }

  update() {
    this.preUpdate();

    if (this.frame % this.frameRate === 0) {
      this.canvasY += this.amplitude * Math.sin(this.angle);
      this.angle += this.angleSpeed;
      this.canvasX -= 5;
    }

    if (this.canvasX < -this.spriteWidth) this.canvasX = CANVAS_WIDTH;
    if (this.frameCount === this.totalFrames) this.frameCount = 0;

    this.draw();
  }
}

class Enemy3 extends Enemy {
  constructor() {
    super(ctx3, 217.5, 176, 0.5);
    this.image.src = "./images/enemy3.png";
    this.totalFrames = 6;
    this.canvasX = 0;
    this.canvasY = 0;
  }

  update() {
    this.preUpdate();

    if (this.frameCount === this.totalFrames) this.frameCount = 0;

    this.draw();
  }
}

const enemies = [];

const enemiesCount = {
  1: 20,
  2: 20,
  3: 1,
};

Object.keys(enemiesCount).forEach((count, i) => {
  new Array(enemiesCount[count]).fill("").forEach(() => {
    switch (i) {
      case 0:
        enemies.push(new Enemy1());
        break;
      case 1:
        enemies.push(new Enemy2());
        break;
      case 2:
        enemies.push(new Enemy3());
        break;
    }
  });
});

function animate() {
  ctx1.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx3.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  enemies.forEach((enemy) => enemy.update());

  requestAnimationFrame(animate);
}

animate();
