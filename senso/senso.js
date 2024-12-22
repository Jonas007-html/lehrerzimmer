// Version: 1.0


let rot = document.getElementById("rot")
let blau = document.getElementById("blau")
let gruen = document.getElementById("gruen")
let gelb = document.getElementById("gelb")

let zufallsFarbe = []
function erstelleZufallsFarbe() {
    let createRandomFarbe = Math.floor(Math.random() * 4) + 1;
    zufallsFarbe.push(createRandomFarbe)
}
erstelleZufallsFarbe()



console.log(zufallsFarbe)

let loopCounter = 0;
let loopLenght = 0;
let computerIntervall;
let alleFarbenDarstellen = true;

function stoppComputerIntervall(){
    clearInterval(computerIntervall)
}

function startInterval() {
    if(alleFarbenDarstellen == true){
        computerIntervall = setInterval( function farbenDarstellen(){
                loopLenght++;
                if(loopLenght <= zufallsFarbe.length){
                    if(zufallsFarbe[loopCounter] == 1){
                        rot.style.background = "red";
                        setTimeout( () => {
                            rot.style.background = "lightgray"
                        }, actualSpeedTimeout)
                    }else if(zufallsFarbe[loopCounter] == 2){
                        blau.style.background = "blue";
                        setTimeout( () => {
                            blau.style.background = "lightgray"
                        }, actualSpeedTimeout)
                    }else if(zufallsFarbe[loopCounter] == 3){
                        gruen.style.background = "green";
                        setTimeout( () => {
                            gruen.style.background = "lightgray"
                        }, actualSpeedTimeout)
                    }else if(zufallsFarbe[loopCounter] == 4){
                        gelb.style.background = "yellow";
                        setTimeout( () => {
                            gelb.style.background = "lightgray"
                        }, actualSpeedTimeout)
                    }
                    loopCounter++;
                }else{
                    stoppComputerIntervall();
                    detectClick();
                    loopLenght = 0;
                    loopCounter = 0;
                }
            }, actualSpeedIntervall)
    }else{
        nurLetzteFarbeZeigen();
    }
    
}


let startButton = document.getElementById("button")
function startGame(){
    startButton.onclick = () => {
        startInterval();
        startButton.onclick = null;
        startButton.style.background = "rgb(74, 74, 74)";
        setTimeout(() => {
            startButton.style.background = "#262626"
            startButton.innerHTML = "Spiel stoppen";
            stopGame();
        }, 600);
        setting1Button.onclick = null;
        setting1Button.style.filter = "brightness(0.3)";
        setting1Button.style.cursor = "not-allowed";
        gettingEveryTimeFaster.onclick = null;
        gettingEveryTimeFaster.style.filter = "brightness(0.3)";
        gettingEveryTimeFaster.style.cursor = "not-allowed";
    }
}
startGame();

function stopGame() {
    startButton.onclick = () => {
        startButton.onclick = null;
        startButton.style.background = "rgb(74, 74, 74)";
        setTimeout(() => {
            startButton.style.background = "#262626"
            startButton.innerHTML = "Spiel starten";
            startGame();
            callSettingFunctionBasedOnAlleFarbenDarstellen();
            startGettingFasterFunction();
            disableClick();
            alterHighscore = highscore;
            durchschnittswerte.push(richtigeZuege);
            calcDurchschnitt();
            zufallsFarbe = [];
            erstelleZufallsFarbe();
            clickCounter = -1;
            richtigeZuege = 0;
            document.getElementById("counter").innerHTML = "Richtige Spielzüge: " + richtigeZuege;
            stoppComputerIntervall();
            loopLenght = 0;
            loopCounter = 0;
            stoppNurLetzteFarbeZeigen();
            actualSpeedIntervall = lastClickedSpeedIntervall;
            actualSpeedTimeout = lastClickedSpeedTimeout;
        }, 600)
    }

}

let clickCounter = -1;
let richtigeZuege = 0;
let highscore = localStorage.getItem("highscore") || 0;
document.getElementById("rekord").innerHTML = "Highscore: " + highscore;

function detectClick(){
    let kaesten = document.getElementsByClassName("farbe");
    for(let i = 0; i < kaesten.length; i++){
        kaesten[i].onclick = () => {
            console.log("geklickt")
            clickCounter++;
            let geklickteFarbe = kaesten[i].getAttribute("id");
            auswertung(geklickteFarbe);
        }
    }
}

