'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const StandardError = require('standard-error')
const generalController = require('./general.controller')
const { getBandHelper } = require('../helpers/band.helper')

const getBand = function (req, res) {
  return getBandHelper(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Band Fetched successfully', data, 'band.controller.getBand')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'band.controller.getBand', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'band.controller.getBand', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  getBand
}
