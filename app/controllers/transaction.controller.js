'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { createTransactionHelper, getTransactionHelper, updateTransactionHelper, deleteTransactionHelper } = require('../helpers/transaction.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

/** Create Stall  */
const createTransaction = function (req, res) {
  return createTransactionHelper(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Transaction added successfully.', data, 'Transaction.controller.createTransaction')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Transaction.controller.createTransaction', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Transaction.controller.createTransaction', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Get Transaction  */
const getTransaction = function (req, res) {
  return getTransactionHelper(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Transaction Fetched successfully', data, 'Transaction.controller.getTransaction')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'Transaction.controller.getTransaction', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Transaction.controller.getTransaction', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Update Transaction  */
const updateTransaction = function (req, res) {
  return updateTransactionHelper(req.params.id, req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Transaction updated successfully.', data, 'Transaction.controller.updateTransaction')
    }).catch(StandardError, function (err) {
      generalController.errorRepone(res, err, null, 'Transaction.controller.updateTransaction', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for detail', 'Transaction.controller.updateTransaction', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Delete Transaction  */
const deleteTransaction = function (req, res) {
  return deleteTransactionHelper(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'Transaction deleted successfully.', data, 'Transaction.controller.deleteTransaction')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'Transaction.controller.deleteTransaction', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Transaction.controller.deleteTransaction', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = { createTransaction, getTransaction, updateTransaction, deleteTransaction }
