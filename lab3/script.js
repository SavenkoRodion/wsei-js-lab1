let channels; //= document.querySelectorAll('input[name="channel"]');
const btnRecord = document.querySelector("#record");
const btnRun = document.querySelector("#run");
//const channelsRunners = document.querySelectorAll(".channel-run");

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

const getCheckedChannelIds = () => {
  return [...document.querySelectorAll('input[name="channel"]:checked')].map(
    (e) => {
      return e.id;
    }
  );
};

const getCheckedChannels = () => {
  return [...document.querySelectorAll('input[name="channel"]:checked')];
};

const recordingLogic = (i) => {
  this.recordingObject = getRecordingObject(i);
  if (!this.recordingObject.IsOn) {
    this.recordingObject.Recording = [];
    this.recordingObject.IsOn = true;
    this.recordingObject.StartDate = new Date();
    this.recordingObject.IsOn;
    [...document.querySelectorAll('input[name="channel"]')].forEach(
      (e) => (e.disabled = true)
    );
    btnRun.disabled = true;
    btnRecord.textContent = "Stop recording";
  } else {
    this.recordingObject.IsOn = false;
    [...document.querySelectorAll('input[name="channel"]')].forEach(
      (e) => (e.disabled = false)
    );
    btnRecord.textContent = "Record selected channels";
    btnRun.disabled = false;
  }
  return;
};

const keySoundPairs = {
  q: new Audio("./sounds/boom.wav"),
  w: new Audio("./sounds/clap.wav"),
  e: new Audio("./sounds/hihat.wav"),
  r: new Audio("./sounds/kick.wav"),
  t: new Audio("./sounds/openhat.wav"),
  y: new Audio("./sounds/ride.wav"),
  u: new Audio("./sounds/snare.wav"),
  i: new Audio("./sounds/tom.wav"),
};

const logKey = (e) => {
  if (
    !Object.entries(keySoundPairs)
      .map((e) => e[0])
      .includes(e.key)
  )
    return;

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

btnRecord.addEventListener("click", () => {
  getCheckedChannelIds().map((i) => recordingLogic(i));
});

btnRun.addEventListener("click", () => {
  getCheckedChannelIds().map((i) => playRecording(i));
});

// metronome logic

const inputBpm = document.querySelector("#metronome-bpm");
const btnMetronomeRun = document.querySelector("#metronome-run");
const rythmVisualisation = document.querySelector("#rythm-visualisation");
let metronomeInterval;

inputBpm.addEventListener("input", () => {
  inputBpm.setCustomValidity("");
  return;
});

btnMetronomeRun.addEventListener("click", () => {
  inputBpm.setCustomValidity("");
  if (!inputBpm.value) {
    inputBpm.reportValidity();
    return;
  }
  if (inputBpm.value < 1) {
    inputBpm.setCustomValidity("Bpm can't be smaller than 1");
    inputBpm.reportValidity();
    return;
  }
  if (btnMetronomeRun.textContent === "Off") {
    clearInterval(metronomeInterval);
    btnMetronomeRun.textContent = "On";
    return;
  }
  const bpm = 60 / inputBpm.value;
  new Audio("./sounds/tink.wav").play();
  rythmVisualisation.style.color = "blue";
  metronomeInterval = setInterval(() => {
    new Audio("./sounds/tink.wav").play();
    if (rythmVisualisation.style.color === "red") {
      rythmVisualisation.style.color = "blue";
    } else {
      rythmVisualisation.style.color = "red";
    }
  }, bpm * 1000);
  btnMetronomeRun.textContent = "Off";
});
