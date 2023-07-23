const input = require("fs")
  .readFileSync("day04_input.txt")
  .toString()
  .split(/\r\n/)
  .sort()

console.log(`the answer is ${main()}`)

function main() {
  const notes = new Object()
  const guards = new Set()
  parseNotes(input, notes, guards)
  let guardMinArr = [...guards].map((guardNo) => {
    return { [guardNo]: returnGuardMinObject(guardNo, notes) }
  })
  // console.log(guardMinArr)
  let maxMinute = {
    guard: "",
    minute: 0,
    max: 0,
  }
  for (let h = 0; h < guardMinArr.length; h++) {
    let currentGuard = Object.keys(guardMinArr[h])[0]
    Object.entries(guardMinArr[h][currentGuard]).forEach((minute) => {
      if (minute[1] > maxMinute.max) {
        maxMinute.minute = minute[0]
        maxMinute.guard = currentGuard
        maxMinute.max = minute[1]
      }
    })
  }
  return parseInt(maxMinute.guard.replace("#", "")) * maxMinute.minute
}

function parseNotes(input, notes, guards) {
  for (let i = 0; i < input.length; i++) {
    let currentInput = input[i]
    let date = parseInt(currentInput.substring(6, 11).replace("-", ""))
    let firstChar = currentInput.substring(19, 20)
    let time = parseInt(currentInput.substring(15, 17))
    let hour = currentInput.substring(12, 14)
    // console.log({ date, firstChar, time, hour })
    if (firstChar === "G") {
      //if the guard starts working before midnight, increment the date
      if (hour === "23") {
        //console.log(`date was incremented`)
        date++
      }
      let note = returnDefaultObject(date)
      guards.add(currentInput.substring(19).split(" ")[1])
      note.guard = currentInput.substring(19).split(" ")[1]
      //console.log(note)
      notes[date] = note
    }
    if (notes[date] && firstChar != "G") {
      updateMinutes(firstChar, time, date, notes)
    }
  }
}

function returnDefaultObject(date) {
  let note = {}
  note.minutes = []
  for (let j = 0; j < 60; j++) {
    note.minutes[j] = "."
  }
  return note
}

function updateMinutes(action, time, date, notes) {
  if (action === "f") {
    for (let k = time; k < notes[date].minutes.length; k++) {
      notes[date].minutes[k] = "#"
    }
  } else if (action === "w") {
    for (let l = time; l < 60; l++) {
      notes[date].minutes[l] = "."
    }
  } else {
    console.log("action is invalid")
  }
}

function returnGuardMinObject(currentGuard, notes) {
  //iterate over notes, and filter for minute log arrays([".", "#", "3"...] for the guard we are looking at.
  let notesArr = Object.entries(notes)
  let currentGuardMinuteArr = notesArr
    .filter((note) => note[1].guard === currentGuard)
    .map((note) => {
      return note[1].minutes
    })
  // create object to count the number of times per minute that a guard is asleep
  let guardMinuteCount = {}
  for (let m = 0; m < 60; m++) {
    guardMinuteCount[m] = 0
  }
  for (let n = 0; n < currentGuardMinuteArr.length; n++) {
    let currentMin = currentGuardMinuteArr[n]
    for (let o = 0; o < currentMin.length; o++) {
      if (currentMin[o] === "#") {
        guardMinuteCount[o]++
      }
    }
  }
  return guardMinuteCount
}
