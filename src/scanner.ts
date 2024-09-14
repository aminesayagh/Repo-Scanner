import fg from "fast-glob";
import * as fs from "fs-extra";
import * as path from "path";

import { Config } from "./config";

export class Scanner {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }
  public async scan(): Promise<void> {
    const { patterns, ignore, outputFile, repoPath } = this.config;
    const files = await fg(patterns, {
      cwd: repoPath, // The current working directory
      ignore: ignore.filter(Boolean) as string[], // Ignore files based on the ignore pattern
      absolute: true // Return absolute paths for files
    });

    let summary = "";

    for (const filePath of files) {
      const relativePath = path.relative(repoPath, filePath);
      const content = await fs.readFile(filePath, "utf-8");

      summary += `---\nFile: ${relativePath}\nPath: ${filePath}\nContent:\n${content}\n\n`;
    }

    const outputPath = path.resolve(repoPath, outputFile);
    await fs.writeFile(outputPath, summary);
  }
}
