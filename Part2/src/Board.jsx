import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// checks all winning combos, returns 'X', 'O', or null
function computeWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board({ }) {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  // scores persist across new games
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const winner = computeWinner(squares);
  const isTie = !winner && squares.every(s => s !== null);

  // figure out status message
  let status;
  if (winner) {
    status = 'Winner: ' + winner + '!';
  } else if (isTie) {
    status = "It's a tie!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(i) {
    // don't let them click a filled square or after game ends
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    // check if this move just won and update score
    const newWinner = computeWinner(nextSquares);
    if (newWinner) {
      setScores(prev => ({ ...prev, [newWinner]: prev[newWinner] + 1 }));
    }
  }

  function handleNewGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="game">
      <div className="scoreboard">
        <span>X: {scores.X}</span>
        <span>O: {scores.O}</span>
      </div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button className="new-game-btn" onClick={handleNewGame}>New Game</button>
    </div>
  );
}
