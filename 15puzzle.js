var tileNumbers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var emptyTileIndex = 0;
var gameComplete = false;
var gameStarted = false;

//arrays valid moves
var left = [1,2,3,5,6,7,9,10,11,13,14,15];
var right = [0,1,2,4,5,6,8,9,10,12,13,14];
var up = [4,5,6,7,8,9,10,11,12,13,14,15];
var down = [0,1,2,3,4,5,6,7,8,9,10,11];

function startGame() {

  //remove any previous warnings
  document.getElementById("warning").innerHTML = "";

  //shuffle tiles
  shuffle(tileNumbers);

  //print to page
  for(i=0; i<tileNumbers.length; i++) {

    tile = document.getElementById(i);

    if (tileNumbers[i] == 0) {
      //empty tile
      emptyTileIndex = i;
      tile.innerHTML = "";
    } else {
      tile.innerHTML = tileNumbers[i];
    }
  }
  gameComplete = false;
  gameStarted = true;

}

function clickTile(tile) {
  //swap this tile with open tile

  if (gameComplete || !gameStarted) {
    //do not allow further moves if game is already won
    return;
  }

  //remove any previous warnings
  document.getElementById("warning").innerHTML = "";

  if(invalidMove(tile)) {
    //check for adjacent cell and print warning
    document.getElementById("warning").innerHTML = "Warning! Invalid move!";
  } else {
    //swap empty tile and clicked tile
    //change array values
    //update emptyTileIndex
    //update board

    var temp = emptyTileIndex;
    //set selected tile as the empty tile
    emptyTileIndex = parseInt(tile.id);
    tileNumbers[emptyTileIndex] = 0;
    //set prev empty tile as the selected tile
    tileNumbers[temp] = parseInt(tile.innerHTML);
    document.getElementById(temp).innerHTML = tile.innerHTML;
    tile.innerHTML = "";

    if (win()) {
      warning = document.getElementById("warning").innerHTML = "Congratulations! You won!";

      //give "Play again" option
      var button = document.createElement("button");
      button.innerHTML = "Play Again";
      document.getElementById("playAgain").appendChild(button);
      button.onclick = startGame;

      gameComplete = true;
    }
  }

}

function invalidMove(tile) {
  //test for invalid moves
  //if move is invalid, return true

  var tileId = parseInt(tile.id);
  //check left array
  if (left.indexOf(tileId) != -1) {
    if (emptyTileIndex + 1 == tileId) {
      return false;
    }
  }
  if (right.indexOf(tileId) != -1) {
    if (emptyTileIndex - 1 == tileId) {
      return false;
    }
  }
  if (up.indexOf(tileId) != -1) {
    if (emptyTileIndex + 4 == tileId) {
      return false;
    }
  }
  if (down.indexOf(tileId) != -1) {
    if (emptyTileIndex - 4 == tileId) {
      return false;
    }
  }
  return true;

}

//fisher-yates shuffling algorithm
function shuffle (array) {
  var i = 0
  var j = 0
  var temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

//check if game has been won
function win() {
  for (i = 0; i<tileNumbers.length-1; i++) {
    if (tileNumbers[i] > tileNumbers[i + 1]) {
      return false;
    }
  }
  return true;
}
