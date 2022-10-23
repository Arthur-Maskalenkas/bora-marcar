import { PrismaClient } from '@prisma/client'

import { AccountRepository } from './account-repository'

import { mockAddAccountParams } from '@/domain/test/mock-add-account'

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
    await prisma.$disconnect()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const mockParams = mockAddAccountParams()

    await sut.add(mockParams)

    const account = await prisma.account.findUnique({
      where: {
        email: mockParams.email
      }
    })

    expect(account).toBeTruthy()
  })
})
