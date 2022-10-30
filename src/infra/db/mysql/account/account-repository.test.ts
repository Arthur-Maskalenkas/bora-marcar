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

describe('AccountRepository', () => {
  const prisma = new PrismaClient()

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