/*-------- Global Element Selectors --------*/
var gameContainer = document.querySelector(".game-container");
var rows = document.querySelectorAll(".row");
var toggleSound = document.querySelector(".toggle-sound");
var restartGame = document.querySelector(".restart-game");
var pauseGame = document.querySelector(".pause-game");

/*-------- Global Variables --------*/
var currentPlayer = 1;
var rowLength = 6;
var colLength = 7;
var maxDiagonal = rowLength < colLength ? rowLength : colLength;
var gamePieces = [];

//GAME BOARD MATRIX
var gameBoardArray = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];

// Archives the token objects that have been placed on the board
// Token object properties: IDs, colors,
var tokensPlaced = [];

// Stats
var rounds = 0;
var gamesPlayed = 0;
var player1Wins = 0;
var player2Wins = 0;

/*-------- Event Listeners --------*/
gameContainer.addEventListener("click", addToken);
toggleSound.addEventListener("click", toggleSound);
restartGame.addEventListener("click", restartGame);
pauseGame.addEventListener("click", pauseGame);

/*-------- Function Calls --------*/
// createSymbolicTokens();



/*-------- Function Declarations --------*/
function addToken(event) {
    console.log(event)

    if (!event.target.classList.contains('game-piece')) {
        return;
    }
    var currentCol = Math.floor((event.target.id) / 10);
    // console.log(currentRow);
    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
        console.log(`${currentCol}${rowIndex}`)
        var currentDiv = document.getElementById(`${currentCol}${rowIndex}`);
        if (currentDiv.classList.contains('game-piece')) {
            if (!currentPlayer) {
                currentDiv.className = ('p1 token');
                gamePieces[`${currentCol}`][`${rowIndex}`] = 1;
                checkWin(currentDiv)    //lastPlace
                currentPlayer = !currentPlayer;
                return;
            } else {
                currentDiv.className = ('p2 token');
                gamePieces[`${currentCol}`][`${rowIndex}`] = 2;
                checkWin(currentDiv)
                currentPlayer = !currentPlayer;
                return;
            }
        }
    }
}

function checkWin(lastPlace) {
  var currentRow = Number(lastPlace.id) % 10;
  var currentCol = Math.floor(lastPlace.id) /10;
  console.log('current Row:', currentRow)

  if (checkHorizontal(currentRow)) {
    return true;
  }

  if (checkVertical(currentCol)) {
    return true;
  }

  if (checkLeftDiagonal(currentCol, currentRow)) {
    return true;
  }

  if(checkRightDiagonal(currentCol, currentRow)){
    return true;
  }

    return false;
}

function checkLeftDiagonal(lastCol, lastRow){
  let piecesCounter = 0;
  let col = lastCol;
  let row = lastRow;
  let smallerNum = lastCol<lastRow ? lastCol : lastRow;
  while(smallerNum>0){
    col--;
    row--;
  }

  while (col < colLength && row < rowLength) {
    if (gameBoardArray[col][row] === currentPlayer) {
      piecesCounter++;
    } else {
      piecesCounter = 0;
    }
    col++;
    row++;
  }

  if (piecesCounter === 4) {
    return true;
  }

  return false;
}

function checkRightDiagonal(lastCol, lastRow) {
  let piecesCounter = 0;
  let col = lastCol;
  let row = lastRow;
  while (col < 6 && row > 0) {
    col++;
    row--;
  }

  while (col >= 0 && row <= rowLength) {
    if (gameBoardArray[col][row] === currentPlayer) {
      piecesCounter++;
    } else {
      piecesCounter = 0;
    }

    col--;
    row++;
  }

  if (piecesCounter === 4) {
    return true;
  }

  return false;
}

// expect to get an array
function checkVertical(lastCol){
  let piecesCounter = 0;
  for (let row = 0; row < rowLength; row++){
    if (gameBoardArray[lastCol][row]===currentPlayer){
      piecesCounter++;
    }
  }

  if(piecesCounter===4){
    return true;
  } else {
    piecesCounter = 0;
  }

  return false;
}

// expect to get an array
function checkHorizontal(lastRow) {
  let piecesCounter = 0;
  for (let col = 0; col < colLength; col++) {
    if (gameBoardArray[col][lastRow] === currentPlayer) {
      piecesCounter++;
    }
  }

  if (piecesCounter === 4) {
    return true;
  } else {
    piecesCounter = 0;
  }

  return false;
}

function createSymbolicTokens(){

  for (let col = 0; col < colLength; col++) {
    gamePieces.push([]);
  }

  // creates a game-piece of 0 to indicate the spot is empty
  for (let col = 0; col < colLength; col++){
    for (let row = 0; row < rowLength; row++){
      gamePieces[col].push(0);
    }
  }
}

// function toggleSound(){

// }

// function restartGame(){

// }

// function pauseGame(){

// }

// function lowestAvailable(){
//   var unclaimed;

//   return unclaimed;
// }
