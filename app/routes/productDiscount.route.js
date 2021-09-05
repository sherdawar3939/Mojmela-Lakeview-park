'use strict'
const { createProductDiscount, getProductDiscount, updateProductDiscount, deleteProductDiscount } = require('../controllers/productDiscount.controller')
const { validateCreateProductDiscount, validateGetProductDiscount, validateUpdateProductDiscount, validateDeleteProductDiscount } = require('../middlewares/productDiscount.middleware')
// const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.post(route + '/product-discount', validateCreateProductDiscount, createProductDiscount)
  app.get(route + '/product-discount', validateGetProductDiscount, getProductDiscount)
  app.put(route + '/product-discount/:id', validateUpdateProductDiscount, updateProductDiscount)
  app.delete(route + '/product-discount/:id', validateDeleteProductDiscount, deleteProductDiscount)
  // app.get(route + '/product', passport.authenticate('jwt', { session: false }), validateCreateProduct, createProduct)
}
