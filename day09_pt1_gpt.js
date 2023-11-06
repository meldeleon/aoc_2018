class CircularList {
  constructor() {
    this.marbles = [0]
    this.current = 0
  }

  add(marble) {
    // find the index where to insert
    const newIndex = (this.current + 2) % this.marbles.length
    // [0, 1, 2, 3, 4]

    if (newIndex === 0) {
      this.marbles.push(marble)
      this.current = this.marbles.length - 1
    } else {
      this.marbles.splice(newIndex, 0, marble)
      this.current = newIndex
    }
  }

  remove() {
    const removeIndex =
      (this.current - 7 + this.marbles.length) % this.marbles.length
    const removedMarble = this.marbles.splice(removeIndex, 1)
    this.current = removeIndex
    return removedMarble
  }
}

function playMarbleGame(players, lastMarble) {
  const scores = Array(players).fill(0)
  const circle = new CircularList()

  for (let marble = 1; marble <= lastMarble; marble++) {
    if (marble % 23 === 0) {
      const currentPlayer = marble % players
      scores[currentPlayer] += marble
      scores[currentPlayer] += circle.remove()
    } else {
      circle.add(marble)
    }
    console.log(circle)
  }

  return Math.max(...scores)
}

const players = 9
const lastMarble = 25
const winningScore = playMarbleGame(players, lastMarble)
console.log(`The winning Elf's score is ${winningScore}`)
