let readline = require('readline-sync');

const SUITS = ['Hearts', 'Clubs', 'Spades', 'Diamonds'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const GAMESCORE = 21;
const DEALER_HIT_CAP = GAMESCORE - 4;

//declare variables
let dealerWinCount = 0;
let playerWinCount = 0;
let winningScore;

let setWinningScore = () => {
  while (true) {
    console.log('Enter score to determine match winner:');
    winningScore = readline.question('');
    if (!isNaN(winningScore)) break;
    console.log("That's not a valid number.");
  }
};
let displayWelcomeMessage = () => {
  console.log(`Welcome to ${GAMESCORE}!`);
};

let userName;
let getUserName = () => {
  console.log("What's your name?");
  userName = readline.question('');
};

let dealCard = hand => {
  let suitIndex = Math.floor(Math.random() * SUITS.length);
  let suit = SUITS[suitIndex];
  let valueIndex = Math.floor(Math.random() * VALUES.length);
  let value = VALUES[valueIndex];
  let card = [suit, value];
  hand.push(card);
  return card;
};

let findPointTotal = hand => {
  let sum = 0;
  let values = hand.map(card => card[1]);

  values.forEach(value => {
    if (value === 'A') {
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });
  values.filter(value => value === 'A').forEach(_ => {
    if (sum > GAMESCORE) sum -= 10;
  });
  return sum;
};

let displayHand = (hand, player) => {
  console.log(`${player}'s hand is:`);
  hand.forEach(card => {
    console.log(`${card[1]} of ${card[0]}`);
  });
  console.log(`for a total of ${findPointTotal(hand)}`);
  console.log('*~*~*~*~*~*~*~*~*~*~*~*~*~*~*');
};

//asks the player to hit or stay


let hitOrStay = () => {
  let hOrS;
  let validAnswers = ['hit', 'h', 'stay', 's'];
  while (true) {
    console.log('Hit or Stay?');
    hOrS = readline.question('').toLowerCase();
    if (validAnswers.includes(hOrS)) break;
    console.log('Please enter a valid choice.');
  }
  return hOrS;
};

//checkes if someone busted
let busted = hand => {
  let total = findPointTotal(hand);
  if (total > GAMESCORE) {
    return true;
  } else {
    return null;
  }
};

// eslint-disable-next-line max-lines-per-function
let playerGoes = playerHand => {
  dealCard(playerHand);
  dealCard(playerHand);
  displayHand(playerHand, userName);

  let response;
  while (findPointTotal(playerHand) < GAMESCORE) {
    response = hitOrStay();
    if (response === 'h' || response === 'hit') {
      let newCard = dealCard(playerHand);
      console.log(`*~*~*~*~*You drew: ${newCard[1]} of ${newCard[0]}*~*~*~*~*~*~*`);
      displayHand(playerHand, userName);
    }
    if (response === 's' || response === 'stay' || busted(playerHand)) break;
  }
  if (findPointTotal(playerHand) === GAMESCORE) {
    console.log(`You got ${GAMESCORE}!`);
  } else if (findPointTotal(playerHand) > GAMESCORE) {
    return null;
  }
  return findPointTotal(playerHand);
};

//dealer deals themselves and reveals one card
let dealerStart = dealerHand => {
  dealCard(dealerHand);
  console.log(`Dealer is showing: ${dealerHand[0][1]} of ${dealerHand[0][0]}`);
};

//dealer gets a card
let dealerFlipsCard = dealerHand => {
  let newCard = dealCard(dealerHand);
  console.log(`Dealer flipped a ${newCard[1]} of ${newCard[0]}`);
};

//after player has point total, dealer finishes turn
let dealerFinish = dealerHand => {
  do {
    console.log('Dealer is flipping card...');
    console.log('Press enter');
    readline.question('');
    dealerFlipsCard(dealerHand);
    displayHand(dealerHand, 'Dealer');
  } while (findPointTotal(dealerHand) < DEALER_HIT_CAP);
  if (findPointTotal(dealerHand) > GAMESCORE) {
    return null;
  }
  return findPointTotal(dealerHand);
};

//compare scores and find winner
let displayWinner = (dealerScore, playerScore) => {
  console.log(`You got ${playerScore}, the dealer got ${dealerScore}.`);
  if (dealerScore > playerScore) {
    console.log('Dealer won.');
    dealerWinCount += 1;
  } else if (playerScore > dealerScore) {
    console.log('You won!!');
    playerWinCount += 1;
  } else {
    console.log('Push.');
  }
};

let scoreDisplay = () => {
  console.log('*~*~*~*~*~*~*~*~*~*~*~*~*~*~*');
  console.log('Match score is:');
  console.log(`${userName}: ${playerWinCount}`);
  console.log(`Dealer: ${dealerWinCount}`);
  console.log(`Match winning score is: ${winningScore}`);
  console.log('*~*~*~*~*~*~*~*~*~*~*~*~*~*~*');
};

let nextRound = () => {
  console.log('Press enter to proceed:');
  readline.question('');
};

let determineChampion = () => {
  if (playerWinCount >= winningScore) {
    return userName;
  } else return 'Dealer';
};

let playAgain = () => {
  let yOrN;
  let validChoices = ['yes', 'y', 'no', 'n'];
  while (true) {
    console.log('Would you like to play again? (y, n)');
    yOrN = readline.question('').toLowerCase();
    if (validChoices.includes(yOrN)) break;
    console.log("That's not a valid input.");
  }
  if (yOrN !== 'y' && yOrN !== 'yes') {
    return false;
  }
  return true;
};

let goAgain = true;

//match loop
displayWelcomeMessage();
getUserName();
while (goAgain) {
  setWinningScore();
  playerWinCount = 0;
  dealerWinCount = 0;
  //game loop
  while (dealerWinCount < winningScore && playerWinCount < winningScore) {
    let playerHand = [];
    let dealerHand = [];
    console.clear();
    scoreDisplay();
    while (true) {
      dealerStart(dealerHand);
      let playerPointTotal = playerGoes(playerHand);

      if (playerPointTotal) {
        console.log(`You stayed at ${playerPointTotal}`);
      } else {
        console.log('You busted, dealer won.');
        dealerWinCount += 1;
        nextRound();
        break;
      }
      let dealerPointTotal = dealerFinish(dealerHand);
      if (dealerPointTotal) {
        displayWinner(dealerPointTotal, playerPointTotal);
        nextRound();
        break;
      } else {
        console.log('Dealer busted, you win!');
        playerWinCount += 1;
        nextRound();
        break;
      }
    }
  }
  console.log(`${determineChampion()} is the Champion!`);
  goAgain = playAgain();
}
console.log('Goodbye!');