import { AddAccount, AddAccountRepository, Hasher,VerifyIfEmailExistsInRepository } from 'data/usecases/add-account-repository/db-add-account-repository-protocols'

export class DbAddAccountRepository implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly verifyIfEmailExistsInRepository: VerifyIfEmailExistsInRepository
  ) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    await this.verifyIfEmailExistsInRepository.verify(accountData.email)

    const hashedPassword = await this.hasher.hash(accountData.password)

    const account = await this.addAccountRepository.add({ ...accountData,password: hashedPassword })

    return !!account
  }
}