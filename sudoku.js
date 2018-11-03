"use strict"

class Sudoku {
  constructor(board_string) {
      this.board_string = board_string
      this.grid = this.board()
  }

  isRow(grid) {
    for (let i = 0; i < grid.length; i++) {
        let current = grid[i]
        // check row here
        for (let j = 0; j < grid[0].length; j++) {
            for (let k = j + 1; k < grid[0].length; k++) {
                if (current[j] == current[k] && (current[j] != 0 || current[k] != 0)) {
                  return false
                }
            }
        }
    }
    return true
  }

  isColumn(grid) {
      let output = []
      for (let i = 0; i < grid[0].length; i++) {
          let temp = []
          for (let j = 0; j < grid.length; j++) {
              temp.push(grid[j][i])
          }
          output.push(temp)
      }
      return this.isRow(output)
  }

  isBox(grid) {
      let output = []
      for (let row = 0; row < grid.length; row += 3) {
          for (let col = 0; col < grid[row].length; col += 3) {
              let xStart = 3 * Math.floor( row / 3 )
              let xEnd = xStart + 2
              let yStart = 3 * Math.floor( col / 3 )
              let yEnd = yStart + 2
              let temp = []
              for ( let i = xStart; i <= xEnd; i++ ) {
                  for ( let j = yStart; j <= yEnd; j++ ) {
                      temp.push(grid[i][j])
                  }
              }
          output.push(temp)
          }
      }
      return this.isRow(output)
  }

  unassigned() {
    let output = []
    let counter  = 0
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9 ; j++) {
            if (board_string[counter] == "0" ) {
              output.push({
                x: i,
                y: j,
                value: 0,
                j_index: 1
              })
            }
        counter += 1
        }
    };
    return output
  }

  // Returns a string representing the current state of the board
  board() {
      let output = []
      let counter = 0
      
      for (let i = 0; i < 9; i++) {
          let temp = []
          for (let j = 0; j < 9; j++) {
              temp.push(Number(this.board_string[counter]))
              counter += 1
          } 
          output.push(temp)
      }
      return output
  }

  solve() {
       let grid = this.board()
       let unassigned = this.unassigned()
       // backtrack
       for (let i = 0; i < unassigned.length; i++) {
            for (let j = 1; j <= 9; j++) {
                unassigned[i].value = j
                grid[unassigned[i].x][unassigned[i].y] = unassigned[i].value
                if (this.isBox(grid) && this.isColumn(grid) && this.isRow(grid)) {
                    break;
                } else {
                    if (j == 9) {
                        unassigned[i].value = 0
                        grid[unassigned[i].x][unassigned[i].y] = 0
                        i--
                        j = unassigned[i].value
                        // step if di bawah ini aneh tpi nyata.. kalau misalnya dicabut nnti ada infinite loop
                        // untuk unassigned value 26-29 trus 29-26. value 26-29 berlaku untuk test case 0 
                        if (unassigned[i].value == 9) { 
                            unassigned[i].value = 0 
                            grid[unassigned[i].x][unassigned[i].y] = 0
                            i--
                            j = unassigned[i].value
                        }
                    }
                }
            }
       }

       // display
       let output = ""
       for (let i = 0; i < 9; i++) {
            if (i == 3 || i == 6) {
                console.log("-----------------------")
            }
        
            let temp = ""
            for (let j = 0; j < 9; j++) {
                    if (j == 3 || j == 6) {
                        temp += " | "
                    }
                    temp += grid[i][j] + " "
            }
            console.log(temp)
        }
  }
 
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)

var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

game.solve()







