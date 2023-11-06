const { captureRejectionSymbol } = require("events")

const input = require("fs")
  .readFileSync("day10_input.txt")
  .toString()
  .split("\r\n")

const lights = input.map((x) => {
  let output = {}
  let points = x.match(/(?<=\<)(.*?)(?=\>)/g)
  //console.log(points)
  starting_point = points[0].split(",").map((y) => parseInt(y))
  output.starting_point = starting_point
  output.current_point = starting_point
  output.velocity = points[1].split(",").map((z) => parseInt(z))
  return output
})

//console.log(lights)
let seconds = 20000
//iterate over x number of seconds
for (let a = 0; a < seconds; a++) {
  printStarMap(lights)
  moveAllLights()
  console.log(a)
}

function printStarMap(lights) {
  let [minX, minY, maxX, maxY] = findTableDimensions(lights)
  if (maxY - minY < 200) {
    const map = createTable(minX, minY, maxX, maxY)
    let origin = [0 - minX, 0 - minY]
    for (let i = 0; i < lights.length; i++) {
      let [x, y] = lights[i].current_point
      map[origin[1] + y][origin[0] + x] = "#"
    }

    console.table(map)
  }
}

function createTable(minX, minY, maxX, maxY) {
  let width = maxX - minX + 1
  let height = maxY - minY + 1
  const table = []
  for (let i = 0; i < height; i++) {
    table.push([])
    for (let j = 0; j < width; j++) {
      table[i].push(".")
    }
  }
  return table
}

function findTableDimensions(lights) {
  let [minX, minY, maxX, maxY] = [0, 0, 0, 0]
  for (let i = 0; i < lights.length; i++) {
    let [x, y] = lights[i].current_point
    if (x < minX) {
      minX = x
    }
    if (x > maxX) {
      maxX = x
    }
    if (y < minY) {
      minY = y
    }
    if (y > maxY) {
      maxY = y
    }
  }
  return [minX, minY, maxX, maxY]
}

function moveAllLights() {
  //iterate over every light
  for (let i = 0; i < lights.length; i++) {
    let currentLight = lights[i]
    let newPosition = moveOneLight(currentLight)
    lights[i].current_point = newPosition
  }
}

function moveOneLight(lightObj) {
  let { current_point, velocity } = lightObj
  let updated_point = [
    current_point[0] + velocity[0],
    current_point[1] + velocity[1],
  ]
  return updated_point
}
