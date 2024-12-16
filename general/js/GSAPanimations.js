/*
let container = document.getElementsByClassName("1");
let cration = document.createElement("div")

container.appendChild(cration)

*/

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger,Observer,ScrollToPlugin,TextPlugin, CustomEase)
    
    /*
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
    */
    //neue animation
    
    

});

document.addEventListener('DOMContentLoaded', function() {
    let mainContainer = document.getElementById("transition");
    
    let anzahl = 1;
    /*
    for (let i = 0; i < anzahl; i++) {
        let para = document.createElement("div");
        para.className = "containerChild"
        para.textContent = '';
        mainContainer.appendChild(para);
    }
    let secondOverlay = document.createElement("div");
    secondOverlay.className = "secondOverlay";
    secondOverlay.textContent = ""
    secondOverlay.style.height = "100vh";
    secondOverlay.style.width = "100vw";
    secondOverlay.style.border = "0px solid black"
    secondOverlay.style.background = "#111111"
    secondOverlay.style.zIndex = "1111"
    mainContainer.appendChild(secondOverlay);

    mainContainer.style.position = "fixed";
    mainContainer.style.right = "0";
    mainContainer.style.top = "0";
    mainContainer.style.zIndex = "10000000000000000000000";
    mainContainer.style.height = "100vh";
    mainContainer.style.width = "100vw";
    mainContainer.style.padding = "0"  
    mainContainer.style.pointerEvents = "none"  
*/
    let stripes = document.getElementsByClassName("containerChild");
    let secondOverlay = document.getElementsByClassName("secondOverlay")
/*
    for(let i = 0; i < anzahl; i++){
        stripes[i].style.height = "100%";
        stripes[i].style.border = "0px solid black"
        stripes[i].style.background = "linear-gradient(146deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
    }
    /*
    for(let i = 0; i < anzahl; i++){
        gsap.to(stripes[i], {
            x: 100,
        })
    }
    */
    CustomEase.create("snap", "M0,0 C0.142,0.044 0.18,-0.001 0.368,0.084 0.548,0.166 0.461,0.464 0.56,0.708 0.671,0.984 0.727,0.962 1,1 ")
    
    
    gsap.set(stripes, {
        yPercent: 0
    }) 

    gsap.fromTo(stripes[0], {
        yPercent: 0,
    },{
        yPercent: -100,
        duration: 1.5,
        delay: .1,
        ease: "snap",
    })
        

    
    
    function stagger(){
        for(let i = 0; i < anzahl; i++){           
            gsap.fromTo(stripes[0], {
                yPercent: 100,
            },{
                yPercent: 0,
                duration: 1.3,
                delay: 0,
                ease: "snap",
            })
            }

            
            gsap.fromTo(stripes[0], {
                delay: 1,
                yPercent: 0,
            },{
                yPercent: -100,
                duration: 1.5,
                delay: .1,
                ease: "snap",
            })
                
    };
    gsap.set(secondOverlay,{
        yPercent: 0
    })
    /*
    function openSite(){
        gsap.fromTo(secondOverlay, {
            yPercent: -100,
        },{
            yPercent: -205,
            duration: 1.3,
            delay: 0,
            ease: "snap",           
        })
    }
    openSite();
    */
    gsap.fromTo(secondOverlay, {
        yPercent: -100,
    },{
        yPercent: -205,
        duration: 1.3,
        delay: 0,
        ease: "snap",           
    })
        
    function stagger2(){
        for(let i = 0; i < anzahl; i++){           
            gsap.fromTo(secondOverlay, {
                yPercent: 0,
            },{
                yPercent: -100,
                duration: 1.5,
                delay: .1,
                ease: "snap",           
            })
        }
        gsap.fromTo(secondOverlay, {
            yPercent: -100,
            delay: 1,
        },{
            yPercent: -205,
            duration: 1.3,
            delay: 0,
            ease: "snap",           
        })

    };
    let link = document.getElementsByClassName("link");
    for(let i = 0; i < 10; i++){
        link[i].addEventListener("click", stagger);
        link[i].addEventListener("click", stagger2);
    }
})


    



function openHome(){
    window.open("../index.html" , "_self")
}


function openMemory () {
    window.open("memory/MinigameMemory.html", "_self");
}