import * as fs from "fs-extra";
import { z } from "zod";

export const ConfigSchema = z.object({
  patterns: z.array(z.string()),
  ignore: z.array(z.string().optional()),
  outputFile: z.string(),
  repoPath: z.string()
});

export type Config = z.infer<typeof ConfigSchema>;

export async function loadConfig(configPath: string): Promise<Config> {
  const rawConfig = await fs.readJson(configPath);
  return ConfigSchema.parse(rawConfig);
}
