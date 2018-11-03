class Sudoku {
  constructor(board_string) {
      this.character = board_string
      this.boards = []
      this.arrObj = []
  }

  cek(obj){
      console.log(obj.x)
      console.log(obj.y)
      console.log(obj.value)
  }
  cekGrid(obj){
      let startX = 3 * Math.floor(obj.x/3)
      let endX = startX + 2
      // console.log("STARTX"+startX+""+endX)
      let startY = 3 * Math.floor(obj.y/3)
      let endY = startY + 2
      // console.log("STARTX"+startY+""+endY)
      
      for( let i = startX; i <= endX; i++){
          for(let j = startY; j <= endY; j++){
              if(obj.value === this.boards[i][j]){
                  return false
              }
          }
      }
      return true
  }

  cekVertical(obj){
      for(let i = 0; i < 9; i++){
          if(obj.value === this.boards[i][obj.y]){
              return false
          }
      }
      return true
  }

  cekHorizontal(obj){
      for(let j = 0; j < 9; j++){
          if(obj.value === this.boards[obj.x][j]){
              return false
          }
      }
      return true
  }

  board(){
      let count = 0
      for(let i = 0; i < 9; i++){
        let arrRow = []
        for(let j = 0; j < 9; j++){
          arrRow.push(Number(this.character[count]))
          count++
        }
        this.boards.push(arrRow)
      }
      return this.boards
  }

  solve(){
      let papan = this.board()
      console.log("--------------------Board Awal--------------------")
      console.log(papan)

      for( let i = 0; i < 9; i++){
          for(let j = 0; j < 9; j++){
              let obj = {
                  x: i,
                  y: j,
                  value: 0
              }
              if(this.boards[i][j] == 0){
                  this.arrObj.push(obj)
                  console.log("")
                  console.log(this.arrObj)
                  // if(this.cekVHG(this.arrObj) !== true){
                  //     i = this.arrObj[this.arrObj.length - 1].x
                  //     j = this.arrObj[this.arrObj.length - 1].y
                  //     console.log(`cek sebelum ${i}-${j}`)
                  // } else {
                  //     this.boards[this.arrObj[this.arrObj.length - 1].x][this.arrObj[this.arrObj.length - 1].y] = (obj.value + "")
                  //     i = this.arrObj[this.arrObj.length - 1].x
                  //     j = this.arrObj[this.arrObj.length - 1].y
                  // }
                  if(this.cekVHG(this.arrObj) === true){
                      console.log("LAST",this.arrObj[this.arrObj.length - 1])
                      let lastObj = this.arrObj[this.arrObj.length - 1]
                      this.boards[lastObj.x][lastObj.y] = obj.value
                      i = lastObj.x
                      j = lastObj.y
                      console.log("init"+i+"-"+j)
                  }
              }
          }
      }

      console.log("\n" + "Board Akhir")
      console.log(this.final())
      // return this.boards
      // console.log(this.boards)
  }

  cekVHG(arrObjk){ //cek vertical, horizontal, grid
      var lastElmt = arrObjk[arrObjk.length-1]
      // console.log(lastElmt)
      lastElmt.value += 1

      while(!this.cekHorizontal(lastElmt) || !this.cekVertical(lastElmt) || !this.cekGrid(lastElmt)){
          lastElmt.value += 1
      }
      // console.log(lastElmt)

      if(lastElmt.value === 10){
          lastElmt.value = 0
          this.boards[lastElmt.x][lastElmt.y] = 0
          return this.cekback(arrObjk) //return false / ulang
      } else {
          // console.log(lastElmt)
          return true //lanjut
      }     
  }

  cekback(arrObjk){ //backtrack
      arrObjk.pop()
      // return (arrObjk[arrObjk.length - 1])
      // return this.cekVHG(arrObjk)
      
      if(this.cekVHG(arrObjk)===true){
          return true
      } else {
          return this.cekVHG(arrObjk)
      }
  }

  final(){
      for(let i = 0; i < this.arrObj.length; i++){
          var element = this.arrObj[i]
          this.boards[element.x][element.y] = element.value
      }

      return this.boards
  }

}


var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
.toString()
.split("\n")[0]

//NEW GAME
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"

// console.log(game.board())
// console.log(game.cekVertical({ x: 1, y: 7, value: 1 }))
// console.log(game.cekHorizontal({ x: 1, y: 7, value: 5 }))
// console.log(game.cekGrid({ x: 1, y: 7, value: 9 }))
// console.log(game.cek({ x: 0, y: 1, value: 9 }))
// console.log(game.cekVHG([{ x: 0, y: 1, value: 9 },{ x: 1, y: 7, value: 5 }]))


console.log(game.solve())



// var input = [ 
//     { x: 0, y: 1, value: 4 },
//     { x: 0, y: 4, value: 3 },
//     { x: 0, y: 6, value: 9 },
//     { x: 0, y: 7, value: 9 },
//     { x: 0, y: 8, value: 9 } 
// ]
// console.log(game.board())
// console.log(game.cekVHG(input))