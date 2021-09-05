'use strict'

const { 
  createExpenses, 
  getExpenses, 
  deleteExpenses, 
  updateExpenses } = require('../controllers/expense.controller')

const { 
  validateCreateExpenses, 
  validateGetExpenses, 
  validateDeleteExpenses, 
  validateUpdateExpenses } = require('../middlewares/expense.middleware')

const passport = require('../config/passport')
  module.exports = function (app, apiVersion) {
  const route = apiVersion
  app.post(route + '/expenses', passport.authenticate('jwt', { session: false }), validateCreateExpenses, createExpenses)
  app.get(route + '/expenses', passport.authenticate('jwt', { session: false }), validateGetExpenses, getExpenses)
  app.delete(route + '/expenses/:id', passport.authenticate('jwt', { session: false }), validateDeleteExpenses, deleteExpenses)
  app.put(route + '/expenses/:id', passport.authenticate('jwt', { session: false }), validateUpdateExpenses, updateExpenses)
}
