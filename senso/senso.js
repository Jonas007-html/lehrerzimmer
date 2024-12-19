// Version: 1.0


let rot = document.getElementById("rot")
let blau = document.getElementById("blau")


let zufallsFarbe = []
function erstelleZufallsFarbe() {
    let createRandomFarbe = Math.floor(Math.random() * 2) + 1;
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
                }, 1000)
            }else if(zufallsFarbe[loopCounter] == 2){
                blau.style.background = "blue";
                //console.log("blau gemacht")
                setTimeout( () => {
                    blau.style.background = "lightgray"
                    //console.log("farbe entfernt")
                }, 1000)
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
    }, 2000)
    
}

startInterval();



let clickCounter = -1;
let richtigeZuege = 0;
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
    if((zufallsFarbe[clickCounter] == 1 && geklickteFarbe == "rot") || (zufallsFarbe[clickCounter] == 2 && geklickteFarbe == "blau")){
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
        if(clickCounter == zufallsFarbe.length - 1){
            console.log("alle abgegeben")
            disableClick();
            erstelleZufallsFarbe();
            console.log(zufallsFarbe)
            startInterval();
            clickCounter = -1;
            richtigeZuege++;
            document.getElementById("counter").innerHTML = richtigeZuege;
        }
    }else{
        console.log("falsch")
        disableClick();
        zufallsFarbe = [];
        erstelleZufallsFarbe();
        startInterval();
        clickCounter = -1;
        richtigeZuege = 0;
        document.getElementById("counter").innerHTML = richtigeZuege;
    }
}

function disableClick() {
    let kaesten = document.getElementsByClassName("farbe");
    for (let i = 0; i < kaesten.length; i++) {
        kaesten[i].onclick = null;
    }
}






