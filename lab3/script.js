console.log("hello");

const mainSound = document.querySelector("#mainSound1");
const soundWrapper = [
  ...document.querySelector("#soundWrapper").childNodes,
].filter((e) => e.src);
//console.log(soundWrapper.childNodes.forEach((e) => e));
// const lol = [...domChannel1.childNodes]
//   .filter((e) => e.src)
//   .map((e) => e.src.split("/").pop());
// console.log("array", lol);
let lol = new Date();
const globalArray = [];

//To remove, setTimeout will stop

mainSound.addEventListener("loadedmetadata", function () {
  //soundWrapper.addEventListener("keypress", (e) => {});
  document.addEventListener("keypress", logKey);
});

class Sound {
  constructor(source) {
    this.source = source;
    this.duration = null;
  }
  setDuration = (duration) => {
    this.duration = duration;
  };
}

const playSound = (soundId) => {
  soundWrapper[soundId].play();
  //object should have : or = ?
  let timestamp = (new Date() - lol) / 1000;
  globalArray.push({ timestamp: timestamp, soundId: soundId });
  console.log(globalArray);
  // mainSound.src = source;
  // mainSound.currentTime = 0;
  // globalArray.push(new Sound(mainSound.src));
  // mainSound.play();
  // if (globalArray.length > 1) {
  //   globalArray.at(-2).actualDuration =
  //     (globalArray.at(-1).startDate - globalArray.at(-2).startDate) / 1000 >
  //     globalArray.at(-2).maxDuration
  //       ? globalArray.at(-2).maxDuration
  //       : (globalArray.at(-1).startDate - globalArray.at(-2).startDate) / 1000;
  //   console.log(...globalArray);
  // }
};

function logKey(e) {
  switch (e.key) {
    case "q":
      playSound(0);
      break;
    case "w":
      playSound(1);
      break;
    case "e":
      playSound(2);
      break;
    case "r":
      playSound(3);
      break;
    case "t":
      playSound(4);
      break;
    case "y":
      playSound(5);
      break;
    case "u":
      playSound(6);
      break;
    case "i":
      playSound(7);
      break;
    case "o":
      mainSound.src = "./sounds/tom.wav";
      mainSound.currentTime = 0;
      mainSound.play();
      break;
  }
}

//co powinno być z dzwiękiem wielokrotnie klikanym?
