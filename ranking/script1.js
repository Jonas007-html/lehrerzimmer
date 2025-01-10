async function getDaten(file) {
    let daten = await fetch(file);
    let datenjson = await daten.json();
    console.log(datenjson)
    return datenjson;
  }



// Funktion zum Speichern des Scores im LocalStorage
function saveScore() {
const name = document.getElementById("name").value;
const klasse = document.getElementById("klasse").value;
const score = parseInt(document.getElementById("score").value);

// Überprüfen, ob alle Eingaben korrekt sind
if (!name || !klasse || !score || isNaN(score)) {
alert("Bitte alle Felder ausfüllen!");
return;
}

const player = { SuSname, klasse, score };

// Holen der aktuellen Liste der Rankings aus dem LocalStorage oder initialisieren mit einem leeren Array
//let rankings = JSON.parse(localStorage.getItem("rankings")) || [];
let rankings = getDaten("highscore.json")		

// Hinzufügen des neuen Scores zur Liste
rankings.push(player);

// Sortieren der Liste nach der besten Zeit (ascending)
rankings.sort((a, b) => a.score - b.score);

// Speichern der aktualisierten Liste im LocalStorage
localStorage.setItem("rankings", JSON.stringify(rankings));

// Formular leeren
document.getElementById("name").value = "";
document.getElementById("klasse").value = "";
document.getElementById("score").value = "";

// Ranking-Liste neu anzeigen
displayRankings();
}

// Funktion zum Anzeigen der Rankings
async function displayRankings() {
//const rankings = JSON.parse(localStorage.getItem("rankings")) || [];
let rankings = await getDaten("highscore.json") || [];

const tableBody = document.getElementById("ranking-table").getElementsByTagName("tbody")[0];

// Tabelle zurücksetzen
tableBody.innerHTML = "";

// Jeden Spieler in der Rankings-Liste in der Tabelle anzeigen
/*
console.log(rankings);
console.log(rankings.length);
for(let i=0; i<rankings.length; i=i+1) {
let player = rankings[i];
console.log(player);
const row = tableBody.insertRow();
row.insertCell(0).textContent = player.name;
row.insertCell(1).textContent = player.klasse;
row.insertCell(2).textContent = player.score + " Sekunden";
}
*/
rankings.map(player => {
const row = tableBody.insertRow();
row.insertCell(0).textContent = player.SuSname;
row.insertCell(1).textContent = player.klasse;
row.insertCell(2).textContent = player.score + " Züge";
});
}

// Beim Laden der Seite die Rankings anzeigen
window.onload = displayRankings;
