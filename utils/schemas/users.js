const joi = require('@hapi/joi')


const userIdSchema = joi.string().regex(/^[a-fA-F1-9]{24}/)

const createUserSchema = {
  name: joi.string().max(100).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  isAdmin: joi.boolean()
}


module.exports = {
  userIdSchema,
  createUserSchema
}