const canvas = document.getElementById("game")
ctx = canvas.getContext("2d")


let speed = 7
let tileCount = 20;
let tileSize = canvas.width / (tileCount - 3);
let headX = 10;
let headY = 10;

let xVelocity = 0;
let yVelocity = 0;

let xApple = 5;
let yApple = 5;

// 1 draw game loop
function drawGame() {
    clearScreen()  // 2 draw screen
    changedSnakePosition() // 4 action for eventListner
    checkAppleCollision() // 6 snake and apple collision

    drawApple() // 5 draw apple
    drawSnake() // 3 draw snake
    setTimeout(drawGame, 1000 / speed) // 1.1 

}

function clearScreen() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function changedSnakePosition() {
    headX = headX + xVelocity
    headY = headY + yVelocity
}

function drawApple() {
    ctx.fillStyle = "red"
    ctx.fillRect(xApple * tileCount, yApple * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
    if (headX === xApple && headY === yApple) {
        xApple = Math.floor(Math.random() * tileCount)
        yApple = Math.floor(Math.random() * tileCount)

    }
}

function drawSnake() {
    ctx.fillStyle = 'green'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

// 3.1 Add event listener
document.body.addEventListener('keydown', keyDown);
function keyDown(event) {
    // Down Arrow
    if (event.code === "ArrowDown") {
        if (yVelocity == -1) {
            return
        }
        yVelocity = 1
        xVelocity = 0
    }
    if (event.code === "ArrowUp") {
        if (yVelocity == 1) {
            return
        }
        yVelocity = -1
        xVelocity = 0
    }

    if (event.code === "ArrowLeft") {
        if (xVelocity == 1) {
            return
        }
        xVelocity = -1
        yVelocity = 0
    }
    if (event.code === "ArrowRight") {
        if (xVelocity == -1) {
            return
        }
        xVelocity = 1
        yVelocity = 0
    }

}

drawGame()