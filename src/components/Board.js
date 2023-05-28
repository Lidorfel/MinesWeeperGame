import React, { useEffect, useState } from "react";
import createBoard from "../util/createBoard";
import Cell from "./Cell";
import { revealed } from "../util/reveal";
import Modal from "./Modal";
import Timer from "./Timer";
import GameDifficult from "./GameDifficult";

function Board() {
  const [board, setBoard] = useState([]);
  const [mineLocations, setMineLocations] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [numMines, setNumMines] = useState(5);
  const freshBoard = () => {
    const newGrid = createBoard(height, width, numMines);
    setNonMineCount(height * width - numMines);
    setMineLocations(newGrid.mineLocation);
    setBoard(newGrid.board);
  };
  //component mount
  useEffect(() => {
    freshBoard();
  }, [width, height, numMines]);
  //on Right click / flag cell
  const updateFlag = (e, x, y) => {
    e.preventDefault();
    if (board[x][y].revealed === true || gameOver) {
      return;
    }
    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard[x][y].flagged = !newBoard[x][y].flagged;
    setBoard(newBoard);
  };

  const revealCell = (x, y) => {
    if (board[x][y].revealed === true || gameOver) {
      return;
    }
    let newBoard = JSON.parse(JSON.stringify(board));
    if (newBoard[x][y].value === "X") {
      mineLocations.forEach((mine) => {
        newBoard[mine[0]][mine[1]].revealed = true;
      });
      setGameOver(true);
    } else {
      let newRevealedBoard = revealed(newBoard, x, y, nonMineCount);
      setBoard(newRevealedBoard.arr);
      newBoard[x][y].revealed = true;
      setNonMineCount(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        setGameOver(true);
      }
    }
    setBoard(newBoard);
  };
  const restartGame = () => {
    freshBoard();
    setGameOver(false);
  };
  const handleDifficult = (diff) => {
    if (diff === "Low") {
      setWidth(5);
      setHeight(5);
      setNumMines(5);
    } else if (diff === "Medium") {
      setWidth(10);
      setHeight(10);
      setNumMines(20);
    } else {
      setWidth(20);
      setHeight(15);
      setNumMines(50);
    }
  };

  if (!board) {
    return <div>Loading...</div>;
  }
  return (
    <div className="gamePanel" style={{ width: width * 40, padding: 20 }}>
      <div className="headerPanel">
        <GameDifficult handleDifficult={handleDifficult} />
        <Timer />
      </div>
      {gameOver && <Modal reset={restartGame} />}
      {board.map((singleRow) => {
        return (
          <div style={{ display: "flex" }}>
            {singleRow.map((singleBlock) => {
              return (
                <Cell
                  details={singleBlock}
                  updateFlag={updateFlag}
                  revealCell={revealCell}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
