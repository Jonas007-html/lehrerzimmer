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
                        }, 700)
                    }else if(zufallsFarbe[loopCounter] == 2){
                        blau.style.background = "blue";
                        setTimeout( () => {
                            blau.style.background = "lightgray"
                        }, 700)
                    }else if(zufallsFarbe[loopCounter] == 3){
                        gruen.style.background = "green";
                        setTimeout( () => {
                            gruen.style.background = "lightgray"
                        }, 700)
                    }else if(zufallsFarbe[loopCounter] == 4){
                        gelb.style.background = "yellow";
                        setTimeout( () => {
                            gelb.style.background = "lightgray"
                        }, 700)
                    }
                    loopCounter++;
                }else{
                    stoppComputerIntervall();
                    detectClick();
                    loopLenght = 0;
                    loopCounter = 0;
                }
            }, 1300)
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
            startButton.innerHTML = "Spiel läuft";
        }, 600);
        setting1Button.onclick = null;
        setting1Button.style.filter = "brightness(0.3)";
        setting1Button.style.cursor = "not-allowed";
    }
}
startGame();


let clickCounter = -1;
let richtigeZuege = 0;
let highscore = 0;
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
            }
        }
    }else{
        console.log("falsch")
        disableClick();
        if(alleFarbenDarstellen == true){
            activateSetting1();
            setting1Button.style.filter = "brightness(1)";
            setting1Button.style.cursor = "pointer";
        }else{
            disableSetting1();
            setting1Button.style.filter = "brightness(1)";
            setting1Button.style.cursor = "pointer";
        }
        alterHighscore = highscore;
        durchschnittswerte.push(richtigeZuege);
        calcDurchschnitt();
        zufallsFarbe = [];
        erstelleZufallsFarbe();
        startButton.innerHTML = "Neustart";
        startGame();
        clickCounter = -1;
        richtigeZuege = 0;
        document.getElementById("counter").innerHTML = "Richtige Spielzüge: " + richtigeZuege;
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

function nurLetzteFarbeZeigen() {  
    stoppComputerIntervall();  
    setTimeout(() => {
        if(zufallsFarbe[zufallsFarbe.length - 1] == 1){
            rot.style.background = "red";           
            setTimeout( () => {
                rot.style.background = "lightgray"              
            }, 700)
        }else if(zufallsFarbe[zufallsFarbe.length - 1] == 2){
            blau.style.background = "blue";        
            setTimeout( () => {
                blau.style.background = "lightgray"          
            }, 700)
        }else if(zufallsFarbe[zufallsFarbe.length - 1] == 3){
            gruen.style.background = "green";           
            setTimeout( () => {
                gruen.style.background = "lightgray"
            }, 700)
        }else if(zufallsFarbe[zufallsFarbe.length - 1] == 4){
            gelb.style.background = "yellow";
            setTimeout( () => {
                gelb.style.background = "lightgray"
            }, 700)
        }     
    }, 700);        
    detectClick();   
}

