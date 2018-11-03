class Sudoku {
  constructor(board_string) {
      this.character = board_string
      this.boards = []
      this.arrObj = []
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
      console.log("-----------Board Awal-----------")
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
                  // console.log("")
                  // console.log(this.arrObj)

                  if(this.cekVHG(this.arrObj) === true){
                      // console.log("LAST",this.arrObj[this.arrObj.length - 1])
                      let lastObj = this.arrObj[this.arrObj.length - 1]
                      this.boards[lastObj.x][lastObj.y] = obj.value
                      i = lastObj.x
                      j = lastObj.y
                      // console.log("init"+i+"-"+j)
                  }
              }
          }
      }

      console.log("\n" + "-----------Board Akhir-----------")
      console.log(this.final())
  }

  //----cek vertical, horizontal, grid-----
  cekVHG(arrObjk){ 
      var lastElmt = arrObjk[arrObjk.length-1]
      // console.log(lastElmt)
      lastElmt.value += 1

      while(!this.cekHorizontal(lastElmt) || !this.cekVertical(lastElmt) || !this.cekGrid(lastElmt)){
          lastElmt.value += 1
      }

      if(lastElmt.value === 10){
          lastElmt.value = 0
          this.boards[lastElmt.x][lastElmt.y] = 0
          return this.cekback(arrObjk) // ulang backtrack
      } else {
          return true //lanjut
      }     
  }

  //----backtrack----
  cekback(arrObjk){ 
      arrObjk.pop()
      
      if(this.cekVHG(arrObjk)===true){
          return true
      } else {
          return this.cekVHG(arrObjk)
      }
  }

  //----print final board----
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
game.solve()