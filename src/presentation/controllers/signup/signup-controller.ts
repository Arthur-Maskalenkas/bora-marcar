import { AddAccount, Validation } from './signup-controller-protocols'

import { Controller, HttpResponse } from '@/presentation/protocols'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { badRequest, forbidden, noContent } from '@/presentation/helpers/http/http-helper'
import { MissingParamsError } from '@/presentation/errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    const { email,name,password } = request

    const errorInValidation = this.validation.validate(request)

    if (errorInValidation) {
      return badRequest(errorInValidation)
    }

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
