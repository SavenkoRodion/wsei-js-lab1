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
    this.recordingObject.Recording = [];
    this.recordingObject.IsOn = true;
    this.recordingObject.StartDate = new Date();
    this.recordingObject.IsOn;
    e.textContent = `Stop recording`;
    document.querySelector(`#run-${i}`).disabled = true;
  } else {
    this.recordingObject.IsOn = false;
    e.textContent = `Record on channel ${i + 1}`;
    document.querySelector(`#run-${i}`).disabled = false;
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
  recordingObjects;
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
