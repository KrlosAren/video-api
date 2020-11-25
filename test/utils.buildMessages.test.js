const assert = require('assert')
const buildMessages = require('../utils/buildMessages')


describe.only('utils - buildMessages', () => {
  describe('when receives and an action', () => {
    it('should return the respective message', () => {
      const result = buildMessages('movie', 'created')
      const expect = 'movie created'
      assert.strictEqual(result, expect)
    })
  })

  describe('when receives and an action and is a list', () => {
    it('should return the respective message with the entity in plural', () => {
      const result = buildMessages('movie', 'list')
      const expect = 'movies listed'
      assert.strictEqual(result, expect)
    })
  })


})
