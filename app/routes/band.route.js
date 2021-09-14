'use strict'
const { getBand, createBand, deleteBand, updateBand } = require('../controllers/band.controller')
const { validateGetBand, validatePostBand, validateDeleteBand, validateUpdateBand } = require('../middlewares/band.middleware')
const passport = require('../config/passport')
module.exports = function (app, apiVersion) {
  const route = apiVersion

  app.get(route + '/band', passport.authenticate('jwt', { session: false }), validateGetBand, getBand)
  app.post(route + '/band', passport.authenticate('jwt', { session: false }), validatePostBand, createBand)
  app.delete(route + '/band/:id', passport.authenticate('jwt', { session: false }), validateDeleteBand, deleteBand)
  app.put(route + '/band/:id', passport.authenticate('jwt', { session: false }), validateUpdateBand, updateBand)
}
