let rlSync = require('readline-sync');
let width = rlSync.question('Enter room width in meters and press enter: ');
let length = rlSync.question('Enter room length in meters and press enter: ');

let findArea = (x,y) => {
  console.log(`The area of the room is ${x * y} square meters (${x * y * 10.7639} square feet).`)
}

findArea(width, length)