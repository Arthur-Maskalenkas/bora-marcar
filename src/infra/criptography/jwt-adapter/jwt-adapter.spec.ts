import jwt from 'jsonwebtoken'

import { JwtAdapter } from './jwt-adapter'

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

describe('signIn()', () => {
  test('Should call sign with correct values', async () => {
    const { sut } = makeSut()

    const signSpy = jest.spyOn(jwt,'sign')

    await sut.encrypt('any_id')

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' },'secret')
  })

  test('Should return token on success', async () => {
    const { sut } = makeSut()

    const token = await sut.encrypt('any_id')

    expect(token).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {
    const { sut } = makeSut()

    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.encrypt('any_id')

    await expect(promise).rejects.toThrow()
  })
})

describe('verify()', () => {
  test('Should call verify with correct values', async () => {
    const { sut } = makeSut()

    const verifySpy = jest.spyOn(jwt, 'verify')

    await sut.decrypt('any_token')

    expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
  })

  test('Should return a value on verify success', async () => {
    const { sut } = makeSut()

    const value = await sut.decrypt('any_token')

    expect(value).toBe('any_value')
  })

  test('Should throw if verify throws', async () => {
    const { sut } = makeSut()

    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.decrypt('any_token')

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if verify returns null', async () => {
    const { sut } = makeSut()

    jest.spyOn(jwt, 'verify').mockImplementationOnce(async () => {
      return Promise.resolve(null)
    })

    const value = await sut.decrypt('any_token')

    expect(value).toBe(null)
  })
})
