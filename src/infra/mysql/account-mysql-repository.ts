import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, VerifyIfEmailExistsInRepository } from '@/data/protocols'
import { DBClient } from '@/infra'

export class AccountMysqlRepository
implements AddAccountRepository,
 LoadAccountByEmailRepository, UpdateAccessTokenRepository, VerifyIfEmailExistsInRepository {
  async add (accountData: AddAccountRepository.Params): AddAccountRepository.Result {
    const account = await DBClient.instance.account.create({
      data: accountData
    })

    return !!account
  }

  async loadByEmail (email: LoadAccountByEmailRepository.Param): LoadAccountByEmailRepository.Result {
    const account = await DBClient.instance.account.findUnique({ where: { email } })

    if (account) {
      return {
        id: account.id.toString(),
        name: account.name,
        password: account.password
      }
    }

    return null
  }

  async updateAccessToken (params: UpdateAccessTokenRepository.Params): UpdateAccessTokenRepository.Result {
    const { token,id } = params

    await DBClient.instance.account.update({
      where: { id: parseInt(id) },
      data: { accessToken: token }
    })
  }

  async verifyExistenceOfEmail (email: VerifyIfEmailExistsInRepository.Param): VerifyIfEmailExistsInRepository.Result {
    const account = await DBClient.instance.account.findUnique({ where: { email } })

    return !!account
  }
}