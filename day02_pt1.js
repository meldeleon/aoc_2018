const input = require("fs")
  .readFileSync("day02_input.txt")
  .toString()
  .split(/\r\n/)

//console.log({ input })

function findCheckSum(input) {
  // creating two sets for each value that makes up our checksum
  let twoRepeatSet = new Set()
  let threeRepeatSet = new Set()
  //iterating over input
  for (let i = 0; i < input.length; i++) {
    //isolating one code, and creating a set to check each character for dupes
    var code = input[i]
    let characters = new Set()
    for (let j = 0; j < code.length; j++) {
      characters.add(code[j])
    }
    //console.log({ characters })

    //iterating over our unique character set for each code
    characters.forEach((character) => {
      let filtered = code.split("").filter((x) => x === character)
      //console.log({ filtered })
      if (filtered.length === 2) {
        twoRepeatSet.add(code)
      } else if (filtered.length === 3) {
        threeRepeatSet.add(code)
      }
    })
  }
  return parseInt(twoRepeatSet.size * threeRepeatSet.size)
}

console.log(`The answer is ${findCheckSum(input)}`)
