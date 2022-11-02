import { EmailValidator } from '@/validation/protocols'

export class EmailValidatorSpy implements EmailValidator {
  result: EmailValidator.Result = true
  email: EmailValidator.Param

  isValid (email: EmailValidator.Param): EmailValidator.Result {
    this.email = email
    return this.result
  }
}