'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const { isString, bindAll, isInteger, isNumber } = require('lodash')

const validateCreateOrder = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  if (!body.title || !isString(body.title)) {
    errorArray.push({
      field: 'title',
      error: 'VCT-8060',
      message: 'Please provide only valid \'title\' as String.'
    })
  }

  if (!body.total || !isInteger(body.total)) {
    errorArray.push({
      field: 'total',
      error: 'VCT-8061',
      message: 'Please provide only valid \'total\'.'
    })
  }

  if (!body.orderType || !_.isString(body.orderType)) {
    errorArray.push({
      field: 'orderType',
      error: 'VCT-8061',
      message: 'Please provide only valid \'orderType\'.'
    })
  }

  if (!body.StallId || body.StallId.length < 1) {
    errorArray.push({
      field: 'StallId',
      error: 'VCO-8061',
      message: 'Please provide only valid \'StallId\'.'
    })
  }

  // if (body.products) {
  if (!_.isArray(body.products) && body.products === '') {
    errorArray.push({
      field: 'Products',
      error: 90131,
      message: 'Please provide only valid \'Products\' as Array.'
    })
  }
  // }
  /** Products Array */

  for (let i = 0; i < body.products.length; i++) {
    const data = body.products[i]
    console.log(data)
    // Validating as Number and length range.
    if (!body.ProductId) {
      if (isNaN(data.ProductId) || data.ProductId.length < 1) {
        errorArray.push({
          field: 'ProductId',
          error: 90075,
          message: '\'ProductId\' is required as Number,.'
        })
      }
    }

    // Validating as Number and length range.
    if (!body.amount ) {   
        errorArray.push({
          field: 'amount',
          error: 90075,
          message: '\'amount\' is required as Number, length must be greater then 1.'
        })
    }

    // Validating as Number and length range.
    if(!body.discount || !isInteger(body.discount) || body.discount.length < 1 ){
        errorArray.push({
          field: 'discount',
          error: 90075,
          message: '\'discount\' is required as Number, length must be greater then 1.'
        })   
    }
    
    // }
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'order.middleware.validateCreateOrder')
  }

  validatedBody.title = body.title
  validatedBody.total = body.total
  validatedBody.orderType = body.orderType
  validatedBody.StallId = body.StallId
  validatedBody.products = body.products,
  validatedBody.discount = body.discount,
  req.validatedBody = validatedBody
  done()
}

const validateGetOrder = (req, res, done) => {
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

  if (query.hasOwnProperty('orderType') && query.orderType) {
    validatedConditions.orderType = query.orderType
  }

  if (query.hasOwnProperty('StallId') && query.StallId) {
    validatedConditions.StallId = query.StallId
  }

  if (query.limit && query.limit > 0) {
    limit = parseInt(query.limit)
  }

  if (query.offset && query.offset > 0) {
    offset = parseInt(query.offset)
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'order.middleware.validateGetOrder')
  }

  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

const validateUpdateOrder = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const params = req.params
  const validatedBody = {}

  if (isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 'VUO-8060',
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
        error: 'VUP-8061',
        message: 'Please provide only valid \'status\' as String,.'
      })
    }
    validatedBody.status = body.status
  }

  // orderType Optional.
  if (body.hasOwnProperty('orderType') || body.orderType) {
    if (!isString(body.orderType)) {
      errorArray.push({
        field: 'orderType',
        error: 'VUP-8061',
        message: 'Please provide only valid \'orderType\' as String,.'
      })
    }
    validatedBody.orderType = body.orderType
  }

  /** Products Array */
  if (body.hasOwnProperty('Products')) {
    if (!_.isArray(body.Products) || body.Products.length < 1) {
      errorArray.push({
        field: 'Products',
        error: 90131,
        message: 'Please provide only valid \'Products\' as Array.'
      })
    }

    for (let i = 0; i < body.products.length; i++) {
      const data = body.products[i]
      console.log(data)
      // Validating as Number and length range.
      if (_.isNaN(data.ProductId) || body.ProductId.length < 1) {
        errorArray.push({
          field: 'ProductId',
          error: 90075,
          message: '\'ProductId\' is required as Number,.'
        })
      }

      // Validating as Number and length range.
      if (_.isNaN(data.amount) || data.amount.length < 1) {
        errorArray.push({
          field: 'amount',
          error: 90075,
          message: '\'amount\' is required as Number, length must be greater then 1.'
        })
      }

      // Validating as Number and length range.
      if (_.isNaN(data.discount) || data.discount.length < 1) {
        errorArray.push({
          field: 'discount',
          error: 90075,
          message: '\'discount\' is required as Number, length must be greater then 1.'
        })
      }
    }
    validatedBody.products = body.products
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'Order.middleware.validateUpdateOrder')
  }

  req.validatedBody = validatedBody
  done()
}

const validateDeleteOrder = (req, res, done) => {
  const errorArray = []
  if (isNaN(req.params.id)) {
    errorArray.push({
      field: 'id',
      error: 'VDO-8060',
      message: "Please provide only valid 'id' as number."
    })
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'order.middleware.validateDeleteOrder')
  }
  done()
}

module.exports = { validateCreateOrder, validateGetOrder, validateUpdateOrder, validateDeleteOrder }
