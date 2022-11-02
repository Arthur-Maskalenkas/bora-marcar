export interface LoadAccountByEmailRepository {
  loadByEmail: (email: LoadAccountByEmailRepository.Param) => LoadAccountByEmailRepository.Result
}

export namespace LoadAccountByEmailRepository {
  export type Result = Promise<{
    id: string
    name: string
    password: string
  }>

  export type Param = string
}