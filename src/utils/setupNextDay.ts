import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const sourcePath = path.join(process.cwd(), "src");

const days = fs.readdirSync(sourcePath).toString().split(",");

const getNextDayNumber = (daysFilenames: string[]) => {
  const latestDay = daysFilenames.reduce((acc, current) => {
    if (current.match(/day-\d{2}/)) {
      const day = parseInt(current.substring(4));
      if (day > acc) {
        return day;
      }
    }
    return acc;
  }, 0);
  return (latestDay + 1).toString().padStart(2, "0");
};

const directoryName = "day-" + getNextDayNumber(days);
const dayPath = path.join(sourcePath, "/" + directoryName);

fs.mkdirSync(dayPath);

const blueprintSolution = fs
  .readFileSync(path.join(sourcePath, "utils/blueprintSolution.txt"))
  .toString();

fs.writeFileSync(path.join(dayPath, "solution.ts"), blueprintSolution);
fs.writeFileSync(path.join(dayPath, "input.txt"), "");

execSync(
  `npx npm-add-script -k "${directoryName}" -v "ts-node src/${directoryName}/solution.ts"`
);
