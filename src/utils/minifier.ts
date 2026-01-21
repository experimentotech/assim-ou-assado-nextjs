import swc from "@swc/core";
import fs from "node:fs";
import path from "node:path";

export function minify(input: string): string {
  const code = fs.readFileSync(path.join(process.cwd(), input), "utf8");
  const output = swc.minifySync(code, {
    mangle: false,
    compress: false,
  });
  return output.code;
}
