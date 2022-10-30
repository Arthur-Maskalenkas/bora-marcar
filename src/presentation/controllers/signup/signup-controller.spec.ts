import { SignUpController } from './signup-controller'

import { AddAccountSpy } from '@/presentation/tests/mock-add-account'

type SutTypes = {
  sut: SignUpController
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()

  const sut = new SignUpController(addAccountSpy)

  return {
    sut
  }
}
