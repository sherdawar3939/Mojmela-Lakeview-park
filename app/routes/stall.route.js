'use strict'
const { createStall, getStall, updateStall, deleteStall } = require('../controllers/stall.controller')
const { validateCreateStall, validateGetStall, validateUpdateStall, validateDeleteStall } = require('../middlewares/Stall.middleware')
// const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.post(route + '/stall', validateCreateStall, createStall)
  app.get(route + '/stall', validateGetStall, getStall)
  app.put(route + '/stall/:id', validateUpdateStall, updateStall)
  app.delete(route + '/stall/:id', validateDeleteStall, deleteStall)

//  passport.authenticate('jwt', { session: false })
}
