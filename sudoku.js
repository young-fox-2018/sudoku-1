"use strict"

class Sudoku {
  constructor(board_string) {
    this._dataNumber = board_string
    this._boards = this.board()
    this._cordinate = this.cordinate()

  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }


  cordinate() {
    let cordinates = []
    let data = this._boards
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === 0) {
          let cordinate = {
            cordinate: [i, j],
            value: 0
          }
          cordinates.push(cordinate)
        }
      }
    }
    return cordinates
  }
  vertical(cordinateJ, value) {
    let board = this._boards
    for (let i = 0; i < board.length; i++) {
      if (board[i][cordinateJ] === value) {
        return false
      }
    }
    return true
  }
  horizontal(cordinateI, value) {
    let board = this._boards
    for (let j = 0; j < board.length; j++) {
      if (board[cordinateI][j] === value) {
        return false
      }
    }
    return true
  }
  cek3x3(coordinateI, coordinateJ, value) {
    let board = this._boards
    let startI = coordinateI - (coordinateI % 3)
    let startJ = coordinateJ - (coordinateJ % 3)
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
    let boards = this._boards
    let cordinate = this._cordinate
    for (let i = 0; i < cordinate.length; i++) {
      let validasi = false
      for (let j = 1; j <= boards.length; j++) {
        if (this.horizontal(cordinate[i].cordinate[0], j) && this.vertical(cordinate[i].cordinate[1], j) && this.cek3x3(cordinate[i].cordinate[0], cordinate[i].cordinate[1], j)) {
          boards[cordinate[i].cordinate[0]][cordinate[i].cordinate[1]] = j
          cordinate[i].value = j
          validasi = true
          break;
        }
        else if (validasi === false && j === 9) {
          boards[cordinate[i].cordinate[0]][cordinate[i].cordinate[1]] = 0
          i--
          j = cordinate[i].value - 1
        }
      }
      // console.log(boards);

      console.clear();
      console.log(boards);
      this.sleep(1);
    }
  }

  // Returns a string representing the current state of the b
  board() {
    debugger
    let dataNumber = this._dataNumber
    let boards = []
    let counter = 0
    for (let i = 0; i < 9; i++) {
      let inner = []
      for (let j = 0; j < 9; j++) {
        inner.push(Number(dataNumber[counter]))
        counter++
      }
      boards.push(inner)
    }
    return boards
  }
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
game.solve()
// console.log(game.board())
// console.log(game.cordinate());
