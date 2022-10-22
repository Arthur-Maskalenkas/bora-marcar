export interface VerifyIfAccountExistRepository {
  verify: (email: string) => Promise<boolean>
}