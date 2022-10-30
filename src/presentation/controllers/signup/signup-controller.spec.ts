import { faker } from '@faker-js/faker'

import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { AddAccountSpy } from '@/presentation/tests/mock-add-account'
import { ValidationSpy } from '@/validation/test'
import { MissingParamsError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()

  const sut = new SignUpController(addAccountSpy,validationSpy)

  return {
    sut,
    addAccountSpy,
    validationSpy
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

  test('SHould return 403 if AddAccount returns null', async () => {
    const { sut, addAccountSpy } = makeSut()

    addAccountSpy.result = false

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse.statusCode).toBe(403)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut,validationSpy } = makeSut()

    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
      return new MissingParamsError('any_error')
    })

    const response = await sut.handle(mockRequest())

    expect(response).toEqual(badRequest(new MissingParamsError('any_error')))
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

  describe('validation dependency', () => {
    test('Should call validation with correct values', async () => {
      const { sut, validationSpy } = makeSut()

      const request = mockRequest()

      await sut.handle(request)

      expect(validationSpy.input).toEqual(request)
    })
  })
})
