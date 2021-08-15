'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const StandardError = require('standard-error')
const generalController = require('./general.controller')
const { createExpenseHelper, getExpense, deleteExpensesHelper, updateExpensesHelper } = require('../helpers/expenses.helper')

// Create Expenses
const createExpenses = function (req, res) {
  return createExpenseHelper(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Expenses Created  successfully', data, 'expenses.controller.createExpenses')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'expenses.controller.createExpenses', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'expenses.controller.createExpenses', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Get Expenses
const getExpenses = function (req, res) {
  return getExpense(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'expenses get  successfully', data, 'expenses.controller.getExpenses')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'expenses.controller.getExpenses', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'expenses.controller.getExpenses', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Delete Expenses
const deleteExpenses = function (req, res) {
  return deleteExpensesHelper(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'expenses deleted successfully.', data, 'expenses.controller.deleteExpenses')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'expenses.controller.deleteExpenses', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'expenses.controller.deleteExpenses', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Update Expenses
const updateExpenses = (req, res) => {
  return updateExpensesHelper(req.params.id, req.body)
    .then((data) => {
      generalController.successResponse(res, 'Expenses Updated successfully.', data, 'Expenses.controller.updateExpenses')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'Expenses.controller.updateExpenses', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Expenses.controller.updateExpenses', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  createExpenses,
  getExpenses,
  deleteExpenses,
  updateExpenses
}
