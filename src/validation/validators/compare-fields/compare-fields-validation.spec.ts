import { faker } from '@faker-js/faker'

import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from '@/validation/validators'

type SutTypes = {
  sut: CompareFieldsValidation
}

const makeSut = (): SutTypes => {
  const sut = new CompareFieldsValidation('field','fieldToCompare')

  return {
    sut
  }
}

const field = faker.random.word()
const fieldToCompare = faker.random.word()

describe('Compare Fields', () => {
  test('Should return InvalidParamError if error', () => {
    const { sut } = makeSut()

    const body = {
      field: 'any_value',
      fieldToCompare: 'other_valua'
    }

    const error = sut.validate(body)

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation success', () => {
    const { sut } = makeSut()

    const value = faker.random.word()

    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })

    expect(error).toBeFalsy()
  })
})
