'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isString } = require('lodash')

const validateCreateStall = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // validatedBody.UserId = req.user.id

  if (!body.title || !isString(body.title)) {
    errorArray.push({
      field: 'title',
      error: 'VCS-8060',
      message: 'Please provide only valid \'title\' as String.'
    })
  }

  if (!body.status) {
    errorArray.push({
      field: 'status',
      error: 'VCS-8061',
      message: 'Please provide only valid \'status\'.'
    })
  }

  //   if (!body.UserId || isNaN(body.UserId)) {
  //     errorArray.push({
  //       field: 'UserId',
  //       error: 'VCP-8064',
  //       message: 'Please provide only valid \'UserId\'.'
  //     })
  //   }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'Product.middleware.validateCreateProduct')
  }

  validatedBody.title = body.title
  validatedBody.status = body.status
  //   validatedBody.UserId = body.UserId

  req.validatedBody = validatedBody
  done()
}

const validateGetStall = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  if (query.hasOwnProperty('search') && query.search) {
    validatedConditions.search = query.search
  }

  if (query.hasOwnProperty('title') && query.title) {
    validatedConditions.title = query.title
  }

  if (query.hasOwnProperty('status') && query.status) {
    validatedConditions.status = query.status
  }

  if (query.hasOwnProperty('UserId') && query.UserId) {
    validatedConditions.UserId = query.UserId
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

const validateUpdateStall = (req, res, done) => {
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
  if (body.hasOwnProperty('title') || body.title) {
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
  if (body.hasOwnProperty('status') || body.status) {
    if (!isString(body.status)) {
      errorArray.push({
        field: 'status',
        error: 'VUP-8062',
        message: 'Please provide only valid \'status\' as String,.'
      })
    }
    validatedBody.status = body.status
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'Product.middleware.validateUpdateProduct')
  }

  req.validatedBody = validatedBody
  done()
}

const validateDeleteStall = (req, res, done) => {
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

module.exports = { validateCreateStall, validateGetStall, validateUpdateStall, validateDeleteStall }
