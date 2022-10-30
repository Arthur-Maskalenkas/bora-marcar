import bcrypt from 'bcrypt'

import { Hasher } from '@/data/protocols/criptography/hasher'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(value,this.salt)

    return Promise.resolve(hashedPassword)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const hashedCompared = await bcrypt.compare(value,hash)
    return hashedCompared
  }
}