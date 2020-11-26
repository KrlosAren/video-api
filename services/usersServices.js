const MongoLib = require('../lib/mongo')
const bcrypt = require('bcrypt')

class UserService {
  constructor() {
    this.collection = 'users'
    this.mongoDB = new MongoLib()
  }

  async getUser({ email }) {
    const { user } = await this.mongoDB.getAll(this.collectionm { email })
    return user
  }

  async createUser({ user }) {
    const { name, email, password } = user
    const hashPassword = await bcrypt.hash(password, 10)

    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashPassword
    })
    return createUserId
  }
}

module.exports = UserService