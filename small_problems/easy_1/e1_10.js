let multiSum = x => {
  let total = 0;
  for (let i = 1; i <= x; i++){
    if(!(i % 3) || !(i % 5)){
      total += i
    } 
  } 
  console.log(total)
}
multiSum(20)