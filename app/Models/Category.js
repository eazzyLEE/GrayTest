'use strict'

const Model = use('Model')

class Category extends Model {
  static get table() {
    return "categories";
  }
  static get primaryKey() {
    return "id";
  }
}

module.exports = Category
