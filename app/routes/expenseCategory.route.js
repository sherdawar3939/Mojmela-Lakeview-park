'use strict'
const passport = require('../config/passport')
const {
  createExpenseCategory,
  getExpenseCategory,
  deleteExpenseCategory,
  updateExpenseCategory
} = require('../controllers/expenseCategory.controller')

const {
  validateCreateExpenseCategory,
  validateGetExpenseCategory,
  validateDeleteExpenseCategory,
  validateUpdateExpenseCategory
} = require('../middlewares/expenseCategory.middleware')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  app.post(route + '/expenseCategory', passport.authenticate('jwt', { session: false }), validateCreateExpenseCategory, createExpenseCategory)
  app.get(route + '/expenseCategory', passport.authenticate('jwt', { session: false }), validateGetExpenseCategory, getExpenseCategory)
  app.delete(route + '/expenseCategory/:id', passport.authenticate('jwt', { session: false }), validateDeleteExpenseCategory, deleteExpenseCategory)
  app.put(route + '/expenseCategory/:id', passport.authenticate('jwt', { session: false }), validateUpdateExpenseCategory, updateExpenseCategory)
}
