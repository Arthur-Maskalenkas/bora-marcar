import { AddAccount } from './signup-controller-protocols'

import { Controller, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    await this.addAccount.add(request)

    return { body: {}, statusCode: 200 }
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
