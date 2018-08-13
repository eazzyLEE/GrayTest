'use strict'

const Product = use('App/Models/Product')
const Category = use('App/Models/Category')

class ProductController {

  // View all items
  async index({ view }) {
    const products = await Product.all()

    return view.render('products.index', { products: products.toJSON() })
  }

  // Post Item
  async store({ request, view, response, session }) {


    const name = request.input("name");
    const description = request.input("description");
    const price = request.input("price");
    const category = request.input("category"); // status is optional, default is 1
    const image = request.input("image");

    // check if product already exists
    if (await Product.findBy({ name })) {
      return response.send({
        status: "error",
        message:
          "A Product with that name already exists, please enter a different item"
      });
    }

    if (!price || !name || !description || !category) {

      session.flash({ type: "info", message: "Some fields are missing" });
      return response.redirect("/");
    }

    // create new Item
    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.image = image;

    await product.save();

    if (product) {
      const products = await Product.all()

      return view.render('products.index', { products: products.toJSON() })
    }

    response.send({ status: "error", message: "Failed to create product" });
  }

  async show({ request, response, view, params, session }) {
    const categories = await Category.all()

    return view.render("products.new", { categories: categories.toJSON() });
  }

  // Edit Item
  async edit({ request, response, view, params, session }) {
    const product = await Product
      .query()
      .where({ id: params.product_id })
      .first();

    if (product) {
      return view.render("products.edit", { product: product.toJSON() });
    }

    // flash error
    session.flash({ type: "info", message: "product not found" });

    return response.redirect("/");
  }

  // Update Item
  async update({ params, request, response, view, session }) {

    const {
      name,
      description,
      price,
      category,
      product_id
    } = request.all()

    if (!price || !name || !description || !category) {

      session.flash({ type: "info", message: "Some fields are missing" });
      return response.redirect("/");
    }

    const product = await Product.find(product_id)

    if (product) {
      product.name = name
      product.description = description
      product.price = price
      product.category = category

      await product.save();

      session.flash({
        type: "success",
        message: "Product details updated successfully!"
      });

      return response.redirect("/");
    }
    // flash error
    session.flash({ type: "info", message: "Product not found" });

    return response.redirect("/");
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

module.exports = ProductController
