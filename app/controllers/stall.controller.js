'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const { createStallHelper, getStallHelper, updateStallHelper, deleteStallHelper } = require('../helpers/stall.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

/** Create Stall  */
const createStall = function (req, res) {
  return createStallHelper(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Stall added successfully.', data, 'Stall.controller.createStall')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Stall.controller.createStall', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Stall.controller.createStall', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Get Stall  */
const getStall = function (req, res) {
  return getStallHelper(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Stall Fetched successfully', data, 'Stall.controller.getStall')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, 'Stall.controller.getStall', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Stall.controller.getStall', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Update Stall  */
const updateStall = function (req, res) {
  return updateStallHelper(req.params.id, req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Stall updated successfully.', data, 'Stall.controller.updateStall')
    }).catch(StandardError, function (err) {
      generalController.errorRepone(res, err, null, 'Stall.controller.updateStall', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for detail', 'Stall.controller.updateStall', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

/** Delete Stall  */
const deleteStall = function (req, res) {
  return deleteStallHelper(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'Stall deleted successfully.', data, 'Stall.controller.deleteStall')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'Stall.controller.deleteStall', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Stall.controller.deleteStall', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = { createStall, getStall, updateStall, deleteStall }
