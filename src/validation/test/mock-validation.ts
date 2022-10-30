import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  input: any
  callsCount = 0
  errors = null

  validate (input: any): Error {
    this.input = input
    this.callsCount++
    return this.errors
  }
}
