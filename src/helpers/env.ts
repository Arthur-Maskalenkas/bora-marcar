export const env = {
  port: process.env.APP_PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'any_secret',
  dtbase: {
    host: process.env.DATABASE_URL || 'mysql://root:123@localhost:3306/app',
    port: process.env.DATABASE_PORT || 3306
  }
}