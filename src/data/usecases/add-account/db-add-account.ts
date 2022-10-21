import { AddAccount, AddAccountRepository, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const hashedPassword = await this.hasher.hash(accountData.password)

    await this.addAccountRepository.add({ ...accountData,password: hashedPassword })
  }
}