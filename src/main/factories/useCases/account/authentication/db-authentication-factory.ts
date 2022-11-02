import env from '@/main/config/env'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { DbAuthentication } from '@/data/usecases/account/authentication/db-authentication'
import { Authentication } from '@/domain/usecases/account/authentication'
import { AccountMysqlRepository } from '@/infra/db/mysql/account/account-mysql-repository'

export const makeDbAuthentication = (): Authentication => {
  const bcryptAdapter = new BcryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new AccountMysqlRepository()

  return new DbAuthentication(accountRepository,bcryptAdapter,jwtAdapter,accountRepository)
}