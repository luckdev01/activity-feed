module.exports = {
  // Specify the test environment
  testEnvironment: 'jsdom',

  // Define the file patterns that Jest will use to find your tests
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],

  // Define the file extensions that Jest will look for
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  // Setup for code coverage
  collectCoverage: true,
  coverageDirectory: 'coverage',

  // Define the paths to ignore during testing
  testPathIgnorePatterns: ['/node_modules/', '/build/'],

  // Setup for transforming files with Babel
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },

  resetMocks: true,

  clearMocks: true,

  // Define the setupFiles that Jest will run before each test suite
  setupFilesAfterEnv: ['./__mocks__/jest-setup.js'],
};
