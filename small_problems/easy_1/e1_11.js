let string = 'Four score'
let utf16Value = x => {
  let total = 0;
  for (let i = 0; i < x.length; i++){
    total += x.charCodeAt(i)
  }
  return total
}
console.log(utf16Value(string))