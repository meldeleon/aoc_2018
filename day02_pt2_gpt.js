function findCommonLetters(boxIDs) {
  for (let i = 0; i < boxIDs.length; i++) {
    const currentBoxID = boxIDs[i]

    for (let j = i + 1; j < boxIDs.length; j++) {
      const comparedBoxID = boxIDs[j]
      let differingIndex = -1

      for (let k = 0; k < currentBoxID.length; k++) {
        if (currentBoxID[k] !== comparedBoxID[k]) {
          if (differingIndex !== -1) {
            return null // More than one differing character
          }
          differingIndex = k
        }
      }

      if (differingIndex !== -1) {
        const commonLetters =
          currentBoxID.slice(0, differingIndex) +
          currentBoxID.slice(differingIndex + 1)
        return commonLetters
      }
    }
  }

  return null // No pair of IDs differ by exactly one character
}

// Example usage:
const boxIDs = ["abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"]
const commonLetters = findCommonLetters(boxIDs)
console.log("Common Letters:", commonLetters)
