'use strict'
const generalMiddleware = require('./general.middleware');
const _ = require('lodash');
const {isInteger} = require('lodash');

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

const validatePostBand = (req, res, done)=>{
   const errorArray = []
   const body = req.body
   const validatedBody = {}

   if (!body.bandNumber || !_.isString(body.bandNumber) ){
     errorArray.push({
       field: 'bandNumber',
       error:27,
       message:'please provide valid band number as string '
     })
   }

   if (!body.balance || !isInteger(body.balance)){
     errorArray.push({
      field: 'balance',
      error:27,
      message:'please provide valid amount as numeric '
     })
   }

   if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'booth.middleware.validateCreateBooth')
  }
  validatedBody.bandNumber = body.bandNumber
  validatedBody.balance = body.balance
  req.validatedBody = validatedBody
  done()
}

 // Delete Band
 const validateDeleteBand = (req, res, done) => {
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

   // Update Band
   const validateUpdateBand = (req, res, done) => {
    const errorArray = []
    const params = req.params
    const body = req.body
    const validatedBody = {}
  
    if (!params.id || isNaN(params.id)) {
      errorArray.push({
        field: 'id',
        error: 'MVUUV-8080',
        message: 'Please provide only valid \'BandId\' as numeric.'
      })
    }
    
    // Validating amount is optional as valid decimal
    if(body.bandNumber){
      if(!body.bandNumber || !_.isString(body.bandNumber)){
        errorArray.push({
          field: 'bandNumber',
          error: 26,
          message: 'Please provide valid \'bandNumber\' which is string.'
        })
      }
    }
    if(body.balance){
      if(!body.balance || !isInteger(body.balance)){
        errorArray.push({
          field: 'UserId',
          error: 26,
          message: 'Please provide valid \'amount\' which is integer.'
        })
      }
    }
  
    if (!_.isEmpty(errorArray)) {
      return generalMiddleware.standardErrorResponse(res, errorArray, 'booth.middleware.validateUpdateBooth')
    }
    validatedBody.bandNumber = body.bandNumber
    validatedBody.balance = body.balance
    req.validatedBody = validatedBody
    done()
  }



module.exports = {
    validateGetBand,
    validatePostBand,
    validateDeleteBand,
    validateUpdateBand
}
