export class EmailInUseError extends Error {
  constructor () {
    super('The received param is aleready in use')
    this.name = 'EmailInUseError'
  }
}