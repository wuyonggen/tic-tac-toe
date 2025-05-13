const GameBoard = (() => {
  let board = Array(9).fill(null);

  const getBoard = () => board;

  const markCell = (index, marker) => {
    if (index >= 0 && index < 9 && !board[index]) {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = Array(9).fill(null);
  };

  const checkWinner = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return board.includes(null) ? null : 'tie';
  };

  return { getBoard, markCell, resetBoard, checkWinner };
})();
