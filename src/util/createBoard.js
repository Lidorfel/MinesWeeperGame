const createBoard = (row, col, bombs) => {
  let board = [];
  let mineLocation = [];

  for (let r = 0; r < row; r++) {
    let subCol = [];
    for (let c = 0; c < col; c++) {
      subCol.push({
        value: 0,
        revealed: false,
        neighbors: [],
        x: r,
        y: c,
        flagged: false,
      });
    }
    board.push(subCol);
  }

  let bombCounter = 0;
  while (bombCounter < bombs) {
    let x = Math.floor(Math.random() * row);
    let y = Math.floor(Math.random() * col);
    if (board[x][y].value === 0) {
      board[x][y].value = "X";
      mineLocation.push([x, y]);
      bombCounter++;
    }
  }
  // adding numbers
  for (let roww = 0; roww < row; roww++) {
    for (let coll = 0; coll < col; coll++) {
      if (board[roww][coll].value === "X") {
        continue;
      }

      // Top
      if (roww > 0 && board[roww - 1][coll].value === "X") {
        board[roww][coll].value++;
      }

      // Top Right
      if (
        roww > 0 &&
        coll < col - 1 &&
        board[roww - 1][coll + 1].value === "X"
      ) {
        board[roww][coll].value++;
      }

      // Right
      if (coll < col - 1 && board[roww][coll + 1].value === "X") {
        board[roww][coll].value++;
      }

      // Botoom Right
      if (
        roww < row - 1 &&
        coll < col - 1 &&
        board[roww + 1][coll + 1].value === "X"
      ) {
        board[roww][coll].value++;
      }

      // Bottom
      if (roww < row - 1 && board[roww + 1][coll].value === "X") {
        board[roww][coll].value++;
      }

      // Bottom Left
      if (
        roww < row - 1 &&
        coll > 0 &&
        board[roww + 1][coll - 1].value === "X"
      ) {
        board[roww][coll].value++;
      }

      // LEft
      if (coll > 0 && board[roww][coll - 1].value === "X") {
        board[roww][coll].value++;
      }

      // Top Left
      if (roww > 0 && coll > 0 && board[roww - 1][coll - 1].value === "X") {
        board[roww][coll].value++;
      }
    }
  }
  return { board, mineLocation };
};
export default createBoard;
