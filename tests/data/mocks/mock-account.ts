import { faker } from '@faker-js/faker'

import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  VerifyIfEmailExistsInRepository
} from '@/data/protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  result: Awaited<AddAccountRepository.Result> = true
  params: AddAccountRepository.Params

  async add (params: AddAccountRepository.Params): AddAccountRepository.Result {
    this.params = params
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  result: Awaited<LoadAccountByEmailRepository.Result> = {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    password: faker.internet.password()
  }

  param: LoadAccountByEmailRepository.Param

  async loadByEmail (param: LoadAccountByEmailRepository.Param): LoadAccountByEmailRepository.Result {
    this.param = param
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  params: UpdateAccessTokenRepository.Params

  async updateAccessToken (params: UpdateAccessTokenRepository.Params): UpdateAccessTokenRepository.Result {
    this.params = params
  }
}

export class VerifyIfEmailExistsInRepositorySpy implements VerifyIfEmailExistsInRepository {
  result: Awaited<VerifyIfEmailExistsInRepository.Result> = false
  param: VerifyIfEmailExistsInRepository.Param

  async verifyExistenceOfEmail (param: VerifyIfEmailExistsInRepository.Param): VerifyIfEmailExistsInRepository.Result {
    this.param = param

    return this.result
  }
}