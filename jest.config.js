// jest.config.js

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Specify the root directory
  rootDir: './',
  // Look for test files in the 'tests' directory
  testMatch: ['**/tests/**/*.test.ts'],
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
};
