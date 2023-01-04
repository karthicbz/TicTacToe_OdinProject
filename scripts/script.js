// const gameBoard = {
//     gameArray: [],
// }

const gameBoard = (()=>{
    const gameArray = [];
    const addItemToArray = (position, value)=>{
        gameArray.splice(position, 1, value);
        console.log(gameArray);
    };
    const makeGamepad = ()=>{
        for(let i=0; i<9; i++){
            gameArray.push('');
        }
    };
    return {addItemToArray, makeGamepad};
})();

const players = (player1, player2)=>{
    return {player1, player2};
}

function game(){
    const playerNames = [];
    for(let i=1; i<=2; i++){
        playerNames.push(prompt(`player${i} your name?`));
    }
    players.player1 = 'X';
    players.player2 = 'O';
    players.playerOneName = playerNames[0];
    players.PlayerTwoName = playerNames[1];
}