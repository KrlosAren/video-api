const express = require('express')
const movieServices = require('../services/movieServices')
const validationHandler = require('../utils/middleware/validationHandler')
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/schemas/movies')


function moviesApi(app) {

  const moviesServices = new movieServices()

  const router = express.Router()
  app.use('/api/movies', router)

  router.get('/', async (req, res, next) => {
    const { tags } = req.query
    try {
      const movies = await moviesServices.getMovies({ tags })
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {
    const { movieId } = req.params
    try {
      const movie = await moviesServices.getMovie({ movieId })
      res.status(200).json({
        data: movie,
        message: 'movie retrieved'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', validationHandler(createMovieSchema), async (req, res, next) => {
    const { body: movie } = req
    try {
      const createdMovieId = await moviesServices.createMovie({ movie })
      res.status(201).json({
        data: createdMovieId,
        message: 'movie created'
      })
    } catch (error) {
      next(error)
    }
  })

  router.patch('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async (req, res, next) => {
    const { body: movie } = req
    const { movieId } = req.params
    try {
      const patchedMovie = await moviesServices.patchMovie({ movieId, movie })
      res.status(201).json({
        data: patchedMovie,
        message: 'movie patched'
      })
    } catch (error) {
      next(error)
    }
  })

  router.put('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async (req, res, next) => {
    const { body: movie } = req
    const { movieId } = req.params
    try {
      const updatedMovie = await moviesServices.updateMovie({ movieId, movie })
      res.status(201).json({
        data: updatedMovie,
        message: 'movie updated'
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {
    const { movieId } = req.params
    try {
      const deletedMovie = await moviesServices.deleteMovie({ movieId })
      res.status(201).json({
        data: deletedMovie,
        message: 'movie deleted'
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = moviesApi