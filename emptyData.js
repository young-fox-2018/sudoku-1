module.exports = function emptyData(board) {
    let data = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let obj = {}
        if (board[i][j] === 0) {
          obj.coordinate = [i, j]
          obj.value = 0
          data.push(obj)
        }
      }
    }
    return data
  }

