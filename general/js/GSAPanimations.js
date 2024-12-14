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
    
   });

function openHome(){
    window.open("/index.html" , "_self")
}


function openMemory () {
    window.open("/lehrerzimmer/memory/MinigameMemory.html", "_self");
}