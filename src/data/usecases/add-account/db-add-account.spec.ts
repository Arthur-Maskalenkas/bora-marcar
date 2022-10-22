import { DbAddAccount } from './db-add-account'

import { AddAccountRepositorySpy, HasherSpy, VerifyIfAccountExistRepositorySpy } from '@/data/test'
import { mockAddAccountParams } from '@/domain/test/mock-add-account'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  verifyIfAccountExistRepositorySpy: VerifyIfAccountExistRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const verifyIfAccountExistRepositorySpy = new VerifyIfAccountExistRepositorySpy()

  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, verifyIfAccountExistRepositorySpy)

  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    verifyIfAccountExistRepositorySpy
  }
}

describe('db-add-account', () => {
  test('Should return null on success', async () => {
    const { sut } = makeSut()

    const response = await sut.add(mockAddAccountParams())

    expect(response).toBeFalsy()
  })

  describe('hasher', () => {
    test('Should call Hasher with correct values', async () => {
      const { sut,hasherSpy } = makeSut()

      const mockParam = mockAddAccountParams()

      await sut.add(mockParam)

      expect(hasherSpy.plaintText).toEqual(mockParam.password)
    })

    test('Should throw if Hasher throw', async () => {
      const {
        sut,
        hasherSpy
      } = makeSut()

      jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(async () => (
        Promise.reject(new Error())
      ))

      const promise = sut.add(mockAddAccountParams())

      await expect(promise).rejects.toThrow()
    })
  })

  describe('add-account-repository', () => {
    test('Should call AddAccountRepository with correct values', async () => {
      const { addAccountRepositorySpy,hasherSpy,sut } = makeSut()

      const mockParam = mockAddAccountParams()

      await sut.add(mockParam)

      expect(addAccountRepositorySpy.params).toEqual({
        ...mockParam,
        password: hasherSpy.digest
      })
    })

    test('Should throw if AddAccountRepository throw', async () => {
      const {
        sut,
        addAccountRepositorySpy
      } = makeSut()

      // make a Promise<void> throw error
      jest.spyOn(addAccountRepositorySpy, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

      const promise = sut.add(mockAddAccountParams())

      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify-if-account-exist-repository', () => {
    test('Should call VerifyIfAccountExistRepository with correct values', async () => {
      const { sut,verifyIfAccountExistRepositorySpy } = makeSut()

      const mockParam = mockAddAccountParams()

      await sut.add(mockParam)

      expect(verifyIfAccountExistRepositorySpy.email).toEqual(mockParam.email)
    })

    test('Should throw if VerifyIfAccountExistRepository throw', async () => {
      const {
        sut,
        verifyIfAccountExistRepositorySpy
      } = makeSut()

      jest.spyOn(verifyIfAccountExistRepositorySpy, 'verify').mockImplementationOnce(async () => (
        Promise.reject(new Error())
      ))

      const promise = sut.add(mockAddAccountParams())

      await expect(promise).rejects.toThrow()
    })
  })
})