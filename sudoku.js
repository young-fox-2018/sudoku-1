"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
  }

  clearScreen () {
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

  solve() {
    let counter = 0
    let result = []
    let empty = []
    for(let i = 0; i < 9; i++){
      let arr = []
      for(let j = 0; j < 9; j++){
        arr.push(this.board_string[counter])
        if(this.board_string[counter] === "0") empty.push([i,j])
        counter++
      }
      result.push(arr)
    }

    for(let i = 0; i < empty.length; i++){
      let row = empty[i][0]
      let col = empty[i][1]

      for(let j = Number(result[row][col]+1); j <= 10; j++){
        if(j === 10){
          i -= 2
          result[row][col] = "0"
          break
        }
        result[row][col] = j

        //horizontal
        let rowSame = false
        for(let k = 0; k < 9; k++){
          if(k !== col){
            if(Number(result[row][k]) === j){
              rowSame = true
            }
          }
        }      

        //vertical
        let colSame = false
        for(let l = 0; l < 9; l++){
          if(l !== row){
            if(Number(result[l][col]) === j){
              colSame = true
            }
          }
        }

        //grid 
        function getLimit(input){
          if(input <= 2) return 3
          else if(input <= 5) return 6
          else if(input <= 8) return 9
        }
        let gridRowLimit = getLimit(row)        
        let gridColLimit = getLimit(col)

        let gridSame = false
        for(let m = gridRowLimit-3; m < gridRowLimit; m++){
          for(let n = gridColLimit-3; n < gridColLimit; n++){
            if(row !== m && col !== n){
              if(Number(result[m][n]) === j){
                gridSame = true
              }
            }
          }
        }
        if(rowSame === false && colSame === false && gridSame === false){
          //kalo ga ktemu yg sama, lanjut empty selanjutnya
          this.clearScreen()
          this.board(result)
          this.sleep(100)
          break
        }else if (j === 9 && rowSame === true || j === 9 && colSame === true || j === 9 && gridSame === true){ //kalo angka j === 9 && ktemu angka yg sama, backtrack
          this.clearScreen()
          this.board(result)
          this.sleep(100)
        }else{ //kalo angka j < 9 && ktemu angka yg sama, j lanjut
          this.clearScreen()
          this.board(result)
          this.sleep(100)
        }
      }      
    }    
    console.log("SUDOKU IS SOLVED!")
  }

  // Returns a string representing the current state of the board
  board(result) {
    return result.forEach(item => {
      console.log("|" + item.join("|") + "|")
    })
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

// console.log(game.board())
