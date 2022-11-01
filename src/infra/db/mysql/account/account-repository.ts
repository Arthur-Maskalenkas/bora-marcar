import DBClient from '../helper/client'

import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols'

export class AccountRepository
implements AddAccountRepository, LoadAccountByEmailRepository {
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
}