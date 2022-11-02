import { Router } from 'express'

import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSignUpController } from '@/main/factories/controllers/signup/signup-controller-factory'

export default (router: Router): void => {
  const signUpRoute = adaptRoute(makeSignUpController())

  router.post('/signup', signUpRoute)
}
