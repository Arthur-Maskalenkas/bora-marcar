import { AddAccountRepository, Hasher, VerifyIfEmailExistsInRepository } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly verifyIfEmailExistsInRepository: VerifyIfEmailExistsInRepository
  ) {}

  async add (params: AddAccount.Params): AddAccount.Result {
    const { email,password } = params

    const hasEmailInRepository = await this.verifyIfEmailExistsInRepository.verifyExistenceOfEmail(email)

    if (hasEmailInRepository) {
      return false
    }

    const hashedPassword = await this.hasher.hash(password)

    const account = await this.addAccountRepository.add({ ...params,password: hashedPassword })

    return !!account
  }
}