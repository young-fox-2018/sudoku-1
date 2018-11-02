"use strict"

class Sudoku {
  constructor(board_string) {
    this.data = board_string
    this._board = this.generateBoard()
    this._koordinat = this.getCoordinat()
  }

  solve() {
    var papan = this._board
    var blank = this._koordinat
    console.log(blank)
    for (let i = 0; i < blank.length; i++) {
      let isTrue = false
      for (let j = 1; j <= papan.length; j++) {
        if (this.checkBlock(blank[i].X, blank[i].Y, j) && this.checkHorizontal(blank[i].X, j) && this.checkVertical(blank[i].Y, j)) {
          papan[blank[i].X][blank[i].Y] = j
          blank[i].value = j
          isTrue = true
          break
        } else if (isTrue === false && j === 9) {
          papan[blank[i].X][blank[i].Y] = 0
          i--
          j = blank[i].value - 1
        }
        console.log(papan)
      }
    }
    // return papan
  }
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  getCoordinat() {
    let board = this.generateBoard()
    let coordinates = []
    for (let i = 0; i < board.length; i++) {
      // let obj = {}
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          let obj = {}
          obj.value = 0
          obj.X = i
          obj.Y = j
          coordinates.push(obj)
        }
      }
    }
    return coordinates
  }
  checkHorizontal(ordinatX, value) {
    let board = this._board
    for (let j = 0; j < board.length; j++) {
      if (board[ordinatX][j] === value) return false
    }
    return true
  }

  checkVertical(ordinatY, value) {
    let board = this._board
    for (let i = 0; i < board.length; i++) {
      if (board[i][ordinatY] === value) return false
    }
    return true
  }

  checkBlock(ordinatX, ordinatY, value) {
    let board = this._board,
      firstX = ordinatX - (ordinatX % 3),
      firstY = ordinatY - (ordinatY % 3)
    for (let i = firstX; i < firstX + 3; i++) {
      for (let j = firstY; j < firstY + 3; j++) {
        if (board[i][j] === value) {
          return false
        }
      }
      return true
    }
  }

  // Returns a string representing the current state of the board
  generateBoard() {
    let board = [],
      idx = 0
    for (let i = 0; i < 9; i++) {
      let line = []
      for (let j = 0; j < 9; j++) {
        line.push(Number(board_string[idx]))
        idx++
      }
      board.push(line)
    }
    return board
  }
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt').toString().split("\n")[0]


var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"

// console.log(game.generateBoard())
game.solve()
// console.log(game.getCoordinat())



// console.log(Math.floor(Math.random() * 9) + 1)