module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/jest.setup.ts"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "^context/(.*)$": "<rootDir>/src/context/$1",
    "^routes/(.*)$": "<rootDir>/src/routes/$1",
    "^pages/(.*)$": "<rootDir>/src/pages/$1",
    "^components/(.*)$": "<rootDir>/src/components/$1",
  },
};
