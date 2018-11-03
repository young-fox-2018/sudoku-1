"use strict"

class Sudoku {
  constructor(board_string) {
      this.sudokuBoard = board_string
  }

  solve() {
    let myBoard = this.board()
    let backTrack = []
    let rowTemp = 0
    let columnTemp = 0
    let startCounter = 1
  

    for ( let i =0; i < myBoard.length; i++) {
        for ( let j = 0; j < myBoard[i].length; j++) {
            let isSuccess = false
            rowTemp = 0
            columnTemp = 0
            if ( myBoard[i][j] === 0) {
                for ( let num = startCounter; num <= myBoard.length; num++) {
                    if (checkNumber(myBoard, i, j, num)) {
                        // console.log(num, 'yg bisa di input di ', i, j)
                        myBoard[i][j] = num
                        isSuccess = true
                        backTrack.push({
                            row: i,
                            column: j,
                            value: num
                        })
                        startCounter = 1
                        console.log('\x1b[32m')
                        console.log (myBoard)
                        sleep(100)
                        console.clear();
                        break

                        
                        // if (i < 4) {
                        //     console.log(backTrack[backTrack.length-1])
                        // }
                    } 
                   
                }

                if (!isSuccess) {
                    


                    let lastBacktrack = backTrack.slice(-1)[0];
                    backTrack.splice(backTrack.length-1);
 
                    rowTemp = lastBacktrack.row
                    columnTemp = lastBacktrack.column
                    
                    
                    
                    myBoard[rowTemp][columnTemp] = 0
                    
                    i = rowTemp
                    j = columnTemp - 1
                    // console.log(lastBacktrack.value + " ---------- " + backTrack[backTrack.length-1].value);
                    startCounter = lastBacktrack.value + 1
                    // backTrack.pop()
                    
                    // while (num > 9) {
                        
                    //     // console.log(i + "-" + j)
                    //     rowTemp = backTrack[backTrack.length-1].row
                    //     columnTemp = backTrack[backTrack.length-1].column
                        
                    //     // console.log(num, 'num nya adalah ini while' + rowTemp + "-" + columnTemp)
                        

                    //     myBoard[rowTemp][columnTemp] = 'x'
                    //     i = rowTemp
                    //     j = columnTemp
                    //     num = backTrack[backTrack.length-1].value + 1
                    //     backTrack.pop()
                    // }

                    
                }

            }
        }
    }
    
    // console.log(backTrack)
    console.clear()
    console.log('Finish!')
    console.log(myBoard)

    function sleep (milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds) {
            break;
          }
        }
      }

    function checkNumber(myBoard, row, column, num) {

        // check row
        for ( let i = 0; i < myBoard.length; i++) {
            if ( myBoard[i][column] === num) {
                return false
            }   
        }

        // check column
        for ( let i = 0; i < myBoard.length; i++) {
            // console.log(row, 'rownya')
            if ( myBoard[row][i] === num) {
                return false
            }   
        }

        // check group block
        let rowAwal = 3 * Math.floor(row/3)
        let columnAwal = 3 * Math.floor(column/3)

        for ( let i = rowAwal; i < rowAwal+3; i++) {
            for ( let j = columnAwal; j < columnAwal+3; j++) {
                // console.log(i, 'ini error')
                if (myBoard[i][j] === num) {
                    return false
                }
            }
        }

        return true
    }

  }

  // Returns a string representing the current state of the board
  board() {
      //create board 
        let myBoard = this.sudokuBoard
        let dimensi = Math.sqrt(myBoard.length)
        let result = []
        let counter = 0
        for ( let i = 0; i < dimensi; i++) {
            result.push([])
            for ( let j = 0; j < dimensi; j++) {
                result[i].push(JSON.parse(myBoard[counter]))
                counter += 1
            }
        }

        return result
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



