import { DbAddAccountRepository } from 'data/usecases/add-account-repository/db-add-account-repository'

import { AddAccountRepositorySpy, HasherSpy, VerifyIfEmailExistsInRepositorySpy } from '@/data/test'
import { mockAddAccountParams } from '@/domain/test/mock-add-account'

type SutTypes = {
  sut: DbAddAccountRepository
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  verifyIfEmailExistsInRepositorySpy: VerifyIfEmailExistsInRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const verifyIfEmailExistsInRepositorySpy = new VerifyIfEmailExistsInRepositorySpy()

  const sut = new DbAddAccountRepository(hasherSpy, addAccountRepositorySpy, verifyIfEmailExistsInRepositorySpy)

  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    verifyIfEmailExistsInRepositorySpy
  }
}

describe('db-add-account-repository', () => {
  test('Should return true on success', async () => {
    const { sut } = makeSut()

    const response = await sut.add(mockAddAccountParams())

    expect(response).toBeTruthy()
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

  describe('verify-if-email-exist-in-repository', () => {
    test('Should call VerifyIfEmailExistsInRepository with correct values', async () => {
      const { sut, verifyIfEmailExistsInRepositorySpy } = makeSut()

      const mockParam = mockAddAccountParams()

      await sut.add(mockParam)

      expect(verifyIfEmailExistsInRepositorySpy.email).toEqual(mockParam.email)
    })

    test('Should throw if VerifyIfEmailExistsInRepository throw', async () => {
      const {
        sut,
        verifyIfEmailExistsInRepositorySpy
      } = makeSut()

      jest.spyOn(verifyIfEmailExistsInRepositorySpy, 'verify').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

      const promise = sut.add(mockAddAccountParams())

      await expect(promise).rejects.toThrow()
    })

    test('Should return false if VerifyIfEmailExistsInRepository return true', async () => {
      const {
        sut,
        verifyIfEmailExistsInRepositorySpy
      } = makeSut()

      verifyIfEmailExistsInRepositorySpy.result = true

      const response = await sut.add(mockAddAccountParams())

      expect(response).toBeFalsy()
    })
  })
})