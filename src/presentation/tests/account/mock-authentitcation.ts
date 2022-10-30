import { mockAuthenticationModel } from '@/domain/test/account/mock-authentication'
import { Authentication } from '@/domain/usecases/account/authentication'

export class AuthenticationSpy implements Authentication {
  authenticationParams: Authentication.Params
  authenticationModel = mockAuthenticationModel()

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authenticationParams
    return this.authenticationModel
  }
}