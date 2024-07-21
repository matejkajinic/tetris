import React, { useState, useEffect, useCallback } from 'react';

// Inline Button component
const Button = ({ children, onClick, className = '' }) => (
  <button
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const SHAPES = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[1, 1, 1], [0, 1, 0]],
  [[1, 1, 1], [1, 0, 0]],
  [[1, 1, 1], [0, 0, 1]],
  [[1, 1, 0], [0, 1, 1]],
  [[0, 1, 1], [1, 1, 0]]
];

const createEmptyBoard = () => 
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));

const Tetris = () => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const generateNewPiece = useCallback(() => {
    const newPiece = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const newPosition = { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(newPiece[0].length / 2), y: 0 };
    setCurrentPiece(newPiece);
    setCurrentPosition(newPosition);
    
    if (isCollision(newPiece, newPosition)) {
      setGameOver(true);
    }
  }, []);

  const isCollision = useCallback((piece, position) => {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x] && 
            ((board[y + position.y] && board[y + position.y][x + position.x]) !== 0)) {
          return true;
        }
      }
    }
    return false;
  }, [board]);

  const rotate = useCallback(() => {
    const newPiece = currentPiece[0].map((val, index) => 
      currentPiece.map(row => row[index]).reverse()
    );
    if (!isCollision(newPiece, currentPosition)) {
      setCurrentPiece(newPiece);
    }
  }, [currentPiece, currentPosition, isCollision]);

  const moveLeft = useCallback(() => {
    if (!isCollision(currentPiece, { ...currentPosition, x: currentPosition.x - 1 })) {
      setCurrentPosition(prev => ({ ...prev, x: prev.x - 1 }));
    }
  }, [currentPiece, currentPosition, isCollision]);

  const moveRight = useCallback(() => {
    if (!isCollision(currentPiece, { ...currentPosition, x: currentPosition.x + 1 })) {
      setCurrentPosition(prev => ({ ...prev, x: prev.x + 1 }));
    }
  }, [currentPiece, currentPosition, isCollision]);

  const moveDown = useCallback(() => {
    if (!isCollision(currentPiece, { ...currentPosition, y: currentPosition.y + 1 })) {
      setCurrentPosition(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      freezePiece();
    }
  }, [currentPiece, currentPosition, isCollision]);

  const freezePiece = useCallback(() => {
    const newBoard = [...board];
    currentPiece.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          newBoard[y + currentPosition.y][x + currentPosition.x] = value;
        }
      });
    });
    setBoard(newBoard);
    clearLines();
    generateNewPiece();
  }, [board, currentPiece, currentPosition, generateNewPiece]);

  const clearLines = useCallback(() => {
    let linesCleared = 0;
    const newBoard = board.filter(row => {
      if (row.every(cell => cell !== 0)) {
        linesCleared++;
        return false;
      }
      return true;
    });
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }
    
    setBoard(newBoard);
    setScore(prev => prev + linesCleared * 100);
  }, [board]);

  useEffect(() => {
    if (!gameOver) {
      const intervalId = setInterval(moveDown, 1000);
      return () => clearInterval(intervalId);
    }
  }, [gameOver, moveDown]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;
      switch (e.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          rotate();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameOver, moveLeft, moveRight, moveDown, rotate]);

  useEffect(() => {
    generateNewPiece();
  }, []);

  const restartGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setScore(0);
    setGameOver(false);
    generateNewPiece();
  }, [generateNewPiece]);

  const renderBoard = useCallback(() => {
    const boardWithPiece = board.map(row => [...row]);
    if (currentPiece) {
      currentPiece.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            boardWithPiece[y + currentPosition.y][x + currentPosition.x] = value;
          }
        });
      });
    }

    return boardWithPiece.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={x}
            className={`w-6 h-6 border border-gray-300 ${cell ? 'bg-blue-500' : 'bg-white'}`}
          />
        ))}
      </div>
    ));
  }, [board, currentPiece, currentPosition]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tetris</h1>
      <div className="mb-4">{renderBoard()}</div>
      <div className="mb-4">
        <p className="text-lg">Score: {score}</p>
      </div>
      {gameOver && (
        <div className="mb-4">
          <p className="text-lg font-bold text-red-500">Game Over</p>
          <Button onClick={restartGame} className="mt-2">
            Start New Game
          </Button>
        </div>
      )}
      <div className="flex justify-between">
        <Button onClick={moveLeft}>←</Button>
        <Button onClick={moveDown}>↓</Button>
        <Button onClick={moveRight}>→</Button>
        <Button onClick={rotate}>Rotate</Button>
      </div>
    </div>
  );
};

export default Tetris;