module.exports = {
  bail: true,
  collectCoverageFrom: ['./**/*.{js,jsx}'],
  roots: [
    '<rootDir>/src',
    '<rootDir>/pages',
  ],
  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/src/__mocks__/dummyMock.js',
  },
  testURL: 'http://localhost',
  verbose: true,
};
