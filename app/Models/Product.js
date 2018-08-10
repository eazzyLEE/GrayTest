'use strict'

const Model = use('Model')

class Product extends Model {
  static get table() {
    return "products";
  }
  static get primaryKey() {
    return "id";
  }
}

module.exports = Product
