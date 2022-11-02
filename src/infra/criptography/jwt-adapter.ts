import jwt from 'jsonwebtoken'

import { Decrypter, Encrypter } from '@/data/protocols'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret)
  }

  async decrypt (token: string): Promise<string> {
    const tokenDecrypted: any = await jwt.verify(token, this.secret)

    if (tokenDecrypted) {
      return tokenDecrypted
    }

    return null
  }
}