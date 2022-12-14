// Elements
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const arrowDown = document.querySelector("#promo .arrow-down");
const workContainer = document.getElementById("work");
const workLeftControl = workContainer.querySelector(".slider-controls .arrow-side-left");
const workRightControl = workContainer.querySelector(".slider-controls .arrow-side-right");
const works = workContainer.querySelectorAll(".work");
const backToTopButton = document.querySelector(".back-to-top");

// Settings
const showScrollUpOnPx = 200;

// State
let currentWorkNumber = 0;

// Menu
hamburger.addEventListener("click",()=>{
    toggleMenu();
})

function toggleMenu(){
    menu.classList.toggle("is-hidden");
    hamburger.classList.toggle("is-active");
}

menu.querySelectorAll("li a").forEach((link)=>{
    link.addEventListener("click", ()=>toggleMenu())
})

// Slider
workRightControl.addEventListener("click", ()=>{
    changeSlides((currentWorkNumber + 1) % works.length);
})

workLeftControl.addEventListener("click", ()=>{
    changeSlides(currentWorkNumber > 0 ? (currentWorkNumber - 1) : works.length -1);
})

function changeSlides(next){
    works[currentWorkNumber].classList.remove("selected", "visible");
    works[next].classList.add("selected");
    workContainer.style.backgroundImage = `url(${works[next].querySelector("img.work-background").src})`;
    currentWorkNumber = next;
    setTimeout(() => works[currentWorkNumber].classList.add("visible"), 100);
}

//Scroll
window.addEventListener("scroll", () => {
    if (this.scrollY > 50){
        arrowDown.classList.add("hidden")
    }
    else {
        arrowDown.classList.remove("hidden");
    }
});

const GetScrollContainer = () => {
  return document.documentElement || document.body;
};

const goToTop = () => {
    document.body.scrollIntoView();
  };

document.addEventListener("scroll", () => {
  let scrollContainer = GetScrollContainer();
  let scrollBottom = scrollContainer.scrollTop + scrollContainer.clientHeight;
  let workContainerEnd = workContainer.offsetTop + workContainer.offsetHeight;
  const aspectRation = 1920 / 1080;
  const shiftStrength = 9;

  if (scrollBottom > workContainer.offsetTop && scrollContainer.scrollTop < workContainerEnd) {
    let workScrollPercent = (scrollBottom - workContainer.offsetTop) / scrollContainer.clientHeight;
    let realAspectRation = workContainer.offsetWidth / workContainer.offsetHeight;
    let workScrollMax = realAspectRation > aspectRation ? (realAspectRation - aspectRation) * shiftStrength : 0;
    
    workContainer.style.backgroundPositionY = `-${workScrollPercent * workScrollMax}vw`;
  }

  if (scrollContainer.scrollTop > showScrollUpOnPx)
    backToTopButton.classList.remove("hidden");
  else backToTopButton.classList.add("hidden");
});

backToTopButton.addEventListener("click", goToTop);


