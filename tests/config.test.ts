
import { loadConfig, ConfigSchema } from "../src/config";
import * as fs from "fs-extra";
import { after, before } from "node:test";
import { z } from "zod";

jest.mock("fs-extra");

describe("Config Module", () => {
  const mockConfig = {
    patterns: ["src/**/*.ts"],
    ignore: ["node_modules/**", "dist/**"],
    outputFile: "workspace.txt",
    repoPath: "./"
  };

  beforeEach(() => {
    (fs.readJson as jest.Mock).mockResolvedValue(mockConfig); // Mock the fs-extra readJson function to return the mockConfig object
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  test("loadConfig should load and validate config correctly", async () => {
    const config = await loadConfig("config.json");
    expect(config).toEqual(mockConfig);
    expect(fs.readJson).toHaveBeenCalledWith("config.json");
  });

  test("loadConfig should throw an error for invalid config", async () => {
    (fs.readJson as jest.Mock).mockResolvedValue({
      ...mockConfig,
      patterns: "src/**/*.ts" // Invalid type, should be an array
    });

    await expect(loadConfig("config.json")).rejects.toThrow(z.ZodError);
  });
});
