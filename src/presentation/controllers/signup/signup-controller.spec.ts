import { faker } from '@faker-js/faker'

import { MissingParamsError, ServerError } from '@/presentation/errors'
import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AddAccountSpy, AuthenticationSpy } from '@/presentation/tests/account'
import { ValidationSpy } from '@/presentation/tests/utils'

type SutTypes = {
  sut: SignUpController
  addAccountSpy: AddAccountSpy
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()

  const sut = new SignUpController(addAccountSpy,validationSpy, authenticationSpy)

  return {
    sut,
    addAccountSpy,
    validationSpy,
    authenticationSpy
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
  test('Should return 200 on success', async () => {
    const { sut, authenticationSpy } = makeSut()

    const response = await sut.handle(mockRequest())

    expect(response).toEqual(ok(authenticationSpy.authenticationModel))
  })

  describe('add-account', () => {
    test('Should call add-account with the correct values', async () => {
      const { sut, addAccountSpy } = makeSut()

      const request = mockRequest()

      await sut.handle(request)

      expect(addAccountSpy.params).toEqual({
        name: request.name,
        password: request.password,
        email: request.email
      })
    })

    test('SHould return 403 if add-account returns null', async () => {
      const { sut, addAccountSpy } = makeSut()

      addAccountSpy.result = false

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse.statusCode).toBe(403)
    })

    test('Should return 500 if add-account throws', async () => {
      const { sut, addAccountSpy } = makeSut()

      jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => {
        throw new Error()
      })

      const response = await sut.handle(mockRequest())

      expect(response).toEqual(serverError(new ServerError(null)))
    })
  })

  describe('validation dependency', () => {
    test('Should call validation with correct values', async () => {
      const { sut, validationSpy } = makeSut()

      const request = mockRequest()

      await sut.handle(request)

      expect(validationSpy.inputParams).toEqual(request)
    })

    test('Should return 400 if validation returns an error', async () => {
      const { sut,validationSpy } = makeSut()

      jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => {
        return new MissingParamsError('any_error')
      })

      const response = await sut.handle(mockRequest())

      expect(response).toEqual(badRequest(new MissingParamsError('any_error')))
    })
  })

  describe('authentication dependency', () => {
    test('Should call Authentication  with correct values', async () => {
      const { sut, authenticationSpy } = makeSut()

      const request = mockRequest()

      await sut.handle(request)

      expect(authenticationSpy.authenticationParams).toEqual({
        email: request.email,
        password: request.password
      })
    })

    test('Should return 500 if Authentication throws', async () => {
      const { sut, authenticationSpy } = makeSut()

      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => {
        throw new Error()
      })

      const response = await sut.handle(mockRequest())

      expect(response).toEqual(serverError(new ServerError(null)))
    })
  })
})