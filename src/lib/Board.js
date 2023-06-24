const createBoard = () => {
    return {    
        grid: [
            [1, 2, 2, 2, 2],
            [1, 1, 2, 2, 2],
            [1, 1, 0, 2, 2],
            [1, 1, 1, 2, 2],
            [1, 1, 1, 1, 2],
        ],
        get(x, y) {
            return this.grid[y][x]
        },
        won() {
            const winBoard = [
                [2, 1, 1, 1, 1],
                [2, 2, 1, 1, 1],
                [2, 2, 0, 1, 1],
                [2, 2, 2, 1, 1],
                [2, 2, 2, 2, 1],
            ]
            // const winBoard = [
            //     [1, 2, 2, 1, 2],
            //     [1, 0, 2, 2, 2],
            //     [1, 1, 2, 2, 2],
            //     [1, 1, 1, 2, 2],
            //     [1, 1, 1, 1, 2],
            // ]
            return JSON.stringify(winBoard) === JSON.stringify(this.grid)
        },
        validMoves(x, y) {
            const possibleMoves = [
                [x+1, y+2],
                [x+2, y+1],
                [x-1, y+2],
                [x-2, y+1],
                [x+1, y-2],
                [x+2, y-1],
                [x-1, y-2],
                [x-2, y-1],
            ]

            return possibleMoves.filter(move => (
                (move[0] >= 0 && move[1] >= 0) && 
                (move[0] <= 4 && move[1] <= 4)
            ))
        },
        isValidMove(source, destination) {
            const validMoves = this.validMoves(source[0], source[1])
            const isValid = validMoves.filter(move => (
                move[0] === destination[0] && move[1] === destination[1]
            ))

            if (isValid.length === 0) {
                return false
            }

            return true;
        },
        move(source, destination) {
            // make sure we only move to empty spaces
            if (this.get(destination[0], destination[1]) !== 0) {
                return false
            }

            const isValid = this.isValidMove(source, destination)
            if (!isValid) {
                return false
            }

            // move the pieces, swapping an empty space back to the source
            const piece = this.grid[source[1]][source[0]]
            this.grid[source[1]][source[0]] = this.grid[destination[1]][destination[0]]
            this.grid[destination[1]][destination[0]] = piece

            return true
        },
    }
}

module.exports = {
    createBoard
}