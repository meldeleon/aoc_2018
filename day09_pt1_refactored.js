const input = require("fs")
  .readFileSync("day09_input.txt")
  .toString()
  .split(" ")

const game_parameters = {
  players: parseInt(input[0]),
  last_marble: parseInt(input[6]),
}
