const polymer = require("fs")
  .readFileSync("day05_input.txt")
  .toString()
  .split("")

let resultingPolymer = buildResultingPolymer(polymer)

console.log(`The solution is ${resultingPolymer.length}`)

function buildResultingPolymer(polymer) {
  const resultingPolymer = [polymer[0]]
  for (let i = 1; i < polymer.length; i++) {
    let unit = polymer[i]
    let previousUnit = resultingPolymer[resultingPolymer.length - 1]
    if (detectPolarOpposites(unit, previousUnit)) {
      resultingPolymer.pop()
    } else {
      resultingPolymer.push(polymer[i])
    }
    //console.log(resultingPolymer)
  }
  return resultingPolymer
}

console.log(detectPolarOpposites("A", "a"))

function detectPolarOpposites(a, b) {
  return checkLetterTypes(a, b) && checkOpposites(a, b)
}

function checkOpposites(a, b) {
  let caseA = detectUpperCase(a)
  let caseB = detectUpperCase(b)
  if (caseA + caseB === 1) {
    return true
  } else {
    return false
  }
}

//return 1 for Upper/0 for lower
function detectUpperCase(a) {
  if (typeof a !== "string") {
  } else if (a.toUpperCase() === a) {
    return 1
  } else {
    return 0
  }
}

function checkLetterTypes(a, b) {
  if (typeof a !== "string" || typeof b !== "string") {
  } else if (a.toUpperCase() === b.toUpperCase()) {
    return true
  } else {
    return false
  }
}

// This is O(n^2) complexity -- after we saw chatGPT at O(n) complexity, we refactored above
// function resolveReactions(polymer) {
//   let reaction = detectPossibleReactions(polymer)
//   while (reaction) {
//     polymer.splice(reaction, 2)
//     reaction = detectPossibleReactions(polymer)
//     //console.log({ reaction }, { polymer })
//   }
//   return polymer
// }

// function detectPossibleReactions(polymer) {
//   for (let i = 0; i < polymer.length; i++) {
//     if (i + 1 > polymer.length) {
//       return false
//     } else if (detectPolarOpposites(polymer[i], polymer[i + 1])) {
//       return [i]
//     }
//   }
// }
