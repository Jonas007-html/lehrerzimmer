document.addEventListener("DOMContentLoaded", (event) => {

    let card = document.getElementById("bild");
    let image = document.getElementById("bildVonKarte");
    let allClicks = [];
    let round = 1;
    
    let roundMax = parseInt(document.getElementById("maxRounds").textContent)
    console.log("roundMax: " + roundMax)
    let isGuessedIndicator = false

    let addX = 0;
    let addY = 0;

    let calcPosX = 0;
    let calcPosY = 0;

    //Damit bei unterschiedlichen Bildgrößen die Punkte richtig gesetzt werden
    let bildgroesse = parseInt(getComputedStyle(image).width)

    function verhaeltnisBerechnen(bildgroesse) {
        let verhaeltnis = (512 / bildgroesse);
        return verhaeltnis;
    }
    verhaeltnisBerechnen();

    function detectClick(){
        card.onclick = (e) => {
            if(isGuessedIndicator == true){
                document.getElementById("dot").remove()
            }
            allClicks = []
            let posX = e.offsetX;
            let posY = e.offsetY
            console.log("offX" + posX + "offY" + posY)
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
            calcPosX = addX + posX  
            calcPosY = addY + posY 
            allClicks.push({x: calcPosX, y: calcPosY});
            console.log(allClicks);
            isGuessedIndicator = true
            displayDot();
            // onclick event entfernen
            card.onclick = null;
            detectClick()
        }
    }
    detectClick()


    function displayDot() {
        let dot = document.createElement("div");
        dot.classList.add("dot");
        dot.setAttribute("id", "dot");
        dot.style.pointerEvents = "none"
        dot.style.left = allClicks[allClicks.length - 1].x + "px";
        dot.style.top = allClicks[allClicks.length - 1].y + "px";

        console.log("x: " + allClicks[allClicks.length - 1].x + " y: " + allClicks[allClicks.length - 1].y);

        let img = document.createElement("img");
        img.src = "../geoGuesser/imgGEO/location.png";
        img.style.width = "40px"; 
        img.style.height = "40px"; 
        img.style.transform = "translate(-50%, -100%)";
        img.style.pointerEvents = "none";
        dot.appendChild(img);
        let parentDiv = document.getElementById("parent");
        parentDiv.appendChild(dot);
        isGuessed()
    }
    
    function isGuessed() {
        submitButton.style.filter = "brightness(1)";
        submitButton.removeEventListener("click", handleSubmit); // Entfernen des Event-Listeners
        submitButton.addEventListener("click", handleSubmit); // Hinzufügen des Event-Listeners
    }

    function handleSubmit() {
        displayTarget();
        if(round < roundMax){
        nextRoundFunction();
        }else{
            console.log("end")
        }
    }
    //let ziel1 = {x: Number(prompt("X Wert zwischen 0 und 512")), y: Number(prompt("Y Wert zwischen 0 und 512"))};
    let ziel1 = {x: (419 / verhaeltnisBerechnen(bildgroesse)), y: (343 / verhaeltnisBerechnen(bildgroesse))}; 
    let ziel2 = {x: (198 / verhaeltnisBerechnen(bildgroesse)), y: (340 / verhaeltnisBerechnen(bildgroesse))};
    let ziele = {ziel1, ziel2}
    function displayTarget() {
        let target = document.createElement("div");
        target.classList.add("dot");
        target.setAttribute("id", "target");

        let currentZiel = ziele["ziel" + round];
        target.style.left = (currentZiel.x + addX) + "px";
        target.style.top = (currentZiel.y + addY) + "px"; 
        target.style.zIndex = "10"

        let img = document.createElement("img");
        img.src = "../geoGuesser/imgGEO/ziel.png";
        img.style.width = "40px"; 
        img.style.height = "40px"; 
        img.style.transform = "translate(-15%, -100%)";
        img.style.pointerEvents = "none";
        target.appendChild(img);
        image.after(target);
        card.onclick = null;
        submitButton.style.filter = "brightness(.5)"
        punkteBerechnen();
    }



    function abstandBerechnen() {
        // Dynamischer Zugriff auf das aktuelle Ziel basierend auf der aktuellen Runde
        let currentZiel = ziele["ziel" + round];
        // Berechnung des Abstands zwischen dem aktuellen Ziel und dem letzten Klickpunkt
        let abstand = Math.sqrt(((currentZiel.x + addX) - allClicks[allClicks.length - 1].x)**2 + ((currentZiel.y + addY) - allClicks[allClicks.length - 1].y)**2);
        console.log("abstand: " + abstand);
        return abstand;
    }

    let punkteCounter = 0

    function punkteBerechnen() {
        let abstand = abstandBerechnen();
        let points = document.getElementById("points")
        if(abstand > 50 && abstand * 3 < 1000) { // die 50 sind 50 px toleranz
            let punkte = 0
            punkte = Math.round(1000 - abstand * 3)
            console.log("punkte11: " + punkte + "counter: " + punkteCounter);
            punkteCounter = punkteCounter + punkte
            console.log("punkte 22: " + punkteCounter);
            points.innerHTML = "Deine Punkte: " + punkteCounter
        }else if(1000 - abstand > 950){
            console.log("punkte: 1000 test")
            console.log("punkte1: " + punkteCounter);
            punkteCounter = punkteCounter + 1000
            console.log("punkte2: " + punkteCounter);
            points.innerHTML = "Deine Punkte: " + punkteCounter
        }else{
            console.log("punkte: 0")
            punkteCounter = punkteCounter + 0
            points.innerHTML = "Deine Punkte: " + punkteCounter
        }
    }

    let onOffButton = document.getElementById("switch") 
    let karte = document.getElementById("bild")
    let submitButton = document.getElementById("submit")
    let obereLeiste = document.getElementById("obereLeiste")
    onOffButton.addEventListener("click", () => {
        if(karte.style.display == "none"){
            karte.style.display = "block"
            submitButton.style.display = "block"
            obereLeiste.style.display = "flex"
            onOffButton.innerHTML = "Karte ausblenden"
        }else{
            karte.style.display = "none"
            submitButton.style.display = "none"
            obereLeiste.style.display = "none"
            onOffButton.innerHTML = "Karte einblenden"
        }
    })

    let einfuegeElemente = document.getElementsByClassName("bilder");
    for(let i = 0; i < einfuegeElemente.length; i++){
        einfuegeElemente[i].setAttribute("src", "imgGEO/leicht/leicht_" + (i + 1) + "_" + round + ".jpg")
    }
    let nextRound = document.getElementById("nextRound")
    let rundenAnzeige = document.getElementById("rundenAnzeige")
    function nextRoundFunction() {
        nextRound.style.filter = "brightness(1)";
        nextRound.onclick = () => {
            if(round < roundMax){
                round++;
                rundenAnzeige.innerHTML = "Runde: " + round + " von " + roundMax
            }else{
                round = 1;
                rundenAnzeige.innerHTML = "Runde: " + round + " von " + roundMax
            }
            for(let i = 0; i < einfuegeElemente.length; i++){
                einfuegeElemente[i].setAttribute("src", "imgGEO/leicht/leicht_" + (i + 1) + "_" + round + ".jpg")
            }
            document.getElementById("dot").remove()
            document.getElementById("target").remove()
            karte.style.display = "none"
            submitButton.style.display = "none"
            obereLeiste.style.display = "none"
            onOffButton.innerHTML = "Karte einblenden"
            nextRound.onclick = null;
            nextRound.style.filter = "brightness(.5)";
            isGuessedIndicator = false
            detectClick()
        }
    }
    
   
    //
    //
    // img slider
    //
    //
    let slideIndex = 1;
    let prevButton = document.getElementById("prevImg");
    let nextButton = document.getElementById("nextImg");
    showSlides(slideIndex);

    prevButton.addEventListener("click", plusSlides.bind(null, -1));
    nextButton.addEventListener("click", plusSlides.bind(null, 1));
    // Next/previous controls
    function plusSlides(n) {
    showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        if (n > slides.length){
            slideIndex = 1
        }
        if (n < 1){
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
    } 
});