const assert = require('assert')
const proxyquire = require('proxyquire')

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib')
const db = require('../utils/mocks/movies.json')

describe('services - movies', () => {
  const MoviesService = proxyquire('../services/movieServices', {
    '../lib/mongo': MongoLibMock
  })
  const moviesService = new MoviesService

  describe('when getMovies method is call', async () => {
    it('should call the gellAll MongoLib method', async () => {
      await moviesService.getMovies({})
      assert.strictEqual(getAllStub.called, true)
    })

    it('should return an array of movies', async () => {
      const result = await moviesService.getMovies({})
      const expected = db
      assert.deepStrictEqual(result, expected)
    })
  })
})
