import { faker } from '@faker-js/faker'

import { AddAccount } from '@/domain/usecases/add-account'

export const mockAddAccountParams = (): AddAccount.Params => (
  {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: faker.internet.password()
  }
)

export const mockAddAccountResult = async (): AddAccount.Result => true
