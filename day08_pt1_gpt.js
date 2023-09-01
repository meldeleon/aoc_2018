const fs = require("fs")

// Function to parse the license data and calculate the sum of metadata entries
function sumMetadata(data) {
  const numbers = data.split(" ").map(Number) // Convert input string to an array of numbers

  function parseNode(index) {
    const numChildren = numbers[index]
    const numMetadata = numbers[index + 1]
    let metadataSum = 0
    let childIndex = index + 2 // Start of children data

    // Recursively process child nodes
    for (let i = 0; i < numChildren; i++) {
      const { sum, newIndex } = parseNode(childIndex)
      metadataSum += sum
      childIndex = newIndex
    }

    // Sum metadata entries
    for (let i = 0; i < numMetadata; i++) {
      metadataSum += numbers[childIndex + i]
    }

    return { sum: metadataSum, newIndex: childIndex + numMetadata }
  }

  const { sum } = parseNode(0)
  return sum
}

// Read input file and calculate the sum of metadata entries
fs.readFile("day08_input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const metadataSum = sumMetadata(data)
  console.log("Sum of metadata entries:", metadataSum)
})
