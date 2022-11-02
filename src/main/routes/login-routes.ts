import { Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import { makeSignUpController } from '@/main/factories/controllers'

export default (router: Router): void => {
  const signUpRoute = adaptRoute(makeSignUpController())

  router.post('/signup', signUpRoute)
}