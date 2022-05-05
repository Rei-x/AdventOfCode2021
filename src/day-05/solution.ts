import { readInput } from "../utils/readInput";

const text = readInput(__dirname + "/input.txt");

const part1 = (input: string[]) => {
  const points: Record<number, Record<number, number>> = {};
  let score = 0;

  const formatCoordinates = (coordinates: string) => {
    const splittedCoordinates = coordinates
      .split(",")
      .map((value) => parseInt(value));
    return {
      x: splittedCoordinates[0],
      y: splittedCoordinates[1],
    };
  };

  const horizontalOrVerticalLines = input.forEach((line) => {
    const splittedLine = line.split(" -> ");
    const firstCoordinates = formatCoordinates(splittedLine[0]);
    const secondCoordinates = formatCoordinates(splittedLine[1]);
    points[firstCoordinates.x] = points[firstCoordinates.x] || {};
    if (firstCoordinates.x === secondCoordinates.x) {
      const sortedCoordinates = [
        firstCoordinates.y,
        secondCoordinates.y,
      ].sort();

      for (let y = sortedCoordinates[0]; y <= sortedCoordinates[1]; y++) {
        points[firstCoordinates.x][y] = points[firstCoordinates.x][y] + 1 || 1;
        if (points[firstCoordinates.x][y] === 2) {
          score++;
        }
      }
    }
    if (firstCoordinates.y === secondCoordinates.y) {
      const sortedCoordinates = [
        firstCoordinates.x,
        secondCoordinates.x,
      ].sort();

      for (let x = sortedCoordinates[0]; x <= sortedCoordinates[1]; x++) {
        points[x] = points[x] || {};
        points[x][firstCoordinates.y] = points[x][firstCoordinates.y] + 1 || 1;
        if (points[x][firstCoordinates.y] === 2) {
          score++;
        }
      }
    }
  });

  const betterScore = Object.values(points).reduce((previousValue, current) => {
    return (
      previousValue +
      Object.values(current).reduce((prev, curr) => {
        if (curr >= 2) return prev + 1;
        return prev;
      }, 0)
    );
  }, 0);

  return { betterScore, score };
};

const part2 = (input: string[]) => {};

console.log(part1(text));
console.log(part2(text));
