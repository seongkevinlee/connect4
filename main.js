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
    var numInARow = 0;
    console.log('current Row:', currentRow)

    //horrizontal check
    //if Player1's turn
    if (!currentPlayer) {
        for (let colIndex = 0; colIndex < colLength; colIndex++) {
            var divCheck = document.getElementById(`${colIndex}${currentRow}`)
            if (divCheck.classList.contains('p1')) {
                numInARow++
                if (numInARow >= 4) {
                    console.log('We have a winner');  //PlaceHolder
                }
            } else {
                numInARow = 0;
            }
        }
    } else {
        //Player2's turn
        for (let colIndex = 0; colIndex < colLength; colIndex++) {
            var divCheck = document.getElementById(`${colIndex}${currentRow}`)
            if (divCheck.classList.contains('p1')) {
                numInARow++
                if (numInARow >= 4) {
                    console.log('We have a winner');  //PlaceHolder
                }
            } else {
                numInARow = 0;
            }
        }
    }
    //END HORIZONTAL

    //Vertical Check
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
