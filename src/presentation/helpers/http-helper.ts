import { ServerError } from '@/presentation/errors'
import { HttpResponse } from '@/presentation/protocols'

export const badRequest = (error: Error): HttpResponse => (
  {
    statusCode: 400,
    body: error
  }
)

// O servidor recebeu a requisição, entendeu, porém é insuficiente para para garantir o acesso
export const forbidden = (error: Error): HttpResponse => (
  {
    statusCode: 403,
    body: error
  }
)

export const unauthorized = (error: Error): HttpResponse => (
  {
    statusCode: 401,
    body: error
  }
)

export const serverError = (error: Error): HttpResponse => (
  {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
)

export const ok = (body: any): HttpResponse => (
  {
    statusCode: 200,
    body
  }
)

// Sucesso, porém não retorna nada
export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
