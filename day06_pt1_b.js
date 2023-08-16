//alphabet to delineate marked coordinates,since we have 50 coords, we use double letters to wrap around alphabet
const alphabet =
  "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,BB,CC,DD,EE,FF,GG,HH,II,JJ,KK,LL,MM,NN,OO,PP,QQ,RR,SS,TT,UU,VV,WW,XX,YY,ZZ".split(
    ","
  )

//parse input into array of coords
const input = require("fs")
  .readFileSync("day06_input.txt")
  .toString()
  .split("\r\n")

const coords = input.map((coord, i) => {
  let [x, y] = coord.split(", ")
  let letter = alphabet[i]
  x = parseInt(x)
  y = parseInt(y)
  return { x, y, letter }
})

const [gridYMax, gridXMax] = findYandXMax(coords)

let grid = createGrid(coords)
markGrid(coords, grid)
markGridWithNearestCoordinates(coords, grid)
console.log(findSolution(grid))

function findSolution(grid) {
  let letterCount = []
  for (let y = 0; y <= gridYMax; y++) {
    for (let x = 0; x <= gridXMax; x++) {
      let gridValue = grid[y][x].toUpperCase()
      if (letterCount[gridValue]) {
        letterCount[gridValue].count++
      } else {
        letterCount[gridValue] = { count: 1, edge: false, gridValue }
      }
      if (x === 0 || y === 0 || x === gridXMax || y === gridYMax) {
        letterCount[gridValue].edge = true
      }
    }
  }
  //console.log(letterCount)
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
  return `the largest finite area is ${max.count}`
}

//function to return manhattan distance
function findManhattanDistance(x1, y1, x2, y2) {
  return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

//function to determine the largest x and y values
function findYandXMax(coords) {
  let xMax = 0
  let yMax = 0
  for (const coord of coords) {
    let { x, y } = coord
    if (x > xMax) {
      xMax = parseInt(x)
    } else if (y > yMax) {
      yMax = parseInt(y)
    }
  }
  return [yMax, xMax]
}

//function that creates a grid based on X/Y Maximums
function createGrid(coords) {
  let [yMax, xMax] = findYandXMax(coords)
  let grid = new Array(yMax + 1)
  for (let i = 0; i < grid.length; i++) {
    let xArr = new Array(xMax + 1).fill(".")
    grid[i] = xArr
  }
  return markGrid(coords, grid)
}

//function to mark the known coordinates as capital letters in our grid.
function markGrid(coords, grid) {
  for (i = 0; i < coords.length; i++) {
    let { x, y, letter } = coords[i]
    grid[y][x] = letter
  }
  return grid
}

//function to mark our grid with the closes marked coords.
function markGridWithNearestCoordinates(coords, grid) {
  for (let b = 0; b <= gridYMax; b++) {
    for (let a = 0; a <= gridXMax; a++) {
      if (grid[b][a] === ".") {
        // set a minimum distance
        let minimum = 0
        // create a map of distance to all marked coords.
        let distanceMap = coords.map((coord) => {
          let { x, y, letter } = coord

          let distance = findManhattanDistance(a, b, x, y)
          if (minimum === 0 || distance <= minimum) {
            minimum = distance
          }
          return { distance, letter }
        })
        //find the closests marked coords, store in array
        let closest = []
        for (let c = 0; c < distanceMap.length; c++) {
          let { distance, letter } = distanceMap[c]
          if (distance === minimum) {
            closest.push(distanceMap[c])
          }
          //if there are no ties, change the mark to the closest marked coord
        }
        if (closest.length === 1) {
          grid[b][a] = closest[0].letter.toLowerCase()
        }
      }
    }
  }
  return grid
}
