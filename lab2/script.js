const timeoutInMs = 4000;

const getSilderElements = () =>
  Array.from(document.querySelectorAll(".slider-element"));

let allSliderElements = getSilderElements();

let activeSlide = document.querySelector(".active");
const btnNext = document.querySelector("#btnNext");
const btnPrev = document.querySelector("#btnPrev");
const btnOne = document.querySelector("#btnOne");
const btnTwo = document.querySelector("#btnTwo");
const btnThree = document.querySelector("#btnThree");
const btnPause = document.querySelector("#btnPause");
const btnPlay = document.querySelector("#btnPlay");

const addButtonEventListeners = () => {
  btnNext.addEventListener("click", btnNextLogic);
  btnPrev.addEventListener("click", btnPrevLogic);
  btnOne.addEventListener("click", btnOneLogic);
  btnTwo.addEventListener("click", btnTwoLogic);
  btnThree.addEventListener("click", btnThreeLogic);
  btnPause.addEventListener("click", btnPauseLogic);
  btnPlay.addEventListener("click", btnPlayLogic);
};

const removeButtonEventListeners = () => {
  btnNext.removeEventListener("click", btnNextLogic);
  btnPrev.removeEventListener("click", btnPrevLogic);
  btnOne.removeEventListener("click", btnOneLogic);
  btnTwo.removeEventListener("click", btnTwoLogic);
  btnThree.removeEventListener("click", btnThreeLogic);
  btnPause.removeEventListener("click", btnPauseLogic);
  btnPlay.removeEventListener("click", btnPlayLogic);
};

activeSlide.addEventListener("animationend", () => {
  addButtonEventListeners();
});

let nextSlideId = 0;

const hideElementLogic = () => {
  activeSlide.classList.remove("active");
  activeSlide.classList.remove("activeReverse");
  activeSlide.classList.add("hiddenByAnimation");
  removeButtonEventListeners();
};

const hideReverseElementLogic = () => {
  activeSlide.classList.remove("active");
  activeSlide.classList.remove("activeReverse");
  activeSlide.classList.add("hiddenByAnimationReverse");
  removeButtonEventListeners();
};

const activateElementLogic = () => {
  allSliderElements[nextSlideId];
  allSliderElements[nextSlideId].classList.add("active");
  allSliderElements[nextSlideId].classList.remove("hiddenByAnimationReverse");
  allSliderElements[nextSlideId].classList.remove("hiddenByAnimation");
  allSliderElements[nextSlideId].classList.remove("hidden");
  allSliderElements[nextSlideId].addEventListener("animationend", () => {
    addButtonEventListeners();
  });
};

const activateReverseElementLogic = () => {
  allSliderElements[nextSlideId].classList.add("activeReverse");
  allSliderElements[nextSlideId].classList.remove("hiddenByAnimationReverse");
  allSliderElements[nextSlideId].classList.remove("hiddenByAnimation");
  allSliderElements[nextSlideId].classList.remove("hidden");
  allSliderElements[nextSlideId].addEventListener("animationend", () => {
    addButtonEventListeners();
  });
};

const sliderChangeAnimationLogic = () => {
  hideElementLogic();
  nextSlideId = parseInt(activeSlide.id) + 1;
  if (nextSlideId >= allSliderElements.length) nextSlideId = 0;
  activateElementLogic();

  activeSlide = document.querySelector(".active");
};

const sliderDirectChange = (id) => {
  hideElementLogic();
  nextSlideId = id;
  if (nextSlideId >= allSliderElements.length) nextSlideId = 0;
  activateElementLogic();

  activeSlide = document.querySelector(".active");
};

const sliderChangeAnimationLogicReverse = () => {
  hideReverseElementLogic();
  nextSlideId = parseInt(activeSlide.id) - 1;
  allSliderElements.length;
  if (nextSlideId < 0) nextSlideId = allSliderElements.length - 1;
  activateReverseElementLogic();

  activeSlide = document.querySelector(".activeReverse");
};

let silderChangeInterval = setInterval(() => {
  sliderChangeAnimationLogic();
}, timeoutInMs);

const btnNextLogic = () => {
  clearInterval(silderChangeInterval);
  sliderChangeAnimationLogic();
  silderChangeInterval = setInterval(() => {
    sliderChangeAnimationLogic();
  }, timeoutInMs);
};
const btnPrevLogic = () => {
  clearInterval(silderChangeInterval);
  sliderChangeAnimationLogicReverse();
  silderChangeInterval = setInterval(() => {
    sliderChangeAnimationLogic();
  }, timeoutInMs);
};

const btnOneLogic = () => {
  this.sliderId = 0;
  clearInterval(silderChangeInterval);
  if (parseInt(activeSlide.id) === this.sliderId) {
    silderChangeInterval = setInterval(() => {
      sliderChangeAnimationLogic();
    }, timeoutInMs);
    return;
  }
  sliderDirectChange(this.sliderId);
  silderChangeInterval = setInterval(() => {
    sliderChangeAnimationLogic();
  }, timeoutInMs);
};

const btnTwoLogic = () => {
  this.sliderId = 1;
  clearInterval(silderChangeInterval);
  if (parseInt(activeSlide.id) === this.sliderId) {
    silderChangeInterval = setInterval(() => {
      sliderChangeAnimationLogic();
    }, timeoutInMs);
    return;
  }
  sliderDirectChange(this.sliderId);
  silderChangeInterval = setInterval(() => {
    sliderChangeAnimationLogic();
  }, timeoutInMs);
};

const btnThreeLogic = () => {
  this.sliderId = 2;
  clearInterval(silderChangeInterval);
  if (parseInt(activeSlide.id) === this.sliderId) {
    silderChangeInterval = setInterval(() => {
      sliderChangeAnimationLogic();
    }, timeoutInMs);
    return;
  }
  sliderDirectChange(this.sliderId);
  silderChangeInterval = setInterval(() => {
    sliderChangeAnimationLogic();
  }, timeoutInMs);
};

const btnPauseLogic = () => {
  clearInterval(silderChangeInterval);
};

const btnPlayLogic = () => {
  silderChangeInterval = setInterval(() => {
    sliderChangeAnimationLogic();
  }, timeoutInMs);
};
