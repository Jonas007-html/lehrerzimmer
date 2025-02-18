let gameField = document.getElementById("gameField");

let zeilen = 15;
let spalten = 15;

let direction = "down";
let punkte = 0;
let innerScore = document.getElementById("scoreDisplay");

let geschwindigkeit = 150;
let spielAblaufen;
let spielLaeuft = false;

let touchStartX = 0;
let touchStartY = 0;

let originalSnake = [{ x: 1, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 0 }]; // wird nicht verändert sondern wieder verwendet wenn eine neue Runde gestartet wird
let snake = [...originalSnake];

let anzahlFood = 3;

function createWorld() {
    let field = "";
    for (let y = 0; y < zeilen; y++) {
        field += '<div class="row">';
        for (let x = 0; x < spalten; x++) {
            field += `<div class="field" data-cords="${x}_${y}"></div>`;
        }
        field += '</div>';
    }
    gameField.innerHTML = field;
}
createWorld();

snake.forEach(function(e) {
    document.querySelector(`[data-cords="${e.x}_${e.y}"]`).classList.add("snake");
});

window.addEventListener("keydown", function(e) {
    if ((e.key == "ArrowDown" || e.key == "s") && direction != "up") {
        direction = "down";
    }
    if ((e.key == "ArrowUp" || e.key == "w") && direction != "down") {
        direction = "up";
    }
    if ((e.key == "ArrowLeft" || e.key == "a") && direction != "right") {
        direction = "left";
    }
    if ((e.key == "ArrowRight" || e.key == "d") && direction != "left") {
        direction = "right";
    }
});

window.addEventListener("touchstart", function(e) {
    let touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

window.addEventListener("touchmove", function(e) {
    e.preventDefault(); // Verhindert das Standardverhalten des Browsers (Seitenaktualisierung)
    
    let touch = e.touches[0];
    let x = touch.clientX;
    let y = touch.clientY;
    let dx = x - touchStartX;
    let dy = y - touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && direction != "left") {
            direction = "right";
        } else if (dx < 0 && direction != "right") {
            direction = "left";
        }
    } else {
        if (dy > 0 && direction != "up") {
            direction = "down";
        } else if (dy < 0 && direction != "down") {
            direction = "up";
        }
    }
}, { passive: false }); // Setzen Sie den Listener auf nicht-passiv, um e.preventDefault() zu verwenden

function moveSnake() {
    let kopf = snake[0];
    let neuerKopf = { x: kopf.x, y: kopf.y };
    if (direction == "down") {
        neuerKopf.y++;
    } else if (direction == "up") {
        neuerKopf.y--;
    } else if (direction == "left") {
        neuerKopf.x--;
    } else if (direction == "right") {
        neuerKopf.x++;
    }
    if (neuerKopf.x < 0 || neuerKopf.x >= spalten || neuerKopf.y < 0 || neuerKopf.y >= zeilen || checkSelfCollision()) {
        clearInterval(spielAblaufen);
        console.log("Game Over");
        loose();
    } else {
        if (!checkCollision()) {
            let schwanz = snake.pop();
            document.querySelector(`[data-cords="${schwanz.x}_${schwanz.y}"]`).classList.remove("snake");
        }
        let tatsächlicheEssensAnzahl = document.querySelectorAll(".food");
        if (tatsächlicheEssensAnzahl.length < anzahlFood) {
            generateFood();
        }
        snake.unshift(neuerKopf);
        document.querySelector(`[data-cords="${neuerKopf.x}_${neuerKopf.y}"]`).classList.add("snake");
    }
}

function generateFood() {
    let x = Math.floor(Math.random() * spalten);
    let y = Math.floor(Math.random() * zeilen);
    document.querySelector(`[data-cords="${x}_${y}"]`).classList.add("food");
}
for (let i = 0; i < anzahlFood; i++) {
    generateFood();
}

function checkCollision() {
    let isCollision = false;
    let kopf = snake[0];
    let food = document.querySelectorAll(".food");
    for (let i = 0; i < food.length; i++) {
        if (kopf.x == food[i].getAttribute("data-cords").split("_")[0] && kopf.y == food[i].getAttribute("data-cords").split("_")[1]) {
            console.log("collision");
            punkte = punkte + 1;
            innerScore.innerText = punkte + " Punkte";
            isCollision = true;
            food[i].classList.remove("food");
            generateFood();
        }
    }
    return isCollision;
}

function checkSelfCollision() {
    let kopf = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (kopf.x === snake[i].x && kopf.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

let startButton = document.getElementById("start");

function startGame() {
    if (spielLaeuft == false) {
        spielAblaufen = setInterval(moveSnake, geschwindigkeit);
        spielLaeuft = true;
        startButton.innerText = "Spiel pausieren";
    } else if (spielLaeuft == true) {
        clearInterval(spielAblaufen);
        spielLaeuft = false;
        startButton.innerText = "Spiel fortführen";
    }
}

startButton.addEventListener("click", startGame);

function loose() {
    spielLaeuft = false;
    
    startButton.innerText = "Neue Runde starten";
    startButton.removeEventListener("click", startGame);
    startButton.addEventListener("click", () => {
        allesZuruecksetzten();
        spielLaeuft = false;
        startGame();
        startButton.innerText = "Spiel pausieren";
        startButton.addEventListener("click", startGame);
    }, { once: true }); // Der Listener wird nur einmal ausgelöst
}

function allesZuruecksetzten() {
    punkte = 0;
    innerScore.innerText = punkte + " Punkte";
    direction = "down";
    let alteSchlange = document.querySelectorAll(".snake");
    for (let i = 0; i < alteSchlange.length; i++) {
        alteSchlange[i].classList.remove("snake");
    }

    let altesEssen = document.querySelectorAll(".food");
    for (let i = 0; i < altesEssen.length; i++) {
        altesEssen[i].classList.remove("food");
    }
    for (let i = 0; i < anzahlFood; i++) {
        generateFood();
    }

    originalSnake.forEach(function(e) {
        document.querySelector(`[data-cords="${e.x}_${e.y}"]`).classList.add("snake");
    });
    snake = [...originalSnake];
}
