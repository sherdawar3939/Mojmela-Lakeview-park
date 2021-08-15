'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetBand = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validateConditions = {}

  if (query.hasOwnProperty('bandNumber') && query.BandNumber) {
    validateConditions.BandNumber = query.BandNumber
  }

  if (query.hasOwnProperty('amount') && query.amount) {
    validateConditions.amount = query.amount
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'band.middleware.validateGetBand')
  }

  req.conditions = validateConditions
  req.limit = query.limit && query.limit > 0 ? parseInt(query.limit) : 20
  req.offset = query.offset && query.offset > 0 ? parseInt(query.offset) : 0
  done()
}

module.exports = {
    validateGetBand
}
