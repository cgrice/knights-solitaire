const { createBoard } = require('./Board')

describe('Board', () => {
    it('has 5 rows and 5 columns', () => {
        const b = createBoard()
        expect(b.grid.length).toBe(5)
        expect(b.grid[0].length).toBe(5)
    })

    it('has one empty space at the start', () => {
        const b = createBoard()
        expect(b.get(2, 2)).toBe(0)
    })

    it('can check for valid moves', () => {
        const b = createBoard()

        expect(b.validMoves(2, 2).length).toBe(8)
        expect(b.validMoves(1, 1).length).toBe(4)
        expect(b.validMoves(0, 0).length).toBe(2)
        expect(b.validMoves(4, 4).length).toBe(2)
    })

    it('can move a piece', () => {
        const b = createBoard()

        let moved = b.move([3, 4], [2, 2])

        expect(b.get(2, 2)).toBe(1)
        expect(b.get(3, 4)).toBe(0)
        expect(moved).toBe(true)

        moved = b.move([1, 3], [3, 4])

        expect(b.get(1, 3)).toBe(0)
        expect(b.get(3, 4)).toBe(1)
        expect(moved).toBe(true)
    })

    it('can only make valid moves', () => {
        const b = createBoard()

        const moved = b.move([2, 1], [2, 2])

        expect(b.get(2, 2)).toBe(0)
        expect(b.get(2, 1)).toBe(2)
        expect(moved).toBe(false)
    })

    it('can only move to an empty space', () => {
        const b = createBoard()

        const moved = b.move([0, 4], [1, 2])

        expect(b.get(0, 4)).toBe(1)
        expect(b.get(1, 2)).toBe(1)
        expect(moved).toBe(false)
    })
})