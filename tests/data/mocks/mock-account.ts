import { faker } from '@faker-js/faker'

import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  VerifyIfEmailExistsInRepository
} from '@/data/protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  result = true
  addAccountParams: AddAccountRepository.Params

  async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    this.addAccountParams = data
    return Promise.resolve(this.result)
  }
}

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  result = {
    name: faker.name.fullName(),
    password: faker.internet.password(),
    id: faker.datatype.uuid()
  }

  email: string

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return Promise.resolve(this.result)
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
    return Promise.resolve()
  }
}

export class VerifyIfEmailExistsInRepositorySpy implements VerifyIfEmailExistsInRepository {
  email: string
  result = false

  async verify (email: string): Promise<boolean> {
    this.email = email

    return this.result
  }
}