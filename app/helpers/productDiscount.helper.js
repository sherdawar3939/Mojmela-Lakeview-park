'use strict'
const db = require('../config/sequelize.config')
const Op = db.Sequelize.Op
const generalHelper = require('./general.helper')

function createProductDiscountHelper (data) {
  console.log(data)
  return db.ProductDiscount.create(data)
}

function getProductDiscountHelper (conditions, limit, offset) {
  const productDiscountWhere = { isDeleted: false }

  if (conditions.search) {
    productDiscountWhere[Op.or] = {
      amount: {
        [Op.like]: '%' + conditions.search + '%'
      }
    }
  }

  if (conditions.startDate) {
    productDiscountWhere.startDate = conditions.startDate
  }

  if (conditions.endDate) {
    productDiscountWhere.endDate = conditions.endDate
  }

  return db.ProductDiscount.findAndCountAll({
    where: productDiscountWhere,
    limit: limit,
    offset: offset
  })
    .catch(generalHelper.catchException)
}

const updateProductDiscountHelper = (id, data) => {
  console.log(data, id)
  return db.ProductDiscount.update(data, {
    where: {
      id
    }
  })
}

function deleteProductDiscountHelper (id) {
  return db.ProductDiscount.findOne({ where: { id: id, isDeleted: false } })
    .then((foundRecord) => {
      if (!foundRecord) {
        return generalHelper.rejectPromise({
          field: 'id',
          error: 'DPDH-0003',
          message: 'No Record Exists.'
        })
      }

      return db.ProductDiscount.update({ isDeleted: true }, {
        where: {
          id
        }
      })
    })
    .catch(generalHelper.catchException)
}

module.exports = {
  createProductDiscountHelper,
  getProductDiscountHelper,
  updateProductDiscountHelper,
  deleteProductDiscountHelper
}
