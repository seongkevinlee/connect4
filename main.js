/*-------- Global Element Selectors --------*/
// Game functionality
var gameContainer = document.querySelector(".game-container");
var rows = document.querySelectorAll(".row");

// Controls
var toggleSound = document.querySelector(".toggle-sound");
var restartButton = document.querySelector(".win-button");
var pauseButton = document.querySelector(".pause-game");
var startButton = document.querySelector("#start_button");

// Player stuff & stats
var player1Input = document.querySelector(".player1-name");
var player2Input = document.querySelector(".player2-name");
var p1Name = document.querySelector(".p1.name");
var p2Name = document.querySelector(".p2.name");
var p1WinsEle = document.getElementById("p1_total_wins");
var p2WinsEle = document.getElementById("p2_total_wins");
var p1WinPercent = document.getElementById("p1_win_percent");
var p2WinPercent = document.getElementById("p2_win_percent");
var totalGames = document.getElementById("games-played");
var roundStats = document.getElementById("round");

// models
var startModal = document.querySelector(".start-modal");
var winModal = document.querySelector('.win-modal')
var winModalTxt = document.querySelector('.win-modal .info');

// Timer
var timerEle = document.querySelector(".timer");
var maxTurnTimeEle = document.querySelector('.round-time');
var gameBoardImage = document.querySelector('.game-board')
var resetButton = document.querySelector('.reset-game');

/*--------- Global Variables ---------*/
var currentPlayer = 1;
var rowLength = 6;
var colLength = 7;
var maxDiagonal = rowLength < colLength ? rowLength : colLength;
var gamePieces = [];
var occupiedPiece = [];
var music = new Audio();
music.src = './audio/music1.mp3';
var availableGamePieces = 0;

/*-------- Timer --------*/
var timerId = null;
var timerCountdown = null;
var maxTurnTime = null;
var delay = 1000;


// GAME BOARD MATRIX
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
toggleSound.addEventListener("click", toggleS);
restartButton.addEventListener("click", restartGame);
pauseButton.addEventListener("click", pauseGame);
startButton.addEventListener("click", startGame)
// Control panel button
resetButton.addEventListener("click", function(){restartGame(currentPlayer)})
/*-------- Function Calls --------*/
// createSymbolicTokens();

/*-------- Function Declarations --------*/
function startGame() {
  startModal.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  p1Name.classList.remove("hidden");
  p2Name.classList.remove("hidden");

  for (let col = 0; col < gameBoardArray.length; col++) {
    for (let row = 0; row < gameBoardArray[col].length; row++) {
      availableGamePieces++;
    }
  }

  if(music.paused) {
    music.play();
    music.volume = 0.2;
  }
  if (player1Input.value){
    p1Name.textContent = player1Input.value;
  } else {
    p1Name.textContent = player1Input.placeholder;
  }

  if (player2Input.value) {
    p2Name.textContent = player2Input.value;
  } else {
    p2Name.textContent = player2Input.placeholder;
  }

  if (maxTurnTimeEle.value){
    maxTurnTime = parseInt(maxTurnTimeEle.value);
  } else {
    maxTurnTime = parseInt(maxTurnTimeEle.placeholder);
  }

  gameContainer.addEventListener("click", addToken);
  if (!timerId) {
    timerCountdown = maxTurnTime;
    timer();
  }
}

function addToken(event) {
    if (!event.target.classList.contains('game-piece')) {
        return;
    }

    var currentCol = Math.floor((event.target.id) / 10);
    // console.log(currentRow);
    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
        var currentDiv = document.getElementById(`${currentCol}${rowIndex}`);
        if (currentDiv.classList.contains('game-piece')) {
            if (currentPlayer === 1) {
                currentDiv.className = ('p1 token');
                gameBoardArray[currentCol][rowIndex] = 1;
                if(checkWin(currentDiv)){
                  setTimeout(function () { displayWin(2) }, 1500);
                  gameContainer.removeEventListener("click", addToken);
                  player1Wins++;
                  gamesPlayed++;
                  clearTimeout(timerId);
                  timerId = null;
                } else {
                  currentPlayer = 2;
                }
                timerCountdown = maxTurnTime;
                rounds++;
                availableGamePieces--;
                updateStats();
                return;
            } else {
                currentDiv.className = ('p2 token');
                gameBoardArray[currentCol][rowIndex] = 2;
                if (checkWin(currentDiv)) {
                  setTimeout(function(){displayWin(1)}, 1500);
                  gameContainer.removeEventListener("click", addToken);
                  player2Wins++;
                  gamesPlayed++;
                  clearTimeout(timerId);
                  timerId = null;
                } else {
                  currentPlayer = 1;
                }
                timerCountdown = maxTurnTime;
                rounds++;
                availableGamePieces--;
                updateStats();
                return;
            }
        }
    }
}

