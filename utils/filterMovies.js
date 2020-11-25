const db = require('../utils/mocks/movies.json')

function filtererMovieMocks(tag) {
  return db.filter(movie => {
    movie.tags.includes(tag)
  })
}

class MoviesServicesMock {
  async getMovies() {
    return Promise.resolve(db)
  }

  async createMovie() {
    return Promise.resolve(db[0])
  }
}

module.exports = {
  db,
  filtererMovieMocks,
  MoviesServicesMock
}