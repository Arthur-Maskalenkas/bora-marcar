export interface AddAccount {
  add: (params: AddAccount.Params) => AddAccount.Result
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
    accessToken?: string
  }

  export type Result = Promise<boolean>
}