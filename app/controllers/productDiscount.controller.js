'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { createProductDiscountHelper, getProductDiscountHelper, updateProductDiscountHelper, deleteProductDiscountHelper } = require('../helpers/productDiscount.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

/** Create Product */
const createProductDiscount = function (req, res) {
  return createProductDiscountHelper(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Product Discount added successfully.', data, 'ProductDiscount.controller.createProductDiscount')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'ProductDiscount.controller.createProductDiscount', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'ProductDiscount.controller.createProductDiscount', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Get Product */
const getProductDiscount = function (req, res) {
  return getProductDiscountHelper(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Product Discount Fetched successfully', data, 'ProductDiscount.controller.getProductDiscount')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'Product.controller.getProductDiscount', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Product.controller.getProductDiscount', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Update Product */
const updateProductDiscount = function (req, res) {
  return updateProductDiscountHelper(req.params.id, req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Product Discount updated successfully.', data, 'ProductDiscount.controller.updateProductDiscount')
    }).catch(StandardError, function (err) {
      generalController.errorRepone(res, err, null, 'ProductDiscount.controller.updateProductDiscount', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for detail', 'ProductDiscount.controller.updateProductDiscount', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Delete Product */
const deleteProductDiscount = function (req, res) {
  return deleteProductDiscountHelper(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'Product Discount deleted successfully.', data, 'ProductDiscount.controller.deleteProductDiscount')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'ProductDiscount.controller.deleteProductDiscount', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'ProductDiscount.controller.deleteProductDiscount', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = { createProductDiscount, getProductDiscount, updateProductDiscount, deleteProductDiscount }
