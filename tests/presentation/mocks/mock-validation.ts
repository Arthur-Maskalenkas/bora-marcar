import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  input: Validation.Param
  error: Validation.Result
  callsCount = 0

  validate (input: Validation.Param): Validation.Result {
    this.input = input
    this.callsCount++
    return this.error
  }
}