import { AddAccount, Authentication } from '@/domain/usecases'
import { mockAuthenticationResult } from '@/tests/domain'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result: Awaited<AddAccount.Result> = true

  async add (params: AddAccount.Params): AddAccount.Result {
    this.params = params

    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result: Awaited<Authentication.Result> = mockAuthenticationResult()

  async auth (params: Authentication.Params): Authentication.Result {
    this.params = params
    return this.result
  }
}