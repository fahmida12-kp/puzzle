const puzzle = document.getElementById("puzzle");

const movesDisplay = document.getElementById("moves");

const timeDisplay = document.getElementById("time");

const message = document.getElementById("message");

const shuffleButton = document.getElementById("shuffleBtn");

const resetButton = document.getElementById("resetBtn");


let tiles = [];

let moves = 0;

let seconds = 0;

let timer;

let gameStarted = false;


/* Create solved puzzle */

function createPuzzle() {

    tiles = [];

    for (let i = 1; i <= 15; i++) {

        tiles.push(i);

    }

    // Empty space

    tiles.push(0);

}


/* Display puzzle */

function displayPuzzle() {

    puzzle.innerHTML = "";

    tiles.forEach((number, index) => {

        const tile = document.createElement("button");

        tile.classList.add("tile");

        if (number === 0) {

            tile.classList.add("empty");

            tile.textContent = "";

        } else {

            tile.textContent = number;

            tile.addEventListener("click", function() {

                moveTile(index);

            });

        }

        puzzle.appendChild(tile);

    });

}


/* Move tile */

function moveTile(index) {

    const emptyIndex = tiles.indexOf(0);

    const row = Math.floor(index / 4);

    const column = index % 4;

    const emptyRow = Math.floor(emptyIndex / 4);

    const emptyColumn = emptyIndex % 4;


    // Check whether tile is next to empty space

    const distance =
        Math.abs(row - emptyRow) +
        Math.abs(column - emptyColumn);


    if (distance !== 1) {

        return;

    }


    // Start timer

    if (!gameStarted) {

        startTimer();

        gameStarted = true;

    }


    // Swap tile and empty space

    [tiles[index], tiles[emptyIndex]] =
        [tiles[emptyIndex], tiles[index]];


    moves++;

    movesDisplay.textContent = moves;

    displayPuzzle();


    // Check winning condition

    checkWin();

}


/* Shuffle puzzle */

function shufflePuzzle() {

    for (let i = 0; i < 200; i++) {

        const emptyIndex = tiles.indexOf(0);

        const possibleMoves = [];


        const row = Math.floor(emptyIndex / 4);

        const column = emptyIndex % 4;


        if (row > 0) {

            possibleMoves.push(emptyIndex - 4);

        }

        if (row < 3) {

            possibleMoves.push(emptyIndex + 4);

        }

        if (column > 0) {

            possibleMoves.push(emptyIndex - 1);

        }

        if (column < 3) {

            possibleMoves.push(emptyIndex + 1);

        }


        const randomIndex =
            possibleMoves[
                Math.floor(Math.random() * possibleMoves.length)
            ];


        [tiles[emptyIndex], tiles[randomIndex]] =
            [tiles[randomIndex], tiles[emptyIndex]];

    }

}


/* Timer */

function startTimer() {

    timer = setInterval(function() {

        seconds++;

        timeDisplay.textContent = seconds;

    }, 1000);

}


/* Stop timer */

function stopTimer() {

    clearInterval(timer);

}


/* Check whether puzzle is solved */

function checkWin() {

    for (let i = 0; i < 15; i++) {

        if (tiles[i] !== i + 1) {

            return;

        }

    }


    if (tiles[15] !== 0) {

        return;

    }


    stopTimer();

    message.textContent =
        "🎉 Congratulations! You solved the puzzle!";

}


/* Reset game */

function resetGame() {

    stopTimer();

    createPuzzle();

    moves = 0;

    seconds = 0;

    gameStarted = false;

    movesDisplay.textContent = "0";

    timeDisplay.textContent = "0";

    message.textContent = "";

    displayPuzzle();

}


/* Shuffle button */

shuffleButton.addEventListener("click", function() {

    stopTimer();

    shufflePuzzle();

    moves = 0;

    seconds = 0;

    gameStarted = false;

    movesDisplay.textContent = "0";

    timeDisplay.textContent = "0";

    message.textContent = "";

    displayPuzzle();

});


/* Reset button */

resetButton.addEventListener("click", function() {

    resetGame();

});


/* Start */

resetGame();