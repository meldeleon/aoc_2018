const input = require("fs")
  .readFileSync("day09_input.txt")
  .toString()
  .split(" ")

const game_parameters = {
  players: parseInt(input[0]),
  last_marble: parseInt(input[6]),
}

let game_state = {
  board: [0],
  current_marble_index: 0,
  scores: new Array(game_parameters.players).fill(0),
  player_turn: 1,
  marble_val: 1,
}

playGame(game_parameters.last_marble)
let solution = Math.max(...game_state.scores)
console.log({ solution })

function playGame(last_marble) {
  console.log(game_parameters)
  for (let marble = 0; marble <= last_marble; marble++) {
    let { board, current_marble_index, player_turn, marble_val } = game_state
    //edge case: we must place a starting marble, no one takes a turn.
    if (marble_val === 0) {
      game_state.marble_val++
    }
    //scoring condition
    else if (marble_val % 23 === 0) {
      //player keeps marble & removes a marble 7 ccw spaces away
      let addlMarbleIndex = current_marble_index - 7
      let addMarbleScore

      if (addlMarbleIndex > 0) {
        addMarbleScore = board[addlMarbleIndex]
        game_state.current_marble_index = addlMarbleIndex
      } else {
        //edge case: if the selected marble is less than 0, and we need to wrap
        addMarbleScore = board[board.length + addlMarbleIndex]
        game_state.current_marble_index = board.length + addlMarbleIndex
      }
      let turnScore = marble_val + addMarbleScore
      //updated gamestate for scored round
      game_state.scores[player_turn] += turnScore
      game_state.board.splice(addlMarbleIndex, 1)
      game_state.player_turn = marble_val % game_parameters.players
      game_state.marble_val++
    } else {
      // pick where to insert the new marble
      insertIndex = current_marble_index + 2

      // edge case: check if new index needs to wrap
      if (insertIndex + 1 > board.length) {
        insertIndex = insertIndex % board.length
      }

      let newBoard = pushValue(game_state.board, insertIndex, marble_val)

      //update gamestate for unscored round
      game_state.board = newBoard
      game_state.current_marble_index = insertIndex
      game_state.player_turn = marble_val % game_parameters.players
      game_state.marble_val++
    }
    //console.log(game_state)
  }
}

function pushValue(arr, index, val) {
  //non inclusive on the left
  let arr1 = arr.slice(0, index)
  let arr2 = arr.slice(index, arr.length)
  arr1.push(val)
  return arr1.concat(arr2)
}
