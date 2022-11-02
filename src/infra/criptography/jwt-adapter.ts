import jwt from 'jsonwebtoken'

import { Decrypter, Encrypter } from '@/data/protocols'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (param: Encrypter.Param): Encrypter.Result {
    return jwt.sign({ id: param }, this.secret)
  }

  async decrypt (token: Decrypter.Param): Decrypter.Result {
    const tokenDecrypted: any = await jwt.verify(token, this.secret)

    if (tokenDecrypted) {
      return tokenDecrypted
    }

    return null
  }
}