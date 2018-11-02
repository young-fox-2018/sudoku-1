"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString=board_string
  }
  
  solve() {
    let finalBoard = this.board()
    var targets = this.checkTarget()
    
    for(let i = 0; i < targets.length; i++) {
      for(let j = targets[i][2]; j <= 9; j++) {
        console.log(targets[i])
        console.log(j)
        console.log(finalBoard)
        this.sleep(50)
        this.clearScreen()
        let cekFinal = true
        // console.log(j)
        
        if(this.vertikal(targets[i], j, finalBoard) !== true) {
          cekFinal = false
        }
        
        if(this.horizontal(targets[i], j, finalBoard) !== true) {
          cekFinal = false
        }
        
        if(this.grid(targets[i], j, finalBoard) !== true) {
          cekFinal = false
        }
        
        // let tampung = j
        // console.log(tampung)
        
        if(cekFinal === true) {
          finalBoard[targets[i][0]][targets[i][1]] = j
          targets[i][2] = j
          break;
        } 

        if(j === 9 && cekFinal === false) {
            finalBoard[targets[i][0]][targets[i][1]] = 0
            targets[i][2] = 0
            i -= 2
          }
          
        }
      }
  
      return finalBoard
    }

  vertikal(target, number, board) {
    let cekBoardVertikal = board
    let cekVertikal = true
    for(let i = 0; i < cekBoardVertikal.length; i++) {
      if(cekBoardVertikal[i][target[1]] === number) {
        cekVertikal = false
      }
    }
    return cekVertikal
  }

  horizontal(target, number, board) {
    let cekBoardHorizontal = board
    let cekHorizontal = true
    for(let i = 0; i < cekBoardHorizontal.length; i++) {
      if(cekBoardHorizontal[target[0]][i] === number) {
        cekHorizontal = false
      }
    }
    return cekHorizontal
  }

  grid(target, number, board) {
    let cekBoardGrid = board
    let coorI = 3 * Math.floor(target[0]/3) 
    let coorJ = 3 * Math.floor(target[1]/3)
    let cekGrid = true
    //console.log(cekBoardGrid)

    for(let i = coorI; i <= coorI+2; i++) {
      for(let j = coorJ; j <= coorJ+2; j++) {
        if(cekBoardGrid[i][j] === number) {
          cekGrid = false
        }
      }
    }
    return cekGrid
  }

  // Returns a string representing the current state of the board
  board() {
    let boardResult = []
    let countNum = 0
    for(let i = 0; i < 9; i++) {
      let temp = []
      for(let j = 0; j < 9; j++) {
        temp.push(Number(this.boardString[countNum]))
        countNum += 1
      }
      boardResult.push(temp)
    } 
    return boardResult
  }

  checkTarget() {
    let cekBoard = game.board()
    let target = []

    for(let i = 0; i < cekBoard.length; i++) {
      for(let j = 0; j < cekBoard[i].length; j++) {
        if(cekBoard[i][j] === 0) {
          target.push([i, j, 1])
        }
      }
    }
    return target
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
    // return main.stdout.write('\033c');
    console.clear();
  }
  

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0 ]
// console.log(board_string)
var game = new Sudoku(board_string)
// console.log(game)
// Remember: this will just fill out what it can and not "guess"
console.log(game.solve())

// console.log(game.board())
// console.log(game.checkTarget())

// console.log(game.grid([2, 2], 3))