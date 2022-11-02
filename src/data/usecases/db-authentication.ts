import { Encrypter, HashComparer, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'
import { Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (params: Authentication.Params): Authentication.Result {
    const { password,email } = params

    const account = await this.loadAccountByEmailRepository.loadByEmail(email)

    if (account) {
      const isValid = await this.hashComparer.compare({
        plaintext: password,
        digest: account.password
      })

      if (isValid) {
        const jwt = await this.encrypter.encrypt(account.id)

        await this.updateAccessTokenRepository.updateAccessToken({ id: account.id,token: jwt })

        return {
          accessToken: jwt,
          name: account.name
        }
      }
    }

    return null
  }
}