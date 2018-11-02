"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.coordinate = []
    this.sudoBoard = this.board()
  }

  solve() {
    
    
    this.checkBoardIsAvail(this.sudoBoard)
    
    for (let i = 0; i < this.coordinate.length; i++) {
      let row = this.coordinate[i].coordinate[0]
      let col = this.coordinate[i].coordinate[1]
      
      while (true) {
        let value = this.coordinate[i].val
        if (this.checkHorizontal(row, col,value) == false &&
            this.checkVertical(row, col, value) ==  false &&
            this.checkGrid(row, col, value) == false) {
            this.sudoBoard[row][col] = this.coordinate[i].val
                
          break;
        } else {
          this.coordinate[i].val += 1
        }
      }

      if (this.coordinate[i].val == 10) {
        this.coordinate[i].val = 0
        this.sudoBoard[row][col] = this.coordinate[i].val
        i -= 2
      }
    }
    return console.log(this.sudoBoard);
    
  }
  checkHorizontal(r, c, value) {
    for (let i = 0; i < 9; i++) {
      if (this.sudoBoard[r][i] == value) {
        return true
        break;
      }
    }
    return false
  }

  checkVertical(r, c, value) {
    for (let i = 0; i < 9; i++) {
      if (this.sudoBoard[i][c] == value) {
        return true
        break;
      }
    }
    return false
  }

  checkGrid(r, c, value) {
    let i_start = 3 * Math.floor(r / 3)
    let i_end = i_start + 2
    let j_start = 3 * Math.floor(c / 3)
    let j_end = j_start + 2

    for (let i = i_start; i < i_end; i++) {
      for (let j = j_start; j < j_end; j++) {
        if (this.sudoBoard[i][j] == value) {
            return true
        }
      }
    }

    return false
  }

  checkBoardIsAvail(sudo) {
    

    for (let i = 0; i < sudo.length; i++) {
      for (let j = 0; j < sudo[i].length; j++) {
        let object = {}
        if (sudo[i][j] == 0) {
          object.coordinate = [i, j]
          object.val = 1
          this.coordinate.push(object)
        }
      }
    }


  }

  // Returns a string representing the current state of the board
  board() {
    let registeredArr = []
    let row = []
    let col = []

    //MAPPING NUMBER
    for (let i = 1; i <= this.board_string.length; i++) {
      registeredArr[i - 1] = {
        a: this.board_string[i - 1],
        c: i
      }
    }

    let counter = -1
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        counter++
        row.push(Number(
          registeredArr[counter].a
        ))
      }
      col.push(row)
      row = []
    }
    return col
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
game.solve()



