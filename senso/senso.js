/*
function stateChange(newState) {
    setTimeout(function () {
        if (newState == -1) {
            console.log('VIDEO HAS STOPPED');
        }
    }, 5000);
}

stateChange(-1);
*/
/*
function lassSekundenVergehen(){
    return new Promise((sekundeVergangen) => {
        setTimeout(() => {
            sekundeVergangen();
        }, 1000);
    })
}

let rot = document.getElementById("rot")

function setRot(rotStatus){
    return new Promise((resolve) => {
        */
        /*
        if(rotStatus = 1){
            rot.style.background = "red"
        }else{
            rot.style.background = "lightgray"
        }
        setTimeout( function () {
            if(rotStatus = 1){
                rot.style.background = "lightgrey"
            }else{
                rot.style.background = "red"
            };
            resolve();
        }, 1000);
        */
       /*
       rot.style.background = "red"
       setTimeout(() => {
           rot.style.background = "lightgrey";
           resolve();
       }, 1000);
        //console.log("rot abgespielt")
    })    
}

async function callRot () {
    return new Promise(async (farbeGesetzt) => {
        //console.log("anfang")
        await setRot(1);
        //console.log("ende es sollt funktioniert haben");
        farbeGesetzt();
    })   
}



let blau = document.getElementById("blau")
//let blauStatus = 0;

function setBlau(blauStatus){
    return new Promise((fertig) => {
        if(blauStatus = 1){
            blau.style.background = "blue"
        }else{
            blau.style.background = "lightgray"
        }
        setTimeout( function () {
            if(blauStatus = 1){
                blau.style.background = "lightgrey"
            }else{
                blau.style.background = "blue"
            };
            fertig();
        }, 1000);
        //console.log("rot abgespielt")
    })    
}

async function callBlau() {
    return new Promise(async(blauGesetzt) => {
        await setBlau(1);
        blauGesetzt();
    })
}
/*
let gruen = document.getElementById("gruen")
let gruenStatus = 0;
if(gruenStatus == 1){
    gruen.style.background = "green"
}else{
    gruen.style.background = "lightgray"
}

let gelb = document.getElementById("gelb")
let gelbStatus = 0;
if(gelbStatus == 1){
    gelb.style.background = "yellow"
}else{
    gelb.style.background = "lightgray"
}
*/
/*
let alleFarben = []

function erstelleZufallsFarbe() {
    let createRandomFarbe = Math.floor(Math.random() * 2) + 1;
    alleFarben.push(createRandomFarbe)
}

erstelleZufallsFarbe();

console.log(alleFarben)

async function farbenDurchlaufen() {
    for(let i = 0; i < alleFarben.length; i++){
        if(alleFarben[i] == 1){
            for(let i = 0; i < 1; i++){
                await callRot();
                await lassSekundenVergehen()
                //console.log("in roter kleinen schleife")
            }
        }else if(alleFarben[i] == 2){
            await callBlau();
            await lassSekundenVergehen()
            //console.log("in blauer kleiner schleife")
        }
        erstelleZufallsFarbe();
        console.log(alleFarben)
    }

    console.log("ganz am ende angelangt")
}


farbenDurchlaufen()
*/


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

function stoppComputerIntervall(){
    clearInterval(computerIntervall)
}

function startInterval() {
    //startInterval(computerIntervall, 2000)
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
        if(clickCounter == zufallsFarbe.length - 1){
            console.log("alle abgegeben")
            disableClick();
            erstelleZufallsFarbe();
            console.log(zufallsFarbe)
            startInterval();
            clickCounter = -1;
        }
    }else{
        console.log("falsch")
        disableClick();
        startInterval();
        clickCounter = -1;
    }
}

function disableClick() {
    let kaesten = document.getElementsByClassName("farbe");
    for (let i = 0; i < kaesten.length; i++) {
        kaesten[i].onclick = null;
    }
}







