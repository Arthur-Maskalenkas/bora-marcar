import jwt from 'jsonwebtoken'

import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { Decrypter } from '@/data/protocols/criptography/decrypter'

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