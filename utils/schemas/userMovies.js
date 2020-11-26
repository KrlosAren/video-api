const joi = require('@hapi/joi')

const { movieIdSchema } = require('./movies')
const { userIdSchema } = require('./users')

const userMovieIdSchema = joi.string().regex(/^[a-fA-F1-9]{24}/)

const createUserMovieSchema = {
  userId: userIdSchema,
  movieId = movieIdSchema
}

module.exports = {
  userMovieIdSchema,
  createUserMovieSchema
}