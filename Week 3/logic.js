let gridSize;
let gameArray;
let visualBoard;
let clickCount = 0;
let mark;
let winnerFound;
let turn;
let drawReached;


document.getElementById("generateButton").addEventListener("click", function (e) {
    e.preventDefault();
    generateGrid();
});


// This method will generate the array and the corresponding visual representation in the HTML document.
function generateGrid() {

    gameArray = [];
    clickCount = 0;
    winnerFound = false;
    turn = "";
    document.getElementById("gameOutput").innerHTML = "";
    gridSize = parseInt(document.getElementById("gridSize").value);
    visualBoard = document.getElementById("gameBoard");
    visualBoard.innerHTML = "";

    // Populates the array.
    for (i = 0; i < gridSize; i++) {
        gameArray[i] = [];
        for (j = 0; j < gridSize; j++) {
            gameArray[i][j] = "";
        }
    }
    console.log(gameArray);


    // Populates the gameboard (<div>) with rows and columns inside (columns are <divs> nested inside the row <divs>).
    for (i = 0; i < gridSize; i++) {
        let row = document.createElement("div");
        row.className = "d-flex justify-content-center rows";
        visualBoard.appendChild(row);

        for (j = 0; j < gridSize; j++) {
            let cell = document.createElement("div");
            cell.className = "border m-1 d-flex align-items-center justify-content-center cells";
            cell.id = i + "," + j;
            let rowCoordinate = i;
            let cellCoordinate = j;
            // Adds event listeners to each cell that run the function below.
            cell.addEventListener("click", function () {
                placeMark(rowCoordinate, cellCoordinate);
            })
            row.appendChild(cell);
        }
    }
}


// Updates the array and board and checks for winners.
function placeMark(x, y) {
    if (gameArray[x][y] == "") {
        clickCount++; // Tracks number of moves so the line below can alternats mark between "X" and "O" based on parity.
        mark = clickCount % 2 == 0 ? "X" : "O";
        console.log("you clicked cell: " + x + "," + y);
        console.log("Before:", gameArray[x][y]);
        gameArray[x][y] = mark;
        console.log("After:", gameArray[x][y]);
        document.getElementById(x + "," + y).innerHTML = mark;
        IsWin();

        // Updates the user about whose turn it is.
        if (!winnerFound && !drawReached) {
            turn = clickCount % 2 == 0 ? "O" : "X";
            document.getElementById("turnOutput").innerHTML = `${turn}'s turn`;
        }
    } else {
        window.alert("Choose a different space");
    }
}


function IsWin() {

    /* Checks rows, columns, and diagonals for a winner; if not found, the code falls through 
    and checks for a draw. */

    // Check rows.
    for (let i = 0; i < gridSize; i++) {
        let firstCellRow = gameArray[i][0];
        if (firstCellRow !== "") {
            let rowWin = true;
            for (let j = 1; j < gridSize; j++) {
                if (gameArray[i][j] !== firstCellRow) {
                    rowWin = false;
                    break;
                }
            }
            if (rowWin) {
                winnerFound = true;
                document.getElementById("gameOutput").innerHTML = `\"${firstCellRow}\" wins by row!`;
                document.getElementById("turnOutput").innerHTML = "";
                overWriteGameBoard();
                return;
            }
        }
    }

    // Check columns. 
    for (let j = 0; j < gridSize; j++) {
        let firstCellCol = gameArray[0][j];
        if (firstCellCol !== "") {
            let colWin = true;
            for (let i = 1; i < gridSize; i++) {
                if (gameArray[i][j] !== firstCellCol) {
                    colWin = false;
                    break;
                }
            }
            if (colWin) {
                winnerFound = true;
                document.getElementById("gameOutput").innerHTML = `\"${firstCellCol}\" wins by column!`;
                document.getElementById("turnOutput").innerHTML = "";
                overWriteGameBoard();
                return;
            }
        }
    }

    // Check diagonal down-right.    
    let firstCellDiagDR = gameArray[0][0];
    if (firstCellDiagDR !== "") {
        let diagonalDRWin = true;
        for (let j = 1; j < gridSize; j++) {
            if (gameArray[j][j] !== firstCellDiagDR) {
                diagonalDRWin = false;
                break;
            }
        }
        if (diagonalDRWin) {
            winnerFound = true;
            document.getElementById("gameOutput").innerHTML = `\"${firstCellDiagDR}\" wins by diagonal down-right!`;
            document.getElementById("turnOutput").innerHTML = "";
            overWriteGameBoard();
            return;
        }
    }


    // Check diagonal down-left.  
    let firstCellDiagDL = gameArray[0][gridSize - 1];
    if (firstCellDiagDL !== "") {
        let diagonalDLWin = true;
        for (let i = 1; i < gridSize; i++) {
            if (gameArray[i][gridSize - 1 - i] !== firstCellDiagDL) {
                diagonalDLWin = false;
                break;
            }
        }
        if (diagonalDLWin) {
            winnerFound = true;
            document.getElementById("gameOutput").innerHTML = `\"${firstCellDiagDL}\" wins by diagonal down-left!`;
            document.getElementById("turnOutput").innerHTML = "";
            overWriteGameBoard();
            return;
        }
    }

    if(!winnerFound) {
        isDraw();
    }



}

// If the board is filled and there are no winners then a draw condition is met.
function isDraw() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (gameArray[i][j] == "") {
                return;
            }
        }
    }
    console.log("The board is full and there is no winner. It is a draw");
    drawReached = true;
    document.getElementById("gameOutput").innerHTML = "It is a draw!";
    document.getElementById("turnOutput").innerHTML = "";
    overWriteGameBoard();
}


/* This function rebuilds the visual board using the current contents of gameArray, but without 
attaching any event listeners. This ensures that once the game is over (either by win or draw) 
clicks on the cells no longer trigger any actions. It is called at the end of the game to lock 
the board. */ 
function overWriteGameBoard() {
    visualBoard.innerHTML = "";
    for (i = 0; i < gridSize; i++) {
        let row = document.createElement("div");
        row.className = "d-flex justify-content-center rows";
        visualBoard.appendChild(row);

        for (j = 0; j < gridSize; j++) {
            let cell = document.createElement("div");
            cell.className = "border m-1 d-flex align-items-center justify-content-center cells";
            cell.id = i + "," + j;  
            cell.innerHTML = gameArray[i][j];                   
            row.appendChild(cell);
        }
    }
}