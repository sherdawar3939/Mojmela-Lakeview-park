'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { createProductHelper, getProductHelper, updateProductHelper, deleteProductHelper } = require('../helpers/product.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

/** Create Product */
const createProduct = function (req, res) {
  return createProductHelper(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Product added successfully.', data, 'Product.controller.createProduct')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Product.controller.createProduct', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Product.controller.createProduct', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Get Product */
const getProduct = function (req, res) {
  return getProductHelper(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Product Fetched successfully', data, 'Product.controller.getProduct')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'Product.controller.getProduct', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Product.controller.getProduct', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Update Product */
const updateProduct = function (req, res) {
  return updateProductHelper(req.params.id, req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Product updated successfully.', data, 'Product.controller.updateProduct')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Product.controller.updateProduct', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for detail', 'Product.controller.updateProduct', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Delete Product */
const deleteProduct = function (req, res) {
  return deleteProductHelper(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'Product deleted successfully.', data, 'Product.controller.deleteProduct')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'Product.controller.deleteProduct', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Product.controller.deleteProduct', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = { createProduct, getProduct, updateProduct, deleteProduct }
