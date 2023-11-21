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
        
        if(board[row][column] ===0){
            board[row][column]=piece
        }
        
        
        
    }

    return {board, update}
}