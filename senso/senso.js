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
        hilfeSperren();
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
                    if(hilfeAnzahl > 0){
                        hilfeAnfordern();
                    }
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
            if(richtigeZuege >= tenthScore){
                saveHighscoreToRanking(); // Neuer Highscore wird zur Ranking-Seite gespeichert    
            }
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
            hilfeSperren();
            hilfeAnzahl = 2
            hilfeAnzahlErhoehen = true;
            hilfeButton.innerHTML = "<i class='fa fa-lightbulb-o' aria-hidden='true'></i> " + hilfeAnzahl + " Hilfe"    
        }, 600)
    }

}

let clickCounter = -1;
let richtigeZuege = 0;
let highscore =  0 //localStorage.getItem("highscore") || 0;
document.getElementById("rekord").innerHTML = "persönlicher Highscore: " + highscore;

function detectClick(){
    let kaesten = document.getElementsByClassName("farbe");
    for(let i = 0; i < kaesten.length; i++){
        kaesten[i].onclick = () => {
            console.log("geklickt")
            clickCounter++;
            if(clickCounter == 9 && hilfeAnzahlErhoehen == true){
                hilfeAnzahl = hilfeAnzahl + 2;
                hilfeButton.innerHTML = "<i class='fa fa-lightbulb-o' aria-hidden='true'></i> " + hilfeAnzahl + " Hilfe"        
                hilfeAnzahlErhoehen = false;
            }
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
                detectOneTimeHighscore();
            }
        }
    }else{
        console.log("falsch")
        disableClick();
        if(richtigeZuege >= tenthScore){
            saveHighscoreToRanking(); // Neuer Highscore wird zur Ranking-Seite gespeichert    
        }
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
        hilfeSperren();
        falscheFarbeGeklickt(geklickteFarbe);
        hilfeAnzahl = 2
        hilfeAnzahlErhoehen = true;
        hilfeButton.innerHTML = "<i class='fa fa-lightbulb-o' aria-hidden='true'></i> " + hilfeAnzahl + " Hilfe"
    }
}

