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
        
        if(board[row][column] === 0){
            board[row][column]=piece
        }
        
        //check if there is a winner
        //8 combinations

        
        
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

    return {board, update, validMove, checkWin}
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
        //gameboard reset
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

    //player click board
    //get coordinate
    //send coordinate and piece to board
        //check valid move


    var msg

        if (board.validMove(coordinate)) {
            board.update(coordinate, piece)

            console.log(board.checkWin())

            if (board.checkWin()){
                roundWinnner = myactivePlayer
                roundWinnner.addScore()

                msg = `${roundWinnner.piece} won!`
                /* TODO: 
                add score to winner
                reset board (maybe button) but prevent new input
                update counters display
                */
            } else {
                switchTurn()
                msg = 'Next turn'
            }

        } else {
            //move not valid
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

    console.log(newGame)
})

const cells = document.querySelectorAll('.cell')

cells.forEach(cell => {
    cell.addEventListener('click', e => {
        const cellAddress = cell.id.split('')
        const newMove = newGame.getActivePlayer().move(cellAddress)
        const updatedBoard = newGame.updateBoard(newMove.coordinate, newMove.piece)
        console.log(cellAddress)
        console.log(updatedBoard)
        console.log(updatedBoard.msg.substring(2))

        if (updatedBoard.msg === "Next turn") {
            cell.textContent = newMove.piece
        } else if (updatedBoard.msg === "Invalid move") {
            //highlight cell in red
        } else if (updatedBoard.msg.substring(2) === 'won!'){
            cell.textContent = newMove.piece
            //update score
        }
    })
});

