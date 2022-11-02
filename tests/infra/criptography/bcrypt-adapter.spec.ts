import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

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

let digest: string
let plaintext: string
let hashParam: string

describe('hash()', () => {
  beforeEach(() => {
    digest = faker.datatype.uuid()
    plaintext = faker.datatype.uuid()
    hashParam = faker.datatype.uuid()
  })

  test('Should call hash with correct values', async () => {
    const { sut, salt } = makeSut()

    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.hash(hashParam)

    expect(hashSpy).toHaveBeenCalledWith(hashParam,salt)
  })

  test('Should return a valued hash on hash success', async () => {
    const { sut } = makeSut()

    const encrypterResponse = await sut.hash(hashParam)

    expect(encrypterResponse).toBe('hashed_password')
  })

  test('Should throw if hash throws', async () => {
    const { sut } = makeSut()

    // @ts-expect-error
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.hash(hashParam)

    await expect(promise).rejects.toThrow()
  })
})

describe('compare()', () => {
  test('Should call compare with correct values', async () => {
    const { sut } = makeSut()

    const compareSpy = jest.spyOn(bcrypt, 'compare')

    await sut.compare({ digest, plaintext })

    expect(compareSpy).toHaveBeenCalledWith(plaintext, digest)
  })

  test('Should return true when compare succeeds', async () => {
    const { sut } = makeSut()

    const compareResult = await sut.compare({ plaintext, digest })

    expect(compareResult).toBe(true)
  })

  test('Should return false when compare false', async () => {
    const { sut } = makeSut()

    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)

    const compareResult = await sut.compare({ plaintext, digest })

    expect(compareResult).toBe(false)
  })

  test('Should throw if compare throws', async () => {
    const { sut } = makeSut()

    // @ts-expect-error
    jest.spyOn(bcrypt, 'compare').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.compare({ plaintext, digest })

    await expect(promise).rejects.toThrow()
  })
})