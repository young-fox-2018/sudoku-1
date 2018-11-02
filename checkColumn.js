class Columns {
    static checkColumns(board, coordinate) {
        let x = coordinate[0]
        let y = coordinate[1]
        let count = 0
        for (let i = 0; i < board.length; i++) {
            if (board[x][y] === board[i][y] ) {
                count++
            }
        }
        if (count > 1) {
            return false
        }
        return true
    }
}

// let tes = Columns.checkColumns([[1, 2, 3],
//                                 [2, 3, 3],
//                                 [2, 1, 2]],[0,2])
// let tes2 = Columns.checkColumns([[1, 2, 1],
//                                  [2, 1, 1],
//                                  [3, 3, 2]])
// console.log(tes)

module.exports = Columns