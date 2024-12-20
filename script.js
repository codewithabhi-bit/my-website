// Game Logic for Tic-Tac-Toe

let currentPlayer = 'X';

let gameBoard = ['', '', '', '', '', '', '', '', ''];  // Track the state of the board

let gameActive = true;

// Function to handle a click on a cell

function handleCellClick(index) {

    if (gameBoard[index] !== '' || !gameActive) return; // Ignore if cell is already occupied or game is over

    

    gameBoard[index] = currentPlayer;

    document.getElementById(`cell-${index}`).innerText = currentPlayer;

    

    if (checkWinner()) {

        setTimeout(() => {

            showPopup(`${currentPlayer} Wins! 🏆`);

        }, 100);

        gameActive = false;

    } else if (gameBoard.every(cell => cell !== '')) {

        setTimeout(() => {

            showPopup("It's a Draw!");

        }, 100);

        gameActive = false;

    } else {

        // Switch to the next player

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    }

}

// Check for a winner

function checkWinner() {

    const winningCombinations = [

        [0, 1, 2],

        [3, 4, 5],

        [6, 7, 8],

        [0, 3, 6],

        [1, 4, 7],

        [2, 5, 8],

        [0, 4, 8],

        [2, 4, 6]

    ];

    return winningCombinations.some(combination => {

        const [a, b, c] = combination;

        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];

    });

}

// Show the popup with the winner message

function showPopup(message) {

    const popup = document.getElementById('popup');

    const popupMessage = document.getElementById('popup-message');

    popupMessage.innerText = message;

    popup.style.display = 'flex';

}

// Retry the game

document.getElementById('retry-button').addEventListener('click', () => {

    gameBoard = ['', '', '', '', '', '', '', '', ''];

    currentPlayer = 'X';

    gameActive = true;

    

    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {

        cell.innerText = '';

    });

    

    const popup = document.getElementById('popup');

    popup.style.display = 'none';

});

// Attach event listeners to all cells

const cells = document.querySelectorAll('.cell');

cells.forEach((cell, index) => {

    cell.addEventListener('click', () => handleCellClick(index));

});