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

function stoppComputerIntervall(){
    clearInterval(computerIntervall)
}

function startInterval() {
   computerIntervall = setInterval( function farbenDarstellen(){
        loopLenght++;
        if(loopLenght <= zufallsFarbe.length){
            if(zufallsFarbe[loopCounter] == 1){
                rot.style.background = "red";
                //console.log("rot gemacht")
                setTimeout( () => {
                    rot.style.background = "lightgray"
                    //console.log("farbe entfernt")
                }, 700)
            }else if(zufallsFarbe[loopCounter] == 2){
                blau.style.background = "blue";
                //console.log("blau gemacht")
                setTimeout( () => {
                    blau.style.background = "lightgray"
                    //console.log("farbe entfernt")
                }, 700)
            }else if(zufallsFarbe[loopCounter] == 3){
                gruen.style.background = "green";
                //console.log("grün gemacht")
                setTimeout( () => {
                    gruen.style.background = "lightgray"
                    //console.log("farbe entfernt")
                }, 700)
            }else if(zufallsFarbe[loopCounter] == 4){
                gelb.style.background = "yellow";
                //console.log("gelb gemacht")
                setTimeout( () => {
                    gelb.style.background = "lightgray"
                    //console.log("farbe entfernt")
                }, 700)
            }
            loopCounter++;
            //console.log("noch in while schleife")
        }else{
            //console.log("intervall gestoppt")
            stoppComputerIntervall();
            detectClick();
            loopLenght = 0;
            loopCounter = 0;
        }
        //console.log("aus schleife fertig")
    }, 1300)
    
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
            //console.log(clickCounter)
            //console.log(kaesten[i].getAttribute("id"))
            let geklickteFarbe = kaesten[i].getAttribute("id");
            auswertung(geklickteFarbe);
        }
    }
    //return kaesten;
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
            }
        }
    }else{
        console.log("falsch")
        disableClick();
        durchschnittswerte.push(richtigeZuege);
        calcDurchschnitt();
        zufallsFarbe = [];
        erstelleZufallsFarbe();
        //startInterval();
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





