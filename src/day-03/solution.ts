import { readInput } from "../utils/readInput";

const text = readInput(__dirname + "/input.txt");

const part1 = (input: string[]) => {
  const result = input.reduce(
    (acc, current) => {
      current.split("").forEach((number, index) => {
        acc[index][parseInt(number)] += 1;
      });
      return acc;
    },
    Array(input[0].length)
      .fill(0)
      .map(() => [0, 0])
  );

  const binaryResult = result.reduce(
    (acc, current) => {
      if (current[0] > current[1]) {
        acc.gamma += "0";
        acc.epsilon += "1";
      } else {
        acc.gamma += "1";
        acc.epsilon += "0";
      }
      return acc;
    },
    { gamma: "", epsilon: "" }
  );

  const gamma = parseInt(binaryResult.gamma, 2);
  const epsilon = parseInt(binaryResult.epsilon, 2);
  return gamma * epsilon;
};

const part2 = (input: string[]) => {
  const divideNumbersIntoGroupsByIndex = (index: number, array: string[]) => {
    return array.reduce<string[][]>(
      (acc, current) => {
        acc[parseInt(current[index])].push(current);
        return acc;
      },
      [[], []]
    );
  };
  
  const getOxygen = (array: string[]) => {
    let numbers = [...array];
    for (let i = 0; i < array[0].length; i++) {
      if (numbers.length === 1) break;
      const mostCommonNumbers = divideNumbersIntoGroupsByIndex(i, numbers);
      if (mostCommonNumbers[1].length >= mostCommonNumbers[0].length) {
        numbers = mostCommonNumbers[1];
      } else {
        numbers = mostCommonNumbers[0];
      }
    }
    return parseInt(numbers[0], 2);
  };

  const getCO2 = (array: string[]) => {
    let numbers = [...array];
    for (let i = 0; i < array[0].length; i++) {
      if (numbers.length === 1) break;
      const mostCommonNumbers = divideNumbersIntoGroupsByIndex(i, numbers);
      if (mostCommonNumbers[0].length <= mostCommonNumbers[1].length) {
        numbers = mostCommonNumbers[0];
      } else {
        numbers = mostCommonNumbers[1];
      }
    }
    return parseInt(numbers[0], 2);
  };

  return getCO2(input) * getOxygen(input);
};

console.log(part1(text));
console.log(part2(text));
