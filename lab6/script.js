const ballSize = 10;
const numberOfBalls = 25;
const linkingDistance = 50;

const mainCanvas = document.querySelector("#mainCanvas");
const ctx = mainCanvas.getContext("2d");

const btnStart = document.querySelector("#btn-start");
const btnReset = document.querySelector("#btn-reset");
const ballsNumber = document.querySelector("#balls-number");

const ballsArray = [];
let animationId;

class BallObject {
  constructor() {
    this.width = (mainCanvas.width - ballSize * 2) * Math.random() + ballSize;
    this.height = (mainCanvas.height - ballSize * 2) * Math.random() + ballSize;
    this.xSpeed = Math.random() < 0.5 ? Math.random() * -5 : Math.random() * 5;
    this.ySpeed = Math.random() < 0.5 ? Math.random() * -5 : Math.random() * 5;
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

const main = () => {
  ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  ballsArray.map((e) => {
    e.draw();
    ballsArray.map((e2) => {
      const distance = Math.hypot(e.width - e2.width, e.height - e2.height);
      if (distance < linkingDistance) {
        ctx.beginPath();
        ctx.moveTo(e.width, e.height);
        ctx.lineTo(e2.width, e2.height);
        ctx.stroke();
      }
    });
  });

  animationId = window.requestAnimationFrame(() => main());
};

btnStart.addEventListener("click", () => {
  for (let i = 0; i < numberOfBalls; i++) {
    ballsArray.push(new BallObject());
    ballsNumber.textContent = `Current number of balls is: ${ballsArray.length}`;
  }
  if (btnStart.textContent === "Start") {
    window.requestAnimationFrame((timeRes) => main(timeRes));
    btnStart.textContent = `Add ${numberOfBalls} balls`;
    btnReset.disabled = false;
  }
});

btnReset.addEventListener("click", () => {
  btnStart.textContent = `Start`;
  btnReset.disabled = true;
  window.cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  ballsArray.splice(0, ballsArray.length);
  ballsNumber.textContent = "";
});
