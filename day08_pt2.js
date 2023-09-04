let input = require("fs").readFileSync("day08_input.txt").toString().split(" ")

input = input.map((x) => parseInt(x))
// global index counter for input
let index = 0

// node class
class Node {
  constructor(children, values) {
    this.numberofChildren = 0
    this.children = []
    this.numberOfValues = 0
    this.values = []
  }
}

let tree = new Node()
let solutionArr = []
branch(tree)

let solution = calculateNodeValue(tree)

console.log(`the solution is ${solution}.`)

function calculateNodeValue(cNode) {
  let { children, values } = cNode
  // if the node has children
  if (children.length > 0) {
    //metadata entries become index, iterate and check if exists
    let valuesArr = []
    for (index of values) {
      let referenceChild = children[parseInt(index - 1)]
      if (referenceChild) {
        valuesArr.push(calculateNodeValue(referenceChild))
      } else {
        valuesArr.push(0)
      }
    }
    return sumArr(valuesArr)
  } else {
    return sumArr(values)
  }
}

function sumArr(arr) {
  return arr.reduce((partial, a) => partial + a, 0)
}

//recursive function to build the branch of a tree
function branch(cNode) {
  //read header and define parameters of the Node.
  cNode.numberofChildren = input[index]
  cNode.numberOfValues = input[index + 1]
  //increment global index
  index += 2
  //create children in node
  for (let i = 0; i < cNode.numberofChildren; i++) {
    cNode.children.push(new Node())
  }
  //recurse on grandchild
  for (grandchild of cNode.children) {
    branch(grandchild)
  }
  //once we have resolved the many children, push cvalues
  for (let i = 0; i < cNode.numberOfValues; i++) {
    cNode.values.push(input[index])
    solutionArr.push(input[index])
    index++
  }
}
