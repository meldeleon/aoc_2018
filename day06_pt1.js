//alphabet to delineate marked coordinates,since we have 50 coords, we use double letters to wrap around alphabet
const alphabet =
  "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,BB,CC,DD,EE,FF,GG,HH,II,JJ,KK,LL,MM,NN,OO,PP,QQ,RR,SS,TT,UU,VV,WW,XX,YY,ZZ".split(
    ","
  )

//NB: INPUT IS [X, Y], BUT OUR GRID[Y][X]
//parse input into array of coords
const input = require("fs")
  .readFileSync("day06_input.txt")
  .toString()
  .split("\r\n")

const coords = input.map((coord) => {
  return ([x, y] = coord.split(", "))
})

//create a grid, with coords marked as letters.
const grid = createGrid(coords)
//console.table(grid)
const [gridYMax, gridXMax] = findYandXMax(coords)
//console.log({ gridXMax, gridYMax })
markGridWithNearestCoord(grid)
//console.log(grid)

console.log(findSolution(grid))

function findSolution(grid) {
  let letterCount = {}
  for (let y = 0; y <= gridYMax; y++) {
    for (let x = 0; x <= gridXMax; x++) {
      let gridValue = grid[y][x].toUpperCase()
      if (letterCount[gridValue]) {
        letterCount[gridValue].count++
      } else {
        letterCount[gridValue] = { count: 1, edge: false }
      }
      if (x === 0 || y === 0 || x === gridXMax || y === gridYMax) {
        letterCount[gridValue].edge = true
      }
    }
  }
  console.log(letterCount)
  let max = {
    letter: ".",
    count: 0,
  }
  for (currentLetter in letterCount) {
    //console.log(currentLetter)
    if (
      letterCount[currentLetter].edge === false &&
      letterCount[currentLetter].count > max.count
    ) {
      max.count = letterCount[currentLetter].count
      max.letter = letterCount[currentLetter].letter
    }
  }
  return max
}

//function to create our grid data structure
function createGrid(coords) {
  let [yMax, xMax] = findYandXMax(coords)
  let grid = new Array(yMax + 1)
  for (let i = 0; i < grid.length; i++) {
    let xArr = new Array(xMax + 1).fill(".")
    grid[i] = xArr
  }
  return markGrid(coords, grid)
}

//function to determine the largest x and y values
function findYandXMax(coords) {
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
  return [yMax, xMax]
}

//function to mark the known coordinates as capital letters in our grid.
function markGrid(coords, grid) {
  for (i = 0; i < coords.length; i++) {
    let [x, y] = coords[i]
    grid[y][x] = `${alphabet[i]}`
  }
  return grid
}

// function to iterate over every cell in the grid and marking it with nearest coords.
function markGridWithNearestCoord(grid) {
  //iterate over the grid
  for (let y = 0; y <= gridYMax; y++) {
    for (let x = 0; x <= gridXMax; x++) {
      //console.log(`checking the coordinate ${x},${y}`)
      let notMarked = true
      let layer = 1
      while (notMarked) {
        //console.log(`checking layer ${layer}`)
        let layerCoords = returnLayerCoords(x, y, layer)
        //console.log({ layerCoords })
        let detectedCoord = returnClosestMarkedCoord(x, y, layerCoords, grid)
        if (detectedCoord) {
          grid[y][x] = detectedCoord
          notMarked = false
          break
        }
        if (
          !checkIfLayerCoordsAreWithinBoundaries(
            layerCoords,
            gridXMax,
            gridYMax
          )
        ) {
          notMarked = false
          break
        }
        console.log({ layer })
        layer++
      }
    }
  }
  return grid
}

function returnLayerCoords(x, y, layer) {
  let layerCoords = []
  for (let a = y - layer; a <= y + layer; a++) {
    for (let b = x - layer; b <= x + layer; b++) {
      if (
        checkIfWithinBoundaries(b, a, gridXMax, gridYMax) &&
        returnLayerNumber(x, y, b, a) === layer
      ) {
        layerCoords.push([b, a])
      } else {
      }
    }
  }
  return layerCoords
}

function checkIfWithinBoundaries(x, y, xMax, yMax) {
  return 0 <= x && x <= xMax && 0 <= y && y <= yMax
}

function returnLayerNumber(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

function checkIfLayerCoordsAreWithinBoundaries(layerCoords, xMax, yMax) {
  let falseCount = 0
  for (let i = 0; i < layerCoords.length; i++) {
    let [x, y] = layerCoords[i]
    if (checkIfWithinBoundaries(x, y, xMax, yMax)) {
    } else {
      falseCount++
    }
  }
  if (falseCount === layerCoords.length) {
    return false
  }
  return true
}

function returnClosestMarkedCoord(x, y, layerCoords, grid) {
  //we are checking the coord x, y
  // take all the coordinate of a specific layer, and check it for a marking
  let markedCoords = []
  if (grid[y][x] !== ".") {
    return false
    //do nothing if it is already marked
  } else {
    for (let i = 0; i < layerCoords.length; i++) {
      let [layerCoordX, layerCoordY] = layerCoords[i]
      //check what is in the grid at these coords

      let gridSpot = grid[layerCoordY][layerCoordX]
      //console.log({ layerCoordX, layerCoordY, gridSpot })
      //if the spot in the layer, is not a ., but an uppercase marked coord, push into solution array
      if (gridSpot !== "." && gridSpot === gridSpot.toUpperCase()) {
        markedCoords.push(gridSpot)
      }
    }
    //console.log({ markedCoords })
    if (markedCoords.length === 1) {
      return markedCoords[0].toLowerCase()
    } else if (markedCoords.length > 1) {
      return "."
    }
    return false
  }
}
