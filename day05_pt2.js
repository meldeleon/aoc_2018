const polymer = require("fs")
  .readFileSync("day05_input.txt")
  .toString()
  .split("")

//create iterable with all possible polymer types
const polymerTypes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

//run main, print answer
const scrubbedPolymerLength = removeMinPolymer(polymer)
console.log(`The answer is ${scrubbedPolymerLength}`)

//main function, finds min polymer, returns answer polymer
function removeMinPolymer(polymer) {
  let min
  let minType
  for (let h = 0; h < polymerTypes.length; h++) {
    let polymerScrubbedLength = checkTypeScrubbedPolymerLength(
      polymer,
      polymerTypes[h]
    )
    if (h === 0 || polymerScrubbedLength < min) {
      min = polymerScrubbedLength
      minType = polymerTypes[h]
    }
  }
  //console.log({ minType }, { min })
  return min
}

//function that removed a polymer type from polymer. I am so sorry that this is the least efficient thing ever
function scrubPolymer(polymer, type) {
  let lowerType = type.toLowerCase()
  return polymer.filter((x) => x.toLowerCase() !== lowerType)
}
//^^ OGprodigy's code :uWu:

//function that returns length of removed polymer after reactions to find minimum
function checkTypeScrubbedPolymerLength(polymer, type) {
  let newPolymer = scrubPolymer(polymer, type)
  return buildResultingPolymer(newPolymer).length
}

function buildResultingPolymer(polymer) {
  const resultingPolymer = [polymer[0]]
  for (let i = 1; i < polymer.length; i++) {
    let unit = polymer[i]
    let previousUnit = resultingPolymer[resultingPolymer.length - 1]
    if (previousUnit && detectPolarOpposites(unit, previousUnit)) {
      resultingPolymer.pop()
    } else {
      resultingPolymer.push(polymer[i])
    }
    //console.log(resultingPolymer)
  }
  return resultingPolymer
}

function detectPolarOpposites(a, b) {
  return a !== b && a.toLowerCase() === b.toLowerCase()
}
