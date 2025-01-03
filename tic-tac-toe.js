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