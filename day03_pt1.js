const input = require("fs")
  .readFileSync("day03_input.txt")
  .toString()
  .split(/\r\n/)
function drawRectangles(input) {
  //list out all coords of drawn rectangles
  let coords = new Object()
  for (let i = 0; i < input.length; i++) {
    let splitArr = input[i].split(" ")
    let x = parseInt(splitArr[2].replace(":", "").split(",")[0])
    let y = parseInt(splitArr[2].replace(":", "").split(",")[1])
    let width = parseInt(splitArr[3].split("x")[0])
    let height = parseInt(splitArr[3].split("x")[1])
    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        let currentCoords = `${i},${j}`
        //if coord has been drawn, increment count
        if (coords.hasOwnProperty(currentCoords)) {
          coords[currentCoords].count++
        }
        //if coord has not been drawn add to list
        else {
          coords[currentCoords] = { count: 1 }
        }
      }
    }
  }
  return coords
}

function countOverlap(coords) {
  let count = 0
  Object.keys(coords).forEach((coord) => {
    if (coords[coord].count > 1) {
      count++
    }
  })
  return count
}
let coords = drawRectangles(input)
console.log(countOverlap(coords))
