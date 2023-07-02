const input = require("fs")
  .readFileSync("day01_input.txt")
  .toString()
  .split(/\r\n/)

let state = {
  frequency: 0,
}

for (let i = 0; i < input.length; i++) {
  state.frequency += parseInt(input[i])
}

console.log(`the answer is ${state.frequency}`)
