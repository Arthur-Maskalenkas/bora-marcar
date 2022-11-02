import bcrypt from 'bcrypt'

import { Hasher , HashComparer } from '@/data/protocols'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (param: Hasher.Param): Hasher.Result {
    return await bcrypt.hash(param,this.salt)
  }

  async compare (params: HashComparer.Params): HashComparer.Result {
    return await bcrypt.compare(params.plaintext, params.digest)
  }
}