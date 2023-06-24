import { useState, useEffect } from 'react'

const { createBoard } = require("./lib/Board")

const Board = () => {
    // const [source, setSource] = useState(null)
    const [empty, setEmpty] = useState([2, 2])
    const [board, setBoard] = useState()
    const [rotations, setRotations] = useState(null)
    const [moves, setMoves] = useState([])
    const [winning, setWinning] = useState(false)

    let audio = new Audio("/marble.m4a")
    
    
    useEffect(() => {
        const b = createBoard()
        setBoard(b)

        const getRotate = () => {
            const deg = (Math.floor(Math.random() * 90) + 1)
            return `rotate(${deg}deg)`
        }

        const marbleRotations = b.grid.map(
            row => row.map(marble => (
                getRotate()
            ))
        )
        setRotations(marbleRotations)
    }, [])

    useEffect(() => {
        if(board) {
            if(board.won()) {
                let win = new Audio("/win.wav")
                win.play()
                setWinning(true)
            }
        }


    }, [moves, board])
    
    const getColour = (x, y) => {
        const type = board.get(x, y)
        if (type === 2) {
            return 'red'
        }

        if (type === 1) {
            return 'blue'
        }

        return 'empty'
    }

    const getHighlight = (x, y) => {
        const isValid = board.isValidMove([x, y], empty)
        
        return isValid ? 'valid' : 'invalid'
    }

    const wasMoved = (x, y) => {
        if (moves.length === 0) return ''

        const lastMove = moves[moves.length - 1][1]
        if(lastMove[0] === x && lastMove[1] === y) {
            return 'moved'
        }

        return ''
    }

    const onClickSpace = (x, y) => (event) => {
        const moved = board.move([x, y], empty)

        if(moved) {
            audio.play()
            setMoves([...moves, [ [x,y], empty ]])
            setEmpty([x, y])
            setBoard(board)
        }
    }

    const undo = () => {
        if(moves.length === 0) return false

        const lastMove = moves[moves.length - 1]
        board.move(lastMove[1], lastMove[0])
        moves.pop()
        setMoves(moves)
        setEmpty(lastMove[1])
        setBoard(board)
    }

    const reset = () => {
        setWinning(false)
        setMoves([])
        const b = createBoard()
        setBoard(b)
        setEmpty([2, 2])
    }

    const winningMessage = () => {
        if (moves.length <= 45) {
            return "Amazing!!"
        }

        if (moves.length <= 50) {
            return "Wow!"
        }

        if (moves.length <= 55) {
            return "Congratulations!"
        }

        return "Well done!"
    }

    return (
        <div className="app">
            <div className="intro">
                <h1>Knight's Solitaire!</h1>
                <p>Move all of the marbles to the opposite side of the board. You can only move marbles like a knight in chess.</p>
                <p>45 moves and under is excellent.</p>
                <p>Fewer than 50 is good.</p>
                <p>50 to 55 moves is average.</p>
            </div>
            <div className="game">
                <div className="board">
                    {winning && (
                        <div className="won">
                            <h1>YOU WIN!</h1>
                            <p>You completed the game in {moves.length} moves!</p>
                            <p>{winningMessage()}</p>
                            <button onClick={reset}>Play Again</button>
                        </div>
                    )}
                    {board && board.grid.map( (row, x) => (
                        <div className="row">
                            {row.map( (column, y) => (
                                <div 
                                    className={`space ${getHighlight(x, y)}`}
                                    onClick={onClickSpace(x, y)}
                                >
                                    <div 
                                        className={`marble ${getColour(x, y)} ${wasMoved(x, y)}`}
                                        style={{
                                            transform: rotations[y][x],
                                        }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="moves">
                    {moves.length} Moves
                    <button onClick={undo}>Undo</button>
                </div>
            </div>
        </div>
        
    )
}

export default Board