import { faker } from '@faker-js/faker'

import { Encrypter, HashComparer, Hasher } from '@/data/protocols'

export class EncrypterSpy implements Encrypter {
  result: Awaited<Encrypter.Result> = faker.datatype.uuid()
  param: Encrypter.Param

  async encrypt (param: Encrypter.Param): Encrypter.Result {
    this.param = param

    return this.result
  }
}

export class HashComparerSpy implements HashComparer {
  result: Awaited<HashComparer.Result> = true
  params: HashComparer.Params

  async compare (params: HashComparer.Params): HashComparer.Result {
    this.params = params

    return this.result
  }
}

export class HasherSpy implements Hasher {
  result: Awaited<Hasher.Result> = faker.datatype.uuid()
  param: Hasher.Param

  async hash (param: Hasher.Param): Hasher.Result {
    this.param = param

    return this.result
  }
}