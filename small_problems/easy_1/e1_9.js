let isLeapYear = year => {
  if (year <= 1752 && !(year % 4)){
    console.log(true)
  }else if(!(year % 400) || !(year % 4) && (year % 100)){
    console.log(true);
  } else console.log(false)
}
isLeapYear(100)