/*-------- Global Element Selectors --------*/
var gameContainer = document.querySelector(".game-container");
var rows = document.querySelectorAll(".row");
var toggleSound = document.querySelector(".toggle-sound");
var restartGame = document.querySelector(".restart-game");
var pauseGame = document.querySelector(".pause-game");

/*-------- Global Variables --------*/
var currentPlayer = false;
var rowLength = 6;
var colLength = 7;
var gamePieces = [];

//GAME BOARD MATRIX
var gameBoardArray = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
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
    var currentRow = Math.floor((event.target.id) / 10);
    // console.log(currentRow);
    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
        console.log(`${currentRow}${rowIndex}`)
        var currentDiv = document.getElementById(`${currentRow}${rowIndex}`);
        if (currentDiv.classList.contains('game-piece')) {
            if (currentPlayer === false) {
                currentDiv.className = ('p1 token');
                return;
            } else {
                currentDiv.className = ('p2 token');
                return;
            }
        }
    }
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
