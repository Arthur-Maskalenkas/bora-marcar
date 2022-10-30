import { AddAccount } from '../controllers/signup/signup-controller-protocols'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
  }
}