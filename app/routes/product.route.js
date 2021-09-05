'use strict'
const { createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/product.controller')
const { validateCreateProduct, validateGetProduct, validateUpdateProduct, validateDeleteProduct } = require('../middlewares/product.middleware')
// const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.post(route + '/product', validateCreateProduct, createProduct)
  app.get(route + '/product', validateGetProduct, getProduct)
  app.put(route + '/product/:id', validateUpdateProduct, updateProduct)
  app.delete(route + '/product/:id', validateDeleteProduct, deleteProduct)
  // app.get(route + '/product', passport.authenticate('jwt', { session: false }), validateCreateProduct, createProduct)
}
