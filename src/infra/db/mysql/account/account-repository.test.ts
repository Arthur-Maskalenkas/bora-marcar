import { PrismaClient } from '@prisma/client'

import { AccountRepository } from './account-repository'

import { mockAddAccountParams } from '@/domain/test/account/mock-add-account'

type SutTypes = {
  sut: AccountRepository
}

const makeSut = (): SutTypes => {
  const sut = new AccountRepository()
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
  })
})