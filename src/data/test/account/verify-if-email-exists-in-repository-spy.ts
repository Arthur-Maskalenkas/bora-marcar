import { VerifyIfEmailExistsInRepository } from '@/data/protocols'

export class VerifyIfEmailExistsInRepositorySpy implements VerifyIfEmailExistsInRepository {
  email: string
  result = false

  async verify (email: string): Promise<boolean> {
    this.email = email

    return this.result
  }
}