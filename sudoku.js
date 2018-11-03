"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardNum = board_string
    this.enteries = []
    this.fixboard = this.board()
    
  }

  solve() {
    
    for (let i = 0; i < this.enteries.length; i++) {
      let valid = false
      while (true) {
        // jadi dia ngulang terus sampe ga ada data yang sama
        if((this.checkgrid(this.enteries[i].value,this.enteries[i].X,this.enteries[i].Y) === true) && (this.checkHorizontal(this.enteries[i].value,this.enteries[i].Y) === true )&& (this.checkvertical(this.enteries[i].value , this.enteries[i].X) ===true) ){
          this.fixboard[this.enteries[i].X][this.enteries[i].Y] = this.enteries[i].value
          //break buat berhentiin whilenYa jadi penanda
          break
        } else {
          // kalau dapat data yang sama valuenya ditambah 1 jadi g usah looping angka lagi
          this.enteries[i].value = this.enteries[i].value +1
        }
      }
      //backtrack kalau valueny 10 > balik ke value sebelumnya lalu valuenya dijadiin 0 lagi trus looping dari awal lagi
      if (this.enteries[i].value === 10) {
        this.enteries[i].value = 0
        this.fixboard[this.enteries[i].X][this.enteries[i].Y]  = this.enteries[i].value
        // inya minus 2 karna i nya diatas di plus 1 
        // jadi bisa balik ke i sebelumnya
        i = i - 2
      }
    }

    console.log(this.fixboard)

  }
  checkvertical(number,X){
    let isunik = true
    for(var i = 0 ; i < this.fixboard.length; i++ ){
      
      if(this.fixboard[X][i] === number){
        return false         
      }
    }
    return true
  }
checkHorizontal(number,y){
  let isunik = true
  for(var j = 0 ; j <this.fixboard.length; j++){
    if(this.fixboard[j][y] === number){
      isunik = false
    }
  }
  return isunik
}

checkgrid(number,X,Y){

 let xstart = 3*(Math.floor(X/3))
 let xend = xstart +2
 let ystart = 3*(Math.floor(Y/3))
 let yend = ystart+2
 let isunik= true
 for(var x = xstart; x <= xend; x++){
    for(var y = ystart ; y <= yend; y++ ){
      if(this.fixboard[x][y] === number){
        isunik = false
      } 
    }
  }
  return isunik
}
  check0(){
    
    for(var i = 0; i < this.fixboard.length ; i++){
      for(var j = 0; j < this.fixboard[i].length; j++){
        if(this.fixboard[i][j] === 0 ) {
         
          let obj = {
            X: i,
            Y: j,
            value: this.fixboard[i][j]
          }
          // obj.X = i
          // obj.Y = j
          // obj.value =this.fixboard[i][j]
          this.enteries.push(obj)
        }
      }
    }
    return this.enteries
  }
  // Returns a string representing the current state of the board
  board() {
    let board = []
    let count = 0
    for(var i = 0; i < 9; i++){
      let arr = []
      for(let j = 0 ; j < 9; j++){
        arr.push(Number(this.boardNum[count]))
        count++
      }
      board.push(arr)
    }
    return board
  }
  
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
const Random = Math.floor(Math.random() * 15)
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[Random]

var game = new Sudoku(board_string)


// Remember: this will just fill out what it can and not "guess"
// console.log(game.board())
game.board()
game.check0()
// console.log(game.check0())
game.solve()
game.board()
// console.log(game.checkvertical(1,0,0))
// console.log(game.checkHorizontal(1,1,0))
// console.log(game.checkgrid(1,0,0))


