import { DbAddAccount } from './db-add-account'

import { mockAddAccountParams } from '@/domain/test/mock-add-account'

type SutTypes = {
  sut: DbAddAccount
}

const makeSut = (): SutTypes => {
  const sut = new DbAddAccount()

  return {
    sut
  }
}

describe('db-add-account', () => {
  test('Should return null on success', async () => {
    const { sut } = makeSut()

    const response = await sut.add(mockAddAccountParams)

    expect(response).toBeFalsy()
  })
})