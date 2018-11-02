"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = board_string
    this.fixBoard = this.generateBoard()
  }



  // Returns a string representing the current state of the board
  generateBoard() {
    let limit = 9
    let board = []
    let index = 0
    for (let i = 0; i < limit; i++) {
      board.push([])
      for (let j = 0; j < limit; j++) {
        board[i].push(Number(this.board[index]))
        index++
      }
    }
    return board
  }
  blankCoordinate() {
    let board = this.fixBoard
    let dataCoordinate = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        let objCoordinate = {}
        if (board[i][j] === 0) {
          objCoordinate.coordinate = [i, j]
          objCoordinate.value = board[i][j]
          dataCoordinate.push(objCoordinate)
        }
      }
    }
    return dataCoordinate
  }
  checkHorizontal(coorX, value) {
    let board = this.fixBoard
    for (let j = 0; j < board.length; j++) {
      if (board[coorX][j] === value) {
        return false
      }
    }
    return true
  }

  checkVertical(coorY, value) {
    let board = this.fixBoard
    for (let i = 0; i < board.length; i++) {
      if (board[i][coorY] === value) {
        return false
      }
    }
    return true
  }

  check3x3(coorX, coorY, value) {
    let board = this.fixBoard
    let startX = coorX - (coorX % 3)
    let startY = coorY - (coorY % 3)
    for (let i = startX; i < startX + 3; i++) {
      for (let j = startY; j < startY + 3; j++) {
        if (board[i][j] === value) {
          return false
        }
      }
    }
    return true
  }

  solve() {
    let checkCoordinate = this.blankCoordinate()
    let board = this.fixBoard
    for (let i = 0; i < checkCoordinate.length; i++) {
      for (let j = 1; j <= board.length; j++) {
        let condition = false

        let checkHorizon = this.checkHorizontal(checkCoordinate[i].coordinate[0], j)
        let checkVertic = this.checkVertical(checkCoordinate[i].coordinate[1], j)
        let checkBlock = this.check3x3(checkCoordinate[i].coordinate[0], checkCoordinate[i].coordinate[1], j)
        if (checkHorizon && checkVertic && checkBlock) {
          let coorX = checkCoordinate[i].coordinate[0]
          let coorY = checkCoordinate[i].coordinate[1]
          board[coorX][coorY] = j
          checkCoordinate[i].value = j
          condition = true
          break
        }
        else if (!condition && j === 9) {
          let coorX = checkCoordinate[i].coordinate[0]
          let coorY = checkCoordinate[i].coordinate[1]
          board[coorX][coorY] = 0
          i--
          j = checkCoordinate[i].value - 1
        }
      }

      console.log(game.fixBoard)
      console.clear()
      console.log(game.fixBoard)
      this.sleep(150)
    }

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
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

// console.log(game.board())

// console.log(game.blankCoordinate())