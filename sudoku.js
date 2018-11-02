"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.generateBoard(board_string);
    this.zeroMap = []

  }

  horizontalValidation(row, num) {
    let unique = true
    for(let l = 0; l < this.board[row].length; l++){
      if(num === this.board[row][l]){
        unique = false;
        break;
      }
    }
    return unique
  }

  verticalValidation(col,num){
    let unique = true;
    for(let i = 0; i < this.board.length; i++){
      if(num === this.board[i][col]){
        unique = false;
        break;
      }
    }
    return unique
  }

  gridValidation(row, col, num){
    let unique = true;
    let startingRow = Math.floor(row/3) * 3;
    let endingRow = startingRow + (1 * 3);
    let startingCol = Math.floor(col/3) * 3;
    let endingCol = startingCol + (1 * 3);

    for(let i = startingRow; i < endingRow ; i++ ){
      for(let j = startingCol; j < endingCol; j++){
        if(num === this.board[i][j]){
          unique = false;
          break;
        }
      }
    }
    return unique
  }
  
  solve() {

    for(let i = 0; i < this.board.length; i++){
      for(let j = 0 ; j < this.board[i].length; j++){

        if(this.board[i][j] === 0){
          let placed = false;

          for(let k = 1; k <= 9; k++){
            // console.log(k, i, j)
            // console.log(this.horizontalValidation(i, k) === true)
            // console.log(this.verticalValidation(j, k) === true)
            // console.log(this.gridValidation(i, j, k) === true)
            if (this.horizontalValidation(i, k) === true && this.verticalValidation(j, k) === true && this.gridValidation(i, j, k)){
              this.board[i][j] = k;
              this.zeroMap.push({
                y: i,
                x: j,
                value: k
              })
              placed = true;
              break
            }
            if(placed === false && k >= 9 ){
              ///harus disetel 0 dulu PENTING !!!!!!
              this.board[i][j] = 0;
              i = this.zeroMap[this.zeroMap.length-1]["y"];
              j = this.zeroMap[this.zeroMap.length-1]["x"];
              k = this.zeroMap[this.zeroMap.length-1]["value"]  // k = 7;
              this.zeroMap.pop()
            }
          }
        }
      }
    }
    return this.board
  }
  
  // Returns a string representing the current state of the board
  generateBoard(string) {
    let result = []
    for(let i = 0 ; i < 9; i++){
      let cont = []
      for(let j = 0; j < 9; j++){
        cont.push(Number(board_string[i * 9 +j]))
      }
      result.push(cont)
    }
    return result
  }

  printBoard(){
    console.log(this.board)
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
// game.solve()

game.printBoard()
game.solve()
game.printBoard()

// console.log(game.zeroMap[game.zeroMap.length-1]["y"])




//simpen coordinat 0



// kalo cara kak wika dia simpen dulu semua array 0;
// trus looping lagi setiap array 0