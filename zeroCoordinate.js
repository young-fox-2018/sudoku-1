const BoardGenerator = require('./boardGenerator')

class Zero {
    static zeroCoordinate() {
        let board = BoardGenerator.board()
        let arr = []
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                let obj = {}
                if (board[i][j] === 0) {
                    obj.coordinate = [i, j]
                    obj.value = board[i][j]
                    arr.push(obj)
                }
            }
        }
        return arr
    }
}

module.exports = Zero