let gameField = document.getElementById("gameField");

let zeilen = 20;
let spalten = 20;

let direction = "down"

function createWorld(){
    let field = "";
    for(let y = 0; y < zeilen; y++){
        field += '<div class="row">'
        for(let x = 0; x < spalten; x++){
            field += `<div class="field" data-cords="${x}_${y}"></div>`
        }
        field += '</div>'
    }
    gameField.innerHTML = field;
}
createWorld();

window.addEventListener("keydown", function(e){
    if((e.key == "ArrowDown" || e.key == "s") && direction != "up"){
        direction = "down"
    }
    if((e.key == "ArrowUp" || e.key == "w") && direction != "down"){
        direction = "up"
    }
    if((e.key == "ArrowLeft" || e.key == "a") && direction != "right"){
        direction = "left"
    }
    if((e.key == "ArrowRight" || e.key == "d") && direction != "left"){
        direction = "right"
    }
})

let touchStartX = 0;
let touchStartY = 0;
window.addEventListener("touchstart", function(e){
    let touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
})

window.addEventListener("touchmove", function(e){
    let touch = e.touches[0];
    let x = touch.clientX;
    let y = touch.clientY;
    let dx = x - touchStartX;
    let dy = y - touchStartY;
    if(Math.abs(dx) > Math.abs(dy)){
        if(dx > 0 && direction != "left"){
            direction = "right";
        }else if(dx < 0 && direction != "right"){
            direction = "left";
        }
    }else{
        if(dy > 0 && direction != "up"){
            direction = "down";
        }else if(dy < 0 && direction != "down"){
            direction = "up";
        }
    }
})


let snake = [{x: 1, y: 2}, {x: 1, y: 1}, {x: 1, y: 0}];
snake.forEach(function(e){
    document.querySelector(`[data-cords="${e.x}_${e.y}"]`).classList.add("snake")
})
let geschwindigkeit = 150
let spielAblaufen = setInterval(moveSnake, geschwindigkeit);

function moveSnake(){
    let kopf = snake[0];
    let neuerKopf = {x: kopf.x, y: kopf.y};
    if(direction == "down"){
        neuerKopf.y++;
    }else if(direction == "up"){
        neuerKopf.y--;
    }else if(direction == "left"){
        neuerKopf.x--;
    }else if(direction == "right"){
        neuerKopf.x++;
    }
    //console.log("neuerKopf:", neuerKopf);
    if (neuerKopf.x < 0 || neuerKopf.x >= spalten || neuerKopf.y < 0 || neuerKopf.y >= zeilen || checkSelfCollision()) {
        clearInterval(spielAblaufen);
        console.log("Game Over");
    } else {
        //console.log("bedingung nicht erfüllt");
        //document.querySelector(`[data-cords="${kopf.x}_${kopf.y}"]`).classList.remove("snake")
        snake.unshift(neuerKopf);
        document.querySelector(`[data-cords="${neuerKopf.x}_${neuerKopf.y}"]`).classList.add("snake")
        if(!checkCollision()){
            let schwanz = snake.pop();
            document.querySelector(`[data-cords="${schwanz.x}_${schwanz.y}"]`).classList.remove("snake")
        }
        
    }   
}

function generateFood(){
    let x = Math.floor(Math.random() * spalten);
    let y = Math.floor(Math.random() * zeilen);
    document.querySelector(`[data-cords="${x}_${y}"]`).classList.add("food")
}
generateFood();

function checkCollision(){
    let isCollision = false;
    let kopf = snake[0];
    let food = document.querySelector(".food");
    if(kopf.x == food.getAttribute("data-cords").split("_")[0] && kopf.y == food.getAttribute("data-cords").split("_")[1]){
        console.log("collision");
        isCollision = true;
        food.classList.remove("food");
        generateFood();
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