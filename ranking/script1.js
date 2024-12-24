function saveScore() {
    const name = document.getElementById("name").value;
    const klasse = document.getElementById("klasse").value;
    const score = parseInt(document.getElementById("score").value);

    if (!name || !klasse || !score || isNaN(score)) {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }

    const player = { name, klasse, score };
    let rankings = JSON.parse(localStorage.getItem("rankings")) || [];
    rankings.push(player);
    rankings.sort((a, b) => a.score - b.score);
    localStorage.setItem("rankings", JSON.stringify(rankings));
    document.getElementById("name").value = "";
    document.getElementById("klasse").value = "";
    document.getElementById("score").value = "";
    displayRankings();
}

function displayRankings() {
    const rankings = JSON.parse(localStorage.getItem("rankings")) || [];
    const tableBody = document.getElementById("ranking-table").getElementsByTagName("tbody")[0];

    tableBody.innerHTML = "";
    rankings.forEach(player => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = player.name;
        row.insertCell(1).textContent = player.klasse;
        row.insertCell(2).textContent = player.score + " Sekunden";
    });
}

function resetRankings() {
    localStorage.clear();
    alert("Rankings zurückgesetzt!");
    displayRankings();
}

window.onload = displayRankings;
