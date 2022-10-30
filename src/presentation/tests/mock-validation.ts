import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  inputParams: any
  error: Error

  validate (inputParams: any): Error {
    this.inputParams = inputParams
    return this.error
  }
}
