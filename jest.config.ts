import type { Config } from "jest";

const config: Config = {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],

  extensionsToTreatAsEsm: [".ts"],

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@/(.*)\\.js$": "<rootDir>/src/$1.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;