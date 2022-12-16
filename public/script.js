



let hamburger = document.getElementById("hamburger");
let menu = document.getElementById("menu");
let arrowDown = document.querySelector("#promo .arrow-down");



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
