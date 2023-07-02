function findResultingFrequency(frequencyChanges) {
  let currentFrequency = 0

  // Iterate through the frequency changes
  for (let i = 0; i < frequencyChanges.length; i++) {
    const change = parseInt(frequencyChanges[i])

    // Update the current frequency
    currentFrequency += change
  }

  return currentFrequency
}

// Example usage:
const frequencyChanges = require("fs")
  .readFileSync("day01_input.txt")
  .toString()
  .split(/\r\n/)
const resultingFrequency = findResultingFrequency(frequencyChanges)
console.log("Resulting frequency:", resultingFrequency)
