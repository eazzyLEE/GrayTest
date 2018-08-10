'use strict'

const Schema = use('Schema')

class ProductSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.integer('price').unsigned().notNullable()
      table.string('category').notNullable()
      table.foreign('category').references('category').on('categories').onDelete('cascade')
      table.string('image').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('products')
  }
}

module.exports = ProductSchema
