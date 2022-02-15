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

let validChoiceKeys = Object.keys(VALID_CHOICES);
let validChoiceValues = Object.values(VALID_CHOICES);

let prompt = message => {
  console.log(`=> ${message}`);
};

prompt('Welcome to Rock Paper Scissors Lizard Spock! Try to beat the Computer in a best of 5.');

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
  if ((userChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
     (userChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
     (userChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
     (userChoice === 'lizard' && (computerChoice === 'spock' || computerChoice === 'paper')) ||
     (userChoice === 'spock' && (computerChoice === 'scissors' || computerChoice === 'rock'))) {
    prompt('You won!');
    userWinCount += 1;
  } else if (userChoice === computerChoice) {
    prompt("It's a tie.");
  } else {
    prompt('Computer won.');
    computerWinCount += 1;
  }
  round += 1;
}

//determine if a champion has been decided
function determineChampion() {
  if (userWinCount === 3) {
    prompt('You are the Champion!');
  } else if (computerWinCount === 3) {
    prompt('The computer is the champion.');
  }
}

//let the user restart the game
let restartGame = true;
function playAgain() {
  prompt('Would you like to play again?(y,n)');
  let yOrN = readline.question();
  while (yOrN !== 'n' && yOrN !== 'y') {
    prompt('Please answer y or n.');
    yOrN = readline.question();
  }
  if (yOrN !== 'y') {
    restartGame = false;
    prompt('Goodbye!');
  } else if (yOrN === 'y') {
    reset();
  }
}

//play the game
while (restartGame) {
  while (userWinCount < 3 && computerWinCount < 3) {
    prompt(`~-~-~-~-~-~Round ${round}~-~-~-~-~-~-~`);
    prompt(`Score is User: ${userWinCount} Computer: ${computerWinCount}`);
    getUserChoice();
    getComputerChoice();
    dipslayWinner(userChoice, computerChoice);
    determineChampion();
  }
  playAgain();
}

