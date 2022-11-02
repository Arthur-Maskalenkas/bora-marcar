import jwt from 'jsonwebtoken'
import { faker } from '@faker-js/faker'

import { JwtAdapter } from '@/infra'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  },

  async verify (): Promise<string> {
    return 'any_value'
  }
}))

type SutTypes = {
  sut: JwtAdapter
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter('secret')

  return {
    sut
  }
}

let decryptParam: string
let encryptParam: string

describe('signIn()', () => {
  beforeEach(() => {
    decryptParam = faker.datatype.uuid()
    encryptParam = faker.datatype.uuid()
  })

  test('Should call sign with correct values', async () => {
    const { sut } = makeSut()

    const signSpy = jest.spyOn(jwt,'sign')

    await sut.encrypt(encryptParam)

    expect(signSpy).toHaveBeenCalledWith({ id: encryptParam },'secret')
  })

  test('Should return token on success', async () => {
    const { sut } = makeSut()

    const token = await sut.encrypt(encryptParam)

    expect(token).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {
    const { sut } = makeSut()

    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.encrypt(encryptParam)

    await expect(promise).rejects.toThrow()
  })
})

describe('verifyExistenceOfEmail()', () => {
  test('Should call verifyExistenceOfEmail with correct values', async () => {
    const { sut } = makeSut()

    const verifySpy = jest.spyOn(jwt, 'verify')

    await sut.decrypt(decryptParam)

    expect(verifySpy).toHaveBeenCalledWith(decryptParam, 'secret')
  })

  test('Should return a value on verifyExistenceOfEmail success', async () => {
    const { sut } = makeSut()

    const value = await sut.decrypt(decryptParam)

    expect(value).toBe('any_value')
  })

  test('Should throw if verifyExistenceOfEmail throws', async () => {
    const { sut } = makeSut()

    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.decrypt(decryptParam)

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if verifyExistenceOfEmail returns null', async () => {
    const { sut } = makeSut()

    jest.spyOn(jwt, 'verify').mockImplementationOnce(async () => {
      return Promise.resolve(null)
    })

    const value = await sut.decrypt(decryptParam)

    expect(value).toBe(null)
  })
})