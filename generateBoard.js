class Board {
    static generateBoard(str) {
        let count = 0
        let board = []
        for (let i = 0; i < 9; i++) {
            let tmp = []
            for (let j = 0; j < 9; j++) {
                tmp.push(Number(str[count]))
                count++
            }
            board.push(tmp)
        }
        return board
    }
}

module.exports = Board