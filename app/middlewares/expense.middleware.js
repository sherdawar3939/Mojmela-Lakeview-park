'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// Validate Create Expenses
const validateCreateExpenses = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // Validate description as optional
  if (body.description) {
    if (body.description.length > 1000) {
      errorArray.push({
        field: 'description',
        error: 26,
        message: 'Please provide description not greater than length 1000.'
      })
    }
    validatedBody.description = body.description
  }

  // Validate body as a Amount is required
  if (!body.amount || isNaN(body.amount)) {
    errorArray.push({
      field: 'amount',
      error: 26,
      message: 'Please provide only valid \'amount\' as Decimal.'
    })
  }

  // Validate body as ExpenseCategoryId is required
  if (!body.ExpenseCategoryId || isNaN(body.ExpenseCategoryId)) {
    errorArray.push({
      field: 'ExpenseCategoryId',
      error: 26,
      message: 'Please provide only valid \'ExpenseCategoryId\' as Integer.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'Expenses.middleware.validateCreateParking')
  }

  validatedBody.amount = body.amount
  validatedBody.ExpenseCategoryId = body.ExpenseCategoryId
  req.validatedBody = validatedBody
  done()
}

// Validate Get Expenses
const validateGetExpenses = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validateConditions = {}

  if (query.hasOwnProperty('description') && query.description) {
    validateConditions.description = query.description
  }

  if (query.hasOwnProperty('amount') && query.amount) {
    validateConditions.amount = query.amount
  }

  if (query.hasOwnProperty('ExpenseCategoryId') && query.ExpenseCategoryId) {
    validateConditions.ExpenseCategoryId = query.ExpenseCategoryId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'Expenses.middleware.validateGetExpenses')
  }

  req.conditions = validateConditions
  done()
}

// Delete Expenses
const validateDeleteExpenses = (req, res, done) => {
  const errorArray = []
  if (isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVIU-8060',
      message: "Please provide only valid 'id' as number."
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'inspector.middleware.validateIspectorUser')
  }
  done()
}

// Update Expenses
const validateUpdateExpenses = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const body = req.body
  const validatedBody = {}

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVUUV-8080',
      message: 'Please provide only valid \'expenseId\' as numeric.'
    })
  }

  // Validate body description as optional
  if (body.description) {
    if (body.description.length > 1000) {
      errorArray.push({
        field: 'description',
        error: 26,
        message: 'Please provide description not greater than length 1000.'
      })
    }
    validatedBody.description = body.description
  }

  // Validate body amount as optional
  if (body.hasOwnProperty('amount') && body.amount) {
    if (!body.amount || isNaN(body.amount)) {
      errorArray.push({
        field: 'amount',
        error: 26,
        message: 'Please provide only valid \'amount\' as Decimal.'
      })
    }
    validatedBody.amount = body.amount
  }

  // Validate body ExpenseCategoryId as optional
  if (body.hasOwnProperty('ExpenseCategoryId') && body.ExpenseCategoryId) {
    if (!body.ExpenseCategoryId || isNaN(body.ExpenseCategoryId)) {
      errorArray.push({
        field: 'ExpenseCategoryId',
        error: 26,
        message: 'Please provide only valid \'ExpenseCategoryId\' as Integer.'
      })
    }
    validatedBody.ExpenseCategoryId = body.ExpenseCategoryId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'userVehicle.middleware.validateUpdateUserVehicleId')
  }
  req.validatedBody = validatedBody
  done()
}

module.exports = {
  validateCreateExpenses,
  validateGetExpenses,
  validateDeleteExpenses,
  validateUpdateExpenses
}