/*
let clickCounter = 0;

async function userInput() {
    setTimeout(() => {
        window.alert("Klicke nun die Felder in der richtigen Reihenfolge an!");
    }, 1000);

    function pruefung() {
        return new Promise((resolve) => {
            if (clickCounter < zufallsFarbe.length) {
                rot.onclick = function(e) {
                    console.log("rot ist angeklickt worden");
                    if (zufallsFarbe[clickCounter] == 1 && rot == e.target) {
                        console.log("passt");
                        clickCounter++;
                        pruefung();
                    } else {
                        window.alert("Das falsche Feld wurde angeklickt! Das Spiel wird von neuem gestartet");
                        clickCounter = 0;
                        resolve();
                    }
                };
                blau.onclick = function(e) {
                    console.log("blau ist angeklickt worden");
                    if (zufallsFarbe[clickCounter] == 2 && blau == e.target) {
                        console.log("passt");
                        clickCounter++;
                        pruefung();
                    } else {
                        window.alert("Das falsche Feld wurde angeklickt! Das Spiel wird von neuem gestartet");
                        clickCounter = 0;
                        resolve();
                    }
                };
            } else {
                window.alert("Das Ende wurde erreicht");
                resolve();
            }
        });
    }

    pruefung().then(() => {
        console.log("die funktion prüfung wurde komplett abgeschlossen");
        erstelleZufallsFarbe();
    });
}
*/
/*
let clickCounter = 0;

async function userInput() {
    setTimeout(() => {
        window.alert("Klicke nun die Felder in der richtigen Reihenfolge an!");
    }, 1000);

    function pruefung() {
        return new Promise((resolve) => {
            if (clickCounter < zufallsFarbe.length) {
                const handleRotClick = (e) => {
                    console.log("rot ist angeklickt worden");
                    if (zufallsFarbe[clickCounter] == 1 && rot == e.target) {
                        console.log("passt");
                        clickCounter++;
                        rot.removeEventListener("click", handleRotClick);
                        pruefung().then(resolve);
                    } else {
                        window.alert("Das falsche Feld wurde angeklickt! Das Spiel wird von neuem gestartet");
                        clickCounter = 0;
                        rot.removeEventListener("click", handleRotClick);
                        resolve();
                    }
                };

                const handleBlauClick = (e) => {
                    console.log("blau ist angeklickt worden");
                    if (zufallsFarbe[clickCounter] == 2 && blau == e.target) {
                        console.log("passt");
                        clickCounter++;
                        blau.removeEventListener("click", handleBlauClick);
                        pruefung().then(resolve);
                    } else {
                        window.alert("Das falsche Feld wurde angeklickt! Das Spiel wird von neuem gestartet");
                        clickCounter = 0;
                        blau.removeEventListener("click", handleBlauClick);
                        resolve();
                    }
                };

                rot.addEventListener("click", handleRotClick);
                blau.addEventListener("click", handleBlauClick);
            } else {
                window.alert("Das Ende wurde erreicht");
                resolve();
            }
        });
    }

    pruefung().then(() => {
        console.log("die funktion prüfung wurde komplett abgeschlossen");
        erstelleZufallsFarbe();
        startInterval()
    });
}

/*
let clickCounter = 0;

function userInput() {
    setTimeout(() => {
        window.alert("Klicke nun die Felder in der richtigen Reihenfolge an!");
    }, 1000);

    function pruefung() {
        if (clickCounter >= zufallsFarbe.length) {
            //window.alert("Du hast die richtige Reihenfolge geklickt! Neue Farbe wird hinzugefügt.");
            erstelleZufallsFarbe();
            console.log("die funktion prüfung wurde komplett abgeschlossen");
            return; // Stops the execution of pruefung
        }

        const handleRotClick = (e) => {
            console.log("rot ist angeklickt worden");
            if (zufallsFarbe[clickCounter] == 1 && rot == e.target) {
                console.log("passt");
                clickCounter++;
                rot.removeEventListener("click", handleRotClick);
                pruefung(); // Calls pruefung again
            } else {
                console.log("Das falsche Feld wurde angeklickt! Das Spiel wird von neuem gestartet");
                //clickCounter = 0;
                rot.removeEventListener("click", handleRotClick);
            }
        };

        const handleBlauClick = (e) => {
            console.log("blau ist angeklickt worden");
            if (zufallsFarbe[clickCounter] == 2 && blau == e.target) {
                console.log("passt");
                clickCounter++;
                blau.removeEventListener("click", handleBlauClick);
                pruefung(); // Calls pruefung again
            } else {
                console.log("Das falsche Feld wurde angeklickt! Das Spiel wird von neuem gestartet");
                //clickCounter = 0;
                blau.removeEventListener("click", handleBlauClick);
            }
        };

        rot.addEventListener("click", handleRotClick);
        blau.addEventListener("click", handleBlauClick);
    }

    pruefung(); // Initial call to pruefung
}
    */
/*
let clickCounter = 0;

function userInput() {
    setTimeout(() => {
        window.alert("Klicke nun die Felder in der richtigen Reihenfolge an!");
    }, 1000);

    function pruefung() {
        if (clickCounter > zufallsFarbe.length) {
            window.alert("Du hast die richtige Reihenfolge geklickt! Neue Farbe wird hinzugefügt.");
            erstelleZufallsFarbe();
            return;
        }

        const handleRotClick = (e) => {
            console.log("rot ist angeklickt worden");
            if (zufallsFarbe[clickCounter] == 1 && rot == e.target) {
                console.log("passt");
                clickCounter++;
                rot.removeEventListener("click", handleRotClick);
                pruefung();
            } else {
                window.alert("Das falsche Feld wurde angeklickt! Das Spiel wird von neuem gestartet");
                clickCounter = 0;
                rot.removeEventListener("click", handleRotClick);
            }
        };

        const handleBlauClick = (e) => {
            console.log("blau ist angeklickt worden");
            if (zufallsFarbe[clickCounter] == 2 && blau == e.target) {
                console.log("passt");
                clickCounter++;
                blau.removeEventListener("click", handleBlauClick);
                pruefung();
            } else {
                window.alert("Das falsche Feld wurde angeklickt! Das Spiel wird von neuem gestartet");
                clickCounter = 0;
                blau.removeEventListener("click", handleBlauClick);
            }
        };

        rot.addEventListener("click", handleRotClick);
        blau.addEventListener("click", handleBlauClick);
    }

    pruefung();
}
*/