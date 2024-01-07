console.log("hello");

const timeoutInMs = 2500;

const getSilderElements = () =>
  Array.from(document.querySelectorAll(".slider-element"));

let allSliderElements = getSilderElements();

let activeSlide = document.querySelector(".active");

let lolek;

const sliderChangeAnimationLogic = () => {
  activeSlide.classList.remove("active");
  activeSlide.classList.add("hiddenByAnimation");
  lolek = parseInt(activeSlide.id) + 1;
  console.log(allSliderElements[0]);
  if (lolek >= allSliderElements.length) lolek = 0;
  allSliderElements[lolek].classList.add("active");
  allSliderElements[lolek].classList.remove("hidden");
  allSliderElements[lolek].classList.remove("hiddenByAnimation");
  activeSlide = document.querySelector(".active");
};

const silderChangeInterval = setInterval(() => {
  sliderChangeAnimationLogic();
}, timeoutInMs);

const nextSlide = () => {
  console.log("lol");
  activeSlide.addEventListener("animationend", () => {
    clearInterval(silderChangeInterval);
    sliderChangeAnimationLogic();
  });
};

// Reverse animation + fix mix with absolute and relative
// One step next/prev
//
