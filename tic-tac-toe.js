const GameBoardFactory = function (rootDOMElement) {
  let board = [
    [null, null, null],
    [null, null, null], 
    [null, null, null]
  ];

  let rootDOMElement = rootDOMElement;

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

  // Need to change - find a way to give the play function a callback to continue to the next turn
  const updateDOM = function(playerTurn) {
    const boardDivs = rootDOMElement.querySelectorAll('>div');
    for (let i = 0; i < board.length; ++i) {
      for (let j = 0; j < board[i].length; ++j) {
        boardDivs[i + j].innerHTML = "";
        if (board[i][j] === null) {
          boardDivs[i + j].appendChild(createMakePlayButton(i, j, playerTurn));
        }
        else {
          boardDivs[i + j].textContent = board[i][j];
        }
      }
    }
  }

  const createMakePlayButton = function(row, col, playerTurn) {
    const newButton = document.createElement('button');
    newButton.className = "make-play-button";
    newButton.addEventListener('click', (e) => {
      makePlay(row + 1, col + 1, playerTurn.icon);

    });
    return newButton;
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

  const isDraw = function() {
    for (let row of board) {
      if (row.some((space) => space === null)) return false;
    }
    return true;
  }

  return {
    boardToString,
    makePlay,
    clearBoard,
    getWinningIndices,
    isDraw,
    updateDOM
  };
};

const Game = (function(gameboard) {
  const playerOne = {
    name: "",
    icon: "x"
  }
  
  const playerTwo = {
    name: "",
    icon: "o"
  }

  const namePlayerOne = function(name) {
    playerOne.name = name;
  }

  const namePlayerTwo = function(name) {
    playerTwo.name = name;
  }

  const playGame = function() {
    // dummy player names for now
    namePlayerOne("Player One");
    namePlayerTwo("Player Two");

    let playerTurn = playerOne;

    while (gameboard.getWinningIndices() === null && !gameboard.isDraw()) {
      console.log(`${playerTurn.name}'s Turn`);
      console.log(gameboard.boardToString());
      executePlayerTurn(playerTurn);

      playerTurn = (playerTurn === playerOne) ? playerTwo : playerOne;
    }

    if (gameboard.isDraw()) {
      console.log(gameboard.boardToString());
      console.log('The game is a draw!');
    } else {
      const winningPlayer = (playerTurn === playerOne) ? playerTwo : playerOne;
      console.log(`Winner: ${winningPlayer.name}!`);
      console.log(gameboard.boardToString());
      console.log('Winning indices:');
      console.log(gameboard.getWinningIndices());
    }
  }

  const executePlayerTurn = function(player) {
    let rowCol = prompt('Enter "row col" to play');
    while(true) {
      try {
        gameboard.makePlay(rowCol.split(' ')[0], rowCol.split(' ')[1], player.icon);
        return;
      } catch (error) {
        rowCol = prompt(`Invalid move: ${error.message}\nEnter "row col" to play`);
      }
    }
  }

  return {
    playGame
  }
})(GameBoardFactory(document.querySelector('div.board')))

