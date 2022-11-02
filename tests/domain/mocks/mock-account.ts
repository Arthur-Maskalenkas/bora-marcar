import { faker } from '@faker-js/faker'

import { AddAccount, Authentication } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccount.Params => (
  {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: faker.internet.password()
  }
)

export const mockAddAccountResult = async (): AddAccount.Result => true

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Result => ({
  name: faker.name.firstName(),
  accessToken: faker.datatype.uuid()
})