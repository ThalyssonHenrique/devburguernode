import Sequelize from 'sequelize'
import configDatabase from '../config/database'
import User from '../app/models/User'
import Product from '../app/models/Product'
import Category from '../app/models/Category'
import mongoose from 'mongoose'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models.map((model) => model.init(this.connection))
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/codeburger',
    )
  }
}

export default new Database()
