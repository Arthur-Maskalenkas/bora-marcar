import { AddAccountRepository } from '@/data/protocols/add-account-repository'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params
  result: null

  async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = params

    return this.result
  }
}