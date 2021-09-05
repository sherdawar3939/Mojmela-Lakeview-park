'use strict'
const { createOrder, getOrder, updateOrder, deleteOrder } = require('../controllers/Order.controller')
const { validateCreateOrder, validateGetOrder, validateUpdateOrder, validateDeleteOrder } = require('../middlewares/Order.middleware')
// const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.post(route + '/order', validateCreateOrder, createOrder)
  app.get(route + '/order', validateGetOrder, getOrder)
  app.put(route + '/order/:id', validateUpdateOrder, updateOrder)
  app.delete(route + '/order/:id', validateDeleteOrder, deleteOrder)

//  passport.authenticate('jwt', { session: false })
}
