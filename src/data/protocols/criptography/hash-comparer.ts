export interface HashComparer {
  compare: (params: HashComparer.Params) => HashComparer.Result
}

export namespace HashComparer {
  export type Params = { plaintext: string, digest: string }
  export type Result = Promise<boolean>
}