const cellContainer = document.querySelectorAll('.cell-container>div');
// const containerChilds = document.querySelectorAll('.cell-container>div');
const heading = document.querySelector('h1');
const playAgain = document.querySelector('.play-again');
let playAgainActive = false;

const gameBoard = (()=>{
    const gameArray = [];
    const addItemToArray = (position, player)=>{
        gameArray.splice(position, 1, player.value);
        console.log(`${gameArray.slice(0,3)}\n${gameArray.slice(3,6)}\n${gameArray.slice(6,9)}`);
    };
    const makeGamepad = ()=>{
        for(let i=0; i<9; i++){
            gameArray[i] = i;
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
                // gameArray.length = 0;
                makeGamepad();
                gameBoardActivities.changeWinnerColor(gameArray.slice(i, i+3));
                return true;
            }else if([gameArray[j], gameArray[j+3], gameArray[j+6]].every(checkSameValue) == true){
                // gameArray.length = 0;
                makeGamepad();
                gameBoardActivities.changeWinnerColor([gameArray[j], gameArray[j+3], gameArray[j+6]]);
                return true;
            }else if([gameArray[0], gameArray[4], gameArray[8]].every(checkSameValue) == true){
                // gameArray.length = 0;
                makeGamepad();
                gameBoardActivities.changeWinnerColor([gameArray[0], gameArray[4], gameArray[8]]);
                return true;
            }else if([gameArray[2], gameArray[4], gameArray[6]].every(checkSameValue) == true){
                // gameArray.length = 0;
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

    return {addItemToArray, makeGamepad, checkWinner, rookieAi, gameArray};
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

gameBoard.makeGamepad();

// cellContainer.forEach(cells =>{
//     cells.addEventListener('click', (e)=>{
//         // gameBoard.makeGamepad();
//         if(!playAgainActive){
//         if(counter <8){
//             console.log(counter);
//             if(counter %2 == 0){
//                 e.target.innerText = player1.value;
//                 lastPlayer = player1.value;
//                 gameBoard.addItemToArray(e.target.dataset.cell-1, player1);
//                 if(gameBoard.checkWinner(player1)){
//                     heading.textContent = 'Player1 Wins!';
//                     gameBoardActivities.displayPlayAgain();
//                 }
//             }else{
//                 e.target.innerText = player2.value;
//                 lastPlayer = player2.value;
//                 gameBoard.addItemToArray(e.target.dataset.cell-1, player2);
//                 if(gameBoard.checkWinner(player2)){
//                     heading.textContent = 'Player2 Wins';
//                     gameBoardActivities.displayPlayAgain();
//                 }
//             }
//         }else{
//             if(lastPlayer === 'X'){
//                 e.target.innerText = 'O';
//             }else{
//                 e.target.innerText = 'X';
//             }
//             heading.textContent = 'Game Draw!';
//             gameBoard.makeGamepad();
//             gameBoardActivities.displayPlayAgain();
//             counter = 0;
//         }
//     }
//         counter++;
//     });
// });

const testPlayResults = [];

const checkWinner = (currentBoard, player)=>{
    if(currentBoard[0] === player.value && currentBoard[1] === player.value && currentBoard[2] === player.value ||
        currentBoard[3] === player.value && currentBoard[4] === player.value && currentBoard[5] === player.value ||
        currentBoard[6] === player.value && currentBoard[7] === player.value && currentBoard[8] === player.value ||
        currentBoard[0] === player.value && currentBoard[3] === player.value && currentBoard[6] === player.value ||
        currentBoard[1] === player.value && currentBoard[4] === player.value && currentBoard[7] === player.value ||
        currentBoard[2] === player.value && currentBoard[5] === player.value && currentBoard[8] === player.value ||
        currentBoard[0] === player.value && currentBoard[4] === player.value && currentBoard[8] === player.value ||
        currentBoard[2] === player.value && currentBoard[4] === player.value && currentBoard[6] === player.value){
            return true;
        }else{
            return false;
        }
}

const findEmptyArray = (currentBoard)=>{
    const emptyArray = [];
    for(let i=0; i<currentBoard.length; i++){
        if(currentBoard[i] !== 'X' && currentBoard[i] !== 'O'){
            emptyArray.push(currentBoard[i])
        }
    }
    return emptyArray;
}

const minimax = (currentBoard, player)=>{
    // console.log(`function call: ${fc++}`);
    const emptyPlaces = findEmptyArray(currentBoard);

    if(checkWinner(currentBoard, player1)){
        return {score: -1};
    }else if(checkWinner(currentBoard, player2)){
        return {score: 1};
    }else if(emptyPlaces.length === 0){
        return {score: 0};
    }

    const move = [];

    for(let i=0; i<emptyPlaces.length; i++){
        // console.log(i);
        // console.log(Object.values(move));
        const playScore = {};
        playScore.index = emptyPlaces[i];
        currentBoard[emptyPlaces[i]]=player.value;
        if(player.value === 'O'){
            const play = minimax(currentBoard, player1);
            playScore.score = play.score;
        }else{
            const play = minimax(currentBoard, player2);
            playScore.score = play.score;
        }
        currentBoard[emptyPlaces[i]] = emptyPlaces[i];
        move.push(playScore);
    }
    let bestScore = 0;

    if(player.value === 'O'){
        let maximum = -Infinity;
        for(let i=0; i<move.length; i++){
            // console.log(move[i].score);
            if(move[i].score > maximum){
                maximum = move[i].score
                bestScore = i;
            }
        }
    }else{
        let maximum = Infinity;
        for(let i=0; i<move.length; i++){
            // console.log(move[i].score);
            if(move[i].score < maximum){
                maximum = move[i].score
                bestScore = i;
            }
        }
    }

    return move[bestScore];
}


let count = 0;
cellContainer.forEach(cell=>{
    cell.addEventListener('click', (e)=>{
        console.log(count++);
        e.target.innerText = player1.value;
        gameBoard.addItemToArray(e.target.dataset.cell-1, player1);
        if(gameBoard.checkWinner(player1)){
            count=0;
            gameBoardActivities.displayPlayAgain();
        }
        if(count <= 4){
            const aiPosition = minimax(gameBoard.gameArray, player2);
            if('index' in aiPosition){
                cellContainer[aiPosition.index].innerHTML = player2.value;
                gameBoard.addItemToArray(aiPosition.index, player2);
                if(gameBoard.checkWinner(player2)){
                    count=0;
                    gameBoardActivities.displayPlayAgain();
                }
            }
        }else{
            gameBoard.makeGamepad();
            count = 0;
            gameBoardActivities.displayPlayAgain();
        }
    })
})

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
        playAgainActive = true;
    }
    return {clearCells, changeWinnerColor, displayPlayAgain};
})();

playAgain.addEventListener('click', ()=>{
    counter = 0;
    playAgainActive = false;
    playAgain.removeAttribute('style');
    gameBoardActivities.clearCells();
    cellContainer.forEach(cells=>{
        cells.removeAttribute('style');
    });
})