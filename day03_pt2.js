const input = require("fs")
  .readFileSync("day03_input.txt")
  .toString()
  .split(/\r\n/)

const rectangles = []
function drawRectangles(input) {
  //list out all coords of drawn rectangles
  let coords = new Object()
  for (let i = 0; i < input.length; i++) {
    let splitArr = input[i].split(" ")
    let x = parseInt(splitArr[2].replace(":", "").split(",")[0])
    let y = parseInt(splitArr[2].replace(":", "").split(",")[1])
    let width = parseInt(splitArr[3].split("x")[0])
    let height = parseInt(splitArr[3].split("x")[1])
    rectangles.push({
      id: i + 1,
      x: x,
      y: y,
      width: width,
      height: height,
    })
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

//drawRectangles(input)
//console.log(rectangles)

function findNonOverlappedRectangle(rectangles, coords) {
  let answer
  for (let i = 0; i < rectangles.length; i++) {
    if (checkRectangle(rectangles[i], coords)) {
      answer = rectangles[i]
    }
  }
  return answer
}

function checkRectangle(rect, coords) {
  let rectCoords = []
  let drawnOnce = true
  let { x, y, width, height } = rect
  for (let i = x; i < x + width; i++) {
    for (let j = y; j < y + height; j++) {
      rectCoords.push(`${i},${j}`)
    }
  }
  //console.log({ rectCoords })
  for (let k = 0; k < rectCoords.length; k++) {
    if (coords[rectCoords[k]].count === 1) {
      //console.log(`${rectCoords[k]} has only been drawn once`)
    } else {
      //console.log(`${rectCoords[k]} has been drawn multiple times`)
      drawnOnce = false
    }
  }
  return drawnOnce
}

let coords = drawRectangles(input)
// /console.log({ rectangles, coords })
console.log(findNonOverlappedRectangle(rectangles, coords))
