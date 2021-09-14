'use strict'
const db = require('../config/sequelize.config')
const generalHelper =require('./general.helper')

function getBandHelper (conditions,limit, offset) {
  return db.Band.findAndCountAll({
    where:conditions,
    limit:limit,
    offset:offset
  })
}

function createBandHelper (data){
  return db.Band.create(data)
}

function deleteBandHelper (id) {
  return db.Band.findOne({ where: { id: id, isDeleted: false } })
    .then((foundRecord) => {
      if (!foundRecord) {
        return generalHelper.rejectPromise({
          field: 'id',
          error: 'DPH-0003',
          message: 'No Record Exists.'
        })
      }

      return db.Band.update({ isDeleted: true }, {
        where: {
          id
        }
      })
    })
    .catch(generalHelper.catchException)
}

  // Update Band
  function updateBandHelper (id, data) {
    return db.Band.update(data, {
      where: {
        id: id
      }
    })
  }

module.exports = {
  getBandHelper,
  createBandHelper,
  deleteBandHelper,
  updateBandHelper
}
