import fs from "fs";

export const readInput = (dir: string) =>
  fs.readFileSync(dir).toString().split("\n");
