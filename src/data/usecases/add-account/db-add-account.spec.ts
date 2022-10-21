import { DbAddAccount } from './db-add-account'

import { HasherSpy } from '@/data/test/hasher'
import { mockAddAccountParams } from '@/domain/test/mock-add-account'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()

  const sut = new DbAddAccount(hasherSpy)

  return {
    sut,
    hasherSpy
  }
}

describe('db-add-account', () => {
  test('Should return null on success', async () => {
    const { sut } = makeSut()

    const response = await sut.add(mockAddAccountParams)

    expect(response).toBeFalsy()
  })
})