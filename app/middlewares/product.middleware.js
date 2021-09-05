'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isString, isInteger } = require('lodash')

const validateCreateProduct = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  //   validatedBody.UserId = req.user.id

  if (!body.title || !isString(body.title)) {
    errorArray.push({
      field: 'title',
      error: 'VCP-8060',
      message: 'Please provide only valid \'title\' as String.'
    })
  }

  if (!body.status || body.status === 'Active' || body.status === 'InActive') {
    errorArray.push({
      field: 'status',
      error: 'VCP-8061',
      message: 'Please provide only valid \'status\'.'
    })
  }

  if (!body.amount || !isInteger(body.amount)) {
    errorArray.push({
      field: 'amount',
      error: 'VCP-8062',
      message: 'Please provide only valid \'amount as Number\'.'
    })
  }

  if (!body.productType) {
    errorArray.push({
      field: 'productType',
      error: 'VCP-8063',
      message: 'Please provide only valid \'productType\'.'
    })
  }

  if (body.productType === 'Standard') {
    if (!body.StallId || isNaN(body.StallId)) {
      errorArray.push({
        field: 'StallId',
        error: 'VCP-8064',
        message: 'Please provide only valid \'StallId\'.'
      })
    }
    validatedBody.StallId = body.StallId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'Product.middleware.validateCreateProduct')
  }

  validatedBody.title = body.title
  validatedBody.status = body.status
  validatedBody.amount = body.amount
  validatedBody.productType = body.productType

  req.validatedBody = validatedBody
  done()
}

const validateGetProduct = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  if (query.hasOwnProperty('search') && query.search) {
    validatedConditions.search = query.search
  }

  if (query.hasOwnProperty('title') && query.StallId) {
    validatedConditions.StallId = query.StallId
  }

  if (query.hasOwnProperty('amount') && query.StallId) {
    validatedConditions.StallId = query.StallId
  }

  if (query.hasOwnProperty('status') && query.StallId) {
    validatedConditions.StallId = query.StallId
  }

  if (query.hasOwnProperty('productType') && query.StallId) {
    validatedConditions.StallId = query.StallId
  }
  
  if (query.hasOwnProperty('StallId') && query.StallId) {
    validatedConditions.StallId = query.StallId
  }

  if (query.limit && query.limit > 0) {
    limit = parseInt(query.limit)
  }

  if (query.offset && query.offset > 0) {
    offset = parseInt(query.offset)
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'Product.middleware.validateGetProduct')
  }

  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

const validateUpdateProduct = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const params = req.params
  const validatedBody = {}

  if (isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 'VUP-8060',
      message: "Please provide only valid 'id' as number."
    })
  }

  // title Optional.
  if (body.title) {
    if (!isString(body.title)) {
      errorArray.push({
        field: 'title',
        error: 'VUP-8061',
        message: 'Please provide only valid \'title\' as String,.'
      })
    }
    validatedBody.title = body.title
  }

  // status Optional.
  if (body.status &&  !isString(body.status)) {
      errorArray.push({
        field: 'status',
        error: 'VUP-8062',
        message: 'Please provide only valid \'status\' as String,.'
      })
    validatedBody.status = body.status
  }

  // amount Optional.
  if (body.amount && isNaN(body.amount)) {
      errorArray.push({
        field: 'amount',
        error: 'cr-10',
        message: 'Please provide only valid \'amount\' as Number,.'
      })
    validatedBody.amount = body.amount
  }

  // productType Optional.
  if (body.productType && !isString(body.productType))  {
      errorArray.push({
        field: 'productType',
        error: 'cr-10',
        message: 'Please provide only valid \'productType\' as String,.'
      })
    validatedBody.productType = body.productType
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'Product.middleware.validateUpdateProduct')
  }
  // validatedBody.title = body.title,
  // validatedBody.status = body.status,
  // validatedBody.amount = body.amount,
  // validatedBody.productType = body.productType
  req.validatedBody = validatedBody
  done()
}

const validateDeleteProduct = (req, res, done) => {
  const errorArray = []
  if (isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 'VDP-8060',
      message: "Please provide only valid 'id' as number."
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'Product.middleware.validateDeleteProduct')
  }
  done()
}

module.exports = { validateCreateProduct, validateGetProduct, validateUpdateProduct, validateDeleteProduct }
