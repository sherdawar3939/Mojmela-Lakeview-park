'use strict'
const db = require('../config/sequelize.config')
// const Op = db.Sequelize.Op
const generalHelper = require('./general.helper')

const createTransactionHelper = async (data) => {
  const band = await db.Band.findOne({ where: { bandNumber: data.band } }).catch((error) => { console.log(error) })
  if (band.id) {
    data.BandId = band.id
  }

  await db.Transaction.create(data)
  // return db.Transaction.create(data)
}

function getTransactionHelper (conditions, limit, offset) {
  console.log(conditions)
  const transactionWhere = { isDeleted: false }

  if (conditions.amount) {
    transactionWhere.amount = conditions.amount
  }

  if (conditions.UserId) {
    transactionWhere.UserId = conditions.UserId
  }

  if (conditions.BandId) {
    transactionWhere.BandId = conditions.BandId
  }

  return db.Transaction.findAll({
    where: transactionWhere,
    limit: limit,
    offset: offset
  })
    .catch(generalHelper.catchException)
}

const updateTransactionHelper = (id, data) => {
  console.log(data, id)
  return db.Transaction.update(data, {
    where: {
      id
    }
  })
}

function deleteTransactionHelper (id) {
  return db.Transaction.findOne({ where: { id: id, isDeleted: false } })
    .then((foundRecord) => {
      if (!foundRecord) {
        return generalHelper.rejectPromise({
          field: 'id',
          error: 'DTH-0003',
          message: 'No Record Exists.'
        })
      }

      return db.Transaction.update({ isDeleted: true }, {
        where: {
          id
        }
      })
    })
    .catch(generalHelper.catchException)
}
module.exports = {
  createTransactionHelper,
  getTransactionHelper,
  updateTransactionHelper,
  deleteTransactionHelper
}
