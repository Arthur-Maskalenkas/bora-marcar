import { AddAccountRepository } from '@/data/protocols/add-account-repository'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params

  async add (params: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.params = params
  }
}