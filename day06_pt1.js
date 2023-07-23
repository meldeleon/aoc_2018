const alphabet =
  "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,BB,CC,DD,EE,FF,GG,HH,II,JJ,KK,LL,MM,NN,OO,PP,QQ,RR,SS,TT,UU,VV,WW,XX,YY,ZZ".split(
    ","
  )

const input = require("fs")
  .readFileSync("day06_input.txt")
  .toString()
  .split("\r\n")

const coords = input.map((coord) => {
  return ([x, y] = coord.split(", "))
})

const grid = createGrid(coords)
const [gridXMax, gridYMax] = findXandYMax(coords)

console.table(markGridWithNearestCoord(grid))
function markGridWithNearestCoord(grid) {
  for (let x = 0; x <= gridXMax; x++) {
    for (let y = 0; y <= gridYMax; y++) {
      let notMarked = true
      let layer = 1
      while (notMarked) {
        let layerCoords = returnLayerCoords(x, y, layer)
        let detectedCoord = returnClosestMarkedCoord(layerCoords, grid)
        if (detectedCoord) {
          grid[x][y] = detectedCoord
          notMarked = false
        }
        console.log({ layer })
        layer++
      }
    }
  }
  return grid
}

//function to create our grid data structure
function createGrid(coords) {
  let [xMax, yMax] = findXandYMax(coords)
  let grid = new Array(xMax)
  for (let i = 0; i <= xMax; i++) {
    let yArr = new Array(yMax + 1).fill(".")
    grid[i] = yArr
  }
  return markGrid(coords, grid)
}

function markGrid(coords, grid) {
  for (i = 0; i < coords.length; i++) {
    let [x, y] = coords[i]
    grid[x][y] = `${alphabet[i]}`
  }
  return grid
}

function findXandYMax(coords) {
  let xMax = 0
  let yMax = 0
  for (const coord of coords) {
    let [x, y] = coord
    if (x > xMax) {
      xMax = parseInt(x)
    } else if (y > yMax) {
      yMax = parseInt(y)
    }
  }
  //console.log({ xMax }, { yMax })
  return [xMax, yMax]
}

function checkIfWithinBoundaries(x, y, xMax, yMax) {
  return 0 <= x && x <= xMax && 0 <= y && y <= yMax
}

function returnLayerNumber(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

function returnLayerCoords(x, y, layer) {
  let layerCoords = new Set()
  for (let a = x - layer; a <= x + layer; a++) {
    for (let b = y - layer; b <= y + layer; b++) {
      if (
        checkIfWithinBoundaries(a, b, gridXMax, gridYMax) &&
        returnLayerNumber(x, y, a, b) === layer
      ) {
        layerCoords.add([a, b])
      }
    }
  }
  return layerCoords
}

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
    return markedCoords[0].toLowerCase()
  } else if (markedCoords.length > 1) {
    return "."
  }
  return false
}
