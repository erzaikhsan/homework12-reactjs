
import * as React from 'react';

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [nextValue, setNextValue] = React.useState(calculateNextValue(squares));
  const [winner, setWinner] = React.useState(calculateWinner(squares));

  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    }

    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);

    const calculatedWinner = calculateWinner(squaresCopy);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
    }
    setNextValue(calculateNextValue(squaresCopy));
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue(calculateNextValue(Array(9).fill(null)));
    setWinner(null);
  }

  function renderSquare(i) {
    return (
      <button className=" bg-orange square text-4xl font-bold w-16 h-16 flex items-center justify-center border" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-bg" >
      <div className="mb-1 text-2xl">STATUS</div>
      <div className="mb-4 text-2xl font-bold" >{calculateStatus(winner, squares, nextValue)}</div>
      <div className="mb-4 grid grid-cols-3 gap-4" >
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="mb-4 grid grid-cols-3 gap-4" >
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="mb-4 grid grid-cols-3 gap-4" >
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className=" hover:text-orange font-bold py-2 px-4 rounded" onClick={restart}>
        Restart!
      </button>
    </div>
  );
}

function Game() {
  return (
    <div >
      <div >
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
