console.log("hello");

const mainSound = document.querySelector("#mainSound");
const domChannel1 = document.querySelector("#channel1");

const globalArray = [];

domChannel1.addEventListener("keypress", (e) => {});

document.addEventListener("keypress", logKey);

class Sound {
  constructor(source, startDate, duration) {
    this.source = source;
    this.startDate = startDate;
  }
}

const playSound = (source) => {
  mainSound.src = source;
  mainSound.currentTime = 0;
  globalArray.push(new Sound(source, Date.now(), mainSound.duration));
  mainSound.play();
  console.log(mainSound.duration);
  console.dir(mainSound);
};

function logKey(e) {
  switch (e.key) {
    case "q":
      playSound("./sounds/boom.wav");
      break;
    case "w":
      playSound("./sounds/clap.wav");
      break;
    case "e":
      playSound("./sounds/hihat.wav");
      break;
    case "r":
      mainSound.src = "./sounds/kick.wav";
      mainSound.currentTime = 0;
      mainSound.play();
      break;
    case "t":
      mainSound.src = "./sounds/openhat.wav";
      mainSound.currentTime = 0;
      mainSound.play();
      break;
    case "y":
      mainSound.src = "./sounds/ride.wav";
      mainSound.currentTime = 0;
      mainSound.play();
      break;
    case "u":
      mainSound.src = "./sounds/snare.wav";
      mainSound.currentTime = 0;
      mainSound.play();
      break;
    case "i":
      mainSound.src = "./sounds/tink.wav";
      mainSound.currentTime = 0;
      mainSound.play();
      break;
    case "o":
      mainSound.src = "./sounds/tom.wav";
      mainSound.currentTime = 0;
      mainSound.play();
      break;
  }
}
