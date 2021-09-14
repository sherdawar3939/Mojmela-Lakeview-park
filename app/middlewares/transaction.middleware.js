'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isString } = require('lodash')

const validateCreateTransaction = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // validatedBody.UserId = req.user.id

  if (!body.amount || isNaN(body.amount)) {
    errorArray.push({
      field: 'amount',
      error: 'VCT-8060',
      message: 'Please provide only valid \'amount\' as String.'
    })
  }

  if (body.hasOwnProperty('band') && body.band) {
    if (isNaN(body.band)) {
      errorArray.push({
        field: 'band',
        error: 'VCT-8061',
        message: 'Please provide only valid \'band\'.'
      })
    }
    validatedBody.band = body.band
  }

  if (body.hasOwnProperty('UserId') && body.UserId) {
    if (isNaN(body.UserId)) {
      errorArray.push({
        field: 'UserId',
        error: 'VCT-8061',
        message: 'Please provide only valid \'UserId\'.'
      })
    }
    validatedBody.UserId = body.UserId
  }

  if (!body.UserId || !body.band) {
    errorArray.push({
      field: 'UserId && band',
      error: 'VCT-8061',
      message: 'Please provide only valid \'UserId\'. OR bandNumber'
    })
  }

  if (!body.source) {
    errorArray.push({
      field: 'source',
      error: 'VCT-8061',
      message: 'Please provide only valid \'source\'.'
    })
  } else if (body.source === 'Booth') {
    if (!body.BoothId || isNaN(body.BoothId)) {
      errorArray.push({
        field: 'BoothId',
        error: 'VCT-8061',
        message: 'Please provide only valid \'BoothId\'.'
      })
    }
    validatedBody.refId = body.BoothId
  } else if (body.source === 'App') {
    if (!body.UserId || isNaN(body.UserId)) {
      errorArray.push({
        field: 'UserId',
        error: 'VCT-8061',
        message: 'Please provide only valid \'UserId\'.'
      })
    }
    validatedBody.UserId = body.UserId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'transaction.middleware.validateCreateTransaction')
  }

  validatedBody.source = body.source
  validatedBody.amount = body.amount
  req.validatedBody = validatedBody
  done()
}

const validateGetTransaction = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  if (query.hasOwnProperty('search') && query.search) {
    validatedConditions.search = query.search
  }

  if (query.hasOwnProperty('amount') && query.amount) {
    validatedConditions.amount = query.amount
  }

  if (query.hasOwnProperty('source') && query.source) {
    validatedConditions.source = query.source
  }

  if (query.hasOwnProperty('BandId') && query.status) {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'transaction.middleware.validateGetTransaction')
  }

  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

const validateUpdateTransaction = (req, res, done) => {
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

  // amount Optional.
  if (body.hasOwnProperty('amount') || body.amount) {
    if (!isString(body.amount)) {
      errorArray.push({
        field: 'amount',
        error: 'VUP-8061',
        message: 'Please provide only valid \'amount\' as String,.'
      })
    }
    validatedBody.amount = body.amount
  }

  // source Optional.
  if (body.hasOwnProperty('source') || body.source) {
    if (!isString(body.source)) {
      errorArray.push({
        field: 'source',
        error: 'VUP-8061',
        message: 'Please provide only valid \'source\' as String,.'
      })
    }
    validatedBody.source = body.source
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'transaction.middleware.validateUpdateTransaction')
  }

  req.validatedBody = validatedBody
  done()
}

const validateDeleteTransaction = (req, res, done) => {
  const errorArray = []
  if (isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 'VDP-8060',
      message: "Please provide only valid 'id' as number."
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'transaction.middleware.validateDeleteTransaction')
  }
  done()
}

module.exports = { 
  validateCreateTransaction, 
  validateGetTransaction, 
  validateUpdateTransaction, 
  validateDeleteTransaction
}
