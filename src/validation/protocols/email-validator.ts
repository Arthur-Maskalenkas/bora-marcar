export interface EmailValidator {
  isValid: (email: EmailValidator.Param) => EmailValidator.Result
}

export namespace EmailValidator {
  export type Param = string
  export type Result = boolean
}