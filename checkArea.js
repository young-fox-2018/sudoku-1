class Area {
    static checkArea(board, coordinate, value) {
      let x = coordinate[0]
      let y = coordinate[1]
      let minI = x - (x % 3)
      let minJ = y - (y % 3)
      let count = 0
      for (let i = minI; i < minI + 3; i++) {
        for (let j = minJ; j < minJ + 3; j++) {
          if (value === board[i][j]) {
            count++
          }
        }
      }
      if (count >= 1) {
        return false
      }
      return true
    }
  }

// let tes = Area.checkArea([
// //   0  1  2  3  4  5  6  7  8
//     [1, 2, 3, 4, 5, 6, 7, 8, 9],    // 0
//     [4, 5, 6, 4, 5, 6, 7, 8, 9],    // 1
//     [7, 8, 9, 1, 2, 3, 4, 5, 6],    // 2
//     [7, 8, 9, 1, 2, 3, 4, 5, 6],    // 3
//     [7, 8, 9, 1, 2, 3, 4, 5, 6],    // 4
//     [7, 8, 9, 1, 2, 3, 4, 5, 6],    // 5
//     [7, 8, 9, 1, 2, 3, 4, 5, 6],    // 6
//     [7, 8, 9, 1, 2, 3, 4, 5, 6],    // 7
//     [7, 8, 9, 1, 2, 3, 4, 5, 6],    // 8
// ],[7, 1])

// console.log(tes)

module.exports = Area