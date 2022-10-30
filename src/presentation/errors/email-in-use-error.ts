export class EmailInUseError extends Error {
  constructor () {
    super('The received email is aleready in use')
    this.name = 'EmailInUseError'
  }
}
