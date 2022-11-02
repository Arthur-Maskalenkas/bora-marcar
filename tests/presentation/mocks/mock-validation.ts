import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  inputParams: any
  error: Error
  callsCount = 0

  validate (inputParams: any): Error {
    this.inputParams = inputParams
    this.callsCount++
    return this.error
  }
}