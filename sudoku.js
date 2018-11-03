"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.fixboard = this.board()
  }


  //MAIN FUNCTION
  solve() {
    let board = this.fixboard
    let isEmpty = this.checkEmpty()
    
    // console.log(isEmpty, "INII IS EMPTY")
    for(let iArrObj = 0 ; iArrObj < isEmpty.length ; iArrObj++){

      while(true){
        console.log(isEmpty[iArrObj]["value"], "INI VALUE YANG MASUK", this.checkCol(isEmpty[iArrObj]["y"], isEmpty[iArrObj]["value"]), "CHECK COL", this.checkRow(isEmpty[iArrObj]["x"], isEmpty[iArrObj]["value"]), "CHECK ROW",  this.checkGrid(isEmpty[iArrObj]["x"], isEmpty[iArrObj]["y"], isEmpty[iArrObj]["value"]), "CHECK GRID")
        if( this.checkCol(isEmpty[iArrObj]["y"], isEmpty[iArrObj]["value"]) && this.checkRow(isEmpty[iArrObj]["x"], isEmpty[iArrObj]["value"]) && this.checkGrid(isEmpty[iArrObj]["x"], isEmpty[iArrObj]["y"], isEmpty[iArrObj]["value"]) ){
          board[isEmpty[iArrObj]["x"]][isEmpty[iArrObj]["y"]] = isEmpty[iArrObj]["value"]
          break;
        }
        else{
          isEmpty[iArrObj]["value"] ++
          console.log(isEmpty[iArrObj]["value"], "INI VALUE SESUDAH DITAMBAH")
        }
      }
      if(isEmpty[iArrObj]["value"] > 9){
        isEmpty[iArrObj]["value"] = 0
        board [isEmpty[iArrObj]["x"]] [isEmpty[iArrObj]["y"]] = isEmpty[iArrObj]["value"]
        iArrObj -= 2
      }
    }
    console.log(board, "sesudah di solve")
  }


  //FIND COORDINATES OF "0"
  checkEmpty(){
    let emptyPost = [] 
    for(let row = 0 ; row < this.fixboard.length ; row++) {
      for(let col = 0 ; col < this.fixboard[row].length ; col++) {
        if(this.fixboard[row][col] === 0) {
          let obj = {
            x: row,
            y: col,
            value: 1
          }
          emptyPost.push(obj)
        }
      }
    }
    return emptyPost
  }

  //CHECK ALL COL with GIVEN ROW
  checkRow(X, suggestion){
    for(let col = 0 ; col < 9 ; col++){
      if(suggestion === this.fixboard[X][col]){
        return false
      }
    }
    return true
  }

  //CHECK ALL ROW with GIVEN COL
  checkCol(Y, suggestion){
    for(let row = 0 ; row < 9 ; row++){
      if(suggestion === this.fixboard[row][Y]){
        return false
      }
    }
    return true
  }

  //CHECK GRID 3x3
  checkGrid(X, Y, suggestion){
    let initialX = 3 * (Math.floor(X / 3))
    let initialY = 3 * (Math.floor(Y / 3))
    
    for(let row = initialX ; row <= (initialX + 2) ; row++){
      for(let col = initialY ; col <= (initialY + 2) ; col++){
        if(suggestion === this.fixboard[row][col]){
          return false
        }
      }
    }
    return true
  }



  // Returns a string representing the current state of the board
  board() {
    let str = this.board_string.split("")
    let tmp = []
    while(str.length !== 0){
      tmp.push(str.splice(0,9))
    }

    for(let i = 0; i < tmp.length ; i++){
      for (let j = 0 ; j < tmp[i].length  ; j++){
        tmp[i][j] = Number(tmp[i][j])
      }
    }
    return tmp    
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
game.checkEmpty()
game.solve()
game.board()

// console.log(game.board())
