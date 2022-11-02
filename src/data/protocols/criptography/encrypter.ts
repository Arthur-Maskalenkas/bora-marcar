export interface Encrypter {
  encrypt: (param: Encrypter.Param) => Encrypter.Result
}

export namespace Encrypter {
  export type Param = string
  export type Result = Promise<string>
}