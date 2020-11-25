const express = require('express')
const { config } = require('./config/index')
const moviesApi = require('./routes/movies')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const debug = require('debug')('app:server')

const app = express()

// middleware
const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHanlders')
const notFoundHandler = require('./utils/middleware/notFoundHanlder')

// body - parser
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

// routes
moviesApi(app)

// not found catch error 404
app.use(notFoundHandler)


// middleware de error van al final de las routes
// errors middlewares
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)


// start server
app.listen(config.port, () => {
  console.log(`Server is listening in port ${config.port}`);
})