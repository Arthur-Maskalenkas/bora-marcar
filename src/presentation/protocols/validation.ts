export interface Validation {
  validate: (input: Validation.Param) => Validation.Result
}

export namespace Validation {
  export type Result = Error

  export type Param = any
}