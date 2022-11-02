import { DbAuthentication } from '@/data/usecases/db-authentication'
import { mockAuthenticationParams } from '@/tests/domain'
import { UpdateAccessTokenRepositorySpy , EncrypterSpy , HashComparerSpy , LoadAccountByEmailRepositorySpy } from '@/tests/data'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()

  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  )

  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    updateAccessTokenRepositorySpy,
    encrypterSpy
  }
}

describe('db-authentication', () => {
  test('Should return a token and name success on success', async () => {
    const {
      sut,
      encrypterSpy,
      loadAccountByEmailRepositorySpy
    } = makeSut()

    const {
      accessToken,
      name
    } = await sut.auth(mockAuthenticationParams())

    expect(accessToken).toBe(encrypterSpy.ciphertext)
    expect(name).toBe(loadAccountByEmailRepositorySpy.result.name)
  })

  describe('load-account-by-email-repository', () => {
    test('Should call load-account-by-email-repository with correct values', async () => {
      const {
        sut,
        loadAccountByEmailRepositorySpy
      } = makeSut()

      const authenticationParams = mockAuthenticationParams()

      await sut.auth(authenticationParams)

      expect(loadAccountByEmailRepositorySpy.email).toEqual(authenticationParams.email)
    })

    test('Should throw if load-account-by-email-repository throws', async () => {
      const {
        sut,
        loadAccountByEmailRepositorySpy
      } = makeSut()

      jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(async () => (
        Promise.reject(new Error())
      ))

      const promise = sut.auth(mockAuthenticationParams())

      await expect(promise).rejects.toThrow()
    })

    test('Should return null if load-account-by-email-repository returns null', async () => {
      const {
        sut,
        loadAccountByEmailRepositorySpy
      } = makeSut()

      loadAccountByEmailRepositorySpy.result = null

      const model = await sut.auth(mockAuthenticationParams())

      expect(model).toBeNull()
    })
  })

  describe('hash-comparer', () => {
    test('Should call hash-comparer with correct values', async () => {
      const {
        sut,
        hashComparerSpy,
        loadAccountByEmailRepositorySpy
      } = makeSut()

      const authenticationParams = mockAuthenticationParams()

      await sut.auth(authenticationParams)

      expect(hashComparerSpy.plaintext).toEqual(authenticationParams.password)
      expect(hashComparerSpy.digest).toEqual(loadAccountByEmailRepositorySpy.result.password)
    })

    test('Should throw if hash-comparer throws', async () => {
      const {
        sut,
        hashComparerSpy
      } = makeSut()

      jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(async () => (
        Promise.reject(new Error())
      ))

      const promise = sut.auth(mockAuthenticationParams())

      await expect(promise).rejects.toThrow()
    })

    test('Should return null if hash-comparer returns false', async () => {
      const {
        sut,
        hashComparerSpy
      } = makeSut()

      hashComparerSpy.isValid = false

      const accessToken = await sut.auth(mockAuthenticationParams())

      expect(accessToken).toBe(null)
    })
  })

  describe('encrypter', () => {
    test('Should call encrypter with correct id', async () => {
      const {
        sut,
        encrypterSpy,
        loadAccountByEmailRepositorySpy
      } = makeSut()

      const authenticationParams = mockAuthenticationParams()

      await sut.auth(authenticationParams)

      expect(encrypterSpy.plaintext).toBe(loadAccountByEmailRepositorySpy.result.id)
    })

    test('Should throw if encrypter throws', async () => {
      const {
        sut,
        encrypterSpy
      } = makeSut()

      jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(() => {
        throw new Error()
      })

      const promise = sut.auth(mockAuthenticationParams())

      await expect(promise).rejects.toThrow()
    })
  })

  describe('update-access-token-repository', () => {
    test('Should call update-access-token-repository with Correct values', async () => {
      const {
        sut,
        updateAccessTokenRepositorySpy,
        loadAccountByEmailRepositorySpy,
        encrypterSpy
      } = makeSut()

      const authenticationParams = mockAuthenticationParams()

      await sut.auth(authenticationParams)

      expect(updateAccessTokenRepositorySpy.id).toEqual(loadAccountByEmailRepositorySpy.result.id)
      expect(updateAccessTokenRepositorySpy.token).toEqual(encrypterSpy.ciphertext)
    })

    test('Should throw if update-access-token-repository throws', async () => {
      const {
        sut,
        updateAccessTokenRepositorySpy
      } = makeSut()

      jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockImplementationOnce(async () => (
        Promise.reject(new Error())
      ))

      const promise = sut.auth(mockAuthenticationParams())

      await expect(promise).rejects.toThrow()
    })
  })
})