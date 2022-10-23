import DBClient from '../helper/client'

import { AddAccountRepository } from '@/data/protocols/add-account-repository'

export class AccountRepository implements AddAccountRepository {
  async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    await DBClient.instance.account.create({
      data: params
    })
  }
}