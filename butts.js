const butts = [
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", "A", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "C"],
  [".", ".", ".", "D", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", "E", ".", ".", "."],
  [".", "B", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "F"],
]

let gridXMax = 8
let gridYMax = 9

function checkIfWithinBoundaries(x, y, xMax, yMax) {
  return 0 <= x && x <= xMax && 0 <= y && y <= yMax
}

function returnLayerNumber(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

console.log(returnLayerNumber(2, 0, 1, 0))
//we are expecting a return of [[1,0] [2,1] [3,0]]
function returnLayerCoords(x, y, layer) {
  let layerCoords = []
  for (let a = y - layer; a <= y + layer; a++) {
    for (let b = x - layer; b <= x + layer; b++) {
      console.log(`checking ${b}, ${a}`)
      if (
        checkIfWithinBoundaries(a, b, gridXMax, gridYMax) &&
        returnLayerNumber(x, y, b, a) === layer
      ) {
        layerCoords.push([b, a])
      } else {
      }
    }
  }
  return layerCoords
}

const layer2Coords = returnLayerCoords(2, 0, 1)
console.log(layer2Coords)
console.log(returnClosestMarkedCoord(layer2Coords, butts))

//checks a layer for a marked gridspot, and then return the marked grid spot for a specific point.

function returnClosestMarkedCoord(layerCoords, grid) {
  //we are checking the coord x, y
  // take all the coordinate of a specific layer, and check it for a marking
  let markedCoords = []
  for (let i = 0; i < layerCoords.length; i++) {
    let [layerCoordX, layerCoordY] = layerCoords[i]
    //check what is in the grid at these coords

    let gridSpot = grid[layerCoordX][layerCoordY]
    console.log({ layerCoordX, layerCoordY, gridSpot })
    //if the spot in the layer, is not a ., but an uppercase marked coord, push into solution array
    if (gridSpot !== "." && gridSpot === gridSpot.toUpperCase()) {
      markedCoords.push(gridSpot)
    }
  }
  console.log({ markedCoords })
  if (markedCoords.length === 1) {
    return markedCoords[0]
  } else if (markedCoords.length > 1) {
    return "."
  }
  return false
}
