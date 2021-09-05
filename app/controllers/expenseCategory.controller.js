'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

const {
  createExpenseCategoryHelper,
  getExpenseCategoryHelper,
  deleteExpenseCategoryHelper,
  updateExpenseCategoryHelper
} = require('../helpers/expenseCategory.helper')

// Create ExpensesCategory
const createExpenseCategory = function (req, res) {
  return createExpenseCategoryHelper(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'expenseCategory Created  successfully', data, 'expenseCategory.controller.createExpenseCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'expenseCategory.controller.createExpenseCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'expenseCategory.controller.createExpenseCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Get ExpensesCategory
const getExpenseCategory = function (req, res) {
  return getExpenseCategoryHelper(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'expenseCategory get  successfully', data, 'expenseCategory.controller.getExpenseCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'expenseCategory.controller.getExpenseCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'expenseCategory.controller.getExpenseCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Delete ExpenseCategory
const deleteExpenseCategory = function (req, res) {
  return deleteExpenseCategoryHelper(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'expenseCategory deleted successfully.', data, 'expenseCategory.controller.deleteExpenseCategory')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'expenseCategory.controller.deleteExpenses', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'expenseCategory.controller.deleteExpenseCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Update ExpenseCategory
const updateExpenseCategory = (req, res) => {
  return updateExpenseCategoryHelper(req.params.id, req.body)
    .then((data) => {
      generalController.successResponse(res, 'expenseCategory Updated successfully.', data, 'expenseCategory.controller.updateExpenseCategory')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'expenseCategory.controller.updateExpenseCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'expenseCategory.controller.updateExpenseCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  createExpenseCategory,
  getExpenseCategory,
  deleteExpenseCategory,
  updateExpenseCategory
}
