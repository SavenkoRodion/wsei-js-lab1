console.log("hello");

const mainSound = document.querySelector("#mainSound1");
const domChannel1 = document.querySelector("#channel1");

const globalArray = [];

//To remove, setTimeout will stop

mainSound.addEventListener("loadedmetadata", function () {
  domChannel1.addEventListener("keypress", (e) => {});
  document.addEventListener("keypress", logKey);
});

class Sound {
  constructor(source, startDate, maxDuration) {
    this.source = source;
    this.startDate = startDate;
    this.maxDuration = maxDuration;
    this.actualDuration = null;
  }
}

const playSound = (source) => {
  //mainSound.src = source;
  console.log(mainSound.src);
  mainSound.currentTime = 0;
  globalArray.push(new Sound(mainSound.src, Date.now(), mainSound.duration));
  mainSound.play();
  if (globalArray.length > 1) {
    globalArray.at(-2).actualDuration =
      (globalArray.at(-1).startDate - globalArray.at(-2).startDate) / 1000 >
      globalArray.at(-2).maxDuration
        ? globalArray.at(-2).maxDuration
        : (globalArray.at(-1).startDate - globalArray.at(-2).startDate) / 1000;
    console.log(...globalArray);
  }
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
