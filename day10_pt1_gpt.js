const fs = require("fs")

// Read the input from the text file
const input = fs.readFileSync("day10_input.txt", "utf8")
const lines = input.trim().split("\n")

const points = lines.map((line) => {
  const match = line.match(
    /position=<\s*(-?\d+),\s*(-?\d+)>\s*velocity=<\s*(-?\d+),\s*(-?\d+)>/
  )
  return {
    x: parseInt(match[1], 10),
    y: parseInt(match[2], 10),
    velocityX: parseInt(match[3], 10),
    velocityY: parseInt(match[4], 10),
  }
})

// Function to move points by a given time
function movePoints(points, time) {
  return points.map((point) => ({
    x: point.x + point.velocityX * time,
    y: point.y + point.velocityY * time,
  }))
}

// Function to find the bounding box around the points
function getBoundingBox(points) {
  const minX = Math.min(...points.map((point) => point.x))
  const maxX = Math.max(...points.map((point) => point.x))
  const minY = Math.min(...points.map((point) => point.y))
  const maxY = Math.max(...points.map((point) => point.y))
  return { minX, maxX, minY, maxY }
}

// Function to print the points as a grid
function printPoints(points) {
  const { minX, maxX, minY, maxY } = getBoundingBox(points)
  const width = maxX - minX + 1
  const height = maxY - minY + 1
  const grid = Array.from({ length: height }, () => Array(width).fill("."))
  points.forEach((point) => {
    const x = point.x - minX
    const y = point.y - minY
    grid[y][x] = "#"
  })
  console.log(grid.map((row) => row.join("")).join("\n"))
}

// Move points and find the time at which they form a message
let time = 0
let previousHeight = Infinity
while (true) {
  const movedPoints = movePoints(points, time)
  const { minX, maxX, minY, maxY } = getBoundingBox(movedPoints)
  const currentHeight = maxY - minY + 1

  // If the height starts increasing, the message has already passed
  if (currentHeight > previousHeight) {
    break
  }

  previousHeight = currentHeight
  time++
}

// Move points back to the previous time to get the message
const messagePoints = movePoints(points, time - 1)

// Print the message
printPoints(messagePoints)
