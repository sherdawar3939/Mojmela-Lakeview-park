'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { createOrderHelper, getOrderHelper, updateOrderHelper, deleteOrderHelper } = require('../helpers/order.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

/** Create Stall  */
const createOrder = function (req, res) {
  return createOrderHelper(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Order added successfully.', data, 'Order.controller.createOrder')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Order.controller.createOrder', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Order.controller.createOrder', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Get Order  */
const getOrder = function (req, res) {
  return getOrderHelper(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Order Fetched successfully', data, 'Order.controller.getOrder')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'Order.controller.getOrder', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Order.controller.getOrder', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Update Order  */
const updateOrder = function (req, res) {
  return updateOrderHelper(req.params.id, req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Order updated successfully.', data, 'Order.controller.updateOrder')
    }).catch(StandardError, function (err) {
      generalController.errorRepone(res, err, null, 'Order.controller.updateOrder', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for detail', 'Order.controller.updateOrder', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Delete Order  */
const deleteOrder = function (req, res) {
  return deleteOrderHelper(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'Order deleted successfully.', data, 'Order.controller.deleteOrder')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'Order.controller.deleteOrder', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Order.controller.deleteOrder', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = { createOrder, getOrder, updateOrder, deleteOrder }
