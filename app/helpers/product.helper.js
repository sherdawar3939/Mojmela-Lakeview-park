'use strict'
const db = require('../config/sequelize.config')
const Op = db.Sequelize.Op
const generalHelper = require('./general.helper')

function createProductHelper (data) {
  console.log(data)
  return db.Product.create(data)
}

function getProductHelper (conditions, limit, offset) {
  const productWhere = { isDeleted: false }

  if (conditions.search) {
    productWhere[Op.or] = {
      title: {
        [Op.like]: '%' + conditions.search + '%'
      }
    }
  }

  if (conditions.amount) {
    productWhere.amount = conditions.amount
  }

  if (conditions.status) {
    productWhere.status = conditions.status
  }

  if (conditions.productType) {
    productWhere.productType = conditions.productType
  }

  if (conditions.StallId) {
    productWhere.StallId = conditions.StallId
  }

  return db.Product.findAndCountAll({
    where: productWhere,
    limit: limit,
    offset: offset
  })
    .catch(generalHelper.catchException)
}

const updateProductHelper = (id, data) => {
  console.log(data, id)
  return db.Product.update(data, {
    where: {
      id:id
    }
  })
}

function deleteProductHelper (id) {
  return db.Product.findOne({ where: { id: id, isDeleted: false } })
    .then((foundRecord) => {
      if (!foundRecord) {
        return generalHelper.rejectPromise({
          field: 'id',
          error: 'DPH-0003',
          message: 'No Record Exists.'
        })
      }

      return db.Product.update({ isDeleted: true }, {
        where: {
          id
        }
      })
    })
    .catch(generalHelper.catchException)
}
module.exports = {
  createProductHelper,
  getProductHelper,
  updateProductHelper,
  deleteProductHelper
}
