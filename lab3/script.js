console.log("hello");

// const mainSound = document.querySelector("#mainSound1");
// const soundWrapper = [
//   ...document.querySelector("#soundWrapper").childNodes,
// ].filter((e) => e.src);
// //console.log(soundWrapper.childNodes.forEach((e) => e));
// // const lol = [...domChannel1.childNodes]
// //   .filter((e) => e.src)
// //   .map((e) => e.src.split("/").pop());
// // console.log("array", lol);
// let lol = new Date();
// const globalArray = [];

// //To remove, setTimeout will stop

// mainSound.addEventListener("loadedmetadata", function () {
//   //soundWrapper.addEventListener("keypress", (e) => {});
//   document.addEventListener("keypress", logKey);
// });

// class Sound {
//   constructor(source) {
//     this.source = source;
//     this.duration = null;
//   }
//   setDuration = (duration) => {
//     this.duration = duration;
//   };
// }

// const playSound = (soundId) => {
//   soundWrapper[soundId].play();
//   //object should have : or = ?
//   let timestamp = (new Date() - lol) / 1000;
//   globalArray.push({ timestamp: timestamp, soundId: soundId });
//   console.log(globalArray);
//   // mainSound.src = source;
//   // mainSound.currentTime = 0;
//   // globalArray.push(new Sound(mainSound.src));
//   // mainSound.play();
//   // if (globalArray.length > 1) {
//   //   globalArray.at(-2).actualDuration =
//   //     (globalArray.at(-1).startDate - globalArray.at(-2).startDate) / 1000 >
//   //     globalArray.at(-2).maxDuration
//   //       ? globalArray.at(-2).maxDuration
//   //       : (globalArray.at(-1).startDate - globalArray.at(-2).startDate) / 1000;
//   //   console.log(...globalArray);
//   // }
// };

// function logKey(e) {
//   switch (e.key) {
//     case "q":
//       playSound(0);
//       break;
//     case "w":
//       playSound(1);
//       break;
//     case "e":
//       playSound(2);
//       break;
//     case "r":
//       playSound(3);
//       break;
//     case "t":
//       playSound(4);
//       break;
//     case "y":
//       playSound(5);
//       break;
//     case "u":
//       playSound(6);
//       break;
//     case "i":
//       playSound(7);
//       break;
//     case "o":
//       mainSound.src = "./sounds/tom.wav";
//       mainSound.currentTime = 0;
//       mainSound.play();
//       break;
//   }
// }

// const keySoundPair = [
//   { q: "./sounds/boom.wav" },
//   { w: "./sounds/clap.wav" },
//   { e: "./sounds/hihat.wav" },
//   { r: "./sounds/kick.wav" },
//   { t: "./sounds/openhat.wav" },
//   { y: "./sounds/ride.wav" },
//   { u: "./sounds/snare.wav" },
//   { i: "./sounds/tink.wav" },
//   { o: "./sounds/tom.wav" },
// ];

// const keySoundPairs = {
//   q: "./sounds/boom.wav",
//   w: "./sounds/clap.wav",
//   e: "./sounds/hihat.wav",
//   r: "./sounds/kick.wav",
//   t: "./sounds/openhat.wav",
//   y: "./sounds/ride.wav",
//   u: "./sounds/snare.wav",
//   i: "./sounds/tink.wav",
//   o: "./sounds/tom.wav",
// };

const channels = document.querySelectorAll(".channel-record");
const channelsRunners = document.querySelectorAll(".channel-run");

const recordingObjects = [];

class RecordingObject {
  constructor() {
    this.IsOn = false;
    this.Recording = [];
    this.StartDate = null;
  }
}

const getRecordingObject = (i) => {
  if (recordingObjects[i]) {
    return recordingObjects[i];
  }

  recordingObjects[i] = new RecordingObject();
  return recordingObjects[i];
};

const recordingLogic = (e, i) => {
  this.recordingObject = getRecordingObject(i);
  if (!this.recordingObject.IsOn) {
    this.recordingObject.IsOn = true;
    this.recordingObject.StartDate = new Date();
    //document.addEventListener("keypress", logKey);
    console.log(this.recordingObject.IsOn);
  } else {
    this.recordingObject.IsOn = false;
    //   this.isThereNoChannelOn = !recordingObjects.filter((e) => {
    //     return e.IsOn;
    //   }).length;
    //   if (this.isThereNoChannelOn) {
    //     document.removeEventListener("keypress", logKey);
    //   }
    // }
  }
  return;
};

channels.forEach((e, i) => {
  e.addEventListener("click", () => {
    recordingLogic(e, i);
  });
});

const keySoundPairs = {
  q: new Audio("./sounds/boom.wav"),
  w: new Audio("./sounds/clap.wav"),
  e: new Audio("./sounds/hihat.wav"),
  r: new Audio("./sounds/kick.wav"),
  t: new Audio("./sounds/openhat.wav"),
  y: new Audio("./sounds/ride.wav"),
  u: new Audio("./sounds/snare.wav"),
  i: new Audio("./sounds/tink.wav"),
  o: new Audio("./sounds/tom.wav"),
};

const getKeySoundPairs = () => {
  return keySoundPairs;
};

const logKey = (e) => {
  this.keySoundPairs = { ...keySoundPairs };
  this.keySoundPairs[e.key].currentTime = 0;
  this.keySoundPairs[e.key].play();

  this.activeChannels = recordingObjects.filter((e) => {
    return e.IsOn;
  });

  if (this.activeChannels.length) {
    this.activeChannels.map((channel) => {
      channel.Recording.push({
        key: e.key,
        date: new Date() - channel.StartDate,
      });
    });
  }
  console.log(recordingObjects);
};

document.addEventListener("keypress", logKey);

const playRecording = (i) => {
  recordingObjects[i].Recording.map((e) =>
    setTimeout(() => {
      this.keySoundPairs = { ...keySoundPairs };
      this.keySoundPairs[e.key].currentTime = 0;
      this.keySoundPairs[e.key].play();
    }, e.date)
  );
};

channelsRunners.forEach((e, i) => {
  e.addEventListener("click", () => {
    playRecording(i);
  });
});
