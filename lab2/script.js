console.log("hello");

const timeoutInMs = 2500;

const getSilderElements = () => Array.from(document.querySelectorAll(".slider-element"))

let allSliderElements = getSilderElements();

let activeSlide = document.querySelector(".active");

let lolek
 setInterval(() => {
     activeSlide.classList.remove("active");
     activeSlide.classList.add("hiddenByAnimation")
     lolek = parseInt(activeSlide.id)+1;
     console.log(allSliderElements[0])
     if(lolek>=allSliderElements.length) lolek = 0;
     allSliderElements[lolek].classList.add("active")
     allSliderElements[lolek].classList.remove("hidden")
     allSliderElements[lolek].classList.remove("hiddenByAnimation")
     activeSlide = document.querySelector(".active");
 }, timeoutInMs);