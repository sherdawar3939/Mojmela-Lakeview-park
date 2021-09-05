'use strict'
const { createTransaction, getTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction.controller')
const { validateCreateTransaction, validateGetTransaction, validateUpdateTransaction, validateDeleteTransaction } = require('../middlewares/transaction.middleware')
// const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.post(route + '/transaction/recharge', validateCreateTransaction, createTransaction)
  app.get(route + '/transaction/recharge', validateGetTransaction, getTransaction)
  app.put(route + '/transaction/recharge/:id', validateUpdateTransaction, updateTransaction)
  app.delete(route + '/transaction/recharge/:id', validateDeleteTransaction, deleteTransaction)

//  passport.authenticate('jwt', { session: false })
}
