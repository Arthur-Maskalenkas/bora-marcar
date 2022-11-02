import { AddAccount } from '@/domain/usecases/account/add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '@/infra/db/mysql/account/account-repository'
import { DbAddAccountRepository } from '@/data/usecases/account/add-account-repository/db-add-account-repository'

export const makeDbAddAccount = (): AddAccount => {
  const bcryptAdapter = new BcryptAdapter(12)
  const accountRepository = new AccountRepository()

  return new DbAddAccountRepository(bcryptAdapter, accountRepository,accountRepository)
}
