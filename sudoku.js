"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.boards = this.board()
    this.objCoord = this.coordinate()
  }

  solve() {
    for(let i = 0; i < this.objCoord.length; i++) {
      let row = this.objCoord[i].coordinateRow
      let col = this.objCoord[i].coordinateCol
      while(true) {
        let value = this.objCoord[i].value
        if((this.checkRow(row, value) === true) && (this.checkCol(col, value) === true) && (this.checkBox(row, col, value) === true)){
          this.boards[row][col] = value
          break
        } else {
          this.objCoord[i].value ++
        }
      }
      if(this.objCoord[i].value === 10) {
        this.objCoord[i].value  = 0
        this.boards[row][col] = this.objCoord[i].value
        i -= 2
      }
    }
    console.log(this.boards);
  }

  checkAvail() {
    for (let i = 0; i < this.boards.length; i++) {
      for (let j = 0; j < this.boards[i].length; j++) {
        if (this.boards[i][j] === 0) {
          this.coordinate.push({
            coordinateRow: i,
            coordinateCol: j,
            value : this.boards[i][j]
          })
        }
      }
    }
  }

  checkRow(row, value) {
    let condition = true
    for(let i = 0; i < this.boards.length; i++){
      if(this.boards[row][i] === value){
        condition = false
      }
    }
    return condition
  }

  checkCol(col, value) {
    let condition = true
    for(let i = 0; i < this.boards.length; i++){
      if(this.boards[i][col] === value){
        condition = false
      }
    }
    return condition
  }

  checkBox(row, col, value){
    let condition =  true
    let rowStart = 3 * Math.floor(row/3)
    let colStart = 3 * Math.floor(col/3)
    for(let i = rowStart; i <= rowStart + 2; i++){
      for(let j = colStart; j <= colStart + 2; j++){
        if(this.boards[i][j] === value){
          condition = false 
        }
      }
    }
    return condition
  }

  coordinate() {
    let data = this.boards
    let objCoord = []
    for(let i = 0; i < data.length; i++) {
      for(let j = 0; j < data[i].length; j++) { 
        if(data[i][j] === 0) {
          let coordinate = {
            coordinateRow: i,
            coordinateCol: j,
            value: data[i][j]
          }
          objCoord.push(coordinate)
        }
      }
    }
    return objCoord
  }
  // Returns a string representing the current state of the board
  board() {
    let data = this.board_string
    let board = []
    let index = 0
    for(let i = 0; i < 9; i++){
      let row = []
      for(let j = 0; j < 9; j++){
        row.push(Number(data[index]))
        index++
      }
      board.push(row)
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

// Remember: this will just fill out what it can and not "guess"
game.board()
game.solve()
