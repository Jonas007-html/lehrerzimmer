let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let snake = new Snake();
let food = new Food();
let score = 0;
let highscore = 0;
let gameSpeed = 100;
let gameRunning = true;
let gamePaused = false;
let gameLoop;

function startGame() {
    snake.init();
    food.spawn();
    gameLoop = setInterval(game, gameSpeed);
}

function game() {
    if (!gamePaused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.move();
        snake.draw();
        food.draw();
        checkCollision();
    }
}

function checkCollision() {
    if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
        gameOver();
    }
    if (snake.x === food.x && snake.y === food.y) {
        snake.eat();
        food.spawn();
        score++;
        if (score > highscore) {
            highscore = score;
        }
    }
    if (snake.tail.some(t => t.x === snake.x && t.y === snake.y)) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(gameLoop);
    gameRunning = false;
    alert("Game Over! Score: " + score + " Highscore: " + highscore);
}

document.addEventListener("keydown", function (e) {
    if (gameRunning) {
        if (e.key === "ArrowUp" && snake.direction !== "down") {
            snake.direction = "up";
        }
        if (e.key === "ArrowDown" && snake.direction !== "up") {
            snake.direction = "down";
        }
        if (e.key === "ArrowLeft" && snake.direction !== "right") {
            snake.direction = "left";
        }
        if (e.key === "ArrowRight" && snake.direction !== "left") {
            snake.direction = "right";
        }
    }
    if (e.key === " ") {
        if (gameRunning) {
            gamePaused = !gamePaused;
        } else {
            startGame();
        }
    }
}
);

function Snake() {
    this.init = function () {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
        this.tail = [];
    }

    this.move = function () {
        for (let i = this.tail.length - 1; i > 0; i--) {
            this.tail[i] = this.tail[i - 1];
        }
        if (this.tail.length > 0) {
            this.tail[0] = { x: this.x, y: this.y };
        }
        switch (this.direction) {
            case "up":
                this.y--;
                break;
            case "down":
                this.y++;
                break;
            case "left":
                this.x--;
                break;
            case "right":
                this.x++;
                break;
        }
    }

    this.draw = function () {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x * 10, this.y * 10, 10, 10);
        ctx.fillStyle = "green";
        this.tail.forEach(t => ctx.fillRect(t.x * 10, t.y * 10, 10, 10));
    }

    this.eat = function () {
        this.tail.push({ x: this.x, y: this.y });
    }
}

function Food() {
    this.spawn = function () {
        this.x = Math.floor(Math.random() * canvas.width / 10);
        this.y = Math.floor(Math.random() * canvas.height / 10);
    }

    this.draw = function () {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x * 10, this.y * 10, 10, 10);
    }
}

startGame()
