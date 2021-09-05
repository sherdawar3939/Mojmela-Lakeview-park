'use strict'
const db = require('../config/sequelize.config')

// Create Booth
function createBoothHelper (data) {
  return db.Booth.create(data)
}

// Get Booth
function getBoothHelper (conditions) {
    return db.Booth.findAll({
      where: conditions
    })
  }

  // Delete Booth
function deleteBoothHelper (id) {
    return db.Booth.update({ isDeleted: true }, { where: { id: id } })
  }

  // Update Booth
function updateBoothHelper (id, data) {
    return db.Booth.update(data, {
      where: {
        id: id
      }
    })
  }

module.exports = {
    createBoothHelper,
    getBoothHelper,
    deleteBoothHelper,
    updateBoothHelper
  }