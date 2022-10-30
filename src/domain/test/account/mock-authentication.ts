import { faker } from '@faker-js/faker'

import { Authentication } from '@/domain/usecases/account/authentication'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Result => ({
  name: faker.name.firstName(),
  accessToken: faker.datatype.uuid()
})