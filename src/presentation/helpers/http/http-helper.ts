import { HttpResponse } from '@/presentation/protocols'

// Sucesso, porém não retorna nada
export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

// O servidor recebeu a requisição, entendeu, porém é insuficiente para para garantir o acesso
export const forbidden = (error: Error): HttpResponse => (
  {
    statusCode: 403,
    body: error
  }
)

export const badRequest = (error: Error): HttpResponse => (
  {
    statusCode: 400,
    body: error
  }
)