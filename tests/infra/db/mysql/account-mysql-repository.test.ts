import { PrismaClient } from '@prisma/client'

import { AccountMysqlRepository } from '@/infra'
import { mockAddAccountParams } from '@/tests/domain'

type SutTypes = {
  sut: AccountMysqlRepository
}

const makeSut = (): SutTypes => {
  const sut = new AccountMysqlRepository()
  return {
    sut
  }
}
const prisma = new PrismaClient()

describe('AccountRepository', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    const deleteAccounts = prisma.account.deleteMany()

    await prisma.$transaction([
      deleteAccounts
    ])
    await prisma.$disconnect()
  })

  describe('add()', () => {
    test('Should add account on database', async () => {
      const { sut } = makeSut()
      const params = mockAddAccountParams()

      await sut.add(params)

      const accountDB = await prisma.account.findUnique({
        where: {
          email: params.email
        }
      })

      expect(accountDB).toBeTruthy()
    })

    test('Should return true on success', async () => {
      const { sut } = makeSut()

      const params = mockAddAccountParams()

      const account = await sut.add(params)

      const accountDB = await prisma.account.findUnique({
        where: {
          email: params.email
        }
      })

      expect(accountDB).toBeTruthy()
      expect(account).toBeTruthy()
    })
  })

  describe('loadByEmail()', () => {
    test('Should return account on success', async () => {
      const { sut } = makeSut()

      const params = mockAddAccountParams()

      await prisma.account.create({
        data: params
      })

      const account = await sut.loadByEmail(params.email)

      expect(account).toEqual({
        id: account.id,
        name: params.name,
        password: params.password
      })
    })

    test('Should return null if account not exists', async () => {
      const { sut } = makeSut()

      const params = mockAddAccountParams()

      const account = await sut.loadByEmail(params.email)

      expect(account).toBeNull()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update account accessToken on success', async () => {
      const { sut } = makeSut()

      const params = mockAddAccountParams()

      const account = await prisma.account.create({
        data: params
      })

      expect(account.accessToken).toBeFalsy()

      await sut.updateAccessToken({ id: account.id.toString(), token: 'any_token' })

      const accountDB = await prisma.account.findUnique({
        where: {
          email: params.email
        }
      })

      expect(accountDB.accessToken).toBe('any_token')
    })
  })

  describe('verifyExistenceOfEmail()', () => {
    test('Should return true if param exists', async () => {
      const { sut } = makeSut()

      const params = mockAddAccountParams()

      await prisma.account.create({
        data: params
      })

      const account = await sut.verifyExistenceOfEmail(params.email)

      expect(account).toBeTruthy()
    })
  })
})