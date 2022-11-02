export interface VerifyIfEmailExistsInRepository {
  verifyExistenceOfEmail: (email: VerifyIfEmailExistsInRepository.Param) => VerifyIfEmailExistsInRepository.Result
}

export namespace VerifyIfEmailExistsInRepository {
  export type Param = string
  export type Result = Promise<boolean>
}