import { program } from "commander";
import * as path from "path";

import { loadConfig } from "./config";
import { Scanner } from "./scanner";

program
  .requiredOption("-c, --config <path>", "Path to the configuration file")
  .parse(process.argv);

async function main() {
  const options = program.opts();
  const configPath = path.resolve(process.cwd(), options.config);

  try {
    const config = await loadConfig(configPath);
    const scanner = new Scanner(config);
    await scanner.scan();
  } catch (error) {
    console.error("An error occurred while loading the configuration: ", error);
    process.exit(1);
  }
}

main();
