class Sudoku {
  constructor(board_string) {
      this.character = board_string
      this.boards = []
      this.arrObj = []
  }

  // --- cek board 3x3 ---
  cekGrid(obj){
      let startX = 3 * Math.floor(obj.x/3)
      let endX = startX + 2
      //debug console.log("STARTX"+startX+""+endX)
      let startY = 3 * Math.floor(obj.y/3)
      let endY = startY + 2
      //debug console.log("STARTX"+startY+""+endY)
      
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

  //----just for generate initial board----
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

  // ---- change the 0 value inside board ---
  solve(){
      let papan = this.board() //call board function to generate sudoku board
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
                  // debug console.log(this.arrObj)

                  if(this.cekVHG(this.arrObj) === true){
                      // debug console.log("LAST",this.arrObj[this.arrObj.length - 1])
                      let lastObj = this.arrObj[this.arrObj.length - 1]
                      this.boards[lastObj.x][lastObj.y] = obj.value
                      i = lastObj.x
                      j = lastObj.y
                      // debug console.log("new init: "+i+"-"+j)
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
      // debug console.log(lastElmt)
      lastElmt.value += 1

      while(!this.cekHorizontal(lastElmt) || !this.cekVertical(lastElmt) || !this.cekGrid(lastElmt)){
          lastElmt.value += 1
      }

      if(lastElmt.value === 10){
          lastElmt.value = 0
          this.boards[lastElmt.x][lastElmt.y] = 0
          return this.cekback(arrObjk) // repeat backtrack until true
      } else {
          return true // lanjut / next step
      }     
  }

  //----backtrack----
  cekback(arrObjk){ 
      arrObjk.pop() // delete last objeck in array
      
      if(this.cekVHG(arrObjk)===true){
          return true
      } else {
          return this.cekVHG(arrObjk) // repeat check Vertical,Horizontal,Grid of last objeck in array
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