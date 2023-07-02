function findFirstDuplicateFrequency(frequencyChanges) {
  let currentFrequency = 0
  let seenFrequencies = new Set()

  while (true) {
    // Iterate through the frequency changes
    for (let i = 0; i < frequencyChanges.length; i++) {
      const change = parseInt(frequencyChanges[i])

      // Update the current frequency
      currentFrequency += change

      // Check if the current frequency has been seen before
      if (seenFrequencies.has(currentFrequency)) {
        return currentFrequency
      }

      // Add the current frequency to the set of seen frequencies
      seenFrequencies.add(currentFrequency)
    }
  }
}

// Example usage:
const frequencyChanges = ["+1", "-1"]
const firstDuplicateFrequency = findFirstDuplicateFrequency(frequencyChanges)
console.log("First duplicate frequency:", firstDuplicateFrequency)
