module.exports = {
  bail: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/node_modules/**"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  globals: {
    "ts-jest": {
      tsConfig: {
        target: "es6"
      }
    }
  },
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(scss)$": "<rootDir>/src/__mocks__/dummyMock.ts",
    "\\.(jpg|jpeg|gif|png|svg)$": "<rootDir>/src/__mocks__/dummyMock.ts"
  },
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testURL: "http://localhost",
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.(js|jsx|ts|tsx)"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  verbose: true
};
