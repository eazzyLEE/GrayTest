'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.get('/', 'ProductController.index')
Route.post('products', 'ProductController.store')
Route.get('new', 'ProductController.show')
Route.get("edit/:product_id", "ProductController.edit").as("edit_product");
Route.post("update", "ProductController.update");
Route.get("delete/:product_id", "ProductController.delete").as("delete_product");

Route.get('/categories', 'CategoryController.index')
Route.post('category', 'CategoryController.store')
Route.get('new_category', 'CategoryController.show')
Route.get("category_edit/:category_id", "CategoryController.edit").as("edit_category");
Route.post("category_update", "CategoryController.update");
Route.get("category_delete/:category_id", "CategoryController.delete").as("delete_category");

// Route.on('/').render('master')
