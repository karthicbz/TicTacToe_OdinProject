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
            gameArray.push(i);
        }
        console.log(`${gameArray.slice(0,3)}\n${gameArray.slice(3,6)}\n${gameArray.slice(6,9)}`);
    };
    const checkWinner = (player)=>{
        const checkSameValue = (currentValue)=>currentValue == player.value;
        let j=0;
        for(let i=0; i<9; i+=3){
            // console.log(gameArray.slice(i, i+3));
            // console.log([gameArray[j], gameArray[j+3], gameArray[j+6]]);
            if(gameArray.slice(i, i+3).every(checkSameValue) == true){
                return true;
            }else if([gameArray[j], gameArray[j+3], gameArray[j+6]].every(checkSameValue) == true){
                return true;
            }else if([gameArray[0], gameArray[4], gameArray[8]].every(checkSameValue) == true){
                return true;
            }else if([gameArray[2], gameArray[4], gameArray[6]].every(checkSameValue) == true){
                return true
            }else{
                j+=1;
            }
        }
    }

    const rookieAi = ()=>{
        let emptyPosition = true;
        while(emptyPosition){
            const position = Math.floor(Math.random()*9);
            if(gameArray[position] !== 'X' && gameArray[position] !== 'O'){
                emptyPosition = false;
                return position;
            }
        }
    }

    return {addItemToArray, makeGamepad, checkWinner, rookieAi};
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

        console.log('Player 1 playing');
        gameBoard.addItemToArray(gameBoard.rookieAi(), player1);
        // console.log(gameBoard.checkWinner(player1));
        if(gameBoard.checkWinner(player1) == true){
            console.log(`player${player1.value} wins`)
            break;
        }
    }else{
        console.log('Player 2 playing');
        gameBoard.addItemToArray(gameBoard.rookieAi(), player2);
        if(gameBoard.checkWinner(player2) == true){
            console.log(`player${player2.value} wins`)
            break;
        }
    }
}