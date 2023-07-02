const input = require("fs")
  .readFileSync("day01_input.txt")
  .toString()
  .split(/\r\n/)

function returnDupeFrequency() {
  let currentFrequency = 0
  let listOfFreq = new Set()
  while (true) {
    for (let i = 0; i < input.length; i++) {
      currentFrequency += parseInt(input[i])

      if (listOfFreq.has(currentFrequency)) {
        return currentFrequency
      }

      listOfFreq.add(currentFrequency)
    }
  }
}

console.log(returnDupeFrequency())

//mel's sad code.
// do {
//   for (let i = 0; i < input.length; i++) {
//     let fShift = input[i]
//     state.freq += parseInt(fShift)
//     if (state.listOfFreq.includes(state.freq)) {
//       console.log(`first duplicate found:${state.freq}`)
//       state.dupeFound = true
//       return
//     } else {
//       state.listOfFreq.push(state.freq)
//     }
//   }
// } while (!state.dupeFound)
