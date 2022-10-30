import { AddAccount } from 'presentation/controllers/signup/signup-controller-protocols'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = true

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params

    return this.result
  }
}