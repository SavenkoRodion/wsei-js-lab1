const timeoutInMs = 4000;

const getSilderElements = () =>
  Array.from(document.querySelectorAll(".slider-element"));

let allSliderElements = getSilderElements();

let activeSlide = document.querySelector(".active");
const nextButton = document.querySelector("#btnNext");
const prevButton = document.querySelector("#btnPrev");
activeSlide.addEventListener("animationend", () => {
  nextButton.addEventListener("click", nameMeLater);
  prevButton.addEventListener("click", nameMeLater2);
});
let nextSlideId = 0;

const hideElementLogic = () => {
  activeSlide.classList.remove("active");
  activeSlide.classList.remove("activeReverse");
  activeSlide.classList.add("hiddenByAnimation");
  nextButton.removeEventListener("click", nameMeLater);
  prevButton.removeEventListener("click", nameMeLater2);
};

const hideReverseElementLogic = () => {
  activeSlide.classList.remove("active");
  activeSlide.classList.remove("activeReverse");
  activeSlide.classList.add("hiddenByAnimationReverse");
  nextButton.removeEventListener("click", nameMeLater);
  prevButton.removeEventListener("click", nameMeLater2);
};

const activateElementLogic = () => {
  console.log(allSliderElements[nextSlideId]);
  allSliderElements[nextSlideId].classList.add("active");
  allSliderElements[nextSlideId].classList.remove("hiddenByAnimationReverse");
  allSliderElements[nextSlideId].classList.remove("hiddenByAnimation");
  allSliderElements[nextSlideId].classList.remove("hidden");
  allSliderElements[nextSlideId].addEventListener("animationend", () => {
    nextButton.addEventListener("click", nameMeLater);
    prevButton.addEventListener("click", nameMeLater2);
  });
};

const activateReverseElementLogic = () => {
  allSliderElements[nextSlideId].classList.add("activeReverse");
  allSliderElements[nextSlideId].classList.remove("hiddenByAnimationReverse");
  allSliderElements[nextSlideId].classList.remove("hiddenByAnimation");
  allSliderElements[nextSlideId].classList.remove("hidden");
  allSliderElements[nextSlideId].addEventListener("animationend", () => {
    nextButton.addEventListener("click", nameMeLater);
    prevButton.addEventListener("click", nameMeLater2);
  });
};

const sliderChangeAnimationLogic = () => {
  hideElementLogic();
  nextSlideId = parseInt(activeSlide.id) + 1;
  if (nextSlideId >= allSliderElements.length) nextSlideId = 0;
  activateElementLogic();

  activeSlide = document.querySelector(".active");
};

const sliderChangeAnimationLogicReverse = () => {
  hideReverseElementLogic();
  nextSlideId = parseInt(activeSlide.id) - 1;
  console.log(allSliderElements.length);
  if (nextSlideId < 0) nextSlideId = allSliderElements.length - 1;
  activateReverseElementLogic();

  activeSlide = document.querySelector(".activeReverse");
};

let silderChangeInterval = setInterval(() => {
  sliderChangeAnimationLogic();
}, timeoutInMs);

const nameMeLater = () => {
  clearInterval(silderChangeInterval);
  sliderChangeAnimationLogic();
  silderChangeInterval = setInterval(() => {
    sliderChangeAnimationLogic();
  }, timeoutInMs);
};
const nameMeLater2 = () => {
  console.log("here");
  clearInterval(silderChangeInterval);
  sliderChangeAnimationLogicReverse();
  silderChangeInterval = setInterval(() => {
    sliderChangeAnimationLogic();
  }, timeoutInMs);
};

const nextSlide = () => {
  console.log("lol");
};

// Reverse animation + fix mix with absolute and relative
// One step next/prev
//
