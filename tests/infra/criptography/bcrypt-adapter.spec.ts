import bcrypt from 'bcrypt'

import { BcryptAdapter } from '@/infra'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return Promise.resolve('hashed_password')
  },

  async compare (): Promise<boolean> {
    return Promise.resolve(true)
  }
}))

type SutTypes = {
  sut: BcryptAdapter
  salt: number
}

const makeSut = (): SutTypes => {
  const salt = 12
  const sut = new BcryptAdapter(salt)

  return {
    sut,
    salt
  }
}

describe('hash()', () => {
  test('Should call hash with correct values', async () => {
    const { sut, salt } = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value',salt)
  })

  test('Should return a valued hash on hash success', async () => {
    const { sut } = makeSut()

    const encrypterResponse = await sut.hash('any_value')

    expect(encrypterResponse).toBe('hashed_password')
  })

  test('Should throw if hash throws', async () => {
    const { sut } = makeSut()

    // @ts-expect-error
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.hash('any_value')

    await expect(promise).rejects.toThrow()
  })
})

describe('compare()', () => {
  test('Should call compare with correct values', async () => {
    const { sut } = makeSut()

    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true when compare succeeds', async () => {
    const { sut } = makeSut()

    const compareResult = await sut.compare('any_value', 'any_hash')

    expect(compareResult).toBe(true)
  })

  test('Should return false when compare false', async () => {
    const { sut } = makeSut()

    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)

    const compareResult = await sut.compare('any_value', 'any_hash')

    expect(compareResult).toBe(false)
  })

  test('Should throw if compare throws', async () => {
    const { sut } = makeSut()

    // @ts-expect-error
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.compare('any,value','any_hash')

    await expect(promise).rejects.toThrow()
  })
})