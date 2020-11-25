// por default express imprimer los errores en formato HTML por eso necesitamos cambiarlos json
const boom = require('@hapi/boom')
const { config } = require('../../config')

function withErrorStack(error, stack) {
  if (config.dev) {
    return {
      ...error,
      stack
    }
  }
  return error
}

function logErrors(error, req, res, next) {
  console.log(error);
  next(error)
}

function wrapErrors(error, res, res, next) {
  if (!error.isBoom) {
    next(boom.badImplementation(error))
  }
  next(error)
}

function errorHandler(error, req, res, next) {
  const { output: { statusCode, payload } } = error
  // res.status(error.status || 500)
  res.status(statusCode)
  // res.json(withErrorStack(error.message, error.stack))
  res.json(withErrorStack(payload, error.stack))

}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
}