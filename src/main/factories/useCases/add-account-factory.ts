import { AddAccount } from '@/domain/usecases'
import { DbAddAccount } from '@/data/usecases'
import { AccountMysqlRepository, BcryptAdapter } from '@/infra'

export const makeDbAddAccount = (): AddAccount => {
  const bcryptAdapter = new BcryptAdapter(12)
  const accountRepository = new AccountMysqlRepository()

  return new DbAddAccount(bcryptAdapter, accountRepository,accountRepository)
}