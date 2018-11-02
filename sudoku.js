"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.cordinate = []
    this.sudokuBoard = this.board()
  }
  solve() {
    this.checkavail(this.sudokuBoard)
    for (let i = 0; i < this.cordinate.length; i++) {
      let row = this.cordinate[i].cordinate[0]
      let col = this.cordinate[i].cordinate[1]
      while (true) {
        let checkValue = this.cordinate[i].value
        if (this.checkHor(row, col, checkValue) === true && this.checkVer(row, col, checkValue) === true && this.checkGrid(row, col, checkValue) === true) {
          this.sudokuBoard[row][col] = this.cordinate[i].value
          break
        }
        else {
          this.cordinate[i].value = this.cordinate[i].value + 1
        }
      }
      //Backtrack
      if (this.cordinate[i].value === 10) {
        this.cordinate[i].value = 0
        this.sudokuBoard[row][col] = this.cordinate[i].value
        i = i - 2
      }
    }
    return console.log(this.sudokuBoard);
  }

  checkavail(boardCheck) {
    for (let i = 0; i < boardCheck.length; i++) {
      for (let j = 0; j < boardCheck[i].length; j++) {
        let obj = {}
        if (boardCheck[i][j] === 0) {
          obj.cordinate = [i,j]
          obj.value = 1
          this.cordinate.push(obj)
        }
      }
    }
  }

  checkHor(row, col, checkValue) {
    for (let i = 0; i < 9; i++) {
      if (this.sudokuBoard[row][i] === checkValue) {
        return false
        break
      }
    }
    return true
  }

  checkVer(row, col, checkValue) {
    for (let i = 0; i < 9; i++) {
      if (this.sudokuBoard[i][col] === checkValue) {
        return false
        break
      }
    }
    return true
  }

  checkGrid(row, col, checkValue) {
    var iStart = 3 * (Math.floor(row/3))
    var iEnd = iStart + 2
    var jStart = 3 * (Math.floor(col/3))
    var jEnd = jStart + 2

    for (var i = iStart; i <= iEnd; i++) {
      for (var j = jStart; j <= jEnd; j++) {
        if (this.sudokuBoard[i][j] === checkValue) {
          return false
          break
        }
      }
    }
    return true
  }

  // Returns a string representing the current state of the board
  board() {

    let board = []
    let count = 0
    for (let i = 0; i < 9; i++) {
      let temp = []
      for (let j = 0; j < 9; j++) {
        temp.push(Number(this.board_string[count]))
        count ++
      }
      board.push(temp)
    }
    return board
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

// Remember: this will just fill out what it can and not "guess"
game.solve()
// sleep(1000)
// clearScreen()
// console.log(game.cordinate);
