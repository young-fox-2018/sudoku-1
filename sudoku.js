"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudokuBoard = board_string,
    this.arrBoard = []
    this.kosong = []
  }

  checkHorizontal(row,numberInput) {
    for(let i = row; i < this.arrBoard.length; i++){
        if(this.arrBoard[row][i] == numberInput) {
          return  false
        }
    }
    return true
  }
  checkVertical(col,numberInput ) {
    for(let i = 0; i < this.arrBoard.length; i++){
      if(this.arrBoard[i][col] == numberInput) {
        return  false
      }
    }
    return true
  }
  checkBox(row,col,numberInput) {
    var xStart = 3 *(Math.floor(row/3))
    var xEnd = xStart + 2
    var yStart = 3 *(Math.floor(col/3))
    var yEnd = yStart + 2

    for(let i = xStart; i <= xEnd; i++) {
      for(let j = yStart; j <= yEnd; j++){
        if(this.arrBoard[i][j] == numberInput){
          return false
        }
      }
    }
    return true
  }

  checkKosong(board) {
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board.length; j++) {
        if(board[i][j] === '0') {
          let obj =  {
            x : i,
            y : j,
            value : 1
          }
          this.kosong.push(obj)
        }
      }
    }
    return this.kosong
  }

  solve() {
    // console.log(this.arrBoard)
    let daftarKosong = this.checkKosong(this.arrBoard)
    console.log(this.arrBoard)
    for(let i = 0; i < daftarKosong.length; i++) {

      while(true) {
        if(this.checkHorizontal(daftarKosong[i].x, daftarKosong[i].value)  &&  this.checkVertical(daftarKosong[i].y, daftarKosong[i].value)  && this.checkBox(daftarKosong[i].x, daftarKosong[i].y, daftarKosong[i].value) ) {
            this.arrBoard[daftarKosong[i].x][daftarKosong[i].y] = daftarKosong[i].value
            break;
        }else {
          daftarKosong[i].value += 1
        }
      }

      if(daftarKosong[i].value > 9) {
        daftarKosong[i]["value"] = 0
        this.arrBoard[daftarKosong[i]["x"]] [daftarKosong[i]["y"]] = daftarKosong[i]["value"]
        i -= 2
      }

    }
  }

  createBoard() {
    for (let i = 0; i < this.sudokuBoard.length-1; i+=9) {
      var baris = this.sudokuBoard.slice(i,i+9).split('')
      this.arrBoard.push(baris)
    }  
  }
  // Returns a string representing the current state of the board
  printBoard() {
    return this.arrBoard                                                                                           
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
game.createBoard()
game.solve()
console.log(game.printBoard())
// console.log(game.checkKosong())
