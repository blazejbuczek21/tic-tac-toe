const cells = document.querySelectorAll(".cell");
const info = document.getElementById("info");
const restart = document.getElementById("restart");
const computer = document.getElementById("computer");
const players = document.getElementById("players");
let board = Array(9).fill(null);
const x = {
  symbol: "X",
  color: "red",
};
const o = {
  symbol: "O",
  color: "blue",
};
let player = x;
let moves = 0;
let isComputerPlayer;
let isMakingMove = false;

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const computerGame = () => {
  isComputerPlayer = true;
  computer.classList.add("header_item_active");
  players.classList.remove("header_item_active");
  restartGame();
  startGame();
};

const playerGame = () => {
  isComputerPlayer = false;
  players.classList.add("header_item_active");
  computer.classList.remove("header_item_active");
  restartGame();
  startGame();
};

const startGame = () => {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  info.style.color = player.color;
  if (isComputerPlayer == false) {
    info.innerText = `Player ${player.symbol}'s turn`;
  } else if (isComputerPlayer == true && player == x) {
    info.innerText = `Your turn ${player.symbol}`;
  } else {
    info.innerText = `${player.symbol} is thinking`;
  }
};

const cellClicked = (e) => {
  const id = e.target.id;
  if (!board[id] && !isMakingMove) {
    moves++;
    board[id] = player;
    e.target.innerText = player.symbol;
    e.target.style.color = player.color;
    if (playerWon() !== false) {
      cells.forEach((cell) => cell.removeEventListener("click", cellClicked));
      info.innerText = `Player ${player.symbol} won`;
      info.style.color = player.color;
    } else if (moves === 9) {
      info.innerText = "Draw";
      info.style.color = "black";
    } else {
      player = player === x ? o : x;
      info.innerText = `Player ${player.symbol}'s move`;
      info.style.color = player.color;

      if (player === o && isComputerPlayer === true) {
        info.innerText = `${player.symbol} is thinking`;
        info.style.color = player.color;
        makeMove();
      } else if (player === x && isComputerPlayer === true) {
        info.innerText = `Your turn ${player.symbol}`;
      }
    }
  }
};

const makeMove = () => {
  isMakingMove = true;

  setTimeout(() => {
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        emptyCells.push(i);
      }
    }

    if (emptyCells.length > 0) {
      let randomIndex = Math.floor(Math.random() * emptyCells.length);
      let move = emptyCells[randomIndex];
      board[move] = player;
      cells[move].innerText = player.symbol;
      cells[move].style.color = player.color;
      moves++;

      if (playerWon() !== false) {
        cells.forEach((cell) => cell.removeEventListener("click", cellClicked));
        info.innerText = `Player ${player.symbol} won`;
        info.style.color = player.color;
      } else if (moves === 9) {
        info.innerText = "Draw";
        info.style.color = "black";
      } else {
        player = player === x ? o : x;
        info.innerText = `Your move  ${player.symbol}`;
        info.style.color = player.color;
      }
    }

    isMakingMove = false;
  }, 700);
};
const playerWon = () => {
  for (const combinations of winCombinations) {
    let [a, b, c] = combinations;
    if (board[a] && board[a] == board[b] && board[b] == board[c]) {
      if (board[a] === o) {
        cells[a].classList.add("o-winner");
        cells[b].classList.add("o-winner");
        cells[c].classList.add("o-winner");
      } else if (board[a] === x) {
        cells[a].classList.add("x-winner");
        cells[b].classList.add("x-winner");
        cells[c].classList.add("x-winner");
      }

      return [a, b, c];
    }
  }
  return false;
};

const restartGame = () => {
  board.fill(null);
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("x-winner");
    cell.classList.remove("o-winner");
    moves = 0;
    player = x;
    startGame();
  });
};

restart.addEventListener("click", restartGame);
