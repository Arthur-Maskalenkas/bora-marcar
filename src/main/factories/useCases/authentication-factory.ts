import { env } from '@/main/config'
import { Authentication } from '@/domain/usecases'
import { AccountMysqlRepository, BcryptAdapter, JwtAdapter } from '@/infra'
import { DbAuthentication } from '@/data/usecases'

export const makeDbAuthentication = (): Authentication => {
  const bcryptAdapter = new BcryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new AccountMysqlRepository()

  return new DbAuthentication(accountRepository,bcryptAdapter,jwtAdapter,accountRepository)
}