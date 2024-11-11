// Set up the initial board
const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to render the board
function renderBoard() {
  board.innerHTML = '';
  boardState.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.dataset.index = index;
    if (cell !== '') cellElement.classList.add('taken');
    board.appendChild(cellElement);
  });
}

// Function to check for a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
  ];

  for (const [a, b, c] of winPatterns) {
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      return boardState[a];  // Return the winner ('X' or 'O')
    }
  }

  // Check for a draw (no empty spaces left)
  if (!boardState.includes('')) {
    return 'Draw';
  }

  return null;  // No winner yet
}

// Function to handle a cell click
function handleCellClick(event) {
  const index = event.target.dataset.index;
  
  if (boardState[index] !== '' || !gameActive) return;  // Cell already taken or game over

  // Update the board state with the current player's move
  boardState[index] = currentPlayer;
  
  // Render the updated board
  renderBoard();
  
  // Check for a winner or draw
  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    message.textContent = winner === 'Draw' ? "It's a draw!" : `${winner} wins!`;
  } else {
    // Switch player turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to reset the game
function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = '';
  renderBoard();
}

// Attach event listeners to each cell
board.addEventListener('click', handleCellClick);

// Reset button event listener
resetBtn.addEventListener('click', resetGame);

// Initial render
renderBoard();