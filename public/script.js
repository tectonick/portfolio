let hamburger = document.getElementById("hamburger");
let menu = document.getElementById("menu");
let arrowDown = document.querySelector("#promo .arrow-down");
let workContainer = document.getElementById("work");
let workLeftControl = workContainer.querySelector(".slider-controls .arrow-side-left");
let workRightControl = workContainer.querySelector(".slider-controls .arrow-side-right");
let works = workContainer.querySelectorAll(".work");
let currentWorkNumber = 0;

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

window.addEventListener("scroll", event => {
    console.log(this.scrollY);
    if (this.scrollY > 50){
        arrowDown.classList.add("hidden")
    }
    else {
        arrowDown.classList.remove("hidden");
    }
});


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
