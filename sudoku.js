"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string
    this.board = []
    this.boardX = 9
    this.boardY = 9
  }

  createBoard() {
    let pos = 0

    for (let i = 0; i < 9; i++) {
        let innerBoard = []
      for (let j = 0; j <  9; j++) {
          innerBoard[j] = parseInt(this.boardString.charAt(pos))
          pos++
      }

      this.board.push(innerBoard)
    }

    return this.board
  }

  solve() {
    let savedPosition = []
    for (let rows = 0; rows < this.board.length; rows++) {
      let numberToPut = 1
      let rowSafe = false
      let columnSafe = false
      let boxSafe = false
   
      for (let column = 0; column < this.board[rows].length; column++) {
        let obj = {}
        numberToPut = 1

        if (this.board[rows][column] == 0) {
          while (!boxSafe && !columnSafe && !rowSafe) {
            rowSafe = this.checkRows(column, numberToPut)
            columnSafe = this.checkColumn(rows,  numberToPut) 
            boxSafe = this.checkBox(rows, column, numberToPut)

            if (rowSafe && columnSafe && boxSafe) {
              this.board[rows][column] = numberToPut 
              rowSafe = true
              columnSafe = true      
              boxSafe = true 

              obj.rows = rows
              obj.column = column
              obj.value = numberToPut
              savedPosition.push(obj)
            } else if (numberToPut == 9) {
              this.board[rows][column] = 0
              rows = savedPosition[savedPosition.length - 1].rows
              column = savedPosition[savedPosition.length - 1].column
              numberToPut = savedPosition[savedPosition.length - 1].value
              this.board[rows][column] = numberToPut
              savedPosition.pop()

              rowSafe = false
              columnSafe = false
              boxSafe = false
             } else {               
              rowSafe = false
              columnSafe = false
              boxSafe = false
              numberToPut += 1
            }
          }
        }     
        rowSafe = false
        columnSafe = false
        boxSafe = false
      }
    }
  }
 
  checkBox(rows, column, numberToPut) {
    let initialRow = 3  * Math.floor(rows / 3)
    let initialColumn = 3 * Math.floor(column / 3) 

    for (let i = initialRow; i <= initialRow + 2; i++) {
      for (let j = initialColumn; j <= initialColumn + 2; j++) {
        if (this.board[i][j] == numberToPut) {
           return false
        }
      }
    }
      
    return true
  }

  checkRows(column, numberToPut) {
    let rowSafe = false

    for (let i = 0; i < this.boardY; i++) {
      if (this.board[i][column] != numberToPut) {
        rowSafe = true
      } else {
        rowSafe = false
        break
      }
    }

    if (rowSafe) {
      return true
    } else {
      return false
    }
  }

  checkColumn(rows, numberToPut) {
   let sideSafe = 0

    for (let i = 0; i < this.boardX; i++) {
      if (this.board[rows][i] != numberToPut) {
        sideSafe = true
      } else {
        sideSafe = false
        break
      }
    }

    if (sideSafe) {
      return true
    } else {
      return false
    }
  }


  // Returns a string representing the current state of the board
  printBoard() {
    return this.board
  }
}



// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
game.createBoard()
game.solve()
console.log(game.printBoard())

// Remember: this will just fill out what it can and not "guess"
//game.solve()

//console.log(game.board())
