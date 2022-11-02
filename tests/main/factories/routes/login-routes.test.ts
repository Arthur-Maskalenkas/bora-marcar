
import request from 'supertest'
import { PrismaClient } from '@prisma/client'

import app from '@/main/config/app'

const prisma = new PrismaClient()

describe('Login Routes', () => {
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

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Rodrigo',
          email: 'rodrigo.manguinho@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })
})