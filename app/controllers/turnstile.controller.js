'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const StandardError = require('standard-error')
const generalController = require('./general.controller')
const { createTurnStileHelper, getTurnstileHelper, deleteTurnstileHelper, updateTurnstileHelper } = require('../helpers/turnstile.helper')

// Create Turnstile
const createTurnstile = function (req, res) {
  return createTurnStileHelper(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Turnstile Created  successfully', data, 'turnstile.controller.createTurnstile')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'turnstile.controller.createTurnstile', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'turnstile.controller.createTurnstile', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Get Turnstile
const getTurnstile = function (req, res) {
  return getTurnstileHelper(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Turnstile get  successfully', data, 'turnstile.controller.getTurnstile')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'turnstile.controller.getTurnstile', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'turnstile.controller.getTurnstile', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Delete Turnstile
const deleteTurnstile = function (req, res) {
  return deleteTurnstileHelper(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'turnstile deleted successfully.', data, 'turnstile.controller.deleteTurnstile')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'turnstile.controller.deleteTurnstile', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'turnstile.controller.deleteTurnstile', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Update Turnstile
const updateTurnstile = (req, res) => {
  return updateTurnstileHelper(req.params.id, req.body)
    .then((data) => {
      generalController.successResponse(res, 'turnstile Updated successfully.', data, 'turnstile.controller.updateTurnstile')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'turnstile.controller.updateTurnstile', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'turnstile.controller.updateTurnstile', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = { createTurnstile, getTurnstile, deleteTurnstile, updateTurnstile }
