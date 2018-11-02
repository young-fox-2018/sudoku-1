class Rows {
    static checkRows(board, coordinate) {
        //console.log(coordinate)
        let x = coordinate[0]
        let y = coordinate[1]
        let count = 0
        for (let i = 0; i < board.length; i++) {
            if (board[x][y] === board[x][i] ) {
                count++
            }
        }
        if (count > 1) {
            return false
        }
        return true
    }
}

// let tes = Rows.checkRows([[1, 2, 3],
//                           [2, 1, 1],
//                           [3, 2, 2]],[2,0])
// let tes2 = Rows.checkRows([[1, 2, 3],
//                             [1, 2, 3],
//                             [2, 1, 1]])
//console.log(tes)

module.exports = Rows