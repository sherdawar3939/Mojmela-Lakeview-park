'use strict'
const db = require('../config/sequelize.config')

// Create Expenses
function createExpenseHelper (data) {
  return db.Expenses.create(data)
}

// Get Expenses
function getExpense (conditions) {
  return db.Expenses.findAll({
    where: conditions
  })
}

// Delete Expenses
function deleteExpensesHelper (id) {
  return db.Expenses.update({ isDeleted: true }, { where: { id: id } })
}

// Update Expenses
function updateExpensesHelper (id, data) {
  return db.Expenses.update(data, {
    where: {
      id: id
    }
  })
}
module.exports = { createExpenseHelper, getExpense, deleteExpensesHelper, updateExpensesHelper }
