// 0. Have JS display the world of brick/confirm
// 1. Have the pacman move up and down
// 3. Create collision detection function

// LEGEND
// 0 - pac-dot
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const score = document.getElementById('score')
    const width = 28

    const layout = [
        //  1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, //1
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //2
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, //4
        1, 0, 1, 4, 4, 1, 0, 1, 4, 4, 4, 1, 0, 1, 1, 0, 1, 4, 4, 4, 1, 0, 1, 4, 4, 1, 0, 1, //5
        1, 0, 1, 4, 4, 1, 0, 1, 4, 4, 4, 1, 0, 1, 1, 0, 1, 4, 4, 4, 1, 0, 1, 4, 4, 1, 0, 1, //3
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, //6
        1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, //7
        1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, //8
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, //9
        1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, //10
        1, 4, 4, 4, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 4, 4, 4, 1, //11
        1, 4, 4, 4, 4, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 4, 4, 4, 4, 1, //12
        1, 4, 4, 4, 4, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 4, 4, 4, 4, 1, //13
        1, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1, 2, 2, 1, 1, 1, 0, 1, 1, 0, 1, 4, 4, 4, 4, 1, //14
        1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, //15
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, //16
        1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, //17
        1, 1, 1, 4, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 4, 1, 4, 1, //18
        1, 1, 1, 4, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 4, 1, 4, 1, //19
        1, 1, 4, 4, 1, 1, 0, 1, 1, 0, 1, 4, 4, 4, 4, 4, 4, 1, 0, 1, 1, 0, 1, 1, 1, 4, 1, 1, //20
        1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, //21
        1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, //22
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, //23
        1, 0, 1, 4, 4, 1, 0, 1, 4, 4, 4, 1, 0, 1, 1, 0, 1, 4, 4, 4, 1, 0, 1, 4, 4, 1, 0, 1, //24
        1, 0, 1, 4, 4, 1, 0, 1, 4, 4, 4, 1, 0, 1, 1, 0, 1, 4, 4, 4, 1, 0, 1, 4, 4, 1, 0, 1, //25
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, //26
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, //27
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1  //28
    ]

    const squares = []

    function showGrid() {
        for (var i = 0; i < layout.length; i++) {
            let square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)

            if (layout[i] === 0) {
                squares[i].classList.add('pac-dot')
            } else if (layout[i] === 1) {
                squares[i].classList.add('wall')
            } else if (layout[i] === 2) {
                squares[i].classList.add('ghost-lair')
            } else if (layout[i] === 3) {
                squares[i].classList.add('power-pellet')
            }

        }
        console.log(squares)
    }

    showGrid()

})


var pacman = {
    x: 90,
    y: 90
}

var walkDirection = 'right'

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}



function displayWorld() {
    var output = "";


    for (var i = 0; i < world.length; i++) {
        output += "\n<div class='row'>";


        for (var j = 0; j < world[i].length; j++) {

            if (world[i][j] == 1) {
                output += "\n\t<div class='bricks'></div>";

            } else if (world[i][j] == 0) {
                output += "\n\t<div class='coins'></div>";
            }
            console.log(getOffset(document.querySelector('div')))

        }
        output += "\n</div>";

    }
    document.getElementById("world").innerHTML = output;
}

function displayPacman() {
    document.getElementById("pacman").style.top = pacman.y + "px"
    document.getElementById("pacman").style.left = pacman.x + "px"
    document.getElementById("pacman").style.backgroundImage =
        "url('images/pacman_" + walkDirection + ".png')";

}

displayWorld();

document.onkeydown = function (e) {

    if (e.key == 'ArrowDown') {
        walkDirection = "down"
        pacman.y = pacman.y + 40
        // document.getElementById("pacman").style.top = pacman.y + "px"
    }

    if (e.key == 'ArrowUp') {
        walkDirection = "up"

        pacman.y = pacman.y - 40
        // document.getElementById("pacman").style.top = pacman.y + "px"
    }

    if (e.key == 'ArrowRight') {
        walkDirection = "right"
        pacman.x = pacman.x + 40
        // document.getElementById("pacman").style.left = pacman.x + "px"
    }


    if (e.key == 'ArrowLeft') {
        walkDirection = "left"

        pacman.x = pacman.x - 40
        // document.getElementById("pacman").style.left = pacman.x + "px"
    }
    displayPacman()
}





