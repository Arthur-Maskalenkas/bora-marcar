import { makeDbAddAccount, makeDbAuthentication } from '../useCases'

import { Controller } from '@/presentation/protocols'
import { makeSignUpValidation } from '@/main/factories/controllers'
import { SignUpController } from '@/presentation/controllers'

export const makeSignUpController = (): Controller => {
  // infra layer
  const dbAddAccount = makeDbAddAccount()
  const dbAuthentication = makeDbAuthentication()
  const validateComposite = makeSignUpValidation()

  // data layer
  const controller = new SignUpController(dbAddAccount, validateComposite, dbAuthentication)

  return controller
}