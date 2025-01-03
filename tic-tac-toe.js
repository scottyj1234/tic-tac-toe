const GameBoardFactory = function () {
  let board = [
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
      throw Error(`Attempted to make a play at ${row}, ${col} - out of bounds`)
    }
    if (icon !== 'x' && icon !== 'o') {
      console.error(`Attempted to make a play with icon ${icon} - invalid icon`);
      throw Error(`Attempted to make a play at ${row}, ${col} - out of bounds`);
    }
    if (board[row-1][col-1] !== null) {
      console.error(`Attempted to make a play at ${row}, ${col} - that space is already filled`);
      throw Error(`Attempted to make a play at ${row}, ${col} - out of bounds`);
    }

    board[row-1][col-1] = icon;
  }

  const getWinningIndices = function() {
    // check columns
    for (let col = 0; col < 3; ++col) {
      let row = 1;
      let firstIcon = board[0][col];
      if (firstIcon === null) continue;
      while (row < 3 && board[row][col] === firstIcon) {
        ++row;
      }
      if (row === 3) {
        return [[0, col], [1, col], [2, col]];
      }
    }

    // check rows
    for (let row = 0; row < 3; ++row) {
      let col = 1;
      let firstIcon = board[row][0];
      if (firstIcon === null) continue;
      while (col < 3 && board[row][col] === firstIcon) {
        ++col;
      }
      if (col === 3) {
        return [[row, 0], [row, 1], [row, 2]];
      }
    }

    // check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[1][1] !== null) {
      return [[0, 0], [1, 1], [2, 2]];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] !== null) {
      return [[0, 2], [1, 1], [2, 0]];
    }

    // if execution reaches here, no winners
    return null;
  }

  const logBoard = function() {
    console.log(GameBoard.boardToString());
  }

  const testGameBoard = function() {
    
  }

  return {
    boardToString,
    makePlay,
    clearBoard,
    getWinningIndices,
  };
};

const Game = (function(gameboard) {
  const PlayerOne = {
    name: "",
    icon: "x"
  }
  
  const PlayerTwo = {
    name: "",
    icon: "o"
  }

  const namePlayerOne = function(name) {
    PlayerOne.name = name;
  }

  const namePlayerTwo = function(name) {
    PlayerTwo.name = name;
  }

  const playGame = function() {
    // dummy player names for now
    namePlayerOne("Player One");
    namePlayerTwo("Player Two");

    let playerTurn = PlayerOne;

    while (gameboard.getWinningIndices === null) {
      console.log(`${playerTurn.name}'s Turn`);
      prompt('Enter "row col" to play');

    }
  }
  
})(GameBoardFactory())