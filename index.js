let players = [];
let turn = 0;
let gameOver = false;
let dimensionRow = parseInt(document.getElementById("dimensionsRow").value);
let dimensionCol = parseInt(document.getElementById("dimensionsCol").value);
let length = parseInt(document.getElementById("length").value);
let board = new Array(dimensionRow)
    .fill("")
    .map(() => new Array(dimensionCol).fill(""));

const changeDimensionRow = (event) => {
    dimensionRow = parseInt(event.target.value);
    board = new Array(dimensionRow)
        .fill("")
        .map(() => new Array(dimensionCol).fill(""));

    console.log(board)
};


const changeDimensionCol = (event) => {
    dimensionCol = parseInt(event.target.value);
    board = new Array(dimensionRow)
        .fill("")
        .map(() => new Array(dimensionCol).fill(""));

    console.log(board)
};

const changeLength = (event) => {
    length = parseInt(event.target.value);
    console.log("length", length)
    if(length > dimensionCol || length > dimensionRow)
    {
        alert("length should be less than row and column")
        length = parseInt(3);
        return;
    }
};

document
    .getElementById("dimensionsRow")
    .addEventListener("change", changeDimensionRow);

document
    .getElementById("length")
    .addEventListener("change", changeLength);

document
    .getElementById("dimensionsCol")
    .addEventListener("change", changeDimensionCol);

const startGame = () => {
    let input1 = document.getElementById("p1");
    let input2 = document.getElementById("p2");
    let selectRow = document.getElementById("dimensionsRow");
    let selectCol = document.getElementById("dimensionsCol");
    let selectLen = document.getElementById("length");
    let player1 = input1.value;
    let player2 = input2.value;

    if (isEmpty(player1) || isEmpty(player2)) {
        alert("Player name is required");
        return;
    }

    input1.setAttribute("disabled", true);
    input2.setAttribute("disabled", true);
    selectRow.setAttribute("disabled", true);
    selectCol.setAttribute("disabled", true);
    selectLen.setAttribute("disabled", true);


    let game = document.getElementById("game-container");
    game.classList.remove("hide");

    players.push(player1);
    players.push(player2);

    document.getElementById("turn").style.color = turn % 2 === 0 ? "red" : "green"
    document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
    initGame();
};

const handleClick = (cell, i, j) => {
    console.log(board);
    console.log(i, j);
    const el = cell;
    if (el.innerHTML !== "" || gameOver) {
        return;
    }

    board[i][j] = turn % 2 === 0 ? "X" : "X";
    el.innerHTML = board[i][j];
    el.style.color = turn % 2 === 0 ? "red" : "green"

    if (calculateWinner()) {
        alert(players[turn % 2] + " won!!");
        gameOver = true;
        return;
    }
    turn++;

    document.getElementById("turn").style.color = turn % 2 === 0 ? "red" : "green"
    document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";


    if (turn === dimensionRow * dimensionCol) {
        alert("Game is drawn");
        gameOver = true;
        return;
    }
};

const initGame = () => {
    let gameContainer = document.getElementById("game-container");
    for (let i = 0; i < dimensionRow; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < dimensionCol; j++) {
            let cell = document.createElement("div");
            cell.addEventListener("click", (event) => handleClick(cell, i, j));
            cell.className = "cell";
            row.appendChild(cell);
        }
        gameContainer.appendChild(row);
    }
};

const calculateWinner = () => {
    // first check for all rows in board and then for col and then for diagonals
    /* let len = board.length; */
    let len = length;

    console.log(board)


    /* if (turn < len - 1) {
        return false
    } */




    //Row check


    for (let i = 0; i < dimensionRow; i++) {

        for (let j = 0; j < dimensionCol - len + 1; j++) {

            let countlen = 0;
            if (board[i][j] === "X" || board[i][j] === "O") {

                countlen++

                for (let z = 1; z < len; z++) {

                    if (board[i][j] === board[i][j + z]) {
                        countlen++

                        if (countlen === len) {
                            return true;
                        }
                    }
                    else {
                        break;
                    }


                }

            }



        }


    }



    // Column Check

    for (let i = 0; i < dimensionCol; i++) {

        for (let j = 0; j < dimensionRow - len + 1; j++) {

            let countlen = 0;
            if (board[j][i] === "X" || board[j][i] === "O") {

                countlen++

                for (let z = 1; z < len; z++) {

                    if (board[j][i] === board[j + z][i]) {
                        countlen++

                        if (countlen === len) {
                            return true;
                        }
                    }
                    else {
                        break;
                    }


                }

            }



        }


    }


    //diagonalCheck

    // right diagonals


    var Ylength = dimensionRow;
    var Xlength = dimensionCol;
    var maxLength = Math.max(Xlength, Ylength);
    var temp;
    var a = [];
    for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
        temp = [];
        for (var y = Ylength - 1; y >= 0; --y) {
            var x = k - (Ylength - y);
            if (x >= 0 && x < Xlength) {
                temp.push(board[y][x]);
            }
        }

        if (temp.length > 0) {
            a.push(temp)
        }
    }

    //a is diagonal converted into rows and columns

    console.log("a - array", a)

    for (let i = 0; i < a.length; i++) {

        for (let j = 0; j < a[i].length; j++) {

            let countlen = 0;
            if (a[i][j] === "X" || a[i][j] === "O") {

                countlen++

                for (let z = 1; z < len; z++) {

                    if (a[i][j] === a[i][j + z]) {
                        countlen++

                        if (countlen === len) {
                            return true;
                        }
                    }
                    else {
                        break;
                    }


                }

            }



        }


    }


    //left diagonals

    var temp;
    var b = [];
    for (var k = 0; k <= 2 * (maxLength - 1); ++k) {
        temp = [];
        for (var y = Ylength - 1; y >= 0; --y) {
            var x = k - y;
            if (x >= 0 && x < Xlength) {
                temp.push(board[y][x]);
            }
        }
        if (temp.length > 0) {
            b.push(temp)
        }
    }

    //b is diagonal converted into rows and columns

    for (let i = 0; i < a.length; i++) {

        for (let j = 0; j < a[i].length; j++) {

            let countlen = 0;
            if (b[i][j] === "X" || b[i][j] === "O") {

                countlen++

                for (let z = 1; z < len; z++) {

                    if (b[i][j] === b[i][j + z]) {
                        countlen++

                        if (countlen === len) {
                            return true;
                        }
                    }
                    else {
                        break;
                    }


                }

            }



        }


    }



    return false;
};

const isEmpty = (value) => !value || !value.trim();