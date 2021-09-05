'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// Create ExpenseCategory
const validateCreateExpenseCategory = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // Validate body as title is required
  if (!body.title || body.title.length > 100 ) {
    errorArray.push({
      field: 'title',
      error: 26,
      message: 'Please provide only valid \'title\' of length not greater than 100.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'Expenses.middleware.validateCreateParking')
  }
  validatedBody.title = body.title
  req.validatedBody = validatedBody
  done()
}

// Get ExpenseCategory
const validateGetExpenseCategory = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validateConditions = {}

  if (query.hasOwnProperty('title') && query.title) {
    validateConditions.title = query.title
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'ExpenseCategory.middleware.validateGetExpenseCategory')
  }
  req.conditions = validateConditions
  done()
}

// Delete ExpenseCategory
const validateDeleteExpenseCategory = (req, res, done) => {
  const errorArray = []
  if (isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVIU-8060',
      message: "Please provide only valid 'id' as number."
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'expenseCategory.middleware.validateDeleteExpenseCategory')
  }
  done()
}

// Update ExpenseCategory
const validateUpdateExpenseCategory = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const body = req.body
  const validatedBody = {}

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVUUV-8080',
      message: 'Please provide only valid \'expenseCategoryId\' as numeric.'
    })
  }

  // Validate body title as required
  if (!body.title || !isString(body.title)) {
    errorArray.push({
      field: 'title',
      error: 26,
      message: 'Please provide title for description'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'userVehicle.middleware.validateUpdateUserVehicleId')
  }
  validatedBody.title = body.title
  req.validatedBody = validatedBody
  done()
}
module.exports = { validateCreateExpenseCategory, validateGetExpenseCategory, validateDeleteExpenseCategory, validateUpdateExpenseCategory }
