module.exports = {
  bail: true,
  collectCoverageFrom: ["./**/*.{js,jsx,ts,tsx}", "!**/node_modules/**"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(scss)$": "<rootDir>/src/__mocks__/dummyMock.js"
  },
  roots: ["<rootDir>/src", "<rootDir>/pages"],
  setupTestFrameworkScriptFile: "<rootDir>/jest.setup.js",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testURL: "http://localhost",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "typescript-babel-jest"
  },
  testMatch: ["**/*.test.(js|jsx|ts|tsx)"],
  verbose: true
};
