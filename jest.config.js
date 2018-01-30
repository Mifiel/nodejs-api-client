module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json'
    }
  },
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
  },
  mapCoverage: true,
  coverageReporters: [
    'json', 'lcov', 'text', 'html'
  ],
  coverageDirectory: 'coverage',
  roots: ['src'],
  testMatch: [
    '**/__tests__/*.test.(ts|js)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  coveragePathIgnorePatterns:[
    '/node_modules/',
    '/__mockData__/'
  ],
  testEnvironment: 'node'
};
