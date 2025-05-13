const ScreenController = (() => {
  const statusDisplay = document.getElementById('status');
  const restartBtn = document.getElementById('restart-btn');
  const startBtn = document.getElementById('start-btn');
  const playerOneInput = document.getElementById('player1');
  const playerTwoInput = document.getElementById('player2');
  const gameBoardDiv = document.querySelector('.game-board');

  const initialize = () => {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', handleCellClick);
      gameBoardDiv.appendChild(cell);
    }

    startBtn.addEventListener('click', handleStartGame);
    restartBtn.addEventListener('click', handleRestartGame);
  };

  const handleStartGame = () => {
    const playerOneName = playerOneInput.value.trim() || 'Player 1';
    const playerTwoName = playerTwoInput.value.trim() || 'Player 2';

    GameController.startGame(playerOneName, playerTwoName);
    updateStatus(`${GameController.getActivePlayer().getName()}'s turn`);
    startBtn.disabled = true;
    playerOneInput.disabled = true;
    playerTwoInput.disabled = true;
    restartBtn.disabled = false;
    updateGameBoard();
  };

  const handleRestartGame = () => {
    GameController.startGame(
      playerOneInput.value.trim() || 'Player 1',
      playerTwoInput.value.trim() || 'Player 2'
    );
    updateStatus(`${GameController.getActivePlayer().getName()}'s turn`);
    updateGameBoard();
  };

  const handleCellClick = (e) => {
    const cellIndex = parseInt(e.target.dataset.index);
    const result = GameController.playRound(cellIndex);

    if (result === null) {
      return;
    }

    updateGameBoard();

    if (result.gameOver) {
      if (result.winner === 'tie') {
        updateStatus("It's a tie!");
      } else {
        updateStatus(`${GameController.getActivePlayer().getName()} wins!`);
      }
    } else {
      updateStatus(`${GameController.getActivePlayer().getName()}'s turn`);
    }
  };

  const updateGameBoard = () => {
    const board = GameBoard.getBoard();
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      cell.textContent = board[index] || '';
    });
  };

  const updateStatus = (message) => {
    statusDisplay.textContent = message;
  };

  return { initialize };
})();
