function CreateGameBoard() {
  return { board: ["", "", "", "", "", "", "", "", ""], count: 0 };
}

function Player(name, mark) {
  return {
    name: name,
    mark: mark,
  };
}

const displayController = (() => {
  const updateBoard = () => {
    // Update the HTML elements to reflect the current state of the game board
  };

  const showWinner = (winner) => {
    // Display a message or animation indicating the winner
  };

  const showTie = () => {
    // Display a message or animation indicating a tie
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

  const createPlayers = (player1Name, player2Name) => {
    player1 = Player(player1Name, "X");
    player2 = Player(player2Name, "O");
  };

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
    board.board[field] = player.mark;
    board.count++;
    resultCheck();
    displayController.updateBoard();
  };

  return {
    createPlayers,
    resultCheck,
    makeMove,
  };
})();

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
