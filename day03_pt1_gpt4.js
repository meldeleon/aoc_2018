function calculateOverlap(claims) {
  // Create a 2D array to represent the fabric
  const fabric = []
  const size = 1000
  let overlapCount = 0

  for (let i = 0; i < size; i++) {
    fabric[i] = new Array(size).fill(0)
  }

  // Process each claim
  for (const claim of claims) {
    const { id, left, top, width, height } = parseClaim(claim)

    // Mark the fabric with the claim ID
    for (let y = top; y < top + height; y++) {
      for (let x = left; x < left + width; x++) {
        if (fabric[y][x] === 0) {
          fabric[y][x] = id
        } else if (fabric[y][x] !== "X") {
          // Overlap found
          overlapCount++
          fabric[y][x] = "X"
        }
      }
    }
  }

  return overlapCount
}

// Helper function to parse claim string into object properties
function parseClaim(claim) {
  const [id, position, dimension] = claim.split(" ")
  const [left, top] = position.slice(0, -1).split(",").map(Number)
  const [width, height] = dimension.split("x").map(Number)
  return { id: Number(id.slice(1)), left, top, width, height }
}

// Example claims
const claims = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"]

const overlap = calculateOverlap(claims)
console.log(`Number of square inches within two or more claims: ${overlap}`)
