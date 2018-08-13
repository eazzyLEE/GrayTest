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

  async edit({ request, response, view, params, session }) {
    const category = await Category
      .query()
      .where({ id: params.category_id })
      .first();

    if (category) {
      return view.render("category.edit", { category: category.toJSON() });
    }

    // flash error
    session.flash({ type: "info", message: "category not found" });

    return response.redirect("/categories");
  }

  // Update Item
  async update({ params, request, response, view, session }) {

    const {
      category,
      category_id
    } = request.all()

    if (!category) {

      session.flash({ type: "info", message: "A field is missing" });
      return response.redirect("/categories");
    }

    const item = await Category.find(category_id)

    if (item) {
      item.category = category

      await item.save();

      session.flash({
        type: "success",
        message: "Product category updated successfully!"
      });

      return response.redirect("/categories");
    }
    // flash error
    session.flash({ type: "info", message: "Category not found" });

    return response.redirect("/categories");
  }

  // Delete Item
  async delete({ request, response, view, params, session }) {
    const product = await Product.find(params.product_id);

    if (product) {
      // delete car
      await product.delete();

      session.flash({ type: "success", message: "Product successfully removed!" });

      return response.redirect("/");
    }

    // flash error
    session.flash({ type: "info", message: "Product does not exist" });

    return response.redirect("/");
  }
}

module.exports = CategoryController
