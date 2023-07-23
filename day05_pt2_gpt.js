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
  }

  return stack.join("")
}

function hasReaction(unit1, unit2) {
  return unit1 !== unit2 && unit1.toLowerCase() === unit2.toLowerCase()
}

function removeUnitType(polymer, unitType) {
  const regex = new RegExp(unitType, "gi")
  return polymer.replace(regex, "")
}

// Read input file
fs.readFile("day05_input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const polymer = data.trim()

  const uniqueUnitTypes = new Set(polymer.toLowerCase().split(""))
  let shortestLength = Infinity

  for (const unitType of uniqueUnitTypes) {
    const polymerWithoutUnit = removeUnitType(polymer, unitType)
    const reactedPolymer = reactPolymer(polymerWithoutUnit)
    const length = reactedPolymer.length

    if (length < shortestLength) {
      shortestLength = length
    }
  }

  console.log("Shortest polymer length:", shortestLength)
})
