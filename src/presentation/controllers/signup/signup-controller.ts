import { AddAccount, noContent, forbidden } from './signup-controller-protocols'

import { Controller, HttpResponse } from '../protocols'

import { EmailInUseError } from '@/presentation/errors/email-in-use-error'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    const { email,name,password } = request

    const account = await this.addAccount.add({ email,name,password })

    if (!account) {
      return forbidden(new EmailInUseError())
    }

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
