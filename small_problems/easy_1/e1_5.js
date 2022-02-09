let rlSync = require('readline-sync');
let bill = Number(rlSync.question('Enter bill total and press enter:\n'));
let tipPercent = Number(rlSync.question('Enter the percent of the bill you would like to tip and press enter:\n'));

let findPercent = (x,y) => {
  console.log(`The tip is ${(x * (y / 100)).toFixed(2)}. The total is ${(x * (y / 100) + x).toFixed(2)} `)
}

findPercent(bill, tipPercent)
