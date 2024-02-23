const ballSize = 10;

const mainCanvas = document.querySelector("#mainCanvas");
const ctx = mainCanvas.getContext("2d");

const ballsArray = [];

class BallObject {
  constructor() {
    this.width = (mainCanvas.width - 10) * Math.random() + 10;
    this.height = (mainCanvas.height - 10) * Math.random() + 10;
    this.xSpeed = Math.random() < 0.5 ? -1 : 1;
    this.ySpeed = Math.random() < 0.5 ? -1 : 1;
  }

  draw = () => {
    if (this.width + this.xSpeed - ballSize <= 0) {
      this.xSpeed = this.xSpeed * -1;
    }
    if (this.height + this.ySpeed - ballSize <= 0) {
      this.ySpeed = this.ySpeed * -1;
    }
    if (this.width + this.xSpeed + ballSize >= mainCanvas.width) {
      this.xSpeed = this.xSpeed * -1;
    }
    if (this.height + this.ySpeed + ballSize >= mainCanvas.height) {
      this.ySpeed = this.ySpeed * -1;
    }
    this.width = this.width + this.xSpeed;
    this.height = this.height + this.ySpeed;
    const ctx = mainCanvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(this.width, this.height, ballSize, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
  };
}

ballsArray.push(new BallObject());
ballsArray[0].draw();

let fps;
let requestTime;

const lol = (time) => {
  ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  ballsArray.map((e) => {
    e.draw();
    ballsArray.map((e2) => {
      const distance = Math.hypot(e.width - e2.width, e.height - e2.height);
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(e.width, e.height);
        ctx.lineTo(e2.width, e2.height);
        ctx.stroke();
      }
    });
  });

  window.requestAnimationFrame((timeRes) => lol(timeRes));
};

for (let i = 0; i < 50; i++) {
  ballsArray.push(new BallObject());
}

window.requestAnimationFrame((timeRes) => lol(timeRes));
