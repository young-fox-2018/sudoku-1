"use strict"

class Sudoku {
  constructor(board_string) {
    this.data = board_string
    this.nilai = []
    this.papan = this.board()
  }

  solve() {
    // const angka =  [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9]
    
    for (let i = 0; i < this.nilai.length; i++) {
      let valid = false
      while (true) {
        if((this.cekgrid(this.nilai[i].value,this.nilai[i].x,this.nilai[i].y) === true) && (this.cekhor(this.nilai[i].value,this.nilai[i].y) === true )&& (this.cekver(this.nilai[i].value,this.nilai[i].x) ===true) ){
          this.papan[this.nilai[i].x][this.nilai[i].y] = this.nilai[i].value
          break
        
        } else {
          this.nilai[i].value = this.nilai[i].value +1
        }
      }
      if (this.nilai[i].value === 10) {
        this.nilai[i].value = 0
        this.papan[this.nilai[i].x][this.nilai[i].y]  = this.nilai[i].value
        i = i - 2
      }

    }
    console.log(this.papan)
  }
  

  cek0() {
    for (let i = 0; i < this.papan.length; i++) {
      // console.log(papan[i])
      for (let j = 0; j < this.papan[i].length; j++) {
        if(this.papan[i][j] == 0) { 
          this.nilai.push({ value: this.papan[i][j], x: i, y:j})
        }        
      }
    }
    return this.nilai
  }

  cekhor(number , y) {
    let condition = true    
    for (let j = 0; j < this.papan.length; j++) {
      if (this.papan[j][y] == number){
        condition = false
      }     
    }
    return condition 
  }

  cekver(number , x) {
    let condition = true    
    for (let j = 0; j < this.papan.length; j++) {
      if (this.papan[x][j] == number){
        condition = false
      }     
    }
    return condition 
  }

  cekgrid(number , x , y) {
    let condition = true
    let xstart = 3 * ( Math.floor(x/3))
    let xend = xstart + 2
    let ystart = 3 * (Math.floor(y/3))
    let yend = ystart +2

    for (let i = xstart; i <= xend; i++) {
      for (let j = ystart; j <= yend; j++) {
        if (this.papan[i][j] == number){
          condition = false
        }
      }
      
    }
    return condition 
    
  }
  // Returns a string representing the current state of the board
  board() {
    let dataangka = this.data
    let counter = 0
    let papan = []
    for (let i = 0; i < 9; i++) {
      let dalam = []
      for (let j = 0; j < 9; j++) {
        dalam.push(Number(dataangka[counter]))
        counter++
      }
      papan.push(dalam)
    }
    return papan
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
const random = Math.floor(Math.random() *15)
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[random]

// instance ==> manggil sudokunya
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.board()
game.cek0()
game.solve()
game.board()

// console.log(game.cekverhor())
//console.log(game.board())
