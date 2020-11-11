const startGameBtn = document.getElementById("start");
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSOR = "SCISSOR";
const DEFAULT_USER_CHOICE = "ROCK";
const DRAW = "DRAW";
const PLAYER_WINS = "PLAYER_WINS";
const COMPUTER_WINS = "COMPUTER_WINS";
let gameRunning = false;

const getPlayerChoics = () => {
  const selection = prompt(`${ROCK}, ${PAPER}, ${SCISSOR}?`, "").toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSOR) {
    alert(`Invalid Choice, We choice ${DEFAULT_USER_CHOICE} for you!.`);
    return DEFAULT_USER_CHOICE;
  } else {
    return selection;
  }
};

const getComputerChoice = () => {
  const random = Math.random();
  if (random < 0.34) {
    return ROCK;
  } else if (random < 0.67) {
    return PAPER;
  } else {
    return SCISSOR;
  }
};

const getWinner = (pChoice, cChoice) => {
  if (pChoice === cChoice) {
    return DRAW;
  } else if (
    (pChoice === ROCK && cChoice == SCISSOR) ||
    (pChoice === PAPER && cChoice === ROCK) ||
    (pChoice === SCISSOR && cChoice === PAPER)
  ) {
    return PLAYER_WINS;
  } else {
    return COMPUTER_WINS;
  }
};

startGameBtn.addEventListener("click", () => {
  if (gameRunning) {
    alert("Game is running");
    return;
  }
  gameRunning = true;
  const playerChoice = getPlayerChoics();
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  alert(
    `Computer=${computerChoice},player=${playerChoice} and winner=${winner}`,
  );
  gameRunning = false;
});
