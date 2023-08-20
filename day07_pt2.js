const input = require("fs")
  .readFileSync("day07_input.txt")
  .toString()
  .split("\r\n")
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

//global constants, decided by puzlle parameters
const workerCount = 5
const baseSeconds = 60
const queue = buildQueue(input)
const working = {}

//initial states
let currentWorkers = workerCount
let secondsElasped = 0
assignWorker(queue)
console.log({ secondsElasped })
console.table({ working })

//empty queue
while (Object.keys(queue).length > 0) {
  //assign workers
  assignWorker(queue)
  //decrement secondsLeft until workers finish
  for (worker in working) {
    if (working[worker].secondsLeft >= 2) {
      working[worker].secondsLeft--
    } else {
      //if worker complete, remove from queue, from working and assign a new worker
      completeStep(worker)
      assignWorker(queue)
    }
  }
  //increment total seconds elapsed
  secondsElasped++
}
console.log(`the solution is ${secondsElasped}`)

function completeStep(step) {
  delete working[step]
  delete queue[step]
  for (const queueItem in queue) {
    let indexToBeRemoved = queue[queueItem].dependencies.indexOf(step)
    if (indexToBeRemoved >= 0) {
      queue[queueItem].dependencies.splice(indexToBeRemoved, 1)
    }
  }
  currentWorkers++
}

function assignWorker(queue) {
  let executableSteps = findExecutableSteps(queue)
  for (let i = 0; i < executableSteps.length; i++) {
    if (currentWorkers > 0 && !working[executableSteps[i]]) {
      working[executableSteps[i]] = {
        secondsLeft: queue[executableSteps[i]].duration,
      }
      currentWorkers--
    }
  }
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

function buildQueue(input) {
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
        duration: baseSeconds + alphabet.indexOf(step) + 1,
      }
    }
    if (!steps[dependency]) {
      steps[dependency] = {
        dependencies: [],
        duration: baseSeconds + alphabet.indexOf(dependency) + 1,
      }
    }
  }
  return steps
}
