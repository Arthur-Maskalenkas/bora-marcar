const config = require('./jest.config')
config.testMatch = ['**/*.spec.ts']
config.collectCoverageFrom.push('!<rootDir>/src/infra/db/mysql/**/*.ts')

module.exports = config