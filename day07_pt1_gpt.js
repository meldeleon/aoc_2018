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
  console.log(steps)
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

  const availableSteps = [...stepsSet].filter((step) => !prerequisites[step])
  let order = ""

  while (availableSteps.length > 0) {
    availableSteps.sort()
    const nextStep = availableSteps.shift()
    order += nextStep

    steps.forEach(({ prerequisite, step }) => {
      if (prerequisites[step]) {
        prerequisites[step] = prerequisites[step].filter((p) => p !== nextStep)
        if (prerequisites[step].length === 0) {
          delete prerequisites[step]
          availableSteps.push(step)
        }
      }
    })
  }

  console.log("Order of steps:", order)
})
