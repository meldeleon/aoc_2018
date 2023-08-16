const input = require("fs")
  .readFileSync("day07_input.txt")
  .toString()
  .split("\r\n")

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]

const steps = buildSteps(input)
let executables = findExecutableSteps(steps)
const solution = []

while (Object.keys(steps).length > 0) {
  let executables = findExecutableSteps(steps)
  updateGraphWithExecutables(steps, executables)
}
console.log(solution.join(""))

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

function findExecutableSteps(steps) {
  let executableSteps = []
  for (const step in steps) {
    if (steps[step].dependencies.length === 0) {
      executableSteps.push(step)
    }
  }
  return executableSteps.sort()
}

function updateGraphWithExecutables(steps, executableSteps) {
  for (let i = 0; i < executables.length; i++) {
    let executable = executableSteps[i]
    solution.push(executable)
    delete steps[executable]
    for (const step in steps) {
      let indexToBeRemoved = steps[step].dependencies.indexOf(executable)
      if (indexToBeRemoved >= 0) {
        steps[step].dependencies.splice(indexToBeRemoved, 1)
      }
    }
    break
  }
}
