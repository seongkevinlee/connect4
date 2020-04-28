/*-------- Global Element Selectors --------*/
var gameContainer = document.querySelector(".game-container");
var rows = document.querySelectorAll(".row");
var toggleSound = document.querySelector(".toggle-sound");
var restartGame = document.querySelector(".restart-game");
var pauseGame = document.querySelector(".pause-game");

/*-------- Global Variables --------*/
var currentPlayer = false;
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


/*-------- Function Declarations --------*/
function addToken(event){

}

function toggleSound(){

}

function restartGame(){

}

function pauseGame(){

}

function lowestAvailable(){
  var unclaimed;

  return unclaimed;
}