function checkWin(lastPlace) {
  var currentRow = Number(lastPlace.id) % 10;
  var currentCol = Math.floor(lastPlace.id / 10);
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

  if (checkRightDiagonal(currentCol, currentRow)) {
    return true;
  }

  if (checkTie()) {
    return true;
  }

  return false;
}

function checkTie(){
  if (!availableGamePieces){
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
    smallerNum--;
  }

  while (col < colLength && row < rowLength) {
    if (gameBoardArray[col][row] === currentPlayer) {
      piecesCounter++;
    } else {
      piecesCounter = 0;
    }
    col++;
    row++;

    if (piecesCounter === 4) {
        console.log('works')
        return true;
    }
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

    if (piecesCounter === 4) {
      console.log('works')
      return true;
    }
    col--;
    row++;
  }

  return false;
}

// expect to get an array
function checkVertical(lastCol){
  let piecesCounter = 0;
  for (let row = 0; row < rowLength; row++){
    if (gameBoardArray[lastCol][row]===currentPlayer){
      piecesCounter++;
    } else {
      piecesCounter = 0;
    }

    if(piecesCounter===4){
      console.log('vworks');
      return true;
    }
  }

  return false;
}

// expect to get an array
function checkHorizontal(lastRow) {
  let piecesCounter = 0;
  for (let col = 0; col < colLength; col++) {
    if (gameBoardArray[col][lastRow] === currentPlayer) {
      piecesCounter++;
    } else {
      piecesCounter = 0;
    }

    if (piecesCounter === 4) {
      console.log('hworks')
      return true;
    }
  }

  return false;
}

function resetGameBoard(){

  gameBoardArray = [];

  for (let col = 0; col < colLength; col++) {
    gameBoardArray.push([]);
  }

  // creates a game-piece of 0 to indicate the spot is empty
  for (let col = 0; col < colLength; col++){
    for (let row = 0; row < rowLength; row++){
      gameBoardArray[col].push(0);
    }
  }
}

function updateStats(){
  p1WinsEle.textContent = player1Wins;
  p2WinsEle.textContent = player2Wins;
  if(gamesPlayed){
    p1WinPercent.textContent = `${Math.floor(100 * (player1Wins / gamesPlayed))}%`;
    p2WinPercent.textContent = `${Math.floor(100 * (player2Wins / gamesPlayed))}%`;
  }
  totalGames.textContent = `GAMES PLAYED: ${gamesPlayed}`;
  roundStats.textContent = `ROUND #: ${rounds}`;
}

function displayWin(){
  gameBoardImage.classList.add('hidden');
  winModal.classList.remove('hidden');
  winModalTxt.textContent = `Player ${currentPlayer} won!`
  gameContainer.className = "game-container hidden"
}

function restartGame(startingPlayer) {
  occupiedPiece = document.querySelectorAll('.token');
  startModal.classList.remove('hidden');
  gameContainer.classList.add('hidden');
  for (let i = 0; i < occupiedPiece.length; i++) {
    occupiedPiece[i].className = 'game-piece col-1';
  }
  winModal.classList.add('hidden');
  rounds = 0;
  updateStats();
  resetGameBoard();
  currentPlayer = startingPlayer;
  gameBoardImage.classList.remove('hidden');
}

function toggleS() {
  music.muted = !music.muted;
}

function pauseGame(){
  if(timerId){
    gameContainer.removeEventListener('click', addToken);
    clearTimeout(timerId);
    timerId = null;
  } else {
    gameContainer.addEventListener('click', addToken);
    timer()
  }
}

function timer() {
  timerId = setTimeout(function(){
    timerEle.textContent = timerCountdown--;
    if (timerCountdown === 0) {
      console.log("Time is UP!");
      if (currentPlayer === 1) {
        currentPlayer = 2;
        timerCountdown = maxTurnTime;
        timer();
      } else {
        currentPlayer = 1;
        timerCountdown = maxTurnTime;
        timer();
      }
    } else {
      timer();
    }
  }, delay);
}
