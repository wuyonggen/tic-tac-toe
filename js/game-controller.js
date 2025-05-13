const GameController = (() => {
  let players = [];
  let activePlayer = null;
  let gameOver = false;

  const startGame = (playerOneName, playerTwoName) => {
    GameBoard.resetBoard();
    players = [Player(playerOneName, 'X'), Player(playerTwoName, 'O')];
    activePlayer = players[0];
    gameOver = false;
  };

  const getActivePlayer = () => activePlayer;

  const playRound = (cellIndex) => {
    if (gameOver) return null;

    const marker = activePlayer.getMarker();

    if (GameBoard.markCell(cellIndex, marker)) {
      const winner = GameBoard.checkWinner();
      if (winner) {
        gameOver = true;
        return { winner, gameOver: true };
      } else {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        return { winner: null, gameOver: false };
      }
    }
    return null;
  };

  const isGameOver = () => gameOver;

  return { startGame, getActivePlayer, playRound, isGameOver };
})();
