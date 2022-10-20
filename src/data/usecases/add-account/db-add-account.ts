import { AddAccount } from '@/domain/usecases/add-account'

export class DbAddAccount implements AddAccount {
  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {

  }
}