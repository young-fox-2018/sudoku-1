"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardGame = this.board(board_string);
    this.zero = [];
  }

  solve() {
    var temp = this.zero;
    var newBoard = this.boardGame;
    for (let i = 0; i < temp.length; i++) {
      var num = temp[i].value;
      var coordinate = temp[i].coordinate
      for (let j = num; j <= newBoard.length; j++) {
        if (this.horizontal(coordinate, j) && this.vertical(coordinate, j) && this.block(coordinate, j)) {
          clear()
          console.log(newBoard);
          sleep(200)
          newBoard[coordinate[0]][coordinate[1]] = j;
          temp[i].value = j;
          break;
        } else {
          if (j === 9) {
            newBoard[coordinate[0]][coordinate[1]] = 0;
            temp[i].value = 0;
            i -= 2;
          }
        }
      }
    }
    clear()
    console.log(newBoard);
  }

  // Returns a string representing the current state of the board
  board(str) {
    let result = [];
    var count = 0
    for (let i = 0; i < 9; i++) {
      result.push([])
      for (let j = 0; j < 9; j++) {
        result[i].push(Number(str[count]));
        count++;
      }
    }
    return result;
  }

  checkZero() {
    for (let i = 0; i < this.boardGame.length; i++) {
      for (let j = 0; j < this.boardGame[i].length; j++) {
        if (this.boardGame[i][j] === 0) {
          this.zero.push({value: this.boardGame[i][j], coordinate: [i, j]})
        }
      }
    }
    return this.zero;
  }

  horizontal(coordinate, num) {
    let x = coordinate[0];
    for (let i = 0; i < this.boardGame.length; i++) {
      if (this.boardGame[x][i] == num) {
        return false;
      }
    }
    return true;
  }

  vertical(coordinate, num) {
    let y = coordinate[1];
    for (let i = 0; i < this.boardGame.length; i++) {
      if (this.boardGame[i][y] == num) {
        return false;
      }
    }
    return true;
  }

  block(coordinate, num) {    
    var xstart = 3 * (Math.floor(coordinate[0]/3));
    var ystart = 3 * (Math.floor(coordinate[1]/3));
    for (let i = xstart; i <= xstart+2; i++) {
      for (let j = ystart; j <= ystart+2; j++) {
        if (this.boardGame[i][j] == num) {
          return false;
        }
      }
    }
    return true;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
.toString()
.split("\n")[0]

var game = new Sudoku(board_string)
game.checkZero() //find '0'

// Remember: this will just fill out what it can and not "guess"
game.solve()

// console.log(game.boardGame);

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function clear() {
  console.clear()
}