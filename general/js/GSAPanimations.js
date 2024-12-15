/*
let container = document.getElementsByClassName("1");
let cration = document.createElement("div")

container.appendChild(cration)

*/

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger,Observer,ScrollToPlugin,TextPlugin)
    
    
    let link = document.getElementsByClassName("link");
    const square = document.querySelector('.square');

    gsap.to(".square", {
        duration: .5,
        opacity: 0,
        scale: .1,
        stagger: {
            amount: .9,
            from: "random",
            grid: [8, 8],
        },
        ease: "power1.out",
        delay: .5,
    })

    function startOverlay () {
        var zuUndAuf = gsap.timeline({});
        zuUndAuf.to(".square", {
            duration: .5,
            opacity: 1,
            scale: 1.1,
            stagger: {
                amount: .9,
                from: "random",
                grid: [8, 8],
            },
            ease: "power1.out",
        });
        zuUndAuf.to(".square", {
            duration: .5,
            opacity: 0,
            scale: .1,
            stagger: {
                amount: .9,
                from: "random",
                grid: [8, 8],
            },
            ease: "power1.out",
            delay: 1,
        })

    }
    for(let i = 0; i < 10; i++){
        link[i].addEventListener('click', () => {
            square.classList.add(startOverlay());
        });
    };
    
    //neue animation
    
    

});

document.addEventListener('DOMContentLoaded', function() {
    let mainContainer = document.getElementById("transition");
    let anzahl = 6;
    for (let i = 0; i < anzahl; i++) {
        let para = document.createElement("p");
        para.className = "containerChild"
        para.textContent = 'NBS';
        mainContainer.appendChild(para);
    }
    mainContainer.style.position = "fixed";
    mainContainer.style.right = "0";
    mainContainer.style.top = "0";
    mainContainer.style.zIndex = "10000000000000000000000";
    mainContainer.style.height = "100vh"

    let stripes = document.getElementsByClassName("containerChild");
    for(let i = 0; i < anzahl; i++){
        stripes[i].style.fontSize = "100px"
    }
});





    



function openHome(){
    window.open("../index.html" , "_self")
}


function openMemory () {
    window.open("memory/MinigameMemory.html", "_self");
}