function auswertung(geklickteFarbe) {
    if((zufallsFarbe[clickCounter] == 1 && geklickteFarbe == "rot") || (zufallsFarbe[clickCounter] == 2 && geklickteFarbe == "blau") || (zufallsFarbe[clickCounter] == 3 && geklickteFarbe == "gruen") || (zufallsFarbe[clickCounter] == 4 && geklickteFarbe == "gelb")){
        console.log("passt")
        if(geklickteFarbe == "rot"){
             rot.style.background = "red";
             setTimeout(() => {
                rot.style.background = "lightgray"
             }, 200);
        }
        if(geklickteFarbe == "blau"){
            blau.style.background = "blue";
            setTimeout(() => {
               blau.style.background = "lightgray"
            }, 200);
        }
        if(geklickteFarbe == "gelb"){
            gelb.style.background = "yellow";
            setTimeout(() => {
                gelb.style.background = "lightgray"
            }, 200);
        }
        if(geklickteFarbe == "gruen"){
            gruen.style.background = "green";
            setTimeout(() => {
                gruen.style.background = "lightgray"
            }, 200);
        }
        if(clickCounter == zufallsFarbe.length - 1){
            console.log("alle abgegeben")
            erhoeheGeschwindigkeit();
            disableClick();
            erstelleZufallsFarbe();
            console.log(zufallsFarbe)
            startInterval();
            clickCounter = -1;
            richtigeZuege++;
            document.getElementById("counter").innerHTML = "Richtige Spielzüge: " + richtigeZuege;
            if(richtigeZuege > highscore){
                highscore = richtigeZuege;
                document.getElementById("rekord").innerHTML = "Highscore: " + highscore;
                detectOneTimeHighscore();
                localStorage.setItem("highscore", highscore);
            }
        }
    }else{
        console.log("falsch")
        disableClick();
        callSettingFunctionBasedOnAlleFarbenDarstellen();
        startGettingFasterFunction();
        alterHighscore = highscore;
        durchschnittswerte.push(richtigeZuege);
        calcDurchschnitt();
        zufallsFarbe = [];
        erstelleZufallsFarbe();
        startButton.innerHTML = "Spiel starten";
        startGame();
        clickCounter = -1;
        richtigeZuege = 0;
        document.getElementById("counter").innerHTML = "Richtige Spielzüge: " + richtigeZuege;
        actualSpeedIntervall = lastClickedSpeedIntervall;
        actualSpeedTimeout = lastClickedSpeedTimeout;
    }
}

function disableClick() {
    let kaesten = document.getElementsByClassName("farbe");
    for (let i = 0; i < kaesten.length; i++) {
        kaesten[i].onclick = null;
    }
}

let durchschnittswerte = [];
let summe = 0;
let durchschnitt = 0;

function calcDurchschnitt() {
    summe = 0;
    for(let i = 0; i < durchschnittswerte.length; i++){
        summe += durchschnittswerte[i];
    }
    durchschnitt = summe / durchschnittswerte.length;
    durchschnitt = Math.round(durchschnitt * 100) / 100;
    document.getElementById("mittelSpielzuege").innerHTML = "Durchschnittliche Punktzahl: " + durchschnitt;
}

let alterHighscore = highscore;

function detectOneTimeHighscore() {
    if(alterHighscore < highscore){
        showOneTimeHighscore();
        alterHighscore = alterHighscore + 100000000000000000000000000000000000;
    }
}
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger,Observer,ScrollToPlugin,TextPlugin, CustomEase)

    gsap.set(".highscore-sign", {
        xPercent: -100,
    })
    CustomEase.create("snap", "M0,0 C0.142,0.044 0.18,-0.001 0.368,0.084 0.548,0.166 0.461,0.464 0.56,0.708 0.671,0.984 0.727,0.962 1,1 ")

})



function showOneTimeHighscore() {
    gsap.fromTo(".highscore-sign", {
        xPercent: -100,
    }, {
        xPercent: 0,
        duration: 1,
        ease: "snap",
    })
    gsap.to(".highscore-sign", {
        xPercent: 100,
        duration: 1,
        delay: 1,
        ease: "snap",
    })
}

let setting1Button = document.getElementById("setting1")
function activateSetting1() {
    setting1Button.onclick = () => {
        setting1Button.onclick = null;
        setting1Button.style.background = "rgb(74, 74, 74)";
        setTimeout(() => {
            setting1Button.style.background = "#262626";
        }, 100);  
        setting1Button.innerHTML = "Nur letzte Farbe anzeigen: aktiviert";
        alleFarbenDarstellen = false;
        disableSetting1();
    }
}
activateSetting1();

function disableSetting1() {
    setting1Button.onclick = () => {
        setting1Button.onclick = null;
        setting1Button.style.background = "rgb(74, 74, 74)";
        setTimeout(() => {
            setting1Button.style.background = "#262626";
        }, 100);  
        setting1Button.innerHTML = "Nur letzte Farbe anzeigen: deaktiviert";
        alleFarbenDarstellen = true;
        activateSetting1();
    }
}

let showLastColor

