import { HttpResponse } from '@/presentation/controllers/protocols'

// Sucesso, porém não retorna nada
export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
