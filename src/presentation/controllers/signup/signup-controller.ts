import { AddAccount, noContent } from './signup-controller-protocols'

import { Controller, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    const { email,name,password } = request

    await this.addAccount.add({ email,name,password })

    return noContent()
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
