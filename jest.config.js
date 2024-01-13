/** @type {import('ts-jest').JestConfigWithTsJest} */
const dotenv = require('dotenv')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true, // Automatically clears mocks between test to maintain a clean state.
  roots: ['<rootDir>/src'], // Root folders to search test
  moduleDirectories: ['node_modules', 'src'], // Where to look for modules when resolving imports. 1th node_modules n' 2nd src
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    'typeorm': '<rootDir>/src/__mocks__/typeorm.ts'
  } // Maps import paths so that Jest can locate the modules.
};