import { Validation } from '@/presentation/protocols'
import { MissingParamsError } from '@/presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {
  }

  validate (input: Validation.Param): Validation.Result {
    if (!input[this.fieldName]) {
      return new MissingParamsError(this.fieldName)
    }
  }
}