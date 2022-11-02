import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/validation/protocols'

export class EmailValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly emailValidator: EmailValidator) {

  }

  validate (input: Validation.Param): Validation.Result {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}