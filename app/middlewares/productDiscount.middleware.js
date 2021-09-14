'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isString } = require('lodash')

const validateCreateProductDiscount = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  if (!body.startDate) {
    errorArray.push({
      field: 'startDate',
      error: 'VCPD-8060',
      message: 'Please provide only valid \'startDate\' as Date format.'
    })
  }

  if (!body.endDate) {
    errorArray.push({
      field: 'endDate',
      error: 'VCPD-8061',
      message: 'Please provide only valid \'endDate\' as Date format.'
    })
  }

  if (!body.amount) {
    errorArray.push({
      field: 'amount',
      error: 'VCP-8062',
      message: 'Please provide only valid \'amount\'.'
    })
  }

  // validating as required ProductId field
  if (!body.ProductId || isNaN(body.ProductId)) {
    errorArray.push({
      field: 'ProductId',
      error: 345,
      message: 'The ProductId is required .'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'ProductDiscount.middleware.validateCreateProductDiscount')
  }

  validatedBody.startDate = body.startDate
  validatedBody.endDate = body.endDate
  validatedBody.amount = body.amount
  validatedBody.ProductId = body.ProductId

  req.validatedBody = validatedBody
  done()
}

const validateGetProductDiscount = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  if (query.hasOwnProperty('search') && query.search) {
    validatedConditions.search = query.search
  }

  if (query.hasOwnProperty('startDate') && query.startDate) {
    validatedConditions.startDate = query.startDate
  }

  if (query.hasOwnProperty('endDate') && query.endDate) {
    validatedConditions.endDate = query.endDate
  }

  if (query.hasOwnProperty('amount') && query.amount) {
    validatedConditions.amount = query.amount
  }

  if (query.limit && query.limit > 0) {
    limit = parseInt(query.limit)
  }

  if (query.offset && query.offset > 0) {
    offset = parseInt(query.offset)
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'ProductDiscount.middleware.validateGetProductDiscount')
  }

  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

const validateUpdateProductDiscount = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const params = req.params
  const validatedBody = {}

  if (isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 'VUPD-8060',
      message: "Please provide only valid 'id' as number."
    })
  }

  // DATE Optional.
  if (body.hasOwnProperty('startDate') || body.startDate) {
    if (!isString(body.startDate)) {
      errorArray.push({
        field: 'startDate',
        error: 'VUPD-8061',
        message: 'Please provide only valid \'startDate\' as Date,.'
      })
    }
    validatedBody.startDate = body.startDate
  }

  // status Optional.
  if (body.hasOwnProperty('endDate') || body.endDate) {
    if (!isString(body.endDate)) {
      errorArray.push({
        field: 'endDate',
        error: 'VUPD-8062',
        message: 'Please provide only valid \'endDate\' as String,.'
      })
    }
    validatedBody.endDate = body.endDate
  }

  // amount Optional.
  if (body.hasOwnProperty('amount') || body.amount) {
    if (isNaN(body.amount)) {
      errorArray.push({
        field: 'amount',
        error: 'cr-10',
        message: 'Please provide only valid \'amount\' as String,.'
      })
    }
    validatedBody.amount = body.amount
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'ProductDiscount.middleware.validateUpdateProductDiscount')
  }

  req.validatedBody = validatedBody
  done()
}

const validateDeleteProductDiscount = (req, res, done) => {
  const errorArray = []
  if (isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 'VDPD-8060',
      message: "Please provide only valid 'id' as number."
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'ProductDiscount.middleware.validateDeleteProductDiscount')
  }
  done()
}

module.exports = { 
  validateCreateProductDiscount, 
  validateGetProductDiscount, 
  validateUpdateProductDiscount, 
  validateDeleteProductDiscount 
}
