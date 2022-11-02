/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom:
    ['<rootDir>/src/**/*.ts',
      '!<rootDir>/src/**/*-protocols.ts',
      '!<rootDir>/src/main/**',
      '!**/protocols/**',
      '!**/test/**',
      '!**/errors/**',
      '!**/helpers/**',
      '!**/domain/**',],
  moduleDirectories: ['node_modules', 'src'],
  coverageDirectory: 'coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}