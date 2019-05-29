var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function navinit(){
    window.onscroll = function() {stickyNavbarHandler()};
}

function stickyNavbarHandler(){
    if (window.pageYOffset > sticky){
        navbar.classList.add("sticky")
    }else{
        navbar.classList.remove("sticky")
    }
}

navinit();