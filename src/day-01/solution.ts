import { readInput } from "../utils/readInput";

const text = readInput(__dirname + "/input.txt").map((value) =>
  parseInt(value)
);

const part1 = (input: number[]) => {
  const solution = input.reduce((acc, curr, index, array) => {
    if (curr > array[index - 1]) {
      acc++;
    }
    return acc;
  }, 0);
  return solution;
};

const part2 = (input: number[]) => {
  const solutionObject = input.reduce(
    (acc, curr, index, array) => {
      if (index + 2 < array.length) {
        const sum = curr + array[index + 1] + array[index + 2];
        if (sum > acc.lastItem) {
          acc.result++;
        }
        acc.lastItem = sum;
      }

      return acc;
    },
    { lastItem: 0, result: -1 }
  );
  return solutionObject.result;
};

console.log(part1(text));
console.log(part2(text));
