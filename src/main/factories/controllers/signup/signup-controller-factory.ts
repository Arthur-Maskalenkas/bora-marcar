import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeSignUpValidation } from '@/main/factories/controllers/signup/signup-validation-factory'
import { makeDbAuthentication } from '@/main/factories/useCases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/useCases/account/add-account/db-add-account-factory'

export const makeSignUpController = (): Controller => {
  // infra layer
  const dbAddAccount = makeDbAddAccount()
  const dbAuthentication = makeDbAuthentication()
  const validateComposite = makeSignUpValidation()

  // data layer
  const controller = new SignUpController(dbAddAccount, validateComposite, dbAuthentication)

  return controller
}
