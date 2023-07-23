const butts = [
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", "A", ".", ".", ".", ".", "B", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", "D", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", "E", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "C", ".", ".", ".", ".", ".", "F"],
]

let gridXMax = 20
let gridYMax = 20

function checkIfWithinBoundaries(x, y, xMax, yMax) {
  return 0 <= x && x <= xMax && 0 <= y && y <= yMax
}

function returnLayerNumber(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

function returnLayerCoords(x, y, layer) {
  console.log({ x, y, layer })
  let layerCoords = []
  for (let a = x - layer; a <= x + layer; a++) {
    for (let b = y - layer; b <= y + layer; b++) {
      if (
        checkIfWithinBoundaries(a, b, gridXMax, gridYMax) &&
        returnLayerNumber(x, y, a, b) === layer
      ) {
        layerCoords.push([a, b])
      }
    }
  }
  return layerCoords
}

const layer2Coords = returnLayerCoords(5, 0, 2)
console.log(layer2Coords)
console.log(returnClosestMarkedCoord(layer2Coords, butts))

function returnClosestMarkedCoord(layerCoords, grid) {
  let markedCoords = []
  layerCoords.forEach((coord) => {
    let [currentCoordX, currentCoordY] = coord
    let gridSpot = grid[currentCoordX][currentCoordY]
    if (gridSpot !== "." && gridSpot === gridSpot.toUpperCase()) {
      markedCoords.push(gridSpot)
    }
  })
  if (markedCoords.length === 1) {
    return markedCoords[0]
  } else if (markedCoords.length > 1) {
    return "."
  }
  return false
}
