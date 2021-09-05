'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// Add Booth
const validateCreateBooth = (req, res, done) => {
    const errorArray = []
    const body = req.body
    const validatedBody = {}
  
    // Validating title is required 
    if(!body.title || body.title.length> 100) {
      errorArray.push({
              field: 'title',
              error: 26,
              message: 'Please provide valid \'title\' of length not greater than 100.'
            })
            validatedBody.title=body.title
        }
    
    // Validating status is required
    if(!body.status || body.status !=='Active' && body.status !=='InActive') {
      errorArray.push({
              field: 'status',
              error: 26,
              message: 'Please provide valid \'status\' which is Active or InActive.'
            })
            validatedBody.status=body.status
        }
 
      // Validating UserId is required as valid Number
      if(!body.UserId || isNaN(body.UserId)){
        errorArray.push({
                field: 'UserId',
                error: 26,
                message: 'Please provide valid \'UserId\' which is Number.'
              })
              validatedBody.UserId=body.UserId
         }
  
    if (!_.isEmpty(errorArray)) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'booth.middleware.validateCreateBooth')
    }
    validatedBody.title = body.title
    validatedBody.status = body.status
    validatedBody.UserId = body.UserId
    req.validatedBody = validatedBody
    done()
  }

  // Get Booth
const validateGetBooth = (req, res, done) => {
    const errorArray = []
    const query = req.query
    const validateConditions = {}
  
    if (query.hasOwnProperty('title') && query.title) {
      validateConditions.title = query.title
    }
    if (query.hasOwnProperty('status') && query.status) {
      validateConditions.status = query.status
    }
    if (query.hasOwnProperty('UserId') && query.amount) {
      validateConditions.UserId = query.UserId
    }

    if (!_.isEmpty(errorArray)) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'booth.middleware.validateGetBooth')
    }
    req.conditions = validateConditions
    done()
  }

  // Delete Booth
const validateDeleteBooth = (req, res, done) => {
    const errorArray = []
    if (isNaN(req.params.id)) {
      errorArray.push({
        field: 'id',
        error: 'MVIU-8060',
        message: "Please provide only valid 'id' as number."
      })
    }
    if (!_.isEmpty(errorArray)) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'booth.middleware.validateDeleteBooth')
    }
    done()
  }

   // Update Booth
const validateUpdateBooth = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const body = req.body
  const validatedBody = {}

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVUUV-8080',
      message: 'Please provide only valid \'BoothId\' as numeric.'
    })
  }

  // Validating title is  as optional 
  if(body.title ){
    if(!body.title || body.title.length > 100){
      errorArray.push({
        field: 'title',
        error: 26,
        message: 'Please provide valid \'title\' of length not greater than 100.'
      })
    }
       validatedBody.title=body.title
  }

  // Validating status is optional
  if(body.status){
    if(!body.status || body.status !=='Active' && body.status !== 'InActive'){
      errorArray.push({
        field: 'status',
        error: 26,
        message: 'Please provide valid \'status\' which is Active or InActive.'
      })
    }
        validatedBody.status=body.status
   }
  
  // Validating amount is optional as valid decimal
  if(body.UserId){
    if(!body.UserId || isNaN(body.UserId)){
      errorArray.push({
        field: 'UserId',
        error: 26,
        message: 'Please provide valid \'UserId\' which is Number.'
      })
    }
     validatedBody.UserId=body.UserId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'booth.middleware.validateUpdateBooth')
  }
  
  req.validatedBody = validatedBody
  done()
}
  module.exports= { 
    validateCreateBooth,
    validateGetBooth,
    validateDeleteBooth,
    validateUpdateBooth
  }