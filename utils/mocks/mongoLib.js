const sinon = require('sinon')

const { filtererMovieMocks, db } = require('../../utils/filterMovies')
const getAllStub = sinon.stub()
getAllStub.withArgs('movies').resolves(db)

const tagQuery = { tags: { $in: ['Drama'] } }
getAllStub.withArgs('movies', tagQuery).resolves(filtererMovieMocks('Drama'))

const createStub = sinon.stub().resolves(db[0].id)

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query)
  }

  create(collection, data) {
    return createStub(collection, data)
  }
}


module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
}