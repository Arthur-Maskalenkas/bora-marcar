import { Controller, HttpResponse } from '../protocols'

export class SignUpController implements Controller {
  async handle (request: SignUpController.Request): Promise<HttpResponse> {
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
