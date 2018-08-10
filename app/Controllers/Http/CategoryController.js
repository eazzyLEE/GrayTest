'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async index({ view }) {
    const categories = await Category.all()

    return view.render('category.index', { categories: categories.toJSON() })
  }

  async store({ request, view, response }) {

    const category = request.input("category");

    // check if product already exists
    if (await Category.findBy({ category })) {
      return response.send({
        status: "error",
        message:
          "A Category with that name already exists, please enter a different name"
      });
    }

    // create new Item
    const item = new Category();
    item.category = category;

    await item.save();

    if (item) {
      const categories = await Category.all()

      return view.render('category.index', { categories: categories.toJSON() })
    }

    response.send({ status: "error", message: "Failed to create category" });
  }

  async show({ request, response, view, params, session }) {
    const categories = await Category.all()

    return view.render("category.new", { categories: categories.toJSON() });
  }
}

module.exports = CategoryController
