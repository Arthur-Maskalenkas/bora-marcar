import { AddAccount, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    await this.hasher.hash(accountData.password)
  }
}