// Elements
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const arrowDown = document.querySelector("#promo .arrow-down");
const workContainer = document.getElementById("work");
const workLeftControl = workContainer.querySelector(".slider-controls .arrow-side-left");
const workRightControl = workContainer.querySelector(".slider-controls .arrow-side-right");
const works = workContainer.querySelectorAll(".work");
const backToTopButton = document.querySelector(".back-to-top");
const contactsContainer = document.getElementById("contacts");
const headerContainer = document.getElementsByTagName("header")[0];

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

document.addEventListener("DOMContentLoaded", getParallaxEffect(headerContainer, 1920 / 1100, 15));
document.addEventListener("scroll", getParallaxEffect(headerContainer, 1920 / 1100, 15));
document.addEventListener("scroll", getParallaxEffect(workContainer, 1920 / 1080, 9));
document.addEventListener("scroll", getParallaxEffect(contactsContainer, 1920 / 1440, 9));


function getParallaxEffect(parallaxContainer, aspectRation, shiftStrength){
  return () => {  
    let scrollContainer = GetScrollContainer();
    let scrollBottom = scrollContainer.scrollTop + scrollContainer.clientHeight;
    let workContainerEnd = parallaxContainer.offsetTop + parallaxContainer.offsetHeight;

    if (scrollBottom > parallaxContainer.offsetTop && scrollContainer.scrollTop < workContainerEnd) {

      let workScrollPercent = (scrollBottom - parallaxContainer.offsetTop) / scrollContainer.clientHeight;
      let realAspectRation = parallaxContainer.offsetWidth / parallaxContainer.offsetHeight;
      let workScrollMax = realAspectRation > aspectRation ? (realAspectRation - aspectRation) * shiftStrength : 0;
      
      parallaxContainer.style.setProperty("background-position-y",`-${workScrollPercent * workScrollMax}vw`, "important" ) ;
    }
  
    if (scrollContainer.scrollTop > showScrollUpOnPx)
      backToTopButton.classList.remove("hidden");
    else backToTopButton.classList.add("hidden");
  }
}

backToTopButton.addEventListener("click", goToTop);

let intersectionObserver = new IntersectionObserver((entries)=>{
  for (const entry of entries) {
    if (entry.isIntersecting){
      entry.target.classList.add("visible");
    }
  }
})

let observableElements = document.querySelectorAll(".observable");
for (const element of observableElements) {
  intersectionObserver.observe(element);  
}

let chooseList = document.getElementById("choose-list");
let skillLogos = document.getElementById("skill-logos");

chooseList.addEventListener("mouseover", e => {
  let logosAlts = e.target.dataset.choose.split(" ");
  for (const logoAlt of logosAlts) {
    skillLogos.querySelector(`[alt=${logoAlt}]`).classList.add("choosen");
  }
})

chooseList.addEventListener("mouseout", e => {
  let logosAlts = e.target.dataset.choose.split(" ");
  for (const logoAlt of logosAlts) {
    skillLogos.querySelector(`[alt=${logoAlt}]`).classList.remove("choosen");
  }
})