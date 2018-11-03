"use strict"
const board_string = require('./boardString')
const BoardGenerator = require('./boardGenerator')
const Zero = require('./zeroCoordinate')

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string
    this.boardContainer = BoardGenerator.board()
    this.zero = Zero.zeroCoordinate()
  }

  solve() {
    let board = this.boardContainer
    let data = this.zero
    for (let i = 0; i < data.length; i++) {
      let validation = false
      for (let j = 1; j <= board.length; j++) {
        if (this.horizontalcheck(data[i].coordinate[0], j) && this.verticalCheck(data[i].coordinate[1], j) && this.blockCheck(data[i].coordinate[0], data[i].coordinate[1], j)) {
          board[data[i].coordinate[0]][data[i].coordinate[1]] = j
          data[i].value = j
          validation = true
          break
        }
        // backtrack
        else if (validation === false && j === 9) {
          board[data[i].coordinate[0]][data[i].coordinate[1]] = 0
          i--
          j = data[i].value - 1
        }
      }
      console.clear()
      console.log(board)
      this.sleep(30)
    }
  }

  horizontalcheck(coordinateI, value) {
    let board = this.boardContainer
    for (let j = 0; j < board.length; j++) {
      if (board[coordinateI][j] === value) {
        return false
      }
    }
    return true
  }

  verticalCheck(coordinateJ, value) {
    let board = this.boardContainer
    for (let i = 0; i < board.length; i++) {
      if (board[i][coordinateJ] === value) {
        return false
      }
    }
    return true
  }

  blockCheck(coordinateI, coordinateJ, value) {
    let board = this.boardContainer
    let startI = coordinateI - (coordinateI % 3)
    let startJ = coordinateJ - (coordinateJ % 3)
    for (let i = startI; i < startI + 3; i++) {
      for (let j = startJ; j < startJ + 3; j++) {
        if (board[i][j] === value) {
          return false
        }
      }
    }
    return true
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

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()