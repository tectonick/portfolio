



let hamburger = document.getElementById("hamburger");
let menu = document.getElementById("menu");



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
