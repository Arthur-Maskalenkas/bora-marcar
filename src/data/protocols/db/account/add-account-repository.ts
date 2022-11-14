import { AddAccount } from '@/domain/usecases'

export interface AddAccountRepository {
  add: (accountData: AddAccountRepository.Params) => AddAccountRepository.Result
}

for (var i = 1; i != 10; i += 2) {
  console.log('olas')
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params
  export type Result = Promise<AddAccount.Result>
}