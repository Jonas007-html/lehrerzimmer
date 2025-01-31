let card = document.getElementById("bild");
let image = document.getElementById("bildVonKarte");
let allClicks = [];

let addX = 0;
let addY = 0;

let calcPosX = 0;
let calcPosY = 0;


function detectClick(){
    card.onclick = (e) => {
        let posX = e.offsetX;
        let posY = e.offsetY;
        // Margin oder Padding von dem Parent Element von dem Bild erfassen und auf die Position der Punkte addieren
        let cardStyle = getComputedStyle(card);
        //margin
        /*
        console.log("Bild Margin Links: " + cardStyle.marginLeft)
        console.log("Bild Margin Oben: " + cardStyle.marginTop)
        //padding
        console.log("Bild Padding Links: " + cardStyle.paddingLeft)
        console.log("Bild Padding Oben: " + cardStyle.paddingTop)
        */
        // gesamter abstand von der linken oberen ecke des Bildschirmes berechnen und zuerst in Nummern umwandeln da getComputedStyle ein String zurückgibt (mit "px" am ende)
        addX = parseInt(cardStyle.marginLeft) + parseInt(cardStyle.paddingLeft);
        addY = parseInt(cardStyle.marginTop) + parseInt(cardStyle.paddingTop);
        //zusätzlicher abstand auf koordinaten addieren
        calcPosX = addX + posX;
        calcPosY = addY + posY;
        allClicks.push({x: calcPosX, y: calcPosY});
        console.log(allClicks);
        displayDot();
        // onclick event entfernen
        card.onclick = null;
    }
}
detectClick()


function displayDot() {
    let dot = document.createElement("div");
    dot.classList.add("dot");
    dot.style.left = allClicks[allClicks.length - 1].x + "px";
    dot.style.top = allClicks[allClicks.length - 1].y + "px";

    let img = document.createElement("img");
    img.src = "../geoGuesser/imgGEO/location.png";
    img.style.width = "40px"; 
    img.style.height = "40px"; 
    img.style.transform = "translate(-50%, -100%)";
    img.style.pointerEvents = "none";
    dot.appendChild(img);
    image.after(dot);

    displayTarget();
}
//console.log("outer height: " + getComputedStyle(card).marginLeft)

function displayTarget() {
    let target = document.createElement("div");
    target.classList.add("dot");
    target.style.left = (ziel1.x + addX) + "px";
    target.style.top = (ziel1.y + addY) + "px";
    target.style.zIndex = "10"

    let img = document.createElement("img");
    img.src = "../geoGuesser/imgGEO/ziel.png";
    img.style.width = "40px"; 
    img.style.height = "40px"; 
    img.style.transform = "translate(-15%, -100%)";
    img.style.pointerEvents = "none";
    target.appendChild(img);
    image.after(target);

    punkteBerechnen();
}

let ziel1 = {x: 100, y: 100};

function abstandBerechnen() {
    // zunachst die Differenz der x und y Werte berechnen dann quadrieren (Satz des phytagoras) und addieren und dann die Wurzel ziehen
    let abstand = Math.sqrt(((ziel1.x + addX) - allClicks[allClicks.length - 1].x)**2 + ((ziel1.y + addY) - allClicks[allClicks.length - 1].y)**2);
    //console.log("abstand: "+ abstand);
    return abstand;
}

function punkteBerechnen() {
    let abstand = abstandBerechnen();

    if(abstand > 50 && abstand * 3 < 1000) {
        const punkte = Math.round(1000 - abstand * 3)
        console.log("punkte: " + punkte);
    }else if(1000- abstand > 950){
        console.log("punkte: 1000")
    }else{
        console.log("punkte: 0")
    }
}
