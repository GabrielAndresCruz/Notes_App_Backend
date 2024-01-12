/** @type {import('ts-jest').JestConfigWithTsJest} */
const dotenv = require('dotenv')

// Load environments variables from .env file
dotenv.config({ path: ".env.test" })

process.env.NODE_ENV= 'UNIT_TEST'

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'], // Make sure that dotenv config will be called before test.
  modulePathIgnorePatterns: ['utils', 'ignored'] // Dictate which pattern to ignore for test.
};