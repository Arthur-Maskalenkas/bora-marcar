import validator from 'validator'

import { EmailValidatorAdapter } from '@/infra'

jest.mock('validator', () => ({
  isEmail (email: string): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('Email validator adapter', () => {
  test('should return false when email is invalid', () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  test('should return true when email is invalid', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@emai.com')
    expect(isValid).toBe(true)
  })

  test('should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    sut.isValid('any_email')

    expect(isEmailSpy).toHaveBeenCalledWith(('any_email'))
  })
})