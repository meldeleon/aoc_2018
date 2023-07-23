const fs = require("fs")

function reactPolymer(polymer) {
  const stack = []

  for (const unit of polymer) {
    const prevUnit = stack[stack.length - 1]

    if (prevUnit && hasReaction(unit, prevUnit)) {
      stack.pop()
    } else {
      stack.push(unit)
    }
    console.log(stack)
  }

  return stack.join("")
}

function hasReaction(unit1, unit2) {
  return unit1 !== unit2 && unit1.toLowerCase() === unit2.toLowerCase()
}

// Read input file
fs.readFile("day05_input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const polymer = data.trim()

  const reactedPolymer = reactPolymer(polymer)
  const remainingUnits = reactedPolymer.length

  console.log("Remaining units:", remainingUnits)
})
