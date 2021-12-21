import { readInput } from "../utils/readInput";

const text = readInput(__dirname + "/input.txt");

const part1 = (input: string[]) => {
  const result = input.reduce(
    (acc, current) => {
      const splitted = current.split(" ");
      const command = splitted[0];
      const value = parseInt(splitted[1]);
      if (command === "forward") {
        acc.horizontal += value;
      }
      if (command === "down") {
        acc.depth += value;
      }
      if (command === "up") {
        acc.depth -= value;
      }
      return acc;
    },
    { depth: 0, horizontal: 0 }
  );
  return result.depth * result.horizontal;
};

const part2 = (input: string[]) => {
  const result = input.reduce(
    (acc, current) => {
      const splitted = current.split(" ");
      const command = splitted[0];
      const value = parseInt(splitted[1]);
      if (command === "forward") {
        acc.horizontal += value;
        acc.depth += value * acc.aim;
      }
      if (command === "down") {
        acc.aim += value;
      }
      if (command === "up") {
        acc.aim -= value;
      }
      return acc;
    },
    { depth: 0, horizontal: 0, aim: 0 }
  );
  return result.depth * result.horizontal;
};

console.log(part1(text));
console.log(part2(text));
