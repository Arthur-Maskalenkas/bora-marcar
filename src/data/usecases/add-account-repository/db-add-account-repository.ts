import { AddAccount, AddAccountRepository, Hasher } from 'data/usecases/add-account-repository/db-add-account-repository-protocols'

export class DbAddAccountRepository implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const hashedPassword = await this.hasher.hash(accountData.password)

    await this.addAccountRepository.add({ ...accountData,password: hashedPassword })
  }
}