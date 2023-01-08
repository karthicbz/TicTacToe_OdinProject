const cellContainer = document.querySelectorAll('.cell-container>div');
// const containerChilds = document.querySelectorAll('.cell-container>div');
const heading = document.querySelector('h1');
const playAgain = document.querySelector('.play-again');

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
                gameArray.length = 0;
                makeGamepad();
                gameBoardActivities.changeWinnerColor(gameArray.slice(i, i+3));
                return true;
            }else if([gameArray[j], gameArray[j+3], gameArray[j+6]].every(checkSameValue) == true){
                gameArray.length = 0;
                makeGamepad();
                gameBoardActivities.changeWinnerColor([gameArray[j], gameArray[j+3], gameArray[j+6]]);
                return true;
            }else if([gameArray[0], gameArray[4], gameArray[8]].every(checkSameValue) == true){
                gameArray.length = 0;
                makeGamepad();
                gameBoardActivities.changeWinnerColor([gameArray[0], gameArray[4], gameArray[8]]);
                return true;
            }else if([gameArray[2], gameArray[4], gameArray[6]].every(checkSameValue) == true){
                gameArray.length = 0;
                makeGamepad();
                gameBoardActivities.changeWinnerColor([gameArray[2], gameArray[4], gameArray[6]]);
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

function game(){
    const player1 = players('X');
    const player2 = players('O');
    gameBoard.makeGamepad();
}

const player1 = players('X');
const player2 = players('O');
// gameBoard.makeGamepad();
// for(let i=0; i<9; i++){
//     if(i%2 == 0){

//         console.log('Player 1 playing');
//         gameBoard.addItemToArray(gameBoard.rookieAi(), player1);
//         // console.log(gameBoard.checkWinner(player1));
//         if(gameBoard.checkWinner(player1) == true){
//             console.log(`player${player1.value} wins`)
//             break;
//         }
//     }else{
//         console.log('Player 2 playing');
//         gameBoard.addItemToArray(gameBoard.rookieAi(), player2);
//         if(gameBoard.checkWinner(player2) == true){
//             console.log(`player${player2.value} wins`)
//             break;
//         }
//     }
// }

let counter = 0;
let lastPlayer;

cellContainer.forEach(cells =>{
    cells.addEventListener('click', (e)=>{
        gameBoard.makeGamepad();
        if(counter <8){
            console.log(counter);
        if(counter %2 == 0){
            e.target.innerText = player1.value;
            lastPlayer = player1.value;
            gameBoard.addItemToArray(e.target.dataset.cell-1, player1);
            if(gameBoard.checkWinner(player1)){
                heading.textContent = 'Player1 Wins!';
                gameBoardActivities.displayPlayAgain();
            }
        }else{
            e.target.innerText = player2.value;
            lastPlayer = player2.value;
            gameBoard.addItemToArray(e.target.dataset.cell-1, player2);
            if(gameBoard.checkWinner(player2)){
                heading.textContent = 'Player2 Wins';
                gameBoardActivities.displayPlayAgain();
            }
        }}else{
            if(lastPlayer === 'X'){
                e.target.innerText = 'O';
            }else{
                e.target.innerText = 'X';
            }
            heading.textContent = 'Game Draw!';
            gameBoardActivities.displayPlayAgain();
            counter = 0;
        }
        counter++;
    });
});

const gameBoardActivities = (()=>{
    const clearCells = ()=>{
        heading.textContent = 'Tic Tac Toe';
        cellContainer.forEach(cells=>{
            cells.innerText = '';
        });
    }

    const changeWinnerColor = (arr)=>{
        // gameArray.length = 0;
        cellContainer.forEach(cells=>{
            if(arr.includes(Number(cells.dataset.cell)-1)){
                cells.setAttribute('style', 'background-color: green;');
            }
        });
    }

    const displayPlayAgain = ()=>{
        playAgain.setAttribute('style', 'display: block;');
    }
    return {clearCells, changeWinnerColor, displayPlayAgain};
})();

playAgain.addEventListener('click', ()=>{
    counter = 0;
    playAgain.removeAttribute('style');
    gameBoardActivities.clearCells();
    cellContainer.forEach(cells=>{
        cells.removeAttribute('style');
    });
})