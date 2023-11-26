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


        if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
            return true
        } else if(board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
            return true
        } else if(board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
            return true
        } else if(board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
            return true
        } else if(board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
            return true
        } else if(board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
            return true
        } else if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return true
        } else if(board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            return true
        }

    }


    const validMove = (coordinate) => {
        const [row, column] = coordinate
        return board[row][column] === 0 ? true : false
    }

    return {board, update, validMove, checkWin}
}


function player(playerNumber){

    const piece = playerNumber === 1 ? 'x' : 'o'


    const move = (coordinate) => {
        return {coordinate, piece}
    }

    return {piece, move}
}

function game() {
    
    const newGame = gameBoard()
    const player1 = player(1)
    const player2 = player(2)
    let myactivePlayer
    const start = () => {
        //gameboard reset
        //score reset
        myactivePlayer = player1

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


    const getActivePlayer = () => {return myactivePlayer}

    return {start, switchTurn, getActivePlayer, player1, player2}
}