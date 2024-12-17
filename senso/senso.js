let rot = document.getElementById("rot")
let rotStatus = 1;
function setRot(){
    if(rotStatus == 1){
        rot.style.background = "red"
    }else{
        rot.style.background = "lightgray"
    }
}


let blau = document.getElementById("blau")
let blauStatus = 0;
if(blauStatus == 1){
    blau.style.background = "blue"
}else{
    blau.style.background = "lightgray"
}

let gruen = document.getElementById("gruen")
let gruenStatus = 0;
if(gruenStatus == 1){
    gruen.style.background = "green"
}else{
    gruen.style.background = "lightgray"
}

let gelb = document.getElementById("gelb")
let gelbStatus = 0;
if(rotStatus == 1){
    rot.style.background = "red"
}else{
    rot.style.background = "lightgray"
}

let alleFarben = []

function erstelleZufallsFarbe() {
    let createRandomFarbe = Math.floor(Math.random() * 4) + 1;
    alleFarben.push(createRandomFarbe)
}

erstelleZufallsFarbe();
erstelleZufallsFarbe();
erstelleZufallsFarbe();

console.log(alleFarben)

function play() {
    
}
setRot();
