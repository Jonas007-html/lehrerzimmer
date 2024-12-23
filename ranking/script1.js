/*function saveScore() {
    const name = document.getElementById("name").value;
    const klasse = document.getElementById("klasse").value;
    const score = parseInt(document.getElementById("score").value);

    if (!name || !klasse || !score || isNaN(score)) {
        alert("Bitte allee Felder ausfüllen!");
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
window.onload = displayRankings;



function resetRankings() {
    localStorage.clear();
    alert(" Rankings zurückgesetzt");
    displayRankings();
}


function resetRankings() {
    if (confirm("Möchtest du wirklich alle Rankings zurücksetzen?")) {
        localStorage.removeItem("rankings");
        displayRankings(); // Aktualisiert die Tabelle
        alert("Alle Rankings wurden zurückgesetzt!");
    }
}


function displayRankings() {
    const rankings = JSON.parse(localStorage.getItem("rankings")) || [];
    const rankingTableBody = document.querySelector("#ranking-table tbody");

    rankingTableBody.innerHTML = ""; // Löscht vorherige Einträge

    rankings.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.klasse}</td>
            <td>${player.score}</td>
        `;
        rankingTableBody.appendChild(row);
    });
}

window.onload = displayRankings;
*/

const saveScore = () => {
    const name = document.getElementById('name').value.trim();
    const klasse = document.getElementById('klasse').value.trim();
    const score = document.getElementById('score').value.trim();

    if (!name || !klasse || !score) {
        alert('Bitte fülle alle Felder aus!');
        return;
    }

    const rankings = JSON.parse(localStorage.getItem('rankings')) || [];

    rankings.push({ name, klasse, score: parseInt(score, 10) });

    rankings.sort((a, b) => a.score - b.score);

    localStorage.setItem('rankings', JSON.stringify(rankings));

    displayRankings();
};

const displayRankings = () => {
    const rankings = JSON.parse(localStorage.getItem('rankings')) || [];
    const tbody = document.querySelector('#ranking-table tbody');

    tbody.innerHTML = '';

    rankings.forEach((entry) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.klasse}</td>
            <td>${entry.score}</td>
        `;
        tbody.appendChild(row);
    });
};

const resetRankings = () => {
    if (confirm('Möchtest du wirklich alle Rankings löschen?')) {
        localStorage.removeItem('rankings');
        displayRankings();
    }
};

window.onload = displayRankings;

const openHome = () => {
    window.location.href = '/home';
};
