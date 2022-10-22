import { VerifyIfAccountExistRepository } from '@/data/protocols/verify-if-account-exist-repository'

export class VerifyIfAccountExistRepositorySpy implements VerifyIfAccountExistRepository {
  email: string

  result = true

  async verify (email: string): Promise<boolean> {
    this.email = email

    return this.result
  }
}