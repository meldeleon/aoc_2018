const input = require("fs")
  .readFileSync("day04_input.txt")
  .toString()
  .split(/\r\n/)
  .sort()

const notes = new Object()
parseNotes(input)
let sleepiestGuard = returnSleepiestGuard(notes)
let guardMinutes = countGuardMinutes(sleepiestGuard)
console.log(
  `the guard who slept the most was ${sleepiestGuard}, he is most likely to be asleep at ${guardMinutes} the answer is ${
    parseInt(sleepiestGuard.replace("#", "")) * guardMinutes
  }`
)

function parseNotes(input) {
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
      note.guard = currentInput.substring(19).split(" ")[1]
      //console.log(note)
      notes[date] = note
    }
    if (notes[date] && firstChar != "G") {
      updateMinutes(firstChar, time, date)
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

function updateMinutes(action, time, date) {
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

function countGuardMinutes(guardNo) {
  //find all the days where a guard is on duty
  let filteredNotes = Object.entries(notes).filter(
    (note) => note[1].guard === guardNo
  )
  //create an object to count each minute
  let countedMinutesObj = {}
  for (let m = 0; m < 60; m++) {
    countedMinutesObj[m] = 0
  }
  //increment count each time that the guard
  for (let n = 0; n < filteredNotes.length; n++) {
    let minutesArr = filteredNotes[n][1].minutes
    //console.log(minutesArr)
    for (let o = 0; o < minutesArr.length; o++) {
      if (minutesArr[o] === "#") {
        countedMinutesObj[o]++
      }
    }
  }
  return findMaxInObj(countedMinutesObj)
}

function returnSleepiestGuard(notes) {
  //iterate over notes checking for guard, and building an object populated with each guard
  let notesArr = Object.entries(notes)
  let guardMinutes = {}
  for (let p = 0; p < notesArr.length; p++) {
    let currentGuard = notesArr[p][1].guard
    //console.log(currentGuard)
    if (!guardMinutes[currentGuard]) {
      guardMinutes[currentGuard] = 0
    }
    //start counting minutes asleep for this note
    let minutesAsleep = 0
    for (let q = 0; q < notesArr[p][1].minutes.length; q++) {
      if (notesArr[p][1].minutes[q] === "#") {
        minutesAsleep++
      }
    }
    //add minutes asleep to total guard count
    guardMinutes[currentGuard] += minutesAsleep
  }
  return findMaxInObj(guardMinutes)
}

function findMaxInObj(obj) {
  let objArr = Object.entries(obj)
  //console.log(objArr)
  let max = 0
  let maxId
  for (let r = 0; r < objArr.length; r++) {
    if (objArr[r][1] >= max) {
      max = objArr[r][1]
      maxId = objArr[r][0]
    }
  }
  return maxId
}
