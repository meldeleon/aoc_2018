const fs = require("fs")

fs.readFile("day07_input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const steps = data
    .trim()
    .split("\n")
    .map((line) => {
      const match = line.match(
        /Step (\w) must be finished before step (\w) can begin\./
      )
      return { prerequisite: match[1], step: match[2] }
    })

  const prerequisites = {}
  const stepsSet = new Set()

  // Create a map of prerequisites for each step
  steps.forEach(({ prerequisite, step }) => {
    if (!prerequisites[step]) {
      prerequisites[step] = []
    }
    prerequisites[step].push(prerequisite)
    stepsSet.add(prerequisite)
    stepsSet.add(step)
  })

  const numWorkers = 5 // Number of workers
  const baseTime = 60 // Base time for each step
  const workers = Array.from({ length: numWorkers }, () => ({
    step: "",
    time: 0,
  }))
  let availableSteps = [...stepsSet].filter((step) => !prerequisites[step])
  let time = 0

  while (
    availableSteps.length > 0 ||
    workers.some((worker) => worker.step !== "")
  ) {
    availableSteps.sort()
    console.log(workers)
    for (let i = 0; i < numWorkers; i++) {
      if (workers[i].step === "" && availableSteps.length > 0) {
        workers[i].step = availableSteps.shift()
        workers[i].time = baseTime + workers[i].step.charCodeAt(0) - 65 // A's ASCII code is 65
      }
    }

    const minTime = Math.min(
      ...workers
        .filter((worker) => worker.step !== "")
        .map((worker) => worker.time)
    )
    time += minTime

    for (let i = 0; i < numWorkers; i++) {
      if (workers[i].step !== "") {
        workers[i].time -= minTime
        if (workers[i].time === 0) {
          steps.forEach(({ prerequisite, step }) => {
            if (prerequisites[step]) {
              prerequisites[step] = prerequisites[step].filter(
                (p) => p !== workers[i].step
              )
              if (prerequisites[step].length === 0) {
                delete prerequisites[step]
                availableSteps.push(step)
              }
            }
          })
          workers[i].step = ""
        }
      }
    }
  }

  console.log("Time taken:", time)
})
