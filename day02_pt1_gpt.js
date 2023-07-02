function calculateChecksum(boxIDs) {
  let countTwo = 0
  let countThree = 0

  for (let i = 0; i < boxIDs.length; i++) {
    const boxID = boxIDs[i]
    const letterCounts = countLetters(boxID)

    if (hasExactCount(letterCounts, 2)) {
      countTwo++
    }

    if (hasExactCount(letterCounts, 3)) {
      countThree++
    }
  }

  return countTwo * countThree
}

function countLetters(boxID) {
  const letterCounts = {}

  for (let i = 0; i < boxID.length; i++) {
    const letter = boxID[i]

    if (letterCounts.hasOwnProperty(letter)) {
      letterCounts[letter]++
    } else {
      letterCounts[letter] = 1
    }
  }

  return letterCounts
}

function hasExactCount(letterCounts, count) {
  for (const letter in letterCounts) {
    if (letterCounts[letter] === count) {
      return true
    }
  }
  return false
}

// Example usage:
const boxIDs = require("fs")
  .readFileSync("day02_input.txt")
  .toString()
  .split(/\r\n/)

const checksum = calculateChecksum(boxIDs)
console.log("Checksum:", checksum)
