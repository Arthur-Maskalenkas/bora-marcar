export interface Decrypter {
  decrypt: (token: Decrypter.Param) => Decrypter.Result
}

export namespace Decrypter {
  export type Param = string
  export type Result = Promise<string>
}