const input = require("fs")
  .readFileSync("day09_input.txt")
  .toString()
  .split(" ")

const game_parameters = {
  players: parseInt(input[0]),
  last_marble: parseInt(input[6]),
}

console.log(game_parameters)

let game_state = {
  circle: [0],
  current_marble_index: 0,
}

function addMarble(marble) {
  // the new index is + 2, but looped around the edge with modulo
  let insert_index =
    (game_state.current_marble_index + 2) % game_state.circle.length
  // if edge case of 0
  if (insert_index === 0) {
    game_state.circle.push(marble)
    game_state.current_marble_index = game_state.circle.length - 1
  } else {
    game_state.circle.splice(insert_index, 0, marble)
    game_state.current_marble_index = insert_index
  }
}

function removeMarble() {
  let remove_index =
    (game_state.current_marble_index - 7 + game_state.circle.length) %
    game_state.circle.length
  let removed_marble = game_state.circle.splice(remove_index, 1)[0]
  game_state.current_marble_index = remove_index

  return removed_marble
}

function playGame() {
  let scores = new Array(game_parameters.players).fill(0)
  for (let marble = 1; marble <= game_parameters.last_marble; marble++) {
    let player = marble % game_parameters.players
    if (marble % 23 === 0) {
      scores[player] += marble
      scores[player] += removeMarble()
    } else {
      addMarble(marble)
    }
  }
  return Math.max(...scores)
}

const solution = playGame()
console.log(`the solution is ${solution}`)
