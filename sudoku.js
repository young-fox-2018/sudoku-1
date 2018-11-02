"use strict"
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]
const Board = require('./generateBoard.js')
const emptyData = require('./emptyData.js')
const Rows = require('./checkRow.js')
const Column = require('./checkColumn.js')
const Area = require('./checkArea.js')
let sudokuBoard = Board.generateBoard(board_string)
let data = emptyData(sudokuBoard)
for (let i = 0; i < data.length; i++) {
  for (let j = 1; j <= 9; j++) {
    sudokuBoard[data[i].coordinate[0]][data[i].coordinate[1]] = j 
    if (Rows.checkRows(sudokuBoard, data[i].coordinate)) {
      if (Column.checkColumns(sudokuBoard, data[i].coordinate)) {
        if (Area.checkArea(sudokuBoard, data[i].coordinate)) {
          sudokuBoard[data[i].coordinate[0]][data[i].coordinate[1]] = j
          data[i].value = j
          break;
        }
      }
    }
    sudokuBoard[data[i].coordinate[0]][data[i].coordinate[1]] = 0 
  }
}
let empty = emptyData(sudokuBoard)
console.log(empty)
console.log(sudokuBoard)
console.log(data)







// The file has newlines at the end of each line,
// so we call split to remove it (\n)

//var game = new Sudoku(board_string)


// Remember: this will just fill out what it can and not "guess"
//game.solve()

//console.log(game.board())
