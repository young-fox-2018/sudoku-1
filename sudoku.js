"use strict"
const fs = require('fs')
const board_string = fs.readFileSync('./set-01_sample.unsolved.txt').toString().split("\n")[0]
const Board = require('./generateBoard.js')
const Rows = require('./checkRow.js').checkRows
const Column = require('./checkColumn.js').checkColumns
const Area = require('./checkArea.js').checkArea
const sleep = require('./sleep.js')
const emptyData = require('./emptyData.js')

let sudokuBoard = Board.generateBoard(board_string)
let data = emptyData(sudokuBoard)

class Sudoku {
  solve() {
    for (let i = 0; i < data.length; i++) {
      for (let j = 1; j <= 9; j++) {
        let validate = false
        if (Rows(sudokuBoard, data[i].coordinate, j) && Column(sudokuBoard, data[i].coordinate, j) && Area(sudokuBoard, data[i].coordinate, j)) {
          sudokuBoard[data[i].coordinate[0]][data[i].coordinate[1]] = j
          data[i].value = j
          validate = true
          break
        }
        else if (validate === false && j === 9) {
          sudokuBoard[data[i].coordinate[0]][data[i].coordinate[1]] = 0
          i--
          j = data[i].value - 1
        }
      }
      console.clear()
      console.log(sudokuBoard)
      sleep(150)
    }
  }
}

let game = new Sudoku
game.solve()

module.exports = Sudoku

