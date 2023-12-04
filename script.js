function CreateGameBoard() {
  return { board: ["", "", "", "", "", "", "", "", ""], count: 0 };
}

function Player(name, mark) {
  function getMark() {
    return mark;
  }
  function getName() {
    return name;
  }
  return {
    name: name,
    mark: mark,
    getMark,
    getName,
  };
}

const infoManager = (() => {
  const playBtn = document.querySelector(".play");
  const setupPage = document.querySelector(".setup");
  const gamePage = document.querySelector(".game");
  playBtn.addEventListener("click", () => {
    const player1Name = document.querySelector("#username1").value;
    const player2Name = document.querySelector("#username2").value;

    gameFlow.createPlayers(player1Name, player2Name);

    setupPage.style.visibility = "hidden";
    gamePage.style.visibility = "visible";
  });
})();

const displayController = (() => {
  const xSvgCode =
    '<svg style="fill: red;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cross</title><path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg>';
  const oSvgCode =
    '<svg style="fill: blue;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>circle</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';

  const updateBoard = (player) => {
    const tiles = document.querySelectorAll(".tile");
    tiles.forEach((tile, index) => {
      if (gameFlow.board.board[index] === "X") {
        tile.innerHTML = xSvgCode;
      } else if (gameFlow.board.board[index] === "O") {
        tile.innerHTML = oSvgCode;
      }
    });

    const turn = document.querySelector(".turn-display");
    turn.innerHTML = `${player.getName()}'s turn!`;
    if (player.getMark() === "X") {
      turn.style.borderColor = "red";
    } else {
      turn.style.borderColor = "blue";
    }
  };

  const showWinner = (winner) => {
    // Display a message or animation indicating the winner
    console.log("WINNER");
  };

  const showTie = () => {
    console.log("Tie!!");
  };

  return {
    updateBoard,
    showWinner,
    showTie,
  };
})();

const gameFlow = (() => {
  const board = CreateGameBoard();

  let player1;
  let player2;

  let curPlayer;

  const createPlayers = (player1Name, player2Name) => {
    player1 = Player(player1Name, "X");
    player2 = Player(player2Name, "O");
    curPlayer = player1;
    displayController.updateBoard(curPlayer);
  };

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => {
      makeMove(curPlayer, index);
    });
  });

  const resultCheck = () => {
    for (let i = 0; i < 3; i++) {
      if (
        board.board[i * 3] === board.board[i * 3 + 1] &&
        board.board[i * 3 + 1] === board.board[i * 3 + 2] &&
        board.board[i * 3] !== ""
      ) {
        if (player1.mark == board.board[i * 3]) {
          displayController.showWinner(player1);
        } else {
          displayController.showWinner(player2);
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        board.board[i] === board.board[i + 3] &&
        board.board[i + 3] === board.board[i + 6] &&
        board.board[i] !== ""
      ) {
        if (player1.mark == board.board[i]) {
          displayController.showWinner(player1);
        } else {
          displayController.showWinner(player2);
        }
      }
    }

    if (
      board.board[0] == board.board[4] &&
      board.board[4] === board.board[8] &&
      board.board[0] !== ""
    ) {
      if (player1.mark == board.board[0]) {
        displayController.showWinner(player1);
      } else {
        displayController.showWinner(player2);
      }
    }

    if (
      board.board[2] == board.board[4] &&
      board.board[4] === board.board[6] &&
      board.board[2] !== ""
    ) {
      if (player1.mark == board.board[2]) {
        displayController.showWinner(player1);
      } else {
        displayController.showWinner(player2);
      }
    }

    if (board.count === 9) {
      displayController.showTie();
    }
  };

  const makeMove = (player, field) => {
    board.board[field] = player.getMark();
    board.count++;
    resultCheck();
    if (curPlayer === player1) {
      curPlayer = player2;
    } else {
      curPlayer = player1;
    }
    displayController.updateBoard(curPlayer);
  };

  return {
    createPlayers,
    resultCheck,
    makeMove,
    board,
  };
})();
