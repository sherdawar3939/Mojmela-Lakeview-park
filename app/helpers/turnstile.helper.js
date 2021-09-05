'use strict'
const db = require('../config/sequelize.config')

// Create Turnstile
function createTurnStileHelper (data) {
  return db.Turnstile.create(data)
}

// Get Turnstile
function getTurnstileHelper (conditions) {
  return db.Turnstile.findAll({
    where: conditions
  })
}

// Delete Turnstile
function deleteTurnstileHelper (id) {
  return db.Turnstile.update({ isDeleted: true }, { where: { id: id } })
}

// Update Turnstile
function updateTurnstileHelper (id, data) {
  return db.Turnstile.update(data, {
    where: {
      id: id
    }
  })
}

module.exports = {
  createTurnStileHelper,
  getTurnstileHelper,
  deleteTurnstileHelper,
  updateTurnstileHelper
}
