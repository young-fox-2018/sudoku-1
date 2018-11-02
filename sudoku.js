"use strict"

class Sudoku {
  constructor(board_string) {
    this.item = board_string;
    this.firstBoard = this.board();
    this.emptySlots = this.findEmptySlots();
  }

  solve() {   

    // NOTE: get array of object with potential number
    for (let i = 0; i < this.emptySlots.length; i++) {
      this.emptySlots[i].value = this.generatePossibleNumber(this.emptySlots[i]);
    }

    for (let i = 0; i < this.emptySlots.length; i++) {
      let pushed = false;
      while(!pushed) {
        let horizontal = this.checkHorizontal(this.emptySlots[i].coordinate, this.emptySlots[i].value);
        let vertical = this.checkVertical(this.emptySlots[i].coordinate, this.emptySlots[i].value);
        let grid = this.checkGrid(this.emptySlots[i].coordinate, this.emptySlots[i].value);

        // cek if the potential number can be pushed
        if (horizontal && vertical && grid) {
          this.firstBoard[this.emptySlots[i].coordinate[0]][this.emptySlots[i].coordinate[1]] = this.emptySlots[i].value;
          pushed = true;
        } else {
          this.emptySlots[i].value += 1;
        }
      }

      // in case number 1 - 9 not fit, the number must be 10 so reset to 0 and back to previous emptySlots
      if (this.emptySlots[i].value > 9) {
        this.emptySlots[i].value = 0;
        this.firstBoard[this.emptySlots[i].coordinate[0]][this.emptySlots[i].coordinate[1]] = this.emptySlots[i].value;
        i -= 2;
      }
    }
  }
  
  // Returns a string representing the current state of the board
  board() {
    var sudokuBoard = [];
    var index = 0;
    for (let i = 0; i < 9; i++) {
      let row = []
      for (let j = 0; j < 9; j++) {
        row.push(Number(this.item[index]));
        index++;
      }
      sudokuBoard.push(row);
    }
    return sudokuBoard;
  }

  generatePossibleNumber(empty){
    var pass = false;
    var value = 1;
    while(!pass) {
      let horizontal, vertical, grid;
      horizontal = this.checkHorizontal(empty.coordinate, value);
      vertical = this.checkVertical(empty.coordinate, value);
      grid = this.checkGrid(empty.coordinate, value);
      if (horizontal && vertical && grid) {
        pass = true;
      }
      if (!horizontal && !vertical && !grid && value === 9) {
        return 0;
      }
      if (!pass) {
        value++;
      }
    }
    return value;
  }

  checkHorizontal(coordinate, number) {
    var isUnique = true;
    for (let i = 0; i < 9; i++) {
      if (number === this.firstBoard[coordinate[0]][i]) {        
        isUnique = false;
      }
    }    
    return isUnique;
  }

  checkVertical(coordinate, number) {
    var isUnique = true;
    for (let i = 0; i < 9; i++) {
      if (number == this.firstBoard[i][coordinate[1]]) {        
        isUnique = false;
      }
    }
    return isUnique;
  }

  checkGrid(coordinate, number) {
    var xStart = 3 * Math.floor(coordinate[0]/3);
    var xEnd = xStart + 2;
    var yStart = 3 * Math.floor(coordinate[1]/3);
    var yEnd = yStart + 2;
    var isUnique = true;

    for (let i = xStart; i <= xEnd; i++) {
      for (let j = yStart; j <= yEnd; j++) {
        if (number == this.firstBoard[i][j]) {
          isUnique = false;
        }
      }
    }
    return isUnique;
  }

  findEmptySlots(){
    var emptySlots = []
    var solvedBoard = this.board(); 

    for (let i = 0; i < solvedBoard.length; i++) {
      let obj 
      for (let j = 0; j < solvedBoard[i].length; j++) {
        if (solvedBoard[i][j] === 0) {
          emptySlots.push({coordinate: [i,j], value: 0});          
        }
      }
    }
    return emptySlots;
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

console.log(game.board())
console.log(`==================================`)
game.solve()
console.log(game.firstBoard);