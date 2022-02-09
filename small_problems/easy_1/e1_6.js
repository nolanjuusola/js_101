let rlSync = require('readline-sync');
let inputInteger = rlSync.question('Input an integer greater than 0 and press Enter: \n');
let pOrS = rlSync.question("Press 's' to compute the sum or 'p' to compute the product, then press enter: \n");

let sumOrProduct = x => {

  if (pOrS === 's') {
    let total = 0
    for (let i = 1; i <= x; i++){
      total += i;
      console.log(total)
    } 
  } else if(pOrS === 'p') {
    let total1 = 1
    for (let j = 1; j <= x; j ++)
    total1 *= j;
    console.log(total1)
  } 
}

sumOrProduct(inputInteger)