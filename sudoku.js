"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.generateBoard(board_string)
  }



  getZero() {
    let arr = []
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        let obj = {}
        if (this.board[i][j] === 0) {
          obj.coordinate = [i, j]
          obj.value = this.board[i][j]
          arr.push(obj)
        }
      }
    }
    return arr
  }
  // Returns a string representing the current state of the board
  generateBoard(input) {
    let arr = []
    let counter = 0
    for (let i = 0; i < 9; i++) {
      let temp = []
      for (let j = 0; j < 9; j++) {
        temp.push(Number(input[counter]))
        counter++
      }
      arr.push(temp)
    }
    return arr
  }

  checkVerticalHorizontal(x, y, input) {
    let board = this.board
    for (let i = 0; i < board.length; i++) {
      if (board[x][i] === input || board[i][y] === input) return false
    }
    return true
  }

  checkBlock(x, y, value) {
    let board = this.board
    let startI = x - (x % 3)
    let startJ = y - (y % 3)
    for (let i = startI; i < startI + 3; i++) {
      for (let j = startJ; j < startJ + 3; j++) {
        if (board[i][j] == value) {
          return false
        }
      }
      return true
    }
  }

  solve() {
    let zero = this.getZero()
    let board = this.board
    // while (solved === false) {
    for (let k = 0; k < zero.length; k++) {
      let solved = false
      for (let i = 1; i <= 9; i++) {
        if (this.checkVerticalHorizontal(zero[k].coordinate[0], zero[k].coordinate[1], i) && this.checkBlock(zero[k].coordinate[0], zero[k].coordinate[1], i)) {
          board[zero[k].coordinate[0]][zero[k].coordinate[1]] = i
          zero[k].value = i
          solved = true
          break
        } else if (solved === false && i === 9) {
          board[zero[k].coordinate[0]][zero[k].coordinate[1]] = 0
          k--
          i = zero[k].value - 1
        }
      }
      console.log(board)
      console.clear()
      console.log(board)
        sleep(100)
    }
  }
}

function clearScreen() {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()


game.solve()
// console.log(game.board())
