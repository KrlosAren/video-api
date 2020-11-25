const assert = require('assert')
const { it } = require('mocha')
const proxyquire = require('proxyquire')

const { db, MoviesServicesMock, filtererMovieMocks } = require('../utils/filterMovies')
const testServer = require('../utils/testServer')

describe('routes - movies', () => {
  const route = proxyquire('../routes/movies', {
    '../services/movieServices': MoviesServicesMock
  })

  const request = testServer(route)

  describe('GET /movies', () => {
    it('should respond with status 200', (done) => {
      request.get('/api/movies').expect(200, done)
    })
  })

  it('should respond with the list of movies', (done) => {
    request.get('/api/movies').end((err, res) => {
      assert.deepStrictEqual(res.body, {
        data: db,
        message: 'movies listed'
      })
      done()
    })
  })

})
