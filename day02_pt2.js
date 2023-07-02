const input = require("fs")
  .readFileSync("day02_input.txt")
  .toString()
  .split(/\r\n/)

function findCodes(input) {
  //iterate over every code in the input
  for (let i = 0; i < input.length; i++) {
    let currentCode = input[i]
    //compare it to all other codes in the input
    for (let j = 0; j < input.length; j++) {
      let comparingCode = input[j]
      let difference = 0
      let differingCharacterIndex
      //check each character for difference in the two codes
      for (let k = 0; k < currentCode.length; k++)
        if (currentCode[k] === comparingCode[k]) {
        } else {
          difference++
          differingCharacterIndex = k
        }
      //formate our answer, removing the one difference in codes
      if (difference === 1) {
        let answerArray = currentCode.split("")
        answerArray.splice(differingCharacterIndex, 1)
        let answer = answerArray.join("")
        return answer
      }
    }
  }
}

console.log(findCodes(input))
