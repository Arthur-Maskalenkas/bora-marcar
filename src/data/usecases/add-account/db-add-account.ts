import { AddAccount, AddAccountRepository, Hasher, VerifyIfAccountExistRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly verifyIfAccountExistRepository: VerifyIfAccountExistRepository
  ) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    await this.verifyIfAccountExistRepository.verify(accountData.email)

    const hashedPassword = await this.hasher.hash(accountData.password)

    await this.addAccountRepository.add({ ...accountData,password: hashedPassword })
  }
}