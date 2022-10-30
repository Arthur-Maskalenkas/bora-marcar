import { faker } from '@faker-js/faker'

import { LoadAccountByEmailRepository } from '@/data/protocols'

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