function nurLetzteFarbeZeigen() {  
    stoppComputerIntervall();  
    showLastColor  = setTimeout(() => {
        if(zufallsFarbe[zufallsFarbe.length - 1] == 1){
            rot.style.background = "red";           
            setTimeout( () => {
                rot.style.background = "lightgray"              
            }, actualSpeedTimeout)
        }else if(zufallsFarbe[zufallsFarbe.length - 1] == 2){
            blau.style.background = "blue";        
            setTimeout( () => {
                blau.style.background = "lightgray"          
            }, actualSpeedTimeout)
        }else if(zufallsFarbe[zufallsFarbe.length - 1] == 3){
            gruen.style.background = "green";           
            setTimeout( () => {
                gruen.style.background = "lightgray"
            }, actualSpeedTimeout)
        }else if(zufallsFarbe[zufallsFarbe.length - 1] == 4){
            gelb.style.background = "yellow";
            setTimeout( () => {
                gelb.style.background = "lightgray"
            }, actualSpeedTimeout)
        }     
    }, actualSpeedTimeout);        
    detectClick();   
}

function stoppNurLetzteFarbeZeigen() {
    clearTimeout(showLastColor);
}


function callSettingFunctionBasedOnAlleFarbenDarstellen() {
    if(alleFarbenDarstellen == true){
        activateSetting1();
        setting1Button.style.filter = "brightness(1)";
        setting1Button.style.cursor = "pointer";
    }else{
        disableSetting1();
        setting1Button.style.filter = "brightness(1)";
        setting1Button.style.cursor = "pointer";
    }
}



let defaultSpeedIntervall = 1300
let defaultSpeedTimeout = 700

let slowSpeedIntervall = 2000
let slowSpeedTimeout = 1000

let fastSpeedIntervall = 1000
let fastSpeedTimeout = 500

let actualSpeedIntervall = defaultSpeedIntervall
let actualSpeedTimeout = defaultSpeedTimeout

let lastClickedSpeedIntervall = defaultSpeedIntervall
let lastClickedSpeedTimeout = defaultSpeedTimeout


let normal = document.getElementById("normal")
function defaultSpeed() {
    actualSpeedIntervall = defaultSpeedIntervall
    actualSpeedTimeout = defaultSpeedTimeout

    lastClickedSpeedIntervall = defaultSpeedIntervall
    lastClickedSpeedTimeout = defaultSpeedTimeout
    normal.style.background = "rgb(74, 74, 74)";
    setTimeout(() => {
        normal.style.background = "#262626"
    }, 100)
}
normal.addEventListener("click", defaultSpeed)

let langsam = document.getElementById("langsam")
function slowSpeed() {
    actualSpeedIntervall = slowSpeedIntervall
    actualSpeedTimeout = slowSpeedTimeout

    lastClickedSpeedIntervall = slowSpeedIntervall
    lastClickedSpeedTimeout = slowSpeedTimeout
    langsam.style.background = "rgb(74, 74, 74)";
    setTimeout(() => {
        langsam.style.background = "#262626"
    }, 100)
}
langsam.addEventListener("click", slowSpeed)    

let schnell = document.getElementById("schnell")
function fastSpeed() {
    actualSpeedIntervall = fastSpeedIntervall
    actualSpeedTimeout = fastSpeedTimeout

    lastClickedSpeedIntervall = fastSpeedIntervall
    lastClickedSpeedTimeout = fastSpeedTimeout
    schnell.style.background = "rgb(74, 74, 74)";
    setTimeout(() => {
        schnell.style.background = "#262626"
    }, 100)
}
schnell.addEventListener("click", fastSpeed)

let gettingEveryTimeFaster = document.getElementById("gettingFaster")
let isGettingFaster = true;

function startGettingFasterFunction() {
    if(isGettingFaster = true){
        gettingNotFaster();
        gettingEveryTimeFaster.style.filter = "brightness(1)";
        gettingEveryTimeFaster.style.cursor = "pointer";
    }else{
        gettingFaster();
        gettingEveryTimeFaster.style.filter = "brightness(1)";
        gettingEveryTimeFaster.style.cursor = "pointer";
    }
}
startGettingFasterFunction();

function gettingNotFaster() {
    isGettingFaster = false
    gettingEveryTimeFaster.onclick = () => {
        gettingEveryTimeFaster.onclick = null;
        gettingEveryTimeFaster.style.background = "rgb(74, 74, 74)";
        setTimeout(() => {
            gettingEveryTimeFaster.style.background = "#262626"
        }, 100)
        gettingEveryTimeFaster.innerHTML = "Mit jeder Runde schneller werden: Aus"
        gettingFaster();
    }
}

function gettingFaster() {
    isGettingFaster = true;
    gettingEveryTimeFaster.onclick = () => {
        gettingEveryTimeFaster.onclick = null;
        gettingEveryTimeFaster.style.background = "rgb(74, 74, 74)";
        setTimeout(() => {
            gettingEveryTimeFaster.style.background = "#262626"
        }, 100)
        gettingEveryTimeFaster.innerHTML = "Mit jeder Runde schneller werden: An"
        gettingNotFaster();
    }
}

function erhoeheGeschwindigkeit() {
    if(isGettingFaster = true){
        if(actualSpeedIntervall > 800){
            actualSpeedIntervall = actualSpeedIntervall - 70
        }
        if(actualSpeedTimeout > 400){
        actualSpeedTimeout = actualSpeedTimeout - 70
        }
    }
}
    