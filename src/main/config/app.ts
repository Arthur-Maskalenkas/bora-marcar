import express from 'express'

import setupMiddlewares from './middewares'
import setupRoutes from './routes'

export const app = express()
setupMiddlewares(app)
setupRoutes(app)
export default app