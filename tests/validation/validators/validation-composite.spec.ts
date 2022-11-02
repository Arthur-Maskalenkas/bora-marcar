import { faker } from '@faker-js/faker'

import { ValidationComposite } from '@/validation/validators'
import { MissingParamsError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation'

type SutTypes = {
  sut: ValidationComposite
  ValidationSpies: ValidationSpy[]
}

const field = faker.random.word()

const makeSut = (): SutTypes => {
  const ValidationSpies = [new ValidationSpy(), new ValidationSpy()]

  const sut = new ValidationComposite(ValidationSpies)

  return {
    sut,
    ValidationSpies
  }
}

describe('$2$', () => {
  test('Should not return if not error', () => {
    const { sut } = makeSut()

    const fakeInput = {
      name: field
    }

    const validationResponse = sut.validate(fakeInput)

    expect(validationResponse).toBeFalsy()
  })

  test('Should return Error if validation return error', () => {
    const { sut, ValidationSpies } = makeSut()

    ValidationSpies[0].error = new Error()

    const fakeInput = {
      name: field
    }

    const validationResponse = sut.validate(fakeInput)

    expect(validationResponse).toEqual(new Error())
  })

  test('Should stop iteration if error and returns only first error', () => {
    const { sut, ValidationSpies } = makeSut()

    ValidationSpies[0].error = new Error()

    const fakeInput = {
      name: field
    }

    sut.validate(fakeInput)

    expect(ValidationSpies[1].callsCount).toBe(0)
  })

  test('Should return only first error if have more than errors', async () => {
    const { sut, ValidationSpies } = makeSut()

    ValidationSpies[0].error = new Error()
    ValidationSpies[1].error = new MissingParamsError(field)

    const fakeInput = {
      name: field
    }

    const response = sut.validate(fakeInput)

    expect(response).toEqual(new Error())

    expect(ValidationSpies[0].callsCount).toBe(1)
    expect(ValidationSpies[1].callsCount).toBe(0)
  })
})