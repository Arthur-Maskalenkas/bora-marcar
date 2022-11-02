import { AddAccount } from '@/domain/usecases/account/add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMysqlRepository } from '@/infra/db/mysql/account/account-mysql-repository'
import { DbAddAccountRepository } from '@/data/usecases/account/add-account-repository/db-add-account-repository'

export const makeDbAddAccount = (): AddAccount => {
  const bcryptAdapter = new BcryptAdapter(12)
  const accountRepository = new AccountMysqlRepository()

  return new DbAddAccountRepository(bcryptAdapter, accountRepository,accountRepository)
}