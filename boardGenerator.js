const board_string = require('./boardString')

class BoardGenerator {
    static board() {
        let board = []
        let index = 0
        for (let i = 0; i < 9; i++) {
            let arr = []
            for (let j = 0; j < 9; j++) {
                arr.push(Number(board_string[index]))
                index++
            }
            board.push(arr)
        }
        return board
    }
}

module.exports = BoardGenerator