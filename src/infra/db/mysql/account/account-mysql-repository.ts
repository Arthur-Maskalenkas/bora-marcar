import DBClient from '../helper/client'

import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, VerifyIfEmailExistsInRepository } from '@/data/protocols'

export class AccountMysqlRepository
implements AddAccountRepository,
 LoadAccountByEmailRepository, UpdateAccessTokenRepository, VerifyIfEmailExistsInRepository {
  async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const account = await DBClient.instance.account.create({
      data: params
    })

    return !!account
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
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

  async updateAccessToken (id: string, token: string): Promise<void> {
    await DBClient.instance.account.update({
      where: { id: parseInt(id) },
      data: { accessToken: token }
    })
  }

  async verify (email: VerifyIfEmailExistsInRepository.Params): VerifyIfEmailExistsInRepository.Result {
    const account = await DBClient.instance.account.findUnique({ where: { email } })

    return !!account
  }
}