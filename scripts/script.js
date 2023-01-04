// const gameBoard = {
//     gameArray: [],
// }

const gameBoard = (()=>{
    const gameArray = [];
    const addItemToArray = (position, player)=>{
        gameArray.splice(position, 1, player.value);
        console.log(`${gameArray.slice(0,3)}\n${gameArray.slice(3,6)}\n${gameArray.slice(6,9)}`);
    };
    const makeGamepad = ()=>{
        for(let i=0; i<9; i++){
            gameArray.push('*');
        }
    };
    const checkWinner = (player)=>{
        if(gameArray[0] == player.value && gameArray[1] == player.value && gameArray[2] == player.value){
            // console.log(`player${player.value} wins`);
            return true;
        }else if(gameArray[3] == player.value && gameArray[4] == player.value && gameArray[5] == player.value){
            // console.log(`player${player.value} wins`);
            return true;
        }else if(gameArray[2] == player.value && gameArray[4] == player.value && gameArray[6] == player.value){
            // console.log(`player${player.value} wins`);
            return true;
        }
    }
    return {addItemToArray, makeGamepad, checkWinner};
})();

const players = (value)=>{
    return {value};
}

// function game(){
//     const player1 = players('X');
//     const player2 = players('O');
//     gameBoard.makeGamepad();
// }

const player1 = players('X');
const player2 = players('O');
gameBoard.makeGamepad();
for(let i=0; i<9; i++){
    if(i%2 == 0){
        gameBoard.addItemToArray(prompt('Player1 your position?'), player1);
        if(gameBoard.checkWinner(player1) == true){
            console.log(`player${player1.value} wins`)
            break;
        }
    }else{
        gameBoard.addItemToArray(prompt('Player2 your position?'), player2);
        if(gameBoard.checkWinner(player2) == true){
            console.log(`player${player2.value} wins`)
            break;
        }
    }
}