import validator from 'validator'

import { EmailValidator } from '@/validation/protocols'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: EmailValidator.Param): EmailValidator.Result {
    return validator.isEmail(email)
  }
}