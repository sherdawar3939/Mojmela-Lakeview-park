'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const StandardError = require('standard-error')
const generalController = require('./general.controller')
const { getBandHelper, createBandHelper, deleteBandHelper, updateBandHelper } = require('../helpers/band.helper')

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

const createBand = function(req, res){
  return createBandHelper(req.validatedBody)
  .then(function(data){
    generalController.successResponse(res, 'Band Added successfully', data, 'band.controller.createBand')
  }).catch(StandardError, function(err){
    generalController.errorResponse(res,err, 'band.controller.createBand', SERVER_RESPONSE.VALIDATION_ERROR)
  }).catch(function(err){
    generalController.errorResponse(res, err, 'Please check originalError for details', 'band.controller.createBand', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
  })
}

 // Delete Band
 const deleteBand = function (req, res) {
  return deleteBandHelper(req.params.id)
    .then((data) => {
      generalController.successResponse(res, 'Band deleted successfully.', data, 'band.controller.deleteBand')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'band.controller.deleteBand', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'band.controller.deleteBand', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

const updateBand = (req, res) => {
  return updateBandHelper(req.params.id, req.body)
    .then((data) => {
      generalController.successResponse(res, 'Band Updated successfully.', data, 'band.controller.updateBand')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'band.controller.updateBand', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'band.controller.updateBand', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  getBand,
  createBand,
  deleteBand,
  updateBand
}
