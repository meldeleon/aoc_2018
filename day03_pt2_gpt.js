function parseClaim(claim) {
  // to fix this code add a throwaway variable in index 1 of the destructured assignment below.
  // i.e. const [idPart, at, positionPart, sizePart] = claim.split(" ")
  const [idPart, at, positionPart, sizePart] = claim.split(" ")
  //console.log({ idPart, positionPart, sizePart })
  const id = parseInt(idPart.substring(1))
  const [left, top] = positionPart
    .substring(0, positionPart.length - 1)
    .split(",")
    .map(Number)
  const [width, height] = sizePart.split("x").map(Number)
  return { id, left, top, width, height }
}

function findNonOverlappingClaim(claims) {
  const fabric = new Map()
  const overlappingClaims = new Set()

  for (const claim of claims) {
    const { id, left, top, width, height } = parseClaim(claim)
    for (let i = left; i < left + width; i++) {
      for (let j = top; j < top + height; j++) {
        const position = `${i},${j}`
        if (!fabric.has(position)) {
          fabric.set(position, id)
        } else {
          const existingClaimID = fabric.get(position)
          overlappingClaims.add(existingClaimID)
          overlappingClaims.add(id)
        }
      }
    }
  }

  for (const claim of claims) {
    const { id } = parseClaim(claim)
    if (!overlappingClaims.has(id)) {
      return id
    }
  }

  return null // No non-overlapping claim found
}

// Example usage:
const claims = require("fs")
  .readFileSync("day03_input.txt")
  .toString()
  .split(/\r\n/)
const nonOverlappingClaimID = findNonOverlappingClaim(claims)
console.log("Non-overlapping Claim ID:", nonOverlappingClaimID)
