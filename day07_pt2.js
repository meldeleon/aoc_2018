const input = require("fs")
  .readFileSync("day07_input.txt")
  .toString()
  .split("\r\n")

const worker1Stack = []
const worker2Stack = []

const steps = buildSteps(input)

function findExecutableSteps(steps) {
  let executableSteps = []
  for (const step in steps) {
    if (steps[step].dependencies.length === 0) {
      executableSteps.push(step)
    }
  }
  return executableSteps.sort()
}

function buildSteps(input) {
  let steps = {}
  let instructionLines = input.map((line) => {
    let lineArr = line.split(" ")
    return [lineArr[7], lineArr[1]]
  })
  for (let i = 0; i < instructionLines.length; i++) {
    let [step, dependency] = instructionLines[i]
    if (steps[step]) {
      steps[step].dependencies.push(dependency)
    } else {
      steps[step] = {
        dependencies: [dependency],
      }
    }
    if (!steps[dependency]) {
      steps[dependency] = {
        dependencies: [],
      }
    }
  }
  return steps
}
