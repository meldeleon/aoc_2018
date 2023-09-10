const fs = require("fs")

function calculateNodeValue(numbers, index) {
  const numChildren = numbers[index]
  const numMetadata = numbers[index + 1]
  let childValues = []
  let metadataSum = 0
  let childIndex = index + 2
  //building children
  for (let i = 0; i < numChildren; i++) {
    const { value, newIndex } = calculateNodeValue(numbers, childIndex)
    childValues.push(value)
    childIndex = newIndex
  }

  if (numChildren === 0) {
    for (let i = 0; i < numMetadata; i++) {
      metadataSum += numbers[childIndex + i]
    }
  } else {
    for (let i = 0; i < numMetadata; i++) {
      const childReference = numbers[childIndex + i]
      if (childReference > 0 && childReference <= numChildren) {
        metadataSum += childValues[childReference - 1]
      }
    }
  }

  return {
    value: numChildren === 0 ? metadataSum : metadataSum,
    newIndex: childIndex + numMetadata,
  }
}

fs.readFile("day08_inputs.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const numbers = data.split(" ").map(Number)
  const { value } = calculateNodeValue(numbers, 0)
  console.log("Value of the root node:", value)
})
