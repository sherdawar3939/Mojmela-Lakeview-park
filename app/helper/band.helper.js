'use strict'
const db = require('../config/sequelize.config')

function getBandHelper (conditions,limit, offset) {
  return db.Band.findAndCountAll({
    where:conditions,
    limit:limit,
    offset:offset
  })
}

module.exports = {
  getBandHelper
}
