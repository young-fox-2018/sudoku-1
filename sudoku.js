
"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardSudoku = board_string;
    this.sudokuObj = [];
    this.papan = this.board();
  }

  solve() {

    for(let i = 0; i < this.sudokuObj.length; i++){
      let rowX = this.sudokuObj[i].loc[0]; // i
      let rowY = this.sudokuObj[i].loc[1]; // j
      
      while(true){

        let value = this.sudokuObj[i].value;
        let horizontal = this.validateHorizontal(rowX, value);
        let vertical = this.validateVertical(rowY, value);
        let checkBlock = this.checkGrid(rowX, rowY, value);

        // console.log(this.papan)
        if(horizontal === true && vertical === true && checkBlock === true){
          this.papan[rowX][rowY] = this.sudokuObj[i].value;
          break;
        } else {
          this.sudokuObj[i].value++
        }
      }
      if(this.sudokuObj[i].value === 10){
        this.sudokuObj[i].value = 0;
        this.papan[rowX][rowY] = this.sudokuObj[i].value;
        i = i - 2
      }
    }
    return console.log(this.papan)
  }

  validate0() {
    let boardPlayer = this.board();
    for(let i = 0; i < boardPlayer.length; i++){
      for(let j = 0; j < boardPlayer[i].length; j++){
        let obj = {};
        if(boardPlayer[i][j] === 0){
          obj.value = 1
          obj.loc = [i,j]
          this.sudokuObj.push(obj)
        }
      }
    }
    return this.sudokuObj;
  }

  validateHorizontal(rowX, number) {
    // let boardGame = this.board()
    for(let i = 0; i < this.papan.length; i++){
      if(this.papan[rowX][i] === number){
        // check = false;
        return false
      }
    }
    return true
  }
  // Returns a string representing the current state of the board
  validateVertical(rowY, number) {
    // let boardGame1 = this.board()
    // let check = true;
    for(let i = 0; i < this.papan.length; i++){
      if(this.papan[i][rowY] === number){
        // check = false;
        return false;
      }
    }
    return true;
  }

  checkGrid(rowX, rowY, number) {
      let startX = 3 * (Math.floor(rowX/3));
      let endX = startX + 2;
      let startY = 3 * (Math.floor(rowY/3));
      let endY = startY + 2;

      for(let i = startX; i <= endX; i++){
        for(let j = startY; j <= endY; j++){
          if(this.papan[i][j] === number){
            return false
          }
        }
      }
      return true
  }

  board() {
    let gameBoard = [];
    let count = 0;
    for(let i = 0; i < 9; i++){
      gameBoard.push([]);
      for(let j = 0; j < 9; j++){
        gameBoard[i].push(Number(this.boardSudoku[count]));
        count++;
      }
    }
    return gameBoard;
  }

  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
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

// game.sleep(100);
game.validate0()
console.log(game.solve());
game.checkGrid();

// console.log(game.validateHorizontal(0, [ 4, 3 ]));
game.board()