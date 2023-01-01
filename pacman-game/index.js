pacman_map_1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 3, 3, 3, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 3, 1, 3, 1, 1, 1, 1, 2, 1],
    [1, 2, 3, 3, 3, 5, 3, 3, 3, 3, 3, 2, 1],
    [1, 2, 3, 1, 3, 3, 3, 1, 1, 1, 3, 2, 1],
    [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

pacman = {
    x: 5,
    y: 3
}

pacmanDirection = "right"

let score = 0



function drawWorld() {
    document.getElementById("world").innerHTML = ""
    document.getElementById("score").innerHTML = "Score: " + score

    for (var y = 0; y < pacman_map_1.length; y++) {
        for (var x = 0; x < pacman_map_1[y].length; x++) {
            if (pacman_map_1[y][x] === 1) {
                document.getElementById("world").innerHTML += ' <div class="wall"></div>';
            } else if (pacman_map_1[y][x] === 5) {
                document.getElementById("world").innerHTML += ' <div class="pacman_' + pacmanDirection + '"></div>';
            } else if (pacman_map_1[y][x] === 3) {
                document.getElementById("world").innerHTML += ' <div class="ground"></div>';
            } else if (pacman_map_1[y][x] === 2) {
                document.getElementById("world").innerHTML += ' <div class="coin"></div>';
            }

        }
        document.getElementById("world").innerHTML += ' <br>';

    }

}

document.onkeydown = function (e) {
    console.log(e.code)
    if (e.keyCode === 37) {

        if (pacman_map_1[pacman.y][pacman.x - 1] !== 1) {
            pacman_map_1[pacman.y][pacman.x] = 3
            pacman.x -= 1
            pacman_map_1[pacman.y][pacman.x] = 5
            pacmanDirection = "left"


        }

        if (pacman_map_1[pacman.y][pacman.x - 1] === 2) {
            score++
        }

    } else if (e.keyCode === 38) {
        if (pacman_map_1[pacman.y - 1][pacman.x] !== 1) {
            pacman_map_1[pacman.y][pacman.x] = 3
            pacman.y -= 1
            pacman_map_1[pacman.y][pacman.x] = 5
            pacmanDirection = "up"
        }

        if (pacman_map_1[pacman.y - 1][pacman.x] === 2) {
            score++
        }

    } else if (e.keyCode === 39) {
        if (pacman_map_1[pacman.y][pacman.x + 1] !== 1) {
            pacman_map_1[pacman.y][pacman.x] = 3
            pacman.x += 1
            pacman_map_1[pacman.y][pacman.x] = 5
            pacmanDirection = "right"
        }

        if (pacman_map_1[pacman.y][pacman.x + 1] === 2) {
            score++
        }
    } else if (e.keyCode === 40) {
        if (pacman_map_1[pacman.y + 1][pacman.x] !== 1) {
            pacman_map_1[pacman.y][pacman.x] = 3
            pacman.y += 1
            pacman_map_1[pacman.y][pacman.x] = 5
            pacmanDirection = "down"
        }

        if (pacman_map_1[pacman.y + 1][pacman.x] === 2) {
            score++
        }
    }
    drawWorld()

}


drawWorld()

