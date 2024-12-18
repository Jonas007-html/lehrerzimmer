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
let alleFarben = []

function erstelleZufallsFarbe() {
    let createRandomFarbe = Math.floor(Math.random() * 2) + 1;
    alleFarben.push(createRandomFarbe)
}

erstelleZufallsFarbe();
erstelleZufallsFarbe();
erstelleZufallsFarbe();
erstelleZufallsFarbe();
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
        //console.log(alleFarben)
    }

    console.log("ganz am ende angelangt")
}


farbenDurchlaufen()

