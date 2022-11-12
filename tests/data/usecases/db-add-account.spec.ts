import { DbAddAccount } from '@/data/usecases'
import { mockAddAccountParams } from '@/tests/domain'
import { VerifyIfEmailExistsInRepositorySpy, HasherSpy, AddAccountRepositorySpy } from '@/tests/data'

type SutTypes = {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
  verifyIfEmailExistsInRepositorySpy: VerifyIfEmailExistsInRepositorySpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const verifyIfEmailExistsInRepositorySpy = new VerifyIfEmailExistsInRepositorySpy()

  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, verifyIfEmailExistsInRepositorySpy)

  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    verifyIfEmailExistsInRepositorySpy
  }
}

describe('db-add-account', () => {
  test('Should return true on success', async () => {
    const { sut } = makeSut()

    const response = await sut.add(mockAddAccountParams())

    expect(response).toBeTruthy()
  })

  describe('hasher', () => {
    test('Should call Hasher with correct values', async () => {
      const { sut, hasherSpy } = makeSut()

      const mockParam = mockAddAccountParams()

      expect(hasherSpy.param).toEqual(mockParam.password)
    })

    test('Should throw if Hasher throw', async () => {
      const {
        sut,
        hasherSpy
      } = makeSut()

      jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.add(mockAddAccountParams())

      await expect(promise).rejects.toThrow()
    })
  })

  describe('add-account', () => {
    test('Should call add-account with correct values', async () => {
      const { addAccountRepositorySpy, hasherSpy, sut } = makeSut()

      const mockParam = mockAddAccountParams()

      await sut.add(mockParam)

      expect(addAccountRepositorySpy.params).toEqual({
        ...mockParam,
        password: hasherSpy.result
      })
    })

    test('Should throw if add-account throws', async () => {
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

  describe('verifyExistenceOfEmail-if-param-exist-in-repository', () => {
    test('Should call verifyExistenceOfEmail-if-param-exists-in-repository with correct values', async () => {
      const { sut, verifyIfEmailExistsInRepositorySpy } = makeSut()

      const mockParam = mockAddAccountParams()

      await sut.add(mockParam)

      expect(verifyIfEmailExistsInRepositorySpy.param).toEqual(mockParam.email)
    })

    test('Should throw if verifyExistenceOfEmail-if-param-exists-in-repository throw', async () => {
      const {
        sut,
        verifyIfEmailExistsInRepositorySpy
      } = makeSut()

      jest.spyOn(verifyIfEmailExistsInRepositorySpy, 'verifyExistenceOfEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

      const promise = sut.add(mockAddAccountParams())

      await expect(promise).rejects.toThrow()
    })

    test('Should return false if verifyExistenceOfEmail-if-param-exists-in-repository return true', async () => {
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