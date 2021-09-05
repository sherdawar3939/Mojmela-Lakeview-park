'use strict'
const db = require('../config/sequelize.config')

// Create ExpenseCategory
function createExpenseCategoryHelper (data) {
  return db.ExpenseCategory.create(data)
}

// Get ExpenseCategory
function getExpenseCategoryHelper (conditions) {
  return db.ExpenseCategory.findAll({
    where: conditions
  })
}

// Delete ExpenseCategory
function deleteExpenseCategoryHelper (id) {
  return db.ExpenseCategory.update({ isDeleted: true }, { where: { id: id } })
}

// Update ExpenseCategory
function updateExpenseCategoryHelper (id, data) {
  return db.ExpenseCategory.update(data, {
    where: {
      id: id
    }
  })
}
module.exports = {
  createExpenseCategoryHelper,
  getExpenseCategoryHelper,
  deleteExpenseCategoryHelper,
  updateExpenseCategoryHelper
}
