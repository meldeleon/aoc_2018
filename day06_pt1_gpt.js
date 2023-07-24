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

  // Create a grid and calculate closest coordinates for each point on the grid
  const grid = new Array(maxY - minY + 1)
    .fill(null)
    .map(() => new Array(maxX - minX + 1).fill("."))
  const areaMap = new Map()

  //iterate over grid
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      //create a distances map
      const distances = coordinates.map((coord) =>
        calculateManhattanDistance(coord.x, coord.y, x + minX, y + minY)
      )
      const minDistance = Math.min(...distances)
      const closestCoords = distances.reduce(
        (acc, dist, idx) => (dist === minDistance ? acc.concat(idx) : acc),
        []
      )

      if (closestCoords.length === 1) {
        const closestCoordIdx = closestCoords[0]
        grid[y][x] = closestCoordIdx
        areaMap.set(closestCoordIdx, (areaMap.get(closestCoordIdx) || 0) + 1)
      }
    }
  }

  // Count the areas and check for infinite areas
  const infiniteAreas = new Set()

  for (let x = 0; x < grid[0].length; x++) {
    infiniteAreas.add(grid[0][x])
    infiniteAreas.add(grid[grid.length - 1][x])
  }

  for (let y = 0; y < grid.length; y++) {
    infiniteAreas.add(grid[y][0])
    infiniteAreas.add(grid[y][grid[0].length - 1])
  }

  let largestArea = 0
  for (const [coordIdx, area] of areaMap) {
    if (!infiniteAreas.has(coordIdx) && area > largestArea) {
      largestArea = area
    }
  }

  console.log("Size of the largest area that isn't infinite:", largestArea)
})
