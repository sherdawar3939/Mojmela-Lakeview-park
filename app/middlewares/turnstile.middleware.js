'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// Add Turnstile
const validateCreateTurnstile = (req, res, done) => {
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
      if(!body.amount || isNaN(body.amount)){
        errorArray.push({
                field: 'amount',
                error: 26,
                message: 'Please provide valid \'amount\' which is Number.'
              })
              validatedBody.amount=body.amount
         }
  
    if (!_.isEmpty(errorArray)) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'turnstile.middleware.validateCreateBooth')
    }
    validatedBody.title = body.title
    validatedBody.status = body.status
    validatedBody.amount = body.amount
    req.validatedBody = validatedBody
    done()
  }


// Get Turnstile
const validateGetTurnstile = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validateConditions = {}

  if (query.hasOwnProperty('title') && query.title) {
    validateConditions.title = query.title
  }
  if (query.hasOwnProperty('status') && query.status) {
    validateConditions.status = query.status
  }
  if (query.hasOwnProperty('amount') && query.amount) {
    validateConditions.amount = query.amount
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'turnstile.middleware.validateGetTurnstile')
  }
  req.conditions = validateConditions
  done()
}

// Delete Turnstile
const validateDeleteTurnstile = (req, res, done) => {
  const errorArray = []
  if (isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVIU-8060',
      message: "Please provide only valid 'id' as number."
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'turnstile.middleware.validateDeleteTurnstile')
  }
  done()
}

// Update Turnstile
const validateUpdateTurnstile = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const body = req.body
  const validatedBody = {}

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 'MVUUV-8080',
      message: 'Please provide only valid \'TurnstileId\' as numeric.'
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
  if(body.amount){
    if(!body.amount || isNaN(body.amount)){
      errorArray.push({
        field: 'amount',
        error: 26,
        message: 'Please provide valid \'amount\' which is Number.'
      })
    }
          validatedBody.amount=body.amount
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'turnstile.middleware.validateUpdateBooth')
  }
  req.validatedBody = validatedBody
  done()
}
module.exports = {
  validateCreateTurnstile,
  validateGetTurnstile,
  validateDeleteTurnstile,
  validateUpdateTurnstile
}
