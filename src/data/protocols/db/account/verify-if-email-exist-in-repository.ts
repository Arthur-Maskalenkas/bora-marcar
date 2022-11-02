export interface VerifyIfEmailExistsInRepository {
  verify: (email: VerifyIfEmailExistsInRepository.Params) => VerifyIfEmailExistsInRepository.Result
}

export namespace VerifyIfEmailExistsInRepository {
  export type Params = string
  export type Result = Promise<boolean>
}