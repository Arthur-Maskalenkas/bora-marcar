export interface Hasher {
  hash: (param: Hasher.Param) => Hasher.Result
}

export namespace Hasher {
  export type Param = string
  export type Result = Promise<string>
}