function falscheFarbeGeklickt(geklickteFarbe) {
    if(geklickteFarbe == "rot"){
    rot.classList.add("wrong-card");
    setTimeout(() => {
        clickedElement.classList.remove("wrong-card");
    }, 500);
    }
    if(geklickteFarbe == "blau"){
        blau.classList.add("wrong-card");
        setTimeout(() => {
            clickedElement.classList.remove("wrong-card");
        }, 500);
    }
    if(geklickteFarbe == "gruen"){
        gruen.classList.add("wrong-card");
        setTimeout(() => {
            clickedElement.classList.remove("wrong-card");
        }, 500);
    }
    if(geklickteFarbe == "gelb"){
        gelb.classList.add("wrong-card");
        setTimeout(() => {
            clickedElement.classList.remove("wrong-card");
        }, 500);
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
    hilfeSperren();
    showLastColor  = setTimeout(() => {
        if(zufallsFarbe[zufallsFarbe.length - 1] == 1){
            rot.style.background = "red";           
            setTimeout( () => {
                rot.style.background = "lightgray"  
                if(hilfeAnzahl > 0){
                    hilfeAnfordern();
                }            
            }, actualSpeedTimeout)
        }else if(zufallsFarbe[zufallsFarbe.length - 1] == 2){
            blau.style.background = "blue";        
            setTimeout( () => {
                blau.style.background = "lightgray"  
                if(hilfeAnzahl > 0){
                    hilfeAnfordern();
                }        
            }, actualSpeedTimeout)
        }else if(zufallsFarbe[zufallsFarbe.length - 1] == 3){
            gruen.style.background = "green";           
            setTimeout( () => {
                gruen.style.background = "lightgray"
                if(hilfeAnzahl > 0){
                    hilfeAnfordern();
                } 
            }, actualSpeedTimeout)
        }else if(zufallsFarbe[zufallsFarbe.length - 1] == 4){
            gelb.style.background = "yellow";
            setTimeout( () => {
                gelb.style.background = "lightgray"
                if(hilfeAnzahl > 0){
                    hilfeAnfordern();
                }
            }, actualSpeedTimeout)
        }     
    }, actualSpeedIntervall);        
    detectClick();  
}

function stoppNurLetzteFarbeZeigen() {
    clearTimeout(showLastColor);
    hilfeSperren();
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


// Hilfe anfordern wenn auf eine birne geklickt wird

// anzeigenDerHilfe
let hilfeButton = document.getElementById("hilfe")
let hilfeAnzahl = 2;
let hilfeAnzahlErhoehen = true;

function countHilfe() {
    hilfeAnzahl--;
    if(hilfeAnzahl == 0){
        hilfeSperren();
    }
    hilfeButton.innerHTML = "<i class='fa fa-lightbulb-o' aria-hidden='true'></i> " + hilfeAnzahl + " Hilfe"
}

function hilfeAnfordern() {
    hilfeButton.style.filter = "brightness(1)";
    hilfeButton.style.cursor = "pointer";
    hilfeButton.onclick = () => {
        //hilfeButton.onclick = null;
        hilfeButton.style.background = "rgb(74, 74, 74)";
        setTimeout(() => {
            hilfeButton.style.background = "#262626"
        }, 100)
        if(zufallsFarbe[clickCounter + 1] == 1){
            rot.classList.add("anzeigenDerHilfe")
        }
        if(zufallsFarbe[clickCounter + 1] == 2){
            blau.classList.add("anzeigenDerHilfe")
        }
        if(zufallsFarbe[clickCounter + 1] == 3){
            gruen.classList.add("anzeigenDerHilfe")
        }
        if(zufallsFarbe[clickCounter + 1] == 4){
            gelb.classList.add("anzeigenDerHilfe")
        }
        setTimeout(() =>{
            rot.classList.remove("anzeigenDerHilfe")
            blau.classList.remove("anzeigenDerHilfe")
            gruen.classList.remove("anzeigenDerHilfe")
            gelb.classList.remove("anzeigenDerHilfe")
        }, 500)
        countHilfe();
    }
    
}

function hilfeSperren() {
    hilfeButton.onclick = null;
    hilfeButton.style.filter = "brightness(0.3)";
    hilfeButton.style.cursor = "not-allowed";
}
hilfeSperren();


 /*   
// highscore speichern und übertragen
function saveHighscoreToRanking() {
    const name = prompt("Bitte gib deinen Namen ein:");
    const klasse = prompt("Bitte gib deine Klasse ein:");
    const score = highscore; // Highscore wird aus deinem Spielcode übernommen

    if (!name || !klasse) {
        alert("Name und Klasse dürfen nicht leer sein!");
        return;
    }

    const player = { name, klasse, score };
    let rankings = JSON.parse(localStorage.getItem("rankings")) || [];
    rankings.push(player);
    rankings.sort((a, b) => b.score - a.score); // Sortiert nach Highscore (höchster zuerst)
    localStorage.setItem("rankings", JSON.stringify(rankings));

    alert("Dein Highscore wurde gespeichert!");
}
*/
/*
if (richtigeZuege > highscore) {
    highscore = richtigeZuege;
    document.getElementById("rekord").innerHTML = "Highscore: " + highscore;
    localStorage.setItem("highscore", highscore);
    detectOneTimeHighscore();
    saveHighscoreToRanking(); // Neuer Highscore wird zur Ranking-Seite gespeichert
}
*/
//kopier nicht meinen code weil der wird sonst mehrfach ausgeführt was zu bugs führen kann
// deine funktion wird immer dann ausgeführt wenn alle farben angklickt wurden und der aktuelle score höher als der bisherige highscore ist 
// somit brauch es den unteren Abschnitt den ich ausgeklammert habe gar nicht
// wenn du willst kann ich ein higscore zurücksetzen button einbauen damit du es leichter testen kannst (schreib es eif hier her oder auf whatsapp)
// ende highscore speichern und übertragen
let SuSname = "";
let klasse = "";
let inputWindow = document.getElementById("inputWindow")
async function werteEingeben(){
    return new Promise((eingegeben) => {
        inputWindow.style.display = "flex"
        document.getElementById("abschicken").onclick = () => {
        SuSname = document.getElementById("name").value;
        klasse = document.getElementById("klasse").value;
        eingegeben()
        inputWindow.style.zIndex = "-1000000"
        }
    })
}

async function saveHighscoreToRanking() {
    /*
    const name = prompt("Bitte gib deinen Namen ein:");
    const klasse = prompt("Bitte gib deine Klasse ein:");
    */
    await werteEingeben();
    const score = highscore; // Highscore wird aus deinem Spielcode übernommen

    if (!SuSname || !klasse) {
        alert("Name und Klasse dürfen nicht leer sein!");
        return;
    }

    const player = { SuSname, klasse, score };

    fetch('/../workspace/games/01_memory/v0.1/srv/save_higscore.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Fehler beim Speichern des Highscores');
    });
}

async function getDaten(file) {
    let daten = await fetch(file);
    let datenjson = await daten.json();
    console.log(datenjson)
    return datenjson;
}

let tenthScore = 0;

async function datenBekommen() {
    let bestscore = await getDaten("/../workspace/games/01_memory/v0.1/srv/highscore.json") || [];
    return bestscore;
}

async function tenthScoreCalc(bestscore) {    
    if(bestscore.length < 10){
        tenthScore = 0   
    }else{
        tenthScore = bestscore[9].score  
    }
    console.log(tenthScore)
    
}

async function bestScoreEver(bestscore) {
    document.getElementById("bestScore").innerHTML = "Bester Highscore jemals: " + bestscore[0].score;
}

async function executeBestScoreEver() {
    let bestscore = await datenBekommen();
    await tenthScoreCalc(bestscore);
    await bestScoreEver()
}
executeBestScoreEver(bestscore);
