import { castInputToNumber } from '../src/utils'

describe('Test Utility functions', () => {
  describe('castInputToNumber', () => {
    it('Should accurately parse integers from strings', () => {
      expect(castInputToNumber('testInput', '0')).toEqual(0)
      expect(castInputToNumber('testInput', '1234')).toEqual(1234)
      expect(castInputToNumber('testInput', '3.14')).toEqual(3)
    })
  })
})
