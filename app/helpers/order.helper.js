'use strict'
const db = require('../config/sequelize.config')
// const Op = db.Sequelize.Op
const generalHelper = require('./general.helper')

const createOrderHelper = async (data) => {
  console.log(data)
  // return db.Order.create(data)
}

function getOrderHelper (conditions, limit, offset) {
  console.log(conditions)
  const orderWhere = { isDeleted: false }

  if (conditions.title) {
    orderWhere.title = conditions.title
  }

  if (conditions.status) {
    orderWhere.status = conditions.status
  }

  if (conditions.orderType) {
    orderWhere.orderType = conditions.orderType
  }

  if (conditions.StallId) {
    orderWhere.StallId = conditions.StallId
  }

  return db.Order.findAndCountAll({
    where: orderWhere,
    limit: limit,
    offset: offset
  })
    .catch(generalHelper.catchException)
}

const updateOrderHelper = (id, data) => {
  console.log(data, id)
  return db.Order.findOne({ where: { id: id, isDeleted: false } })
    .then((foundRecord) => {
      if (!foundRecord) {
        return generalHelper.rejectPromise({
          field: 'id',
          error: 'DOH-0002',
          message: 'No Record Exists.'
        })
      }
      return db.Order.update(data, {
        where: {
          id
        }
      })
    }).catch(generalHelper.catchException)
}

function deleteOrderHelper (id) {
  return db.Order.findOne({ where: { id: id, isDeleted: false } })
    .then((foundRecord) => {
      if (!foundRecord) {
        return generalHelper.rejectPromise({
          field: 'id',
          error: 'DOH-0003',
          message: 'No Record Exists.'
        })
      }

      return db.Order.update({ isDeleted: true }, {
        where: {
          id
        }
      })
    })
    .catch(generalHelper.catchException)
}
module.exports = {
  createOrderHelper,
  getOrderHelper,
  updateOrderHelper,
  deleteOrderHelper
}
