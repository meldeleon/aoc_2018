const fs = require("fs")

function findGuardMostAsleep(records) {
  const sortedRecords = records.sort((a, b) => {
    const timestampA = a.timestamp
    const timestampB = b.timestamp
    return timestampA.localeCompare(timestampB)
  })

  const guards = new Map()
  let currentGuardID
  let sleepStartMinute

  for (const record of sortedRecords) {
    //chat gpt sucks at destructuring:
    //const [timestamp, action] = record.split("] ")
    const { timestamp, action } = record
    if (action.includes("Guard")) {
      currentGuardID = getGuardID(action)
      if (!guards.has(currentGuardID)) {
        guards.set(currentGuardID, Array(60).fill(0))
      }
    } else if (action === "falls asleep") {
      sleepStartMinute = getMinute(timestamp)
    } else if (action === "wakes up") {
      const sleepEndMinute = getMinute(timestamp)
      const guardMinutes = guards.get(currentGuardID)
      for (let i = sleepStartMinute; i < sleepEndMinute; i++) {
        guardMinutes[i]++
      }
    }
  }

  let maxTotalSleep = 0
  let chosenGuardID
  let mostFrequentMinute

  for (const [guardID, guardMinutes] of guards) {
    const totalSleep = guardMinutes.reduce((sum, minutes) => sum + minutes, 0)
    if (totalSleep > maxTotalSleep) {
      maxTotalSleep = totalSleep
      chosenGuardID = guardID
      mostFrequentMinute = guardMinutes.indexOf(Math.max(...guardMinutes))
    }
  }

  return chosenGuardID * mostFrequentMinute
}

function getGuardID(action) {
  return parseInt(action.split(" ")[1].substring(1))
}

function getMinute(timestamp) {
  return parseInt(timestamp.split(":")[1])
}

// Read input file
fs.readFile("day04_input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const regex = /\[(.*)\] (.*)/
  const records = data.trim().split("\n")
  const parsedRecords = records.map((record) => {
    const matches = record.match(regex)
    const timestamp = matches[1]
    const action = matches[2]
    return { timestamp, action }
  })

  const result = findGuardMostAsleep(parsedRecords)
  console.log("Result:", result)
})
