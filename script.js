/*
MODEL
    Objects:
    gameBoard

    [
        [0,0,0],
        [0,0,o],
        [0,0,x]
    ]
        methods:
            update
            validMove
    player
        instances: player1 and player2
        methods: move

        properties:
        score

CONTROLLER
    game
        start
        move(player, coordinate)

VIEW
    html


*/

function gameBoard(){

    var board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    //pieces

    const update = (coordinate, piece) => {
        
        const [row, column] = coordinate
        
        if(board[row][column] === 0 && checkWin() === false){
            
            `checkwin before board update {checkWin()}`
            board[row][column]=piece
        }
        
    }

    const checkWin = () => {
        // 1st row [0,0] [0,1] [0,2]
        // 2nd row [1,0] [1,1] [1,2]
        // 3rd row [2,0] [2,1] [2,2]
        // 1st col [0,0] [1,0] [2,0]
        // 2nd col [0,1] [1,1] [2,1]
        // 3rd col [0,2] [1,2] [2,2]
        // 1st dia [0,0] [1,1] [2,2]
        // 2nd dia [2,0] [1,1] [0,2]


        if (board[0][0] !== 0 && board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
            return true
        } else if(board[1][0] !== 0 && board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
            return true
        } else if(board[2][0] !== 0 && board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
            return true
        } else if(board[0][0] !== 0 && board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
            return true
        } else if(board[0][1] !== 0 && board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
            return true
        } else if(board[0][2] !== 0 && board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
            return true
        } else if(board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return true
        } else if(board[2][0] !== 0 && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            return true
        } else {
            return false
        }

    }


    const validMove = (coordinate) => {
        const [row, column] = coordinate
        return board[row][column] === 0 ? true : false
    }

    const getPiece = (coordinate) => {
        const [row, column] = coordinate
        boardValue = board[row][column]
        
        if (boardValue === 0) {
            return
        } else {
            return boardValue
        }

    }

    return {board, update, validMove, checkWin, getPiece}
}


function player(playerNumber){

    var gameScore = 0

    const piece = playerNumber === 1 ? 'x' : 'o'


    const move = (coordinate) => {
        return {coordinate, piece}
    }

    const addScore = () => {
        gameScore++
        return gameScore
    }
    const resetScore = () => {
        gameScore = 0
        return gameScore
    }

    const getScore = () => {
        return gameScore
    }

    return {piece, move, addScore, resetScore, getScore}
}

function game() {
    
    const board = gameBoard()
    const player1 = player(1)
    const player2 = player(2)
    let myactivePlayer
    let roundWinnner
    const start = () => {
        //TODO: gameboard reset
        //score reset
        myactivePlayer = player1
        roundWinnner = undefined

        return myactivePlayer
    }

    const switchTurn = () => {
        if(myactivePlayer === player1) {
            myactivePlayer = player2
        } else {
            myactivePlayer = player1
        } 

        return myactivePlayer
    }

    const updateBoard = (coordinate, piece) => {


    var msg

        if (board.validMove(coordinate) && board.checkWin() === false) {
            board.update(coordinate, piece)

            if (board.checkWin() === true){
                roundWinnner = myactivePlayer
                roundWinnner.addScore()

                msg = `${roundWinnner.piece} won!`
                /* TODO: 
                reset board (maybe button) but prevent new input
                */
            } else {
                switchTurn()
                msg = 'Next turn'
            }

        } else {
            msg = 'Invalid move'

        }
        
        return {board, msg}
    }

    const getActivePlayer = () => {return myactivePlayer}

    return {start, switchTurn, getActivePlayer, updateBoard, player1, player2}
}

const newGame = game()

const buttonStart = document.querySelector('#start')
buttonStart.addEventListener('click', e => {
    
    newGame.start()
    player1piece.textContent = newGame.player1.piece
    player2piece.textContent = newGame.player2.piece

    console.log(newGame)
})

const player1score = document.querySelector('#player1score')
const player2score = document.querySelector('#player2score')
const player1piece = document.querySelector('#player1piece')
const player2piece = document.querySelector('#player2piece')

const cells = document.querySelectorAll('.cell')


cells.forEach(cell => {
    cell.addEventListener('click', e => {
        
        const cellAddress = cell.id.split('')
        const newMove = newGame.getActivePlayer().move(cellAddress)
        const updatedBoard = newGame.updateBoard(newMove.coordinate, newMove.piece)

        if (updatedBoard.msg === "Next turn") {
            cell.textContent = newMove.piece
        } else if (updatedBoard.msg === "Invalid move") {
            //TODO: highlight cell in red
        } else if (updatedBoard.msg.substring(2) === 'won!'){
            cell.textContent = updatedBoard.board.getPiece(cellAddress)

            player1score.textContent = newGame.player1.getScore()
            player2score.textContent = newGame.player2.getScore()

        }
    })
});

