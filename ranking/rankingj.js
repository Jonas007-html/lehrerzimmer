function displayBestMemoryResult() {
    const rankings = JSON.parse(localStorage.getItem("rankings")) || [];

    if (rankings.length > 0) {
        const bestResult = rankings[0];
        document.getElementById("memory-bestzeit").textContent = `Bestzeit: ${bestResult.score} Sekunden`;
        document.getElementById("memory-player").textContent = `Von: ${bestResult.name}, Klasse: ${bestResult.klasse}`;
    } else {
        document.getElementById("memory-bestzeit").textContent = "Bestzeit: -";
        document.getElementById("memory-player").textContent = "Von: -";
    }
}
window.onload = displayBestMemoryResult;
