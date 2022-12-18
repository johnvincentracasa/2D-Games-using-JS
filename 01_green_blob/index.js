const canvas = document.getElementById("gameArea")
const ctx = canvas.getContext("2d")

let x = 100
let y = 100
let radius = 50
let speed = 10
let downPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;

// GAME LOOP
function drawGame() {
    requestAnimationFrame(drawGame)
    clearScreen()
    inputs()
    boundryCheck()
    drawGreenBlob()
}

function drawGreenBlob() {
    ctx.fillStyle = "green"
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
}

function boundryCheck() {
    // up
    if (y < radius) {
        y = radius
    }
    //down
    if (y > canvas.height - radius) {
        y = canvas.height - radius
    }
    // left
    if (x < radius) {
        x = radius
    }
    // right
    if (x > canvas.width - radius) {
        x = canvas.width - radius
    }
}

function inputs() {

    if (downPressed) {
        y += speed
    }
    if (upPressed) {
        y -= speed
    }
    if (rightPressed) {
        x += speed
    }
    if (leftPressed) {
        x -= speed
    }
}

function clearScreen() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

document.body.addEventListener("keydown", keyDown)
document.body.addEventListener("keyup", keyUp)

function keyDown(event) {
    // down arrow

    if (event.keyCode === 40) {
        downPressed = true
    } else if (event.keyCode === 38) {
        upPressed = true
    } else if (event.keyCode === 37) {
        leftPressed = true
    } else if (event.keyCode === 39) {
        rightPressed = true
    }
}


function keyUp(event) {
    // down arrow

    if (event.keyCode === 40) {
        downPressed = false
    } else if (event.keyCode === 38) {
        upPressed = false
    } else if (event.keyCode === 37) {
        leftPressed = false
    } else if (event.keyCode === 39) {
        rightPressed = false
    }
}


drawGame()

