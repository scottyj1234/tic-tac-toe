const GameBoard = (function () {
  const board = [
    [null, null, null],
    [null, null, null], 
    [null, null, null]
  ];

  const boardToString = function() {
    let boardString = ' _ _ _ \n';
    for (let row of board) {
      boardString += '|'
      for (let space of row) {
        boardString += (space === null) ? "_" : space;
        boardString += '|';
      }
      boardString += '\n';
    }

    return boardString;
  }

  const clearBoard = function() {
    for (i = 0; i < 3; ++i) {
      for (j = 0; j < 3; ++j) {
        board[i][j] = null;
      }
    }
  }

  const makePlay = function(row, col, icon) {
    if (row < 1 || row > 3 || col < 1 || col > 3) {
      console.error(`Attempted to make a play at ${row}, ${col} - out of bounds`);
      return;
    }
    if (icon !== 'x' && icon !== 'o') {
      console.error(`Attempted to make a play with icon ${icon} - invalid icon`);
      return;
    }
    if (board[row-1][col-1] !== null) {
      console.error(`Attempted to make a play at ${row}, ${col} - that space is already filled`);
      return;
    }

    board[row-1][col-1] = icon;
  }

  return {
    boardToString,
    makePlay,
    clearBoard
  };
})();

function logBoard() {
  console.log(GameBoard.boardToString());
}

//test
GameBoard.makePlay(-1, 1, 'x');
console.log('out of bounds');
logBoard();
GameBoard.clearBoard();
GameBoard.makePlay(1, 1, 'x');
console.log('good');
logBoard();
GameBoard.clearBoard();
GameBoard.makePlay(1, -1, 'x');
console.log('out of bounds');
logBoard();
GameBoard.clearBoard();
GameBoard.makePlay(-1, -1, 'x');
console.log('out of bounds');
logBoard();
GameBoard.clearBoard();
GameBoard.makePlay(4, 1, 'x');
console.log('out of bounds');
logBoard();
GameBoard.clearBoard();
GameBoard.makePlay(4, 4, 'x');
console.log('out of bounds');
logBoard();
GameBoard.clearBoard();
GameBoard.makePlay(1, 4, 'x');
console.log('out of bounds');
logBoard();
GameBoard.clearBoard();
GameBoard.makePlay(3, 3, 'x');
console.log('good');
logBoard();
GameBoard.clearBoard();
GameBoard.makePlay(1, 1, 'o');
console.log('good');
logBoard();
GameBoard.clearBoard();
GameBoard.makePlay(1, 1, 'i');
console.log('bad icon');
logBoard();
GameBoard.clearBoard();
GameBoard.makePlay(1, 1, 3);
console.log('bad icon');
logBoard();
GameBoard.clearBoard();
GameBoard.makePlay(1, 1, null);
console.log('bad icon');
logBoard();
GameBoard.clearBoard();
GameBoard.makePlay(1, 1, 'x');
console.log('good');
logBoard();
GameBoard.makePlay(1, 1, 'x');
console.log('already taken');
logBoard();
GameBoard.makePlay(1, 1, 'o');
console.log('already taken');
logBoard();
GameBoard.makePlay(1, 2, 'o');
console.log('good');
logBoard();
GameBoard.clearBoard();