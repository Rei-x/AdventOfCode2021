import { Board } from "./interfaces";

export const readBoard = (input: string[], startingLine: number) => {
  const rows: number[][] = [];
  const columns = Array<number[]>(5)
    .fill([])
    .map<number[]>(() => []);

  for (let i = 0; i <= 4; i++) {
    const row = input[startingLine + i]
      .trim()
      .split(/\s+/)
      .map((stringNumber) => parseInt(stringNumber));
    rows.push(row);

    row.forEach((number, index) => {
      columns[index].push(number);
    });
  }

  return {
    rows,
    columns,
  };
};

export const readAllBoards = (input: string[]) => {
  const numberOfBoards = (input.length - 1) / 6;
  const firstLine = 2;
  const boards = [];
  for (let i = 0; i <= numberOfBoards - 1; i++) {
    boards.push(readBoard(input, firstLine + i * 6));
  }
  return boards;
};

export const removeNumberFromBoard = (board: Board, number: number) => {
  const removeNumberFromArray = (array: number[], number: number) => {
    const index = array.indexOf(number);
    if (index > -1) array.splice(index, 1);
  };
  board.rows.forEach((row) => removeNumberFromArray(row, number));
  board.columns.forEach((column) => removeNumberFromArray(column, number));
};

export const checkIfBoardWin = (board: Board) => {
  const winInColumns = board.columns.some((column) => column.length === 0);
  const winInRows = board.rows.some((row) => row.length === 0);
  return winInColumns || winInRows;
};

export const sumNumbersInBoard = (board: Board) => {
  return board.rows.reduce((acc, currentValue) => {
    const sum = currentValue.reduce((acc, currentValue) => {
      return acc + currentValue;
    }, 0);
    return acc + sum;
  }, 0);
};
