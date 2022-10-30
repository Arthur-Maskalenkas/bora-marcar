import { faker } from '@faker-js/faker'

import { SignUpController } from './signup-controller'

import { AddAccountSpy } from '@/presentation/tests/mock-add-account'

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()

  const sut = new SignUpController(addAccountSpy)

  return {
    sut,
    addAccountSpy
  }
}

const mockRequest = (): SignUpController.Request => {
  const password = faker.internet.password()

  return {
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password,
    passwordConfirmation: password
  }
}

describe('signup-controller', () => {
  test('Should return 204 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse.statusCode).toBe(204)
  })

  describe('add-account dependency', () => {
    test('Should call add-account with the correct parameters', async () => {
      const { sut, addAccountSpy } = makeSut()

      const request = mockRequest()

      await sut.handle(request)

      expect(addAccountSpy.params).toEqual({
        name: request.name,
        password: request.password,
        email: request.email
      })
    })
  })
})