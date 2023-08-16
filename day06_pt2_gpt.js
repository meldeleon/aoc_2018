const fs = require("fs")

function calculateManhattanDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

// Read input file and parse the coordinates
fs.readFile("day06_input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const coordinates = data
    .trim()
    .split("\n")
    .map((line) => {
      const [x, y] = line.split(",").map(Number)
      return { x, y }
    })

  // Find the bounding box of the coordinates
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  for (const coord of coordinates) {
    if (coord.x < minX) minX = coord.x
    if (coord.x > maxX) maxX = coord.x
    if (coord.y < minY) minY = coord.y
    if (coord.y > maxY) maxY = coord.y
  }

  // Create a grid and calculate the total distance to all given coordinates for each point on the grid
  const grid = new Array(maxY - minY + 1)
    .fill(null)
    .map(() => new Array(maxX - minX + 1).fill(0))

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const totalDistance = coordinates.reduce(
        (sum, coord) =>
          sum +
          calculateManhattanDistance(coord.x, coord.y, x + minX, y + minY),
        0
      )
      grid[y][x] = totalDistance
    }
  }

  // Count the locations with total distance less than 10000
  let regionSize = 0
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] < 10000) {
        regionSize++
      }
    }
  }

  console.log(
    "Size of the region containing all locations with a total distance less than 10000:",
    regionSize
  )
})
