export interface VerifyIfEmailExistsInRepository {
  verify: (email: string) => Promise<boolean>
}