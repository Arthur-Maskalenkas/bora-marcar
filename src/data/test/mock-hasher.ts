import { faker } from '@faker-js/faker'

import { Hasher } from '@/data/protocols/hasher'

export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid()
  plaintText: string

  async hash (plaintext: string): Promise<string> {
    this.plaintText = plaintext
    return this.digest
  }
}