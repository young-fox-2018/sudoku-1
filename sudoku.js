"use strict"

class Sudoku {
  constructor(board_string) {
    this.blankSpaces = []
    this.boardGame = []
  }
  
  solve() {
    for (let i = 0; i < this.blankSpaces.length; i++) {
      for (let j = this.blankSpaces[i].value ; j <= 9; j++) {
        if (this.checkHorizontal(j,this.blankSpaces[i]) && this.checkVertical(j,this.blankSpaces[i]) && this.checkBlock(j,this.blankSpaces[i])) {
          this.blankSpaces[i].value = j
          this.boardGame[this.blankSpaces[i].x][this.blankSpaces[i].y] = this.blankSpaces[i].value
          break
        } 
        if (j === 9) {
          this.boardGame[this.blankSpaces[i].x][this.blankSpaces[i].y] = 0
          this.blankSpaces[i].value = 0
          i -= 2
        }
      }
      this.sleep(100)
      this.clearScreen()
      console.log(this.boardGame)
    }
    // return this.boardGame
  }

  checkHorizontal(input,point) {
    let status = true
    for (let rowCol = 0; rowCol < 9; rowCol++) {
      if (this.boardGame[rowCol][point.y] === input) status = false
    }
    return status
  }

  checkVertical(input,point) {
    let status = true
    for (let rowCol = 0; rowCol < 9; rowCol++) {
      if (this.boardGame[point.x][rowCol] === input) status = false
    }
    return status
  }

  checkBlock(input,point) {
    let status = true
    let limitX = null
    let limitY = null
    if (point.x <= 2) limitX = 2
    else if (point.x <= 5) limitX = 5
    else if (point.x <= 8) limitX = 8
     
    if (point.y <= 2) limitY = 2
    else if (point.y <= 5) limitY = 5
    else if (point.y <= 8) limitY = 8
     
    for (let row = limitX-2; row <= limitX; row++) {
      for (let col = limitY-2; col <= limitY; col++) {
        if (this.boardGame[row][col] === input) status = false; 
      }
    }
    return status
  }

  clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }

  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  
  // Returns a string representing the current state of the board
  board() {
    let index = 0
    for (let i = 0; i < 9; i++) {
      this.boardGame.push([])
      for (let j = 0; j < 9; j++) {
        this.boardGame[i].push(Number(board_string[index]))
        if (board_string[index] === '0') {
          let space = {}
          space.value = 0
          space.x = i
          space.y = j
          this.blankSpaces.push(space)
        }
        index++
      }
    }
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[8]

var game = new Sudoku(board_string)

game.board()

// Remember: this will just fill out what it can and not "guess"
game.solve()