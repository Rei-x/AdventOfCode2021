import { readInput } from "../utils/readInput";
import {
  readAllBoards,
  removeNumberFromBoard,
  checkIfBoardWin,
  sumNumbersInBoard,
} from "./utils";

const text = readInput(__dirname + "/input.txt");

const part1 = (input: string[]) => {
  const bingoNumbers = input[0]
    .split(",")
    .map((stringNumber) => parseInt(stringNumber));

  const boards = readAllBoards(input);

  let result = 0;
  for (let i = 0; i <= bingoNumbers.length; i++) {
    const bingoNumber = bingoNumbers[i];
    boards.forEach((board) => removeNumberFromBoard(board, bingoNumber));
    const winningBoards = boards.filter((board) => checkIfBoardWin(board));
    if (winningBoards.length > 0) {
      result = bingoNumber * sumNumbersInBoard(winningBoards[0]);
      break;
    }
  }

  return result;
};

const part2 = (input: string[]) => {
  const bingoNumbers = input[0]
    .split(",")
    .map((stringNumber) => parseInt(stringNumber));

  const boards = readAllBoards(input);

  let result = 0;
  for (let i = 0; i <= bingoNumbers.length; i++) {
    const bingoNumber = bingoNumbers[i];
    boards.forEach((board) => removeNumberFromBoard(board, bingoNumber));
    const winningBoards = boards.filter((board) => checkIfBoardWin(board));

    if (boards.length === 1 && winningBoards.length === 1) {
      result = bingoNumber * sumNumbersInBoard(boards[0]);
      break;
    }

    winningBoards.forEach((board) => {
      const index = boards.indexOf(board);
      boards.splice(index, 1);
    });
  }

  return result;
};

console.log(part1(text));
console.log(part2(text));
