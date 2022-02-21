/*
lay out the user's choices
get input from user
make sure input is valid
generate computer choice
determine who won
increment the counter
determine if the game has ended
if it has, display the winner, otherwise repeat the loop
*/

const readline = require('readline-sync');

const VALID_CHOICES = {
  r: 'rock',
  p: 'paper',
  s: 'scissors',
  l: 'lizard',
  k: 'spock'
};

const WIN_CONDITIONS = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock']
};

let validChoiceKeys = Object.keys(VALID_CHOICES);
let validChoiceValues = Object.values(VALID_CHOICES);

let prompt = message => console.log(`=> ${message}`);

prompt('Welcome to Rock Paper Scissors Lizard Spock!');

prompt('Enter your name:');
let userName = readline.question();

let winningScore;
function setWinningScore() {
  prompt('Enter number of wins to determine the match winner:');
  winningScore = Number(readline.question());
  while (isNaN(winningScore)) {
    prompt('Please enter a valid number:');
    winningScore = readline.question();
  }
}

//display the choices to the user
function displayChoices() {
  let arrayPairs = Object.entries(VALID_CHOICES);
  arrayPairs.forEach(element => {
    console.log(`${element[0]}: ${element[1]}`);
  });
}

//get user choice and make sure it is valid
let userChoice;
function getUserChoice() {
  prompt('Make your choice:');
  displayChoices();
  let userAbbrev = readline.question().toLowerCase();
  while (!validChoiceKeys.includes(userAbbrev)) {
    prompt('Please enter a valid choice');
    userAbbrev = readline.question().toLowerCase();
  }
  userChoice = VALID_CHOICES[userAbbrev];
}

//get computer choice
let computerChoice;
function getComputerChoice() {
  let computerIndex = Math.floor(Math.random() *
      (validChoiceValues.length));
  computerChoice = validChoiceValues[computerIndex];
}

//declare win and round counters
let computerWinCount = 0;
let userWinCount = 0;
let round = 1;

//reset the round and win counters and clear the console
function reset() {
  computerWinCount = 0;
  userWinCount = 0;
  round = 1;
  console.clear();
  prompt('New Game!');
}

//implement game logic
function dipslayWinner(userChoice, computerChoice) {
  prompt(`You chose ${userChoice}, the computer chose ${computerChoice}`);
  if (WIN_CONDITIONS[userChoice].includes(computerChoice)) {
    prompt('You won!');
    userWinCount += 1;
  } else if (userChoice === computerChoice) {
    prompt("It's a tie.");
  } else {
    prompt('Computer won.');
    computerWinCount += 1;
  }
}

function nextRound() {
  prompt('Press enter to proceed to the next round.');
  readline.question();
}

//determine if a champion has been decided
function determineChampion() {
  if (userWinCount === winningScore) {
    prompt('You are the Champion!');
  } else if (computerWinCount === winningScore) {
    prompt('The computer is the champion.');
  } else nextRound();
}

//let the user restart the game
let restartGame = true;
function playAgain() {
  prompt('Would you like to play again?');
  let yOrN = readline.question().toLowerCase();
  while (yOrN[0] !== 'n' && yOrN[0] !== 'y') {
    prompt('Please answer yes or no.');
    yOrN = readline.question().toLowerCase();
  }
  if (yOrN[0] !== 'y') {
    restartGame = false;
    prompt('Goodbye!');
  } else if (yOrN[0] === 'y') {
    reset();
  }
}

function scoreboardDisplay() {
  prompt(`~-~-~-~-~-~Round ${round}~-~-~-~-~-~-~`);
  prompt(`Score is ${userName}: ${userWinCount} Computer: ${computerWinCount}`);
}

//play the game
while (restartGame) {
  setWinningScore();
  while (userWinCount < winningScore && computerWinCount < winningScore) {
    scoreboardDisplay();
    getUserChoice();
    getComputerChoice();
    dipslayWinner(userChoice, computerChoice);
    determineChampion();
  }
  playAgain();
}