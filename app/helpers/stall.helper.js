'use strict'
const db = require('../config/sequelize.config')
const Op = db.Sequelize.Op
const generalHelper = require('./general.helper')

function createStallHelper (data) {
  console.log(data)
  return db.Stall.create(data)
}

function getStallHelper (conditions, limit, offset) {
  const stallWhere = { isDeleted: false }

  if (conditions.search) {
    stallWhere[Op.or] = {
      title: {
        [Op.like]: '%' + conditions.search + '%'
      }
    }
  }

  if (conditions.UserId) {
    stallWhere.UserId = conditions.UserId
  }

  if (conditions.status) {
    stallWhere.status = conditions.status
  }

  return db.Stall.findAndCountAll({
    where: stallWhere,
    limit: limit,
    offset: offset
  })
    .catch(generalHelper.catchException)
}

const updateStallHelper = (id, data) => {
  console.log(data, id)
  return db.Stall.update(data, {
    where: {
      id
    }
  })
}

function deleteStallHelper (id) {
  return db.Stall.findOne({ where: { id: id, isDeleted: false } })
    .then((foundRecord) => {
      if (!foundRecord) {
        return generalHelper.rejectPromise({
          field: 'id',
          error: 'DPH-0003',
          message: 'No Record Exists.'
        })
      }

      return db.Stall.update({ isDeleted: true }, {
        where: {
          id
        }
      })
    })
    .catch(generalHelper.catchException)
}
module.exports = {
  createStallHelper,
  getStallHelper,
  updateStallHelper,
  deleteStallHelper